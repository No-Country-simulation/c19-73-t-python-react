from fastapi import APIRouter

router = APIRouter()

# empoint para actualizar perfil de tienda.
@router.post("/create_categories_products")
async def post_create_categories_products():
    pass

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