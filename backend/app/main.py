from fastapi import FastAPI
from backend.app.routes import administrator, user, seller

app = FastAPI()

@app.post("/register_user")
async def post_register_user():
    pass

@app.post("/login")
async def post_login():
    pass


# routes
app.include_router(administrator.router, prefix="/administrator", tags=["Administrator"])
app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(seller.router, prefix="/seller", tags=["Seller"])

# Start development server using Uvicorn
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8000)