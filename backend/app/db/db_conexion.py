import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

def crear_conexion():
    conexion = None
    try:
        # Obtener valores desde el archivo .env
        host_name = os.getenv("DB_HOST")
        user_name = os.getenv("DB_USER")
        user_password = os.getenv("DB_PASSWORD")
        db_name = os.getenv("DB_NAME")
        
        conexion = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("Conexión a MySQL exitosa")
    except Error as e:
        print(f"Error al conectar a MySQL: {e}")
    return conexion

# Crear la conexión
conexion = crear_conexion()
