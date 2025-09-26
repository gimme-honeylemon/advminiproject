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
