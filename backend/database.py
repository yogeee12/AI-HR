import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client.get_default_database()

companies_collections = db["companies"]
candidates_collections = db["candidates"]
interview_collections = db["inetrview"]
accounts_collections = db["accounts"]