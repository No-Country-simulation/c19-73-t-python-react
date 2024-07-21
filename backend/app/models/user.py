from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    nombre: str
    telefono: str
    direccion: str
    correo: EmailStr
    contrasenna: str
    rol_id: int

class UserLogin(BaseModel):
    correo: str
    contrasenna: str

class UserUpdate(BaseModel):
    nombre: str
    telefono: str
    direccion: str
    correo: EmailStr
    contrasenna: str