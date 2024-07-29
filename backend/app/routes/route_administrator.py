from fastapi import APIRouter, Depends, HTTPException, status
from app.auth.auth import get_current_user
from app.db.db_conexion import get_db
from app.models.category import CategoriaProductoCreate
from app.models.store import StoreStateUpdate
from app.models.user import User
from app.models.notification import NotificationSellerCreate
from app.controllers.category_controller import create_category
from app.controllers.store_controller import update_store_state
from app.controllers.product_controller import delete_product
from app.controllers.administrator_controller import delete_store_admin, notify_seller, get_all_users
from typing import List

router = APIRouter()

# Empoint para crear categorias para los productos.
@router.post("/create_categories_products")
async def create_categories_products(category: CategoriaProductoCreate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return create_category(category, current_user, db)

# Empoint para ver a todos los usuarios registrados.
@router.get("/see_all_users", summary="Get All Users", response_model=List[User])
def get_all_users_endpoint(db: any = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Verificamos que el usuario actual tenga el rol de administrador (suponiendo rol_id = 1 es admin)
    if current_user['rol_id'] != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    return get_all_users(db)

# Empoint para actualizar el rol de un usuraio.
@router.put("/update_rol_user")
async def put_update_rol_user():
    pass

# Empoint para actualizar estado de la tienda tienda.
@router.put("/update_state_store/{id_tienda}")
async def update_state_store(id_tienda: int, state_update: StoreStateUpdate, db: any = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user["rol_id"] != 1: # Solo los administradores puedes usar este empoint
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update store state")
    return update_store_state(id_tienda, state_update, db)

# Endpoint para eliminar un producto
@router.delete("/delete_product/{product_id}")
async def delete_product_endpoint(product_id: int, db: any = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if current_user['rol_id'] != 1:  # Verificar si el usuario es admin
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete products")
    return delete_product(product_id, db)

# Endpoint para eliminar una tienda
@router.delete("/delete_store/{store_id}")
async def delete_store(store_id: int, db: any = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if current_user["rol_id"] != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete store")
    return delete_store_admin(store_id, db)

# empoint para notificar al usuario vendedor.
@router.post("/notification_for_sellers/{user_id}", summary="Notify Seller Endpoint")
def notify_seller_endpoint(user_id: int, notification: NotificationSellerCreate, db: any = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Verificamos que el usuario actual tenga el rol de administrador (suponiendo rol_id = 1 es admin)
    if current_user['rol_id'] != 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    return notify_seller(notification, db, user_id)