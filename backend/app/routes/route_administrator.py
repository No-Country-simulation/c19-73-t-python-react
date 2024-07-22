from fastapi import APIRouter, Depends
from app.auth.auth import get_current_user
from app.db.db_conexion import get_db
from app.models.category import CategoriaProductoCreate
from app.controllers.category_controller import create_category

router = APIRouter()

@router.post("/create_categories_products")
async def create_categories_products(category: CategoriaProductoCreate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return create_category(category, current_user, db)

# empoint para actualizar estado de la tienda tienda.
@router.put("/update_state_store")
async def put_update_state_store():
    pass

# empoint para eliminar cualquier producto.
@router.delete("/delete_product")
async def delete_delete_product():
    pass

# empoint para eliminar cualquier tienda.
@router.delete("/delete_store")
async def delete_delete_store():
    pass

# empoint para notificar al usuario vendedor.
@router.post("/notify_seller_user")
async def post_notify_seller_user():
    pass