from fastapi import HTTPException, status
from app.models.notification import NotificationSellerCreate
from app.models.user import User
from typing import List
from mysql.connector import Error

def get_all_users(db) -> List[User]:
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM usuarios")
        users = cursor.fetchall()
        return users
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()


def delete_store_admin(store_id: int, db):
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM tiendas WHERE id_tienda = %s", (store_id,))
        db.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Store not found")
        return {"detail": "Store deleted successfully"}
    except Error as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()

def notify_seller(notification: NotificationSellerCreate, db, user_id: int):
    cursor = db.cursor(dictionary=True)
    
    try:
        # Verificamos que el usuario con el id proporcionado tenga el rol 'seller'
        cursor.execute("SELECT id_usuario FROM usuarios WHERE id_usuario = %s AND rol_id = 3", (user_id,))
        seller = cursor.fetchone()
        
        if not seller:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Seller not found or not authorized")
        
        # Insertar una notificación para el vendedor específico
        cursor.execute(
            "INSERT INTO notificaciones (id_usuario, asunto, mensaje) VALUES (%s, %s, %s)",
            (seller['id_usuario'], notification.asunto, notification.mensaje)
        )
        
        db.commit()
        return {"message": "Notification sent successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()
