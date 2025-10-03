from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
import logging
from queries import menu  # import menu queries here

router = APIRouter(prefix="/menu", tags=["Menu"])
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("menu_routes")


# ---------------- Pydantic Schemas ---------------- #
class MenuItem(BaseModel):
    id: int
    product: str
    price: float


class MenuItemCreate(BaseModel):
    product: str
    price: float


class MenuItemUpdate(BaseModel):
    product: str
    price: float


# ---------------- Routes ---------------- #

# Create menu item
@router.post("/", response_model=MenuItem)
async def create_menu_item(item: MenuItemCreate):
    result = await menu.insert_menu(item.product, item.price)
    if result is None:
        raise HTTPException(status_code=400, detail="Menu item not created")
    logger.info(f"Menu item created: {result}")
    return dict(result)


# Get all menu items
@router.get("/", response_model=List[MenuItem])
async def list_menu_items():
    records = await menu.get_all_menu()
    return [dict(r) for r in records]


# Get single menu item by ID
@router.get("/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: int):
    record = await menu.get_menu(item_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return dict(record)


# Update menu item
@router.put("/{item_id}", response_model=MenuItem)
async def update_menu_item(item_id: int, item: MenuItemUpdate):
    record = await menu.update_menu(item_id, item.product, item.price)
    if record is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    logger.info(f"Menu item updated: {record}")
    return dict(record)


# Delete menu item
@router.delete("/{item_id}", response_model=MenuItem)
async def delete_menu_item(item_id: int):
    record = await menu.delete_menu(item_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    logger.info(f"Menu item deleted: {record}")
    return dict(record)
