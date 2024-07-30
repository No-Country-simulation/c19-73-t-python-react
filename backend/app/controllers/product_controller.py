from fastapi import HTTPException, status
from app.models.product import ProductCreate, ProductUpdate, SeeProduct
from app.utils.security import validate_seller_role, validate_store_ownership
from app.utils.save_image import save_image_as_webp
from typing import Dict, Any
from mysql.connector import Error

def create_product(product: ProductCreate, current_user: dict, db: any):
    validate_seller_role(current_user)
    validate_store_ownership(product.id_tienda, current_user['id_usuario'], db)

    cursor = db.cursor(dictionary=True)

    # Verificar el estado de la tienda
    cursor.execute("SELECT id_estado_tienda FROM tiendas WHERE id_tienda = %s AND id_usuario = %s", (product.id_tienda, current_user['id_usuario']))
    tienda = cursor.fetchone()
    if not tienda:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Store not found")

    if tienda['id_estado_tienda'] != 1:  # 1 significa "Activo"
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Store is not active. Cannot create products.")
    
    # Guardamos la foto principal del producto en un directorio
    path = "uploads/store/product"
    path_foto_principal = save_image_as_webp(product.ruta_foto_principal, path)

    try:
        cursor.execute("""
            INSERT INTO productos (id_tienda, id_categoria_producto, nombre_producto, descripcion_producto, ruta_foto_principal, precio, stock)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (product.id_tienda, 
              product.id_categoria_producto, 
              product.nombre_producto, 
              product.descripcion_producto, 
              path_foto_principal,
              product.precio, 
              product.stock
              ))
        db.commit()
    except Error as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()

    return {"message": "Product created successfully"}

def update_product(product: ProductUpdate, current_user: dict, db: any):
    validate_seller_role(current_user)
    
    cursor = db.cursor()
    try:
        # Verificar si el producto pertenece a una tienda del usuario
        cursor.execute("""
            SELECT id_tienda FROM productos WHERE id_producto = %s
        """, (product.id_producto,))
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No tienes productos disponibles para actualizar")
        
        id_tienda = result[0]
        validate_store_ownership(id_tienda, current_user['id_usuario'], db)

        # Guardamos la foto principal del producto en un directorio
        path = "uploads/store/product"
        new_path_foto_principal = save_image_as_webp(product.ruta_foto_principal, path)

        cursor.execute("""
            UPDATE productos
            SET nombre_producto = %s, descripcion_producto = %s, ruta_foto_principal = %s, precio = %s, stock = %s
            WHERE id_producto = %s
        """, (product.nombre_producto,
              product.descripcion_producto,
              new_path_foto_principal,
              product.precio,
              product.stock,
              product.id_producto
              ))
        db.commit()
        return {"message": "Product updated successfully"}
    except Error as e:
        print(f"Database error: {e}")
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()

def delete_product_store_seller(product_id: int, current_user: dict, db: any):
    validate_seller_role(current_user)
    
    cursor = db.cursor()
    try:
        # Verificar si el producto pertenece a una tienda del usuario
        cursor.execute("""
            SELECT id_tienda FROM productos WHERE id_producto = %s
        """, (product_id,))
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")
        
        id_tienda = result[0]
        validate_store_ownership(id_tienda, current_user['id_usuario'], db)

        print(f"Deleting product: {product_id}")
        cursor.execute("""
            DELETE FROM productos WHERE id_producto = %s
        """, (product_id,))
        db.commit()
        return {"message": "Producto eliminado exitosamente"}
    except Error as e:
        print(f"Database error: {e}")
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()

def get_products_by_store(id_tienda: int, db):
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM productos WHERE id_tienda = %s", (id_tienda,))
        products = cursor.fetchall()
        if not products:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No products found for this store")
        return [SeeProduct(**product) for product in products]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()

def delete_product(product_id: int, db) -> Dict[str, Any]:
    cursor = db.cursor()
    try:
        print(f"Attempting to delete product with ID: {product_id}")
        cursor.execute("DELETE FROM productos WHERE id_producto = %s", (product_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        db.commit()
        print(f"Product with ID: {product_id} deleted successfully")
        return {"message": "Product deleted successfully"}
    except Error as e:
        db.rollback()
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()

def see_all_products_controller(db):
    query = "SELECT * FROM productos"
    cursor = db.cursor(dictionary=True)
    cursor.execute(query)
    products = cursor.fetchall()
    cursor.close()
    return products
