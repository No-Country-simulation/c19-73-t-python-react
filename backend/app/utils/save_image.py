from PIL import Image
import os

def save_image_as_webp(image, output_folder: str) -> str:
    """
    Convierte una imagen a formato webp, la guarda en la ruta especificada y retorna la ruta completa de la imagen.

    :param image: Objeto de imagen (puede ser un archivo subido).
    :param output_folder: Carpeta donde se guardará la imagen convertida.
    :return: Ruta completa de la imagen guardada.
    """
    try:
        # Asegúrate de que la carpeta de destino existe
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)
        
        # Abrir la imagen
        img = Image.open(image)
        
        # Generar la ruta de salida
        filename, ext = os.path.splitext(image.filename)
        output_path = os.path.join(output_folder, f"{filename}.webp")
        
        # Convertir y guardar la imagen en formato webp
        img.save(output_path, "webp")
        
        return output_path
    
    except Exception as e:
        raise ValueError(f"Error al convertir la imagen: {e}")

