from fastapi import APIRouter, Depends, HTTPException, status
from app.auth.auth import get_current_user
from app.db.db_conexion import get_db
from app.models.category import CategoriaProductoCreate
from app.models.store import StoreStateUpdate
from app.models.user import User
from app.controllers.category_controller import create_category
from app.controllers.store_controller import update_store_state

router = APIRouter()

@router.post("/create_categories_products")
async def create_categories_products(category: CategoriaProductoCreate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return create_category(category, current_user, db)

# empoint para actualizar estado de la tienda tienda.
@router.put("/update_state_store/{id_tienda}")
async def update_state_store(id_tienda: int, state_update: StoreStateUpdate, db: any = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user["rol_id"] != 1: # Solo los administradores puedes usar este empoint
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update store state")
    return update_store_state(id_tienda, state_update, db)

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