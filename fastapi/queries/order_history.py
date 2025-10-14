from database import database
from datetime import datetime

# ---------------- Insert ---------------- #
async def insert_order_history(order_id: int, user_id: int, status: str, timestamp: datetime):
    query = """
    INSERT INTO order_history (order_id, user_id, status, timestamp)
    VALUES (:order_id, :user_id, :status, :timestamp)
    RETURNING history_id, order_id, user_id, status, timestamp
    """
    values = {
        "order_id": order_id,
        "user_id": user_id,
        "status": status,
        "timestamp": timestamp
    }
    return await database.fetch_one(query=query, values=values)


# ---------------- Get All ---------------- #
async def get_all_order_history():
    query = """
    SELECT history_id, order_id, user_id, status, timestamp
    FROM order_history
    """
    return await database.fetch_all(query=query)


# ---------------- Get by Order ID ---------------- #
async def get_history_by_order(order_id: int):
    query = """
    SELECT history_id, order_id, user_id, status, timestamp
    FROM order_history
    WHERE order_id = :order_id
    """
    values = {"order_id": order_id}
    return await database.fetch_all(query=query, values=values)
