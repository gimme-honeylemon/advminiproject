import logging
from fastapi import APIRouter, HTTPException, Depends
from queries.order_detail import *
from pydantic import BaseModel
from typing import List
from datetime import datetime
from auth.auth import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("order_routes")


# ---------------- Models ---------------- #
class Order(BaseModel):
    order_id: int
    user_id: int
    status: str
    item_id: int
    quantity: int
    total_price: float
    created_at: datetime


class OrderCreate(BaseModel):
    status: str
    item_id: int
    quantity: int
    total_price: float


# ---------------- Routes ---------------- #

# Add order (authenticated)
@router.post("/", response_model=Order)
async def add_order(new_order: OrderCreate):
    result = await insert_order(
        user_id=1,
        status=new_order.status,
        item_id=new_order.item_id,
        quantity=new_order.quantity,
        total_price=new_order.total_price,
    )
    if result is None:
        raise HTTPException(status_code=400, detail="Order not created")
    logger.info(f"Order created: {result}")
    return result


# Get all orders
@router.get("/", response_model=List[Order])
async def get_orders():
    logger.info("Fetching all orders")
    return await get_all_orders()


# Get single order by ID
@router.get("/{order_id}", response_model=Order)
async def get_order_by_id(order_id: int):
    result = await get_order(order_id)
    if result is None:
        logger.warning(f"Order with ID {order_id} not found")
        raise HTTPException(status_code=404, detail="Order not found")
    logger.info(f"Order fetched: {result}")
    return result
