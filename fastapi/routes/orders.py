from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, conint, condecimal
from typing import List, Optional
from database import database

router = APIRouter(tags=["orders"])


class OrderItemIn(BaseModel):
    item_name: str
    unit_price: condecimal(max_digits=10, decimal_places=2)
    quantity: conint(ge=1)


class OrderCreate(BaseModel):
    items: List[OrderItemIn]


class OrderOut(BaseModel):
    order_id: int
    total_amount: condecimal(max_digits=10, decimal_places=2)
    status: str
    created_at: str


class OrderItemOut(BaseModel):
    item_id: int
    order_id: int
    item_name: str
    unit_price: condecimal(max_digits=10, decimal_places=2)
    quantity: int
    line_total: condecimal(max_digits=10, decimal_places=2)


@router.post("/orders", response_model=OrderOut)
async def create_order(payload: OrderCreate):
    if not payload.items:
        raise HTTPException(status_code=400, detail="Order items required")

    # Create order base row
    create_order_query = """
        INSERT INTO orders (total_amount, status)
        VALUES (0, 'pending')
        RETURNING order_id, total_amount, status, created_at
    """
    order = await database.fetch_one(create_order_query)
    order_id = order["order_id"]

    # Insert order items
    insert_item_query = """
        INSERT INTO order_items (order_id, item_name, unit_price, quantity)
        VALUES (:order_id, :item_name, :unit_price, :quantity)
        RETURNING item_id
    """
    total_amount = 0
    for item in payload.items:
        values = {
            "order_id": order_id,
            "item_name": item.item_name,
            "unit_price": str(item.unit_price),
            "quantity": item.quantity,
        }
        await database.fetch_one(insert_item_query, values)
        total_amount += float(item.unit_price) * item.quantity

    # Update order total
    update_total_query = """
        UPDATE orders SET total_amount = :total WHERE order_id = :order_id
        RETURNING order_id, total_amount, status, created_at
    """
    updated = await database.fetch_one(update_total_query, {"total": total_amount, "order_id": order_id})
    return updated


@router.get("/orders", response_model=List[OrderOut])
async def list_orders():
    query = "SELECT order_id, total_amount, status, created_at FROM orders ORDER BY order_id DESC"
    return await database.fetch_all(query)


@router.get("/orders/{order_id}", response_model=OrderOut)
async def get_order(order_id: int):
    query = """
        SELECT order_id, total_amount, status, created_at
        FROM orders WHERE order_id = :order_id
    """
    order = await database.fetch_one(query, {"order_id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


class OrderStatusUpdate(BaseModel):
    status: str


@router.put("/orders/{order_id}", response_model=OrderOut)
async def update_order_status(order_id: int, payload: OrderStatusUpdate):
    query = """
        UPDATE orders SET status = :status
        WHERE order_id = :order_id
        RETURNING order_id, total_amount, status, created_at
    """
    updated = await database.fetch_one(query, {"status": payload.status, "order_id": order_id})
    if not updated:
        raise HTTPException(status_code=404, detail="Order not found")
    return updated


@router.delete("/orders/{order_id}")
async def delete_order(order_id: int):
    # Delete will cascade to items
    query = "DELETE FROM orders WHERE order_id = :order_id"
    await database.execute(query, {"order_id": order_id})
    return {"message": f"Order {order_id} deleted"}


