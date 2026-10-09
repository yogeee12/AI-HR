from auth import create_access_token

token = create_access_token(
    account_id="test_account_123",
    role="candidate"
)

print("Generated JWT:")
print(token)