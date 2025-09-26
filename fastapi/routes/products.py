import logging
from fastapi import APIRouter, HTTPException
from queries.products import *
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/products", tags=["Products"])
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("product_routes")

class Product(BaseModel):
    id: int
    product: str
    quantity: int
    price: float

class ProductCreate(BaseModel):
    product: str
    quantity: int
    price: float


# ---------------- Routes ---------------- #

# Add product
@router.post("/", response_model=Product)
async def add_product(new_product: ProductCreate):
    result = await insert_product(
        product=new_product.product,
        quantity=new_product.quantity,
        price=new_product.price,
    )
    if result is None:
        raise HTTPException(status_code=400, detail="Product not created")
    logger.info(f"Product created: {result}")
    return result


# Get all products
@router.get("/", response_model=List[Product])
async def get_products():
    logger.info("Fetching all products")
    return await get_all_products()


# Get single product by ID
@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: int):
    result = await query_get_product(product_id)
    if result is None:
        logger.warning(f"Product with ID {product_id} not found")
        raise HTTPException(status_code=404, detail="Product not found")
    logger.info(f"Product fetched: {result}")
    return result
