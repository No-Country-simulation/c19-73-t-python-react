from fastapi import APIRouter, Depends, HTTPException, status
from app.auth.auth import get_current_user
from app.db.db_conexion import get_db
from app.models.store import StoreUpdate, OrderResponse, UpdateOrderStatus
from app.models.product import ProductCreate, ProductUpdate
from app.models.user import User
from app.controllers.store_controller import update_store, get_orders_by_store, update_order_status_in_db
from app.controllers.product_controller import create_product, update_product, delete_product_store_seller
from typing import List, Dict, Any

router = APIRouter()

# empoint para actualizar perfil de tienda.
@router.put("/update_profile_store/{store_id}", response_model=dict)
async def put_update_profile_store(store_id: int, store_update: StoreUpdate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return update_store(store_update, store_id, current_user['id_usuario'], db)

# empoint para crear un producto de la tienda.
@router.post("/create_product_store")
async def create_product_store(product: ProductCreate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return create_product(product, current_user, db)

# empoint para actualizar productos de la tienda.
@router.put("/update_product_store", response_model=dict)
async def put_update_product_store(product_update: ProductUpdate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return update_product(product_update, current_user, db)

# empoint para eliminar productos de la tienda.
@router.delete("/delete_product_store/{product_id}", response_model=dict)
async def delete_product_store(product_id: int, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return delete_product_store_seller(product_id, current_user, db)

# empoint para ver pedidos de la tienda
@router.get("/see_orders_store", response_model=List[Dict])
async def get_see_store_orders(
    current_user: dict = Depends(get_current_user),
    db: any = Depends(get_db)
):
    if current_user is None or current_user.get('rol_id') != 3:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated or not authorized")
    
    store_orders = get_orders_by_store(current_user['id_usuario'], db)
    
    if not store_orders:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No orders found for this store")
    
    return store_orders

# empoint para actualizar estado del pedido
@router.put("/update_order_status")
async def update_order_status(
    order_status: UpdateOrderStatus,
    current_user: dict = Depends(get_current_user),  # Asegurar que el usuario está autenticado
    db: Any = Depends(get_db)
):
    if current_user is None or current_user['rol_id'] != 3:  # Solo usuarios con rol de vendedor pueden actualizar
        raise HTTPException(status_code=401, detail="Not authenticated or not authorized")
    try:
        result = update_order_status_in_db(db, order_status.id_pedido, order_status.id_estado_pedido)
        return result
    except Exception as e:
        print(f"Error updating order status: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")