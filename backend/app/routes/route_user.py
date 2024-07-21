from fastapi import APIRouter

router = APIRouter()

# empoint para actualizar perfil de usuario.
@router.put("/update_profile")
async def put_update_profile():
    pass

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

