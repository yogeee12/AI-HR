from jose import jwt
from datetime import datetime, timedelta, timezone
import os

# JWT settings
SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "dev-only-change-this-secret-key"
)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Create a token for a logged-in account
def create_access_token(account_id: str, role: str):

    # Calculate the expiration time
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # Information stored inside the token
    payload = {
        "sub": account_id,
        "role": role,
        "exp": expire
    }

    # Sign the token
    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token