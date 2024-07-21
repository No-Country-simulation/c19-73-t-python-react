from fastapi import APIRouter, Depends
from app.auth.auth import get_current_user
from app.models.user import UserUpdate
from app.db.db_conexion import get_db
from app.controllers.user_controller import update_user

router = APIRouter()

# Endpoint para actualizar perfil de usuario
@router.put("/update_profile", response_model=dict)
async def update_profile(user_update: UserUpdate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    return update_user(user_update, current_user, db)

# empoint para crear pedidos.
@router.post("/create_orders")
async def post_create_orders():
    pass

# empoint para ver pedidos.
@router.get("/see_orders")
async def get_see_orders():
    pass

# empoint para cambiar de rol.
@router.put("/change_role")
async def put_change_role():
    pass

# empoint para ver notificaciones.
@router.get("/see_notifications_user")
async def get_see_notifications_user():
    pass

