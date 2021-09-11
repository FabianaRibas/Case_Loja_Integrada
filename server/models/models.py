from typing import Optional
from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class User(BaseModel):
    username: str
    full_name: str
    email: str
    is_active: bool


class UserInUserDB(BaseModel):
    username: str
    full_name: str
    email: str
    is_active: bool
    hashed_password: str


class UserPassword(BaseModel):
    email: str
    password: str
