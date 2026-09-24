import requests

url = "http://localhost:5678/webhook-test/python-test"

data = {
    "name" : "Yogesh",
    "role" : "Python Developer"
}

response = requests.post(
    url,
    json=data
)

print("STATUS:", response.status_code)

print("TEXT:")
print(response.text)

print("HEADERS:")
print(response.headers)