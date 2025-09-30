import logging
from fastapi import APIRouter, HTTPException
from queries.users import *
from pydantic import BaseModel, EmailStr
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("user_routes")


# ---------------- Models ---------------- #
class User(BaseModel):
    user_id: int
    name: str
    email: EmailStr
    password_hash: str


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password_hash: str


# ---------------- Routes ---------------- #

# Add user
@router.post("/", response_model=User)
async def add_user(new_user: UserCreate):
    result = await insert_user(
        name=new_user.name,
        email=new_user.email,
        password_hash=new_user.password_hash,
    )
    if result is None:
        raise HTTPException(status_code=400, detail="User not created")
    logger.info(f"User created: {result}")
    return result


# Get all users
@router.get("/", response_model=List[User])
async def get_users():
    logger.info("Fetching all users")
    return await get_all_users()


# Get single user by ID
@router.get("/{user_id}", response_model=User)
async def get_user(user_id: int):
    result = await query_get_user(user_id)
    if result is None:
        logger.warning(f"User with ID {user_id} not found")
        raise HTTPException(status_code=404, detail="User not found")
    logger.info(f"User fetched: {result}")
    return result
