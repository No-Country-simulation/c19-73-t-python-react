import traceback
from fastapi import HTTPException, status
from app.models.user import UserCreate, UserUpdate, UserRoleUpdate
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


def update_user(user_update: UserUpdate, current_user: dict, db):
    cursor = db.cursor()
    try:
        hashed_password = hash_password(user_update.contrasenna)
        print(f"Datos recibidos para actualizar: nombre='{user_update.nombre}' telefono='{user_update.telefono}' direccion='{user_update.direccion}' correo='{user_update.correo}' contrasenna='{user_update.contrasenna}'")

        cursor.execute("""
            UPDATE usuarios
            SET nombre = %s, telefono = %s, direccion = %s, correo = %s, contrasenna = %s
            WHERE id_usuario = %s
        """, (
            user_update.nombre, 
            user_update.telefono, 
            user_update.direccion, 
            user_update.correo, 
            hashed_password, 
            current_user['id_usuario']
        ))
        
        db.commit()
        print("Actualización realizada correctamente")
        return {"message": "User profile updated successfully"}
    except Exception as e:
        db.rollback()
        print(f"Error al actualizar el perfil: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close()

def update_user_role(role_update: UserRoleUpdate, current_user: dict, db):
    cursor = db.cursor()
    try:
        print(f"Datos recibidos para cambiar rol: nuevo_rol='{role_update.new_role}'")
        print(f"Usuario actual: {current_user}")
        
        cursor.execute("""
            UPDATE usuarios
            SET rol_id = %s
            WHERE id_usuario = %s
        """, (role_update.new_role, current_user['id_usuario']))
        
        db.commit()
        print("Cambio de rol realizado correctamente")
        return {"message": "User role updated successfully"}
    except Exception as e:
        db.rollback()
        print(f"Error al cambiar el rol: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        cursor.close() 

def get_notifications(user_id: int, db):
    try:
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM notificaciones WHERE id_usuario = %s"
        cursor.execute(query, (user_id,))
        result = cursor.fetchall()
        cursor.close()
        
        if not result:
            raise HTTPException(status_code=404, detail="No notifications found for this user")
        return result
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
