from database import database
from auth.auth import hash_password
from typing import Any

# ---------------- Insert ---------------- #
async def insert_user(name: str, email: str, password_hash: str) -> dict[str, Any]:
    hashed_password = hash_password(password_hash)
    query = """
    INSERT INTO users (name, email, password_hash)
    VALUES (:name, :email, :password_hash)
    RETURNING user_id, name, email, password_hash
    """
    values = {"name": name, "email": email, "password_hash": hashed_password}
    return await database.fetch_one(query=query, values=values)


# ---------------- Get All ---------------- #
async def get_all_users():
    query = "SELECT user_id, name, email, password_hash FROM users"
    return await database.fetch_all(query=query)


# ---------------- Get by Username ---------------- #
async def get_user_by_username(username: str):
    query = """
    SELECT user_id, name, email, password_hash
    FROM users
    WHERE name = :username
    """
    values = {"username": username}
    return await database.fetch_one(query=query, values=values)


# ---------------- Update ---------------- #
async def update_user(user_id: int, name: str, email: str, password_hash: str):
    query = """
    UPDATE users
    SET name = :name,
        email = :email,
        password_hash = :password_hash
    WHERE user_id = :user_id
    RETURNING user_id, name, email, password_hash
    """
    values = {"user_id": user_id, "name": name, "email": email, "password_hash": password_hash}
    return await database.fetch_one(query=query, values=values)


# ---------------- Delete ---------------- #
async def delete_user(user_id: int):
    query = """
    DELETE FROM users
    WHERE user_id = :user_id
    RETURNING user_id
    """
    values = {"user_id": user_id}
    return await database.fetch_one(query=query, values=values)
