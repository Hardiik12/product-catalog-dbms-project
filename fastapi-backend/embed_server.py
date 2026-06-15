from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import traceback
import sys

print("Loading SentenceTransformer model 'all-MiniLM-L6-v2'...")
try:
    from sentence_transformers import SentenceTransformer
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}", file=sys.stderr)
    traceback.print_exc(file=sys.stderr)
    sys.exit(1)

class EmbedHandler(BaseHTTPRequestHandler):
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
            
            embedding = model.encode(text).tolist()
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'embedding': embedding}).encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': str(e),
                'traceback': traceback.format_exc()
            }).encode('utf-8'))

    def log_message(self, format, *args):
        # Suppress logging every request to keep stdout clean
        pass

if __name__ == '__main__':
    port = 8001
    server = HTTPServer(('127.0.0.1', port), EmbedHandler)
    print(f"Embedding sidecar running on http://127.0.0.1:{port} 🚀")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping embedding sidecar...")
        server.server_close()
