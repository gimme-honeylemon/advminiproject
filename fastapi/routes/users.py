import logging
from fastapi import APIRouter, HTTPException, status, Depends
from queries.users import (
    insert_user,
    get_user_by_username,
    delete_user,
)
from pydantic import BaseModel, EmailStr
from typing import Optional
from auth.auth import verify_password, create_access_token, get_current_user

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


class UserLogin(BaseModel):
    username: str
    password: str
    remember_me: Optional[bool] = False


class UserOut(BaseModel):
    user_id: int
    name: str
    email: EmailStr


# ---------------- Routes ---------------- #
# Sign up
@router.post("/register", response_model=UserOut)
async def signup_route(new_user: UserCreate):
    logger.info("Signing up new user")
    result = await insert_user(
        name=new_user.name,
        email=new_user.email,
        password_hash=new_user.password_hash,  # stored as plain text
    )
    if result is None:
        logger.warning("User not created")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User not created"
        )
    logger.info(f"User created: {result}")
    return result


# Sign in
# @router.post("/signin")
# async def signin_route(user: UserLogin):
#     logger.info("Signing in...")
#     user_data = await get_user_by_username(user.username)
#     if not user_data:
#         logger.warning("User not found")
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
#         )
#     if user.password != user_data["password_hash"]:
#         logger.warning("Invalid credentials")
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
#         )

#     logger.info(f"Login successful for {user_data['user_id']}")
#     return {"username": user_data["name"]}

# Sign-in endpoint
@router.post("/signin")
async def signin_route(user: UserLogin):
    logger.info("Signing in...")
    user_data = await get_user_by_username(user.username)
    if not user_data:
        logger.warning("User not found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )
    if not verify_password(user.password, user_data["password_hash"]):
        logger.warning("Invalid credentials")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    access_token = create_access_token(
        data={"sub": str(user_data["user_id"])}, remember_me=user.remember_me
    )
    logger.info(f"Login successful for {user_data['user_id']}")
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user_data["name"],
    }

# Delete account
@router.delete("/delete_account", response_model=UserOut)
async def delete_user_route(user_id: int):
    """
    Deletes a user by ID. 
    Currently no auth dependency, so client must provide user_id directly.
    """
    logger.info(f"Deleting user {user_id}")
    deleted_user = await delete_user(user_id)
    if not deleted_user:
        logger.warning("Failed to delete user or user not found")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to delete user or user not found",
        )
    logger.info(f"User deleted: {deleted_user}")
    return deleted_user
