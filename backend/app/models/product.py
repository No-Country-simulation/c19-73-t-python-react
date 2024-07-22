from pydantic import BaseModel

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

