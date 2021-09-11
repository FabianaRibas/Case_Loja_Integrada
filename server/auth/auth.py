from typing import Optional

from fastapi import Depends, HTTPException, status
from models.models import TokenData, User, UserInUserDB
from fastapi.security.oauth2 import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import timedelta, datetime
from jose import JWTError, jwt


class Auth:
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

    def __init__(self, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, PWD_CONTEXT, DB):
        self.SECRET_KEY = SECRET_KEY
        self.ALGORITHM = ALGORITHM
        self.ACCESS_TOKEN_EXPIRE_MINUTES = ACCESS_TOKEN_EXPIRE_MINUTES
        self.pwd_context = PWD_CONTEXT
        self.db = DB

    def verify_password(self, plain_password, hashed_password):
        return self.get_password_hash(plain_password) == hashed_password

    def get_password_hash(self, password):
        return f"{password}*"

    def get_user(self, db, email: str):
        if email in db:
            user_dict = db[email]
            return UserInUserDB(**user_dict)

    def authenticate_user(self, fake_db, email: str, password: str):
        user = self.get_user(fake_db, email)
        if not user:
            return False
        if not self.verify_password(password, user.hashed_password):
            return False
        return user

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        return encoded_jwt

    def get_current_user(self, token: str):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

        try:
            payload = jwt.decode(token, self.SECRET_KEY,
                                 algorithms=[self.ALGORITHM])

            email: str = payload.get("sub")
            if email is None:
                raise credentials_exception
            token_data = TokenData(email=email)
        except JWTError:
            raise credentials_exception
        user = self.get_user(self.db, email=token_data.email)
        if user is None:
            raise credentials_exception
        return user

    async def get_current_active_user(self, current_user: User = Depends(get_current_user)):
        if current_user.is_active:
            raise HTTPException(status_code=400, detail="Inactive user")
        return current_user
