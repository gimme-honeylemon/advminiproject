import logging
from fastapi import APIRouter, HTTPException
from queries.order_history import *
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/order_history", tags=["Order History"])
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("order_history_routes")


# ---------------- Models ---------------- #
class OrderHistory(BaseModel):
    history_id: int
    order_id: int
    user_id: int
    status: str
    timestamp: datetime


class OrderHistoryCreate(BaseModel):
    order_id: int
    user_id: int
    status: str


# ---------------- Routes ---------------- #

# Add order history entry
@router.post("/", response_model=OrderHistory)
async def add_order_history(new_history: OrderHistoryCreate):
    result = await insert_order_history(
        order_id=new_history.order_id,
        user_id=new_history.user_id,
        status=new_history.status,
    )
    if result is None:
        raise HTTPException(status_code=400, detail="Order history not created")
    logger.info(f"Order history created: {result}")
    return result


# Get all order history
@router.get("/", response_model=List[OrderHistory])
async def get_order_histories():
    logger.info("Fetching all order histories")
    return await get_all_order_history()


# Get history for a specific order
@router.get("/order/{order_id}", response_model=List[OrderHistory])
async def get_history(order_id: int):
    result = await get_history_by_order(order_id)
    if not result:
        logger.warning(f"No history found for order {order_id}")
        raise HTTPException(status_code=404, detail="No history found for this order")
    logger.info(f"History fetched for order {order_id}")
    return result
