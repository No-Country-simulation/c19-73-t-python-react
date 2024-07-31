from fastapi import APIRouter, Depends, HTTPException, status
from app.auth.auth import get_current_user
from app.models.user import UserUpdate, UserRoleUpdate
from app.models.store import CreateOrderRequest, OrderResponse
from app.db.db_conexion import get_db
from app.controllers.user_controller import update_user, update_user_role
from app.controllers.store_controller import get_product_store, get_product_price, create_order, get_user_orders
from typing import List

router = APIRouter()

# Endpoint para actualizar perfil de usuario
@router.put("/update_profile", response_model=dict)
async def update_profile(user_update: UserUpdate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return update_user(user_update, current_user, db)

# empoint para crear pedidos.
@router.post("/create_orders")
def create_orders(request: CreateOrderRequest, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    id_usuario = current_user['id_usuario']
    for producto in request.productos:
        id_tienda = get_product_store(db, producto.id_producto)
        total = producto.cantidad * get_product_price(db, producto.id_producto)
        create_order(db, id_usuario, id_tienda, producto.id_producto, producto.cantidad, total)
    
    return {"message": "Pedidos creados exitosamente"}

# empoint para ver pedidos.
@router.get("/see_orders", response_model=List[OrderResponse])
def see_orders(current_user: dict = Depends(get_current_user), db: any= Depends(get_db)):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return get_user_orders(current_user['id_usuario'], db)

# Nueva ruta para cambiar el rol del usuario.
@router.put("/change_role", response_model=dict)
async def change_role(role_update: UserRoleUpdate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return update_user_role(role_update, current_user, db)


