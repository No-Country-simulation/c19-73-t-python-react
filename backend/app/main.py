from fastapi import FastAPI, Depends, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routes import route_user, route_seller, route_store, route_administrator
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.models.user import UserCreate, UserLogin
from app.controllers import user_controller, auth_controller
from app.db.db_conexion import get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# empoint para registrar un usuario.
@app.post("/register_user")
async def post_register_user(user: UserCreate,  db: any = Depends(get_db)):
    return user_controller.create_user(user, db)

@app.post("/login")
async def post_login(user_login: UserLogin, response: Response, db: any = Depends(get_db)):
    token_data = auth_controller.authenticate_user(user_login, db)
    response.set_cookie(
        key="access_token", 
        value=f"Bearer {token_data['access_token']}",
        httponly=True, 
        samesite='Lax'
    )
    return token_data

# empoint para ver tiendas.
@app.get("/see_stores")
async def get_see_stores():
    pass

# empoint para aver productos.
@app.get("/see_products")
async def get_see_products():
    pass

# rutas protegidas que contienen empoints que seran usason solo si el usuario inicio sesion
app.include_router(route_user.router, tags=["User"])
app.include_router(route_seller.router, tags=["Seller (User)"])
app.include_router(route_store.router, tags=["Store"])
app.include_router(route_administrator.router, tags=["Administrator (User)"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
