from database import database

# ---------------- Insert ---------------- #
async def insert_menu(product: str, price: float):
    query = """
    INSERT INTO menu (product, price)
    VALUES (:product, :price)
    RETURNING id, product, price
    """
    values = {"product": product, "price": price}
    return await database.fetch_one(query=query, values=values)


# ---------------- Get All ---------------- #
async def get_all_menu():
    query = "SELECT id, product, price FROM menu"
    return await database.fetch_all(query=query)


# ---------------- Get by ID ---------------- #
async def get_menu(item_id: int):
    query = """
    SELECT id, product, price
    FROM menu
    WHERE id = :item_id
    """
    values = {"item_id": item_id}
    return await database.fetch_one(query=query, values=values)


# ---------------- Update ---------------- #
async def update_menu(item_id: int, product: str, price: float):
    query = """
    UPDATE menu
    SET product = :product,
        price = :price
    WHERE id = :item_id
    RETURNING id, product, price
    """
    values = {"item_id": item_id, "product": product, "price": price}
    return await database.fetch_one(query=query, values=values)


# ---------------- Delete ---------------- #
async def delete_menu(item_id: int):
    query = """
    DELETE FROM menu
    WHERE id = :item_id
    RETURNING id, product, price
    """
    values = {"item_id": item_id}
    return await database.fetch_one(query=query, values=values)
