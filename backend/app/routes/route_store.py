from fastapi import APIRouter, Depends
from app.auth.auth import get_current_user
from app.db.db_conexion import get_db
from app.models.store import StoreUpdate
from app.models.product import ProductCreate, ProductUpdate
from app.controllers.store_controller import update_store
from app.controllers.product_controller import create_product, update_product, delete_product_store_seller

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
@router.get("/see_orders_store")
async def get_see_orders_store():
    pass

# empoint para actualizar estado del pedido
@router.put("/update_state_orders")
async def put_update_state_orders():
    pass
