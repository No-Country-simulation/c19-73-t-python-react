from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import route_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def read_root():
    return {"Welcome to the API Marketplace Artesanias"}

@app.post("/register_user")
async def post_register_user():
    pass

@app.post("/login")
async def post_login():
    pass

# routes
app.include_router(route_user.router, prefix="/user", tags=["User"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
