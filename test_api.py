import os
import django
import urllib.request
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

endpoints = [
    '/api/products/',
    '/api/products/categories/',
    '/api/token/',
]

for ep in endpoints:
    try:
        if ep == '/api/token/':
            # POST endpoint — just check it exists
            req = urllib.request.Request(
                f'http://localhost:8000{ep}',
                data=json.dumps({"email": "", "password": ""}).encode(),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            try:
                urllib.request.urlopen(req)
            except urllib.error.HTTPError as he:
                if he.code in (400, 401):
                    print(f"OK  {ep} -> responde (status {he.code}, esperado para credenciais vazias)")
                else:
                    print(f"ERR {ep} -> status {he.code}")
        else:
            res = urllib.request.urlopen(f'http://localhost:8000{ep}')
            data = json.loads(res.read())
            print(f"OK  {ep} -> {len(data)} items")
    except Exception as e:
        print(f"ERR {ep} -> {e}")
