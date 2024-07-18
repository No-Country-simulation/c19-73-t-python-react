import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

# Load environment variables from file .env
load_dotenv()

def create_connection_db():
    conexion = None
    try:
        # Get values from file .env
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
        print("Connection to MySQL successful")
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
    return conexion

def get_db():
    conexion = create_connection_db()
    try:
        yield conexion
    finally:
        conexion.close()
