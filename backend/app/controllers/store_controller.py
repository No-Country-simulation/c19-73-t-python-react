from fastapi import HTTPException, status
from app.models.store import StoreCreate, StoreUpdate
from fastapi import HTTPException, status
from mysql.connector import Error

def create_store(store: StoreCreate, current_user: dict, db):
    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO tiendas (id_usuario, id_estado_tienda, nombre_tienda, logo_tienda, descripcion, nombre_banco, tipo_cuenta_bancaria, numero_de_cuenta, cci)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            current_user['id_usuario'],  # id_usuario
            3,  # id_estado_tienda (PENDIENTE POR APROBACION - POR DEFECTO)
            store.nombre_tienda,
            store.logo_tienda,
            store.descripcion,
            store.nombre_banco,
            store.tipo_cuenta_bancaria,
            store.numero_de_cuenta,
            store.cci
        ))
        
        db.commit()
        return {"message": "Store created successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()


def update_store(store_update: StoreUpdate, store_id: int, user_id: int, db):
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT * FROM tiendas WHERE id_tienda = %s AND id_usuario = %s", (store_id, user_id))
        db_store = cursor.fetchone()
        if not db_store:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No tienes permiso para actualizar esta tienda")
        
        update_query = """
            UPDATE tiendas
            SET nombre_tienda = %s, logo_tienda = %s, descripcion = %s, nombre_banco = %s, 
                tipo_cuenta_bancaria = %s, numero_de_cuenta = %s, cci = %s
            WHERE id_tienda = %s AND id_usuario = %s
        """
        update_values = (
            store_update.nombre_tienda or db_store['nombre_tienda'],
            store_update.logo_tienda or db_store['logo_tienda'],
            store_update.descripcion or db_store['descripcion'],
            store_update.nombre_banco or db_store['nombre_banco'],
            store_update.tipo_cuenta_bancaria or db_store['tipo_cuenta_bancaria'],
            store_update.numero_de_cuenta or db_store['numero_de_cuenta'],
            store_update.cci or db_store['cci'],
            store_id,
            user_id
        )
        cursor.execute(update_query, update_values)
        db.commit()

        return {"message": "Store updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()

