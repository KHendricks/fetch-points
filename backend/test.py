import requests

url = "http://localhost:3001/api/add-transaction"
data = {"payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z"}
resp = requests.post(url, json=data)
print(resp)

data = {"payer": "UNILEVER", "points": 200,
        "timestamp": "2020-10-31T11:00:00Z"}
resp = requests.post(url, json=data)
print(resp)

data = {"payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z"}
resp = requests.post(url, json=data)
print(resp)

data = {"payer": "MILLER COORS", "points": 10000,
        "timestamp": "2020-11-01T14:00:00Z"}
resp = requests.post(url, json=data)
print(resp)

data = {"payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z"}
resp = requests.post(url, json=data)
print(resp)

url = "http://localhost:3001/api/spend-points"
data = {"points": 5000}
resp = requests.post(url, json=data)
print(resp)

url = "http://localhost:3001/api/get-balances"
resp = requests.get(url)
print(resp)
