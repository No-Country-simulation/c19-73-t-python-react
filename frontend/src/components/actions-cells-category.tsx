import { useEffect, useState } from 'react';

import { Label } from '@radix-ui/react-label';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  categorias_productos,
  getCategorias,
} from '../core/categorias_productos';
import { Button } from './ui/button';
import { TableCell } from './ui/table';

interface ActionsCellProps {
  categoria: categorias_productos;
}

const ActionsCellsCategory: React.FC<ActionsCellProps> = ({ categoria }) => {
  const [selectedCategoria, setSelectedCategoria] =
    useState<categorias_productos | null>(null);
  const [categorias, setCategorias] = useState<categorias_productos[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  useEffect(() => {
    const fetchCategorias = async () => {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    if (selectedCategoria) {
      setNewCategoryName(selectedCategoria.nombre_categoría_producto);
    }
  }, [selectedCategoria]);

  const handleEditClick = () => {
    setSelectedCategoria(categoria);
  };

  const handleClose = () => {
    setSelectedCategoria(null);
  };

  const handleSave = async () => {
    if (selectedCategoria) {
      // Aquí puedes manejar la lógica para guardar los cambios
      // Por ejemplo, puedes actualizar el nombre en el estado o enviar una solicitud a la API
      const updatedCategorias = categorias.map((cat) =>
        cat.id_categoría_producto === selectedCategoria.id_categoría_producto
          ? { ...cat, nombre_categoría_producto: newCategoryName }
          : cat,
      );

      setCategorias(updatedCategorias);

      // Luego de guardar, muestra el toast
      toast.success('Categoría modificada', {
        description:
          'El nombre de la categoría seleccionada ha sido modificado con éxito',
      });

      handleClose(); // Cerrar el diálogo
    }
  };

  return (
    <TableCell className='flex text-center'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-full px-2' onClick={handleEditClick}>
            <Pencil size={23} color='#ffffff' />
          </Button>
        </DialogTrigger>
        {selectedCategoria && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Editar nombre de la categoría</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='nombreActual'
                  className='col-span-1 text-right text-sm'
                >
                  Nombre actual:
                </Label>
                <Label htmlFor='nombre' className='col-span-3'>
                  {selectedCategoria.nombre_categoría_producto}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='nuevoNombre'
                  className='col-span-1 text-right text-sm'
                >
                  Nuevo nombre:
                </Label>
                <input
                  type='text'
                  id='nuevoNombre'
                  className='col-span-3 rounded-md border p-2'
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='button' onClick={handleSave}>
                Actualizar
              </Button>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </TableCell>
  );
};

export default ActionsCellsCategory;
