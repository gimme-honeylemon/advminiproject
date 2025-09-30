from typing import Any, Optional, List
from databases import Database
import logging
import os

# -------------------
# Database connection
# -------------------
POSTGRES_USER = "temp"
POSTGRES_PASSWORD = "temp"
POSTGRES_DB = "advcompro"
POSTGRES_HOST = "db"
POSTGRES_PORT = 5432

DATABASE_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

database = Database(DATABASE_URL)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("DATABASE")


async def connect_db() -> None:
    await database.connect()
    logger.info("Database connected")


async def disconnect_db() -> None:
    await database.disconnect()
    logger.info("Database disconnected")


# -------------------
# Table creation
# -------------------
async def init_db() -> None:
    await _create_products_table()
    await _create_users_table()
    await _create_order_detail_table()
    await _create_order_history_table()
    logger.info("Database initialized successfully.")


# ---------------- Table Creation ---------------- #
async def _create_products_table() -> None:
    query = """
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price FLOAT NOT NULL
    )
    """
    await database.execute(query=query)
    logger.info("Products table created (or already exists).")


async def _create_users_table() -> None:
    query = """
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
    """
    await database.execute(query=query)
    logger.info("Users table created (or already exists).")


async def _create_order_detail_table() -> None:
    query = """
    CREATE TABLE IF NOT EXISTS order_detail (
        order_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        status TEXT NOT NULL,
        item_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INT NOT NULL,
        total_price FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """
    await database.execute(query=query)
    logger.info("Order_detail table created (or already exists).")


async def _create_order_history_table() -> None:
    query = """
    CREATE TABLE IF NOT EXISTS order_history (
        history_id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES order_detail(order_id) ON DELETE CASCADE,
        user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        status TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """
    await database.execute(query=query)
    logger.info("Order_history table created (or already exists).")

