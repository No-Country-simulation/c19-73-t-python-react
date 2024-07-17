from pydantic import BaseModel

class UserBase(BaseModel):
    nombre: str
    telefono: str
    direccion: str
    correo: str

class UserCreate(UserBase):
    contrasenna: str

class User(UserBase):
    id_usuario: int
    rol_id: int
