import lorem
import random
import requests

categories = ["startup", "service", "fiscal", "medical technology", "ERP", "marketing", "development", "building", "tax", "food"]
opportunities = ["back-end", "front-end", "big-data", "marketing", "nursing", "engineer", "design", "musical", "advocacy", "statistic"]
cities = ["São Carlos", "Campinas", "São Paulo", "Barueri", "Rio de Janeiro", "Recife"]

companies = []

for x in range(0,15):
    name = ''.join(lorem.text().split(" ")[1:3])
    url = "https://%s.com.br"%name
    jobs = "%s/vagas/"%url
    random.shuffle(categories)
    random.shuffle(opportunities)
    random.shuffle(cities)
    x = {
        "name" : name,
        "description": ' '.join(lorem.text().split(" ")[:50]),
        "cities": cities[:2],
        "site": url,
        "jobsSite": jobs,
        "imageURL": "https://cdn-images-1.medium.com/max/800/1*s5LVdcugM62xzSvGUpTLWA.png",
        "categories": categories[:2],
        "opportunities": opportunities[:3],
        "fundation": random.randint(2005, 2019)
    }
    r = requests.post("http://127.0.0.1:8000/companies", json=x)
    print(r.text)