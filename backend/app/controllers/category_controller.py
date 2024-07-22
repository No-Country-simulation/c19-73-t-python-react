from fastapi import HTTPException, status
from app.models.category import CategoriaProductoCreate
from app.utils.security import validate_admin_role

def create_category(category: CategoriaProductoCreate, current_user: dict, db: any):
    validate_admin_role(current_user)

    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO categorias_productos (nombre_categoria_producto)
            VALUES (%s)
        """, (category.nombre_categoria_producto,))
        db.commit()
        return {"message": "Category created successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()
