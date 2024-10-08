from fastapi import FastAPI, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from app.routes import route_user, route_seller, route_store, route_administrator
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.models.user import UserCreate, UserLogin
from app.models.product import SeeProduct
from app.controllers import user_controller, auth_controller
from app.controllers.store_controller import see_all_stores_controller
from app.controllers.product_controller import see_all_products_controller
from app.controllers.category_controller import see_all_categories_products_controller
from app.controllers.product_controller import get_products_by_store
from app.db.db_conexion import get_db
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@app.get("/", tags=["Public"])
async def welcome():
    return {"Mensaje":"Bienvenido(a) a la API Marketplace Artesanias"}

# empoint para registrar un usuario.
@app.post("/register_user", tags=["Public"])
async def post_register_user(user: UserCreate,  db: any = Depends(get_db)):
    return user_controller.create_user(user, db)

@app.post("/login", tags=["Public"])
async def post_login(user_login: UserLogin, response: Response, db: any = Depends(get_db)):
    token_data = auth_controller.authenticate_user(user_login, db)
    response.set_cookie(
        key="access_token",
        value=f"Bearer {token_data['access_token']}",
        httponly=True,
        samesite='Lax'
    )
    return token_data

# empoint para ver todas las tiendas.
@app.get("/see_all_stores", tags=["Public"])
def see_all_stores(db: any = Depends(get_db)):
    stores = see_all_stores_controller(db)
    return stores

# empoint para ver todos los productos.
@app.get("/see_all_products", tags=["Public"])
def see_all_products(db: any = Depends(get_db)):
    products = see_all_products_controller(db)
    return products

# empoint para ver solo productos de una tienda.
@app.get("/see_products_store/{id_tienda}", tags=["Public"],response_model=List[SeeProduct])
async def see_products_store(id_tienda: int, db: any = Depends(get_db)):
    return get_products_by_store(id_tienda, db)

# empoint para ver todos los productos de una tienda.
@app.get("/see_all_categories_products", tags=["Public"])
def see_all_categories_products(db: any = Depends(get_db)):
    categories = see_all_categories_products_controller(db)
    return categories

# rutas protegidas que contienen empoints que seran usason solo si el usuario inicio sesion
app.include_router(route_user.router, tags=["User"])
app.include_router(route_seller.router, tags=["Seller (User)"])
app.include_router(route_store.router, tags=["Store"])
app.include_router(route_administrator.router, tags=["Administrator (User)"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
