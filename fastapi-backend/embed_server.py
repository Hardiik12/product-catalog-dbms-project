from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os
import sys
import math
import hashlib

def get_fallback_embedding(text: str) -> list[float]:
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

model = None
model_failed = False

def get_embedding(text: str) -> list[float]:
    global model, model_failed
    if model_failed:
        return get_fallback_embedding(text)
    
    if model is None:
        try:
            os.environ["OMP_NUM_THREADS"] = "1"
            from sentence_transformers import SentenceTransformer
            print("Loading SentenceTransformer model...")
            model = SentenceTransformer('all-MiniLM-L6-v2')
            print("Model loaded successfully!")
        except Exception as e:
            print(f"Memory constraint detected ({e}). Using lightweight embedder.")
            model_failed = True
            return get_fallback_embedding(text)
    
    try:
        return model.encode(text).tolist()
    except Exception:
        return get_fallback_embedding(text)

class EmbedHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'status': 'Embedding Sidecar Healthy 🚀'}).encode('utf-8'))

    def do_POST(self):
        if self.path != '/embed':
            self.send_response(404)
            self.end_headers()
            return
        
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            
            text = data.get('text', '')
            if not text:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'text field is required'}).encode('utf-8'))
                return
            
            embedding = get_embedding(text)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'embedding': embedding}).encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8001))
    server = HTTPServer(('0.0.0.0', port), EmbedHandler)
    print(f"Embedding sidecar listening on 0.0.0.0:{port} 🚀")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping embedding sidecar...")
        server.server_close()
