# auth.py
from datetime import datetime, timedelta
import logging

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

# ---------------- Constants ---------------- #
SECRET_KEY = "kmitl_rai7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# ---------------- Security Setup ---------------- #
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/signin")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("AUTH")


# ---------------- Password Utilities ---------------- #
def hash_password(password: str) -> str:
    """Hash a plain password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against its hashed version."""
    return pwd_context.verify(plain_password, hashed_password)


# ---------------- JWT Utilities ---------------- #
def create_access_token(data: dict, remember_me: bool = False) -> str:
    """
    Create a JWT access token.
    - remember_me=True → token valid 30 days
    - remember_me=False → token valid 60 minutes
    """
    to_encode = data.copy()
    if remember_me:
        logger.info("Remember me enabled, setting 30-day token expiry")
        expire = datetime.utcnow() + timedelta(days=30)
    else:
        logger.info("Standard login, setting default token expiry")
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# ---------------- Current User Dependency ---------------- #
async def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    """
    Decode JWT token and return the current user's ID.
    Raises HTTPException if token is invalid or expired.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            logger.warning("Token does not contain 'sub' claim")
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError as e:
        logger.warning(f"JWT error: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")
