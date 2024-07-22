from fastapi import HTTPException, status
from app.models.store import StoreCreate

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
