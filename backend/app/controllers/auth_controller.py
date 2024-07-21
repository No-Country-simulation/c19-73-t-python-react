from fastapi import HTTPException, status
from app.db.db_conexion import get_db
from app.utils.security import verify_password, create_access_token
from app.models.user import UserLogin
from mysql.connector import Error

def authenticate_user(user_login: UserLogin, db):
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT * FROM usuarios WHERE correo = %s", (user_login.correo,))
        db_user = cursor.fetchone()
        if not db_user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        
        if not verify_password(user_login.contrasenna, db_user["contrasenna"]):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        
        # Crear el token JWT incluyendo información adicional del usuario
        access_token = create_access_token(data={
            "sub": str(db_user["id_usuario"]),
            "nombre": db_user["nombre"],
            "telefono": db_user["telefono"],
            "direccion": db_user["direccion"],
            "correo": db_user["correo"],
            "rol_id": db_user["rol_id"]
        }) 
        return {"access_token": access_token, "token_type": "bearer"}
    except Error as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()
