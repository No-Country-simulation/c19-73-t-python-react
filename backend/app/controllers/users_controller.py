from fastapi import HTTPException, status, Depends
from app.models.user import UserCreate, User
from app.db.db_conexion import get_db
from app.utils.security import get_password_hash, verify_password
from app.auth.jwt_handler import create_access_token

def register_user(user_in: UserCreate, db = Depends(get_db)):
    cursor = db.cursor()
    hashed_password = get_password_hash(user_in.contrasenna)
    
    query = """
    INSERT INTO usuarios (nombre, telefono, direccion, correo, contrasenna, rol_id) VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (user_in.nombre, user_in.telefono, user_in.direccion, user_in.correo, hashed_password, user_in.rol_id)
    cursor.execute(query, values)
    db.commit()
    
    user_id = cursor.lastrowid
    cursor.close()
    
    return User(id_usuario=user_id, nombre=user_in.nombre, telefono=user_in.telefono, direccion=user_in.direccion, correo=user_in.correo, rol_id=user_in.rol_id)

def login(correo: str, contrasenna: str, db = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    
    query = "SELECT * FROM usuarios WHERE correo = %s"
    cursor.execute(query, (correo,))
    db_user = cursor.fetchone()
    cursor.close()
    
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not verify_password(contrasenna, db_user["contrasenna"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(
        data={
        "sub": str(db_user["id_usuario"]),
        "id_usuario": db_user["id_usuario"],
        "nombre": db_user["nombre"],
        "telefono": db_user["telefono"],
        "direccion": db_user["direccion"],
        "correo": db_user["correo"],
        "rol_id": db_user["rol_id"]
        })
    return {"access_token": access_token, "token_type": "bearer"}
