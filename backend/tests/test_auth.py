import pytest
from app.auth.security import get_password_hash, verify_password, create_access_token, decode_token

def test_password_hashing():
    password = "secret_password_123"
    hashed = get_password_hash(password)
    assert hashed != password
    assert verify_password(password, hashed) is True
    assert verify_password("wrong_password", hashed) is False

def test_jwt_token_generation_and_decoding():
    user_id = "123e4567-e89b-12d3-a456-426614174000"
    token = create_access_token(subject=user_id, claims={"org_id": "org-uuid-99"})
    
    decoded = decode_token(token)
    assert decoded is not None
    assert decoded["sub"] == user_id
    assert decoded["org_id"] == "org-uuid-99"
    assert decoded["type"] == "access"
