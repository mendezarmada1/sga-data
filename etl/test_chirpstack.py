import os
import requests
import json
from dotenv import load_dotenv
import urllib3

# Suppress insecure request warnings for diagnostics
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load environment variables
load_dotenv()

BASE_URL = os.getenv('CHIRPSTACK_URL') # https://lora.sgadata.com
USER = os.getenv('CHIRPSTACK_USER')
PASS = os.getenv('CHIRPSTACK_PASS')

def probe(url, name):
    print(f"\n--- Probing {name}: {url} ---")
    try:
        r = requests.get(url, verify=False, timeout=5)
        print(f"Status: {r.status_code}")
        print(f"Content-Type: {r.headers.get('Content-Type')}")
        print(f"Snippet: {r.text[:100].strip()}")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

def try_login(base_url):
    login_url = f"{base_url}/api/internal/login"
    print(f"\nTrying login at: {login_url}")
    try:
        r = requests.post(login_url, json={"email": USER, "password": PASS}, verify=False, timeout=5)
        print(f"Status: {r.status_code}")
        if r.status_code == 200:
            print("[SUCCESS] Login OK!")
            return True
        else:
            print(f"Failed: {r.text[:200]}")
            return False
    except Exception as e:
        print(f"Login Error: {e}")
        return False

if __name__ == "__main__":
    print(f"Base URL from env: {BASE_URL}")
    
    # 1. Probe Base URL
    probe(BASE_URL, "Base URL")
    
    # 2. Probe with Port 8080 (Common for ChirpStack)
    # Use http for 8080 usually unless configured with ssl
    url_8080 = BASE_URL.replace("https://", "http://").replace("http://", "http://") + ":8080"
    if BASE_URL.endswith("/"): url_8080 = BASE_URL[:-1].replace("https://", "http://") + ":8080"
    
    probe(url_8080, "Base URL + Port 8080")

    # 3. Try Login on Base URL
    if not try_login(BASE_URL):
        # 4. Try Login on Port 8080
        try_login(url_8080)
