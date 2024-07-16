--------------------- CREATE DATABASE --------------------------

CREATE DATABASE marketplasce_artesanias;

----------------------- USE DATABASE ---------------------------

USE marketplasce_artesanias;

----------------------------------------------------------------

DROP TABLE IF EXISTS rol;
CREATE TABLE rol (
		rol_id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
		id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        telefono VARCHAR(100) NOT NULL,
        direccion VARCHAR(256) NOT NULL,
        correo VARCHAR(100) NOT NULL,
        contrasenna VARCHAR(100) NOT NULL,
		rol_id INT NOT NULL,
        FOREIGN KEY (rol_id) REFERENCES rol(rol_id)
);

DROP TABLE IF EXISTS tiendas;
CREATE TABLE tiendas (
		id_tienda INT AUTO_INCREMENT PRIMARY KEY,
		id_usuario INT NOT NULL,
        nombre_tienda VARCHAR(100) NOT NULL,
        logo_tienda VARCHAR(256) NOT NULL,
        descripcion VARCHAR(256) NOT NULL,
        nombre_banco VARCHAR(100) NOT NULL,
        tipo_cuenta_bancaria VARCHAR(100) NOT NULL,
        numero_de_cuenta VARCHAR(100) NOT NULL,
        cci VARCHAR(100) NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

DROP TABLE IF EXISTS notificaciones;
CREATE TABLE notificaciones (
		id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        asunto VARCHAR(100) NOT NULL,
        mensaje TEXT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

DROP TABLE IF EXISTS categorias;
CREATE TABLE categorias (
		id_categoria INT AUTO_INCREMENT PRIMARY KEY,
        nombre_categoria VARCHAR(256) NOT NULL
);

DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
		id_producto INT AUTO_INCREMENT PRIMARY KEY,
		id_tienda INT NOT NULL,
		id_categoria INT NOT NULL,
        nombre_producto VARCHAR(256) NOT NULL,
        descripcion_producto TEXT NOT NULL,
        ruta_foto_principal VARCHAR(256) NOT NULL,
        precio FLOAT NOT NULL,
        stock INT NOT NULL,
        FOREIGN KEY (id_tienda) REFERENCES tiendas(id_tienda),
        FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

DROP TABLE IF EXISTS fotos_galeria_producto;
CREATE TABLE fotos_galeria_producto (
        id_foto_galeria INT AUTO_INCREMENT PRIMARY KEY,
        id_producto INT NOT NULL,
        ruta_foto VARCHAR(256) NOT NULL,
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);


DROP TABLE IF EXISTS pedidos;
CREATE TABLE pedidos (
		id_pedido INT AUTO_INCREMENT PRIMARY KEY,
		id_usuario INT NOT NULL,
		id_tienda INT NOT NULL,
		id_producto INT NOT NULL,
        cantidad INT NOT NULL,
        fecha_y_hora VARCHAR(256) NOT NULL,
        total INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        FOREIGN KEY (id_tienda) REFERENCES tiendas(id_tienda),
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);


---------------- DELETE ALL TABLES IN THIS ORDER -------------------

DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS fotos_galeria_producto;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS notificaciones;
DROP TABLE IF EXISTS tiendas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS rol;