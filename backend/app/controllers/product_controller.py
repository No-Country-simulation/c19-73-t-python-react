from fastapi import HTTPException, status
from app.models.product import ProductoCreate
from app.utils.security import validate_seller_role, validate_store_ownership

def create_product(product: ProductoCreate, current_user: dict, db: any):
    validate_seller_role(current_user)
    validate_store_ownership(product.id_tienda, current_user['id_usuario'], db)

    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO productos (id_tienda, id_categoria_producto, nombre_producto, descripcion_producto, ruta_foto_principal, precio, stock)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (product.id_tienda, product.id_categoria_producto, product.nombre_producto, product.descripcion_producto, product.ruta_foto_principal, product.precio, product.stock))
        db.commit()
        return {"message": "Product created successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()
