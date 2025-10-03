from database import database

# ---------------- Insert ---------------- #
async def insert_product(product: str, quantity: int, price: float):
    query = """
    INSERT INTO products (product, quantity, price)
    VALUES (:product, :quantity, :price)
    RETURNING id, product, quantity, price
    """
    values = {"product": product, "quantity": quantity, "price": price}
    return await database.fetch_one(query=query, values=values)


# ---------------- Get All ---------------- #
async def get_all_products():
    query = "SELECT id, product, quantity, price FROM products"
    # return await database.fetch_all(query=query)


# ---------------- Get by ID ---------------- #
async def get_product(product_id: int):
    query = """
    SELECT id, product, quantity, price
    FROM products
    WHERE id = :product_id
    """
    values = {"product_id": product_id}
    return await database.fetch_one(query=query, values=values)


# ---------------- Update ---------------- #
async def update_product(product_id: int, product: str, quantity: int, price: float):
    query = """
    UPDATE products
    SET product = :product,
        quantity = :quantity,
        price = :price
    WHERE id = :product_id
    RETURNING id, product, quantity, price
    """
    values = {"product_id": product_id, "product": product, "quantity": quantity, "price": price}
    return await database.fetch_one(query=query, values=values)


# ---------------- Delete ---------------- #
async def delete_product(product_id: int):
    query = """
    DELETE FROM products
    WHERE id = :product_id
    RETURNING id
    """
    values = {"product_id": product_id}
    return await database.fetch_one(query=query, values=values)
