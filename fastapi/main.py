from fastapi import FastAPI
from routes import equipment_stock
from database import database

app = FastAPI(title="RAI Equipment Stock API")

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(equipment_stock.router)
