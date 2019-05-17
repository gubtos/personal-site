import json
import requests 

with open("/home/gustavo/projects/personal-site/architeture/data.json", "r") as f:
    data = f.read()
    json_data = json.loads(data)

for item in json_data:
    r = requests.post("http://127.0.0.1:8000/companies", json=item)
    print(r.text)