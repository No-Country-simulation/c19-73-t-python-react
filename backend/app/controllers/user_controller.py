import traceback
from fastapi import HTTPException, status
from app.models.user import UserCreate
from app.utils.security import hash_password
from mysql.connector import Error

def create_user(user: UserCreate, db):
    cursor = db.cursor()
    
    try:
        # Verificar si el usuario ya existe
        cursor.execute("SELECT * FROM usuarios WHERE correo = %s", (user.correo,))
        db_user = cursor.fetchone()
        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        
        # Crear el nuevo usuario
        hashed_password = hash_password(user.contrasenna)
        cursor.execute("""
            INSERT INTO usuarios (nombre, telefono, direccion, correo, contrasenna, rol_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (user.nombre, user.telefono, user.direccion, user.correo, hashed_password, user.rol_id))
        
        db.commit()
        return {"message": "User created successfully"}
    except Error as e:
        print("Error: ", str(e))
        print(traceback.format_exc())
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()
