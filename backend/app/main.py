from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.routes import route_user, route_seller, route_store, route_administrator
from app.models.user import UserCreate
from app.controllers import user_controller
from app.db.db_conexion import get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# empoint para registrar un usuario.
@app.post("/register_user")
async def post_register_user(user: UserCreate,  db: any = Depends(get_db)):
    return user_controller.create_user(user, db)

# empoint para iniciar sesion.
@app.post("/login")
async def post_login():
    pass

# empoint para ver tiendas.
@app.get("/see_stores")
async def get_see_stores():
    pass

# empoint para aver productos.
@app.get("/see_products")
async def get_see_products():
    pass

# rutas protegidas que contienen empoints que seran usason solo si el usuario inicio sesion
app.include_router(route_user.router, prefix="/user", tags=["User"])
app.include_router(route_seller.router, prefix="/seller", tags=["Seller (User)"])
app.include_router(route_store.router, prefix="/store", tags=["Store"])
app.include_router(route_administrator.router, prefix="/administrator", tags=["Administrator (User)"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
