from pydantic import BaseModel

class CategoriaProductoCreate(BaseModel):
    nombre_categoria_producto: str

class CategoriaProducto(CategoriaProductoCreate):
    id_categoria_producto: int
