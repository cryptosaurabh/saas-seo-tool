from typing import Any, Optional, Dict
from fastapi.responses import JSONResponse
from pydantic import BaseModel

class StandardResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

def success_response(data: Any = None, message: str = "Request processed successfully", status_code: int = 200) -> JSONResponse:
    payload = {
        "success": True,
        "message": message,
        "data": data
    }
    return JSONResponse(status_code=status_code, content=payload)

def error_response(message: str = "An error occurred", status_code: int = 400, data: Any = None) -> JSONResponse:
    payload = {
        "success": False,
        "message": message,
        "data": data
    }
    return JSONResponse(status_code=status_code, content=payload)
