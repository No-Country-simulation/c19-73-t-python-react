# Proyecto "Marketplace de Productos Artesanales"

Este proyecto es una plataforma de marketplace para productos artesanales, que permite a los vendedores crear y administrar sus tiendas, y a los compradores buscar y adquirir productos.

### User Stories

- **Como comprador**, quiero poder buscar y comprar productos artesanales únicos de una variedad de vendedores en un solo lugar.
- **Como vendedor**, quiero poder crear y administrar una tienda en línea para vender mis productos artesanales y alcanzar a - una audiencia más amplia.
- **Como administrador**, quiero poder gestionar la plataforma y garantizar la calidad y seguridad de las transacciones.


## Tecnologías Utilizadas

- Backend: Python, FastAPI
- Base de datos: MySQL
- Frontend: React


## Instalación y Ejecución del Backend

1. **Clonar el repositorio**

   ```sh
   git clone https://github.com/No-Country-simulation/c19-73-t-python-react.git
   cd c19-73-t-python-react.git/backend

2. **Instalar la base de datos (MySQL)**

   ```sh
   En Windows:
   Descarga MySQL Installer:

   Ve a la página oficial de MySQL: MySQL Downloads.
   Descarga el instalador (Windows MSI Installer).
   Instala MySQL:

   Ejecuta el instalador descargado.
   Selecciona "Developer Default" para una instalación típica.
   Sigue las instrucciones del asistente de instalación.
   Configura el servidor MySQL (puerto por defecto 3306, usuario root, y contraseña).
   Finaliza la instalación:

   Completa la configuración y termina la instalación.

3. **Crea un archivo ".env" en la ruta "c19-73-t-python-react.git/backend/.env" colocar las siguientes variables de entorno**

   ```sh
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=marketplasce_artesanias

   SECRET_KEY=tu_clave_secreta
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=120

4. **Instalar la base de datos del proyecto**

   ```sh
   En el carpeta "database/database_full.sql" se encuentran todas
   las instrucciones para crear la base de datos del proyecto.

5. **Crear y activar un entorno virtual**

   ```sh
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate

6. **Instalar las dependencias**

   ```sh
   pip install -r requirements.txt

7. **Ejecutar el servidor**

   ```sh
   uvicorn app.main:app --reload

8. **Documentación de la API**

   ```sh
   http://127.0.0.1:8000/docs
   

