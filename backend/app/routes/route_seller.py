from fastapi import APIRouter, Depends , HTTPException, status
from app.models.store import StoreCreate
from app.models.user import User
from app.auth.auth import get_current_user
from app.db.db_conexion import get_db
from app.controllers.store_controller import create_store
from app.controllers.user_controller import get_notifications

router = APIRouter()

# Ruta para crear una tienda.
@router.post("/create_store", response_model=dict)
async def post_create_store(store: StoreCreate, current_user: dict = Depends(get_current_user), db: any = Depends(get_db)):
    # Verificar si el usuario es una vendedor (seller)
    if current_user["rol_id"] != 3:  # 3 es el rol_id de para vendedores
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create a store")
    return create_store(store, current_user, db)

# empoint para ver notificaciones del usurio vendedor.
@router.get("/see_notifications/{user_id}")
def see_notifications(user_id: int, db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Validar si el usuario actual es el mismo que el del token
    if current_user["id_usuario"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view these notifications")
    # Validar si el usuario tiene el rol de "seller"
    if current_user["rol_id"] != 3:  # Suponiendo que el rol de 'seller' tiene el ID 3
        raise HTTPException(status_code=403, detail="Not authorized to view these notifications")
    # Llamar a la función para obtener las notificaciones
    return get_notifications(user_id, db)