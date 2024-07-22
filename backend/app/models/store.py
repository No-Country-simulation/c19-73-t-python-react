from pydantic import BaseModel

class StoreCreate(BaseModel):
    nombre_tienda: str
    logo_tienda: str
    descripcion: str
    nombre_banco: str
    tipo_cuenta_bancaria: str
    numero_de_cuenta: str
    cci: str
