from pydantic import BaseModel

class NotificationSellerCreate(BaseModel):
    asunto: str
    mensaje: str
