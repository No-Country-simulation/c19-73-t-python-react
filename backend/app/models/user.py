from pydantic import BaseModel

class User(BaseModel):
    name_user: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str
