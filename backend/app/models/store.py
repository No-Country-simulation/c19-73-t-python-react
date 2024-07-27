from pydantic import BaseModel
from typing import Optional

class StoreCreate(BaseModel):
    nombre_tienda: str
    logo_tienda: str
    descripcion: str
    nombre_banco: str
    tipo_cuenta_bancaria: str
    numero_de_cuenta: str
    cci: str

class StoreUpdate(BaseModel):
    nombre_tienda: Optional[str]
    logo_tienda: Optional[str]
    descripcion: Optional[str]
    nombre_banco: Optional[str]
    tipo_cuenta_bancaria: Optional[str]
    numero_de_cuenta: Optional[str]
    cci: Optional[str]


class StoreStateUpdate(BaseModel):
    id_estado_tienda: int