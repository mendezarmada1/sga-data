import requests
import os

def test_upload():
    url = 'http://localhost:8000/unify'
    
    # Files to upload
    csv_path = 'data/clientes_mock.csv'
    xlsx_path = 'data/lecturas_mock.xlsx'
    
    if not os.path.exists(csv_path) or not os.path.exists(xlsx_path):
        print("Error: Mock data files not found. Run generate_mock_data.py first.")
        return

    files = {
        'csv_file': ('clientes.csv', open(csv_path, 'rb'), 'text/csv'),
        'xlsx_file': ('lecturas.xlsx', open(xlsx_path, 'rb'), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    }
    
    print(f"Sending request to {url}...")
    try:
        response = requests.post(url, files=files)
        
        if response.status_code == 200:
            print("Success! Downloaded file.")
            with open('data/test_result.xlsx', 'wb') as f:
                f.write(response.content)
            print("Saved response to data/test_result.xlsx")
        else:
            print(f"Failed. Status: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_upload()
