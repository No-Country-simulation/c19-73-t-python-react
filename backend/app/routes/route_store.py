from fastapi import APIRouter

router = APIRouter()

# empoint para actualizar perfil de tienda.
@router.put("/update_profile_store")
async def put_update_profile_store():
    pass

# empoint para crear productos de la tienda.
@router.post("/create_product_store")
async def post_create_product_store():
    pass

# empoint para actualizar productos de la tienda.
@router.put("/update_product_store")
async def put_update_product_store():
    pass

# empoint para eliminar productos de la tienda.
@router.delete("/delete_product_store")
async def delete_delete_product_store():
    pass

# empoint para ver solo productos de la tienda.
@router.get("/see_products_store")
async def get_see_products_store():
    pass

# empoint para ver pedidos de la tienda
@router.get("/see_orders_store")
async def get_see_orders_store():
    pass

# empoint para actualizar estado del pedido
@router.put("/see_orders_store")
async def put_see_orders_store():
    pass
