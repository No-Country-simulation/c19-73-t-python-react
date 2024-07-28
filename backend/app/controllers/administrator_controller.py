# administrator_controller.py
from fastapi import HTTPException, status
from mysql.connector import Error

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