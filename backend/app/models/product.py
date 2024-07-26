from pydantic import BaseModel
from typing import List, Optional

class ProductoCreate(BaseModel):
    id_tienda: int
    id_categoria_producto: int
    nombre_producto: str
    descripcion_producto: str
    ruta_foto_principal: str
    precio: float
    stock: int

class Producto(ProductoCreate):
    id_producto: int

class ProductoUpdate(BaseModel):
    id_producto: int
    nombre_producto: str
    descripcion_producto: str
    ruta_foto_principal: str
    precio: float
    stock: int

class SeeProduct(BaseModel):
    id_producto: int
    id_tienda: int
    id_categoria_producto: int
    nombre_producto: str
    descripcion_producto: Optional[str]
    ruta_foto_principal: Optional[str]
    precio: float
    stock: int

