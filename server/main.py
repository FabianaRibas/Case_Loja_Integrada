from datetime import timedelta

from passlib.context import CryptContext
from models.models import Token, User, UserInUserDB, UserPassword
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth.auth import Auth
from fastapi.middleware.cors import CORSMiddleware

SECRET_KEY = "c370fd8cdee474d1f9a567e84bd0a917cd13d59ad413fd7b9eb32ed1c0dea2a9"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1
PWD_CONTEXT = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


FAKE_USERS_DB = {
    "lojaintegrada@email.com": {
        "username": "Loja_Integrada",
        "full_name": "Loja Integrada",
        "email": "lojaintegrada@email.com",
        "hashed_password": "fake123*",
        "is_active": True,
    }
}

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
auth = Auth(SECRET_KEY=SECRET_KEY, ALGORITHM=ALGORITHM,
            ACCESS_TOKEN_EXPIRE_MINUTES=ACCESS_TOKEN_EXPIRE_MINUTES,
            PWD_CONTEXT=PWD_CONTEXT,
            DB=FAKE_USERS_DB,
            )


@ app.get("/")
def root():
    return {"message": "Loja Integrada Challenge FastAPI "}


@ app.post("/login", response_model=Token)
def login_for_access_token(form_data: UserPassword):
    user = auth.authenticate_user(
        FAKE_USERS_DB, form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/home")
def home(token: str = Depends(oauth2_scheme)):

    user = auth.get_current_user(token=token)

    if user.is_active:
        return {"detail": "usuário logado"}

    return user
