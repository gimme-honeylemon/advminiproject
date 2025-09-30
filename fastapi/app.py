from fastapi import FastAPI, HTTPException
from database import *
from routes.products import router as products_router
from routes.users import router as users_router
from routes.order_detail import router as detail_router
from routes.order_history import router as history_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True, 
        allow_methods=["*"],     
        allow_headers=["*"],    
    )

app.include_router(products_router)
app.include_router(users_router)
app.include_router(detail_router)
app.include_router(history_router)

@app.on_event("startup")
async def startup():
    await connect_db()
    await init_db()
    print("Database started")

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()
    print("Database disconnected")
