from fastapi import APIRouter

router = APIRouter()

# empoint para crear una tienda.
@router.post("/create_store")
async def post_create_store():
    pass

# empoint para ver notificaciones del usurio vendedor.
@router.get("/see_notifications_seller")
async def get_see_notifications_seller():
    pass