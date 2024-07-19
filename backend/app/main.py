from fastapi import FastAPI, Depends
from app.routes import route_administrator
from app.controllers.users_controller import register_user, login
from app.models.user import UserCreate, User
from app.models.token import Token
from app.db.db_conexion import get_db
from app.routes import route_seller, route_user
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Welcome to the API Marketplace Artesanias"}

@app.post("/register_user", response_model=User)
async def post_register_user(user_in: UserCreate, db = Depends(get_db)):
    return register_user(user_in, db)

@app.post("/login", response_model=Token)
async def post_login(correo: str, contrasenna: str, db = Depends(get_db)):
    return login(correo, contrasenna, db)

# routes
app.include_router(route_administrator.router, prefix="/administrator", tags=["Administrator"])
app.include_router(route_user.router, prefix="/user", tags=["User"])
app.include_router(route_seller.router, prefix="/seller", tags=["Seller"])

# Start development server using Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000, reload=True)