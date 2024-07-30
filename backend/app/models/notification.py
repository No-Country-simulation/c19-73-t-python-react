from pydantic import BaseModel

class Notification(BaseModel):
    id_notificacion: int
    id_usuario: int
    asunto: str
    mensaje: str

class NotificationSellerCreate(BaseModel):
    asunto: str
    mensaje: str

