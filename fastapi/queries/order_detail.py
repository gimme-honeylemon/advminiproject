from database import database

# ---------------- Insert ---------------- #
async def insert_order(user_id: int, status: str, item_id: int, quantity: int, total_price: float):
    query = """
    INSERT INTO order_detail (user_id, status, item_id, quantity, total_price)
    VALUES (:user_id, :status, :item_id, :quantity, :total_price)
    RETURNING order_id, user_id, status, item_id, quantity, total_price, created_at
    """
    values = {
        "user_id": user_id,
        "status": status,
        "item_id": item_id,
        "quantity": quantity,
        "total_price": total_price,
    }
    return await database.fetch_one(query=query, values=values)


# ---------------- Get All ---------------- #
async def get_all_orders():
    query = """
    SELECT order_id, user_id, status, item_id, quantity, total_price, created_at
    FROM order_detail
    """
    return await database.fetch_all(query=query)


# ---------------- Get by ID ---------------- #
async def get_order(order_id: int):
    query = """
    SELECT order_id, user_id, status, item_id, quantity, total_price, created_at
    FROM order_detail
    WHERE order_id = :order_id
    """
    values = {"order_id": order_id}
    return await database.fetch_one(query=query, values=values)


# ---------------- Update ---------------- #
async def update_order(order_id: int, status: str, quantity: int, total_price: float):
    query = """
    UPDATE order_detail
    SET status = :status,
        quantity = :quantity,
        total_price = :total_price
    WHERE order_id = :order_id
    RETURNING order_id, user_id, status, item_id, quantity, total_price, created_at
    """
    values = {"order_id": order_id, "status": status, "quantity": quantity, "total_price": total_price}
    return await database.fetch_one(query=query, values=values)


# ---------------- Delete ---------------- #
async def delete_order(order_id: int):
    query = """
    DELETE FROM order_detail
    WHERE order_id = :order_id
    RETURNING order_id
    """
    values = {"order_id": order_id}
    return await database.fetch_one(query=query, values=values)