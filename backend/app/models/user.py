from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    nombre: str
    telefono: str
    direccion: str
    correo: str
    rol_id: int

class UserCreate(UserBase):
    contrasenna: str

class User(UserBase):
    id_usuario: int
    rol_id: int

class UserUpdate(BaseModel):
    nombre: Optional[str]
    telefono: Optional[str]
    direccion: Optional[str]
    correo: Optional[EmailStr]
    contrasenna: Optional[str]