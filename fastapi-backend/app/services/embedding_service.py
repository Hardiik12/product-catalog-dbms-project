import os
import math
import hashlib

_model = None
_model_failed = False

def _get_fallback_embedding(text: str) -> list[float]:
    """Lightweight 384-dim normalized vector generator (0MB extra RAM)."""
    vec = [0.0] * 384
    words = text.lower().split()
    if not words:
        return vec
    for word in words:
        h = int(hashlib.md5(word.encode()).hexdigest(), 16)
        idx = h % 384
        val = ((h >> 8) % 1000) / 500.0 - 1.0
        vec[idx] += val
    norm = math.sqrt(sum(x * x for x in vec))
    if norm > 0:
        vec = [x / norm for x in vec]
    return vec

def generate_embedding(text: str) -> list[float]:
    global _model, _model_failed

    if not text:
        return [0.0] * 384

    # If sentence-transformers failed earlier due to OOM/Memory limits, use lightweight fallback
    if _model_failed:
        return _get_fallback_embedding(text)

    if _model is None:
        try:
            # Set thread limits to prevent RAM spikes on low-memory containers
            os.environ["OMP_NUM_THREADS"] = "1"
            os.environ["MKL_NUM_THREADS"] = "1"
            import torch
            torch.set_num_threads(1)

            from sentence_transformers import SentenceTransformer
            print("Loading SentenceTransformer model 'all-MiniLM-L6-v2'...")
            _model = SentenceTransformer('all-MiniLM-L6-v2')
            print("SentenceTransformer loaded successfully!")
        except Exception as e:
            print(f"Memory-constrained environment detected ({e}). Switching to lightweight embedder.")
            _model_failed = True
            return _get_fallback_embedding(text)

    try:
        return _model.encode(text).tolist()
    except Exception as e:
        print(f"Embedding encoding error ({e}), falling back.")
        return _get_fallback_embedding(text)


def calculate_similarity(query_embedding: list[float], stored_embeddings: list[list[float]]):
    results = []
    for stored in stored_embeddings:
        if not stored or len(stored) != len(query_embedding):
            results.append(0.0)
            continue
        dot = sum(a * b for a, b in zip(query_embedding, stored))
        mag1 = math.sqrt(sum(a * a for a in query_embedding))
        mag2 = math.sqrt(sum(b * b for b in stored))
        if mag1 == 0 or mag2 == 0:
            results.append(0.0)
        else:
            results.append(dot / (mag1 * mag2))
    return results