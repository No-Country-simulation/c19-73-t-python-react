import React, { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Label } from '@radix-ui/react-label';
import { Eye, SquarePen } from 'lucide-react';
// Asegúrate de tener este tipo
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
import type { productos } from '../core/productos';
import { Button } from './ui/button';
import { TableCell } from './ui/table';

interface ActionsCellProps {
  producto: productos;
}

const ActionsCellsProduct: React.FC<ActionsCellProps> = ({ producto }) => {
  const [selectedProduct, setSelectedProduct] = useState<productos | null>(
    null,
  );
  const [categorias, setCategorias] = useState<categorias_productos[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>(
    'Seleccionar categoría',
  );

  useEffect(() => {
    const fetchCategorias = async () => {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const categoria = categorias.find(
        (c) => c.id_categoría_producto === selectedProduct.id_categoría,
      );
      setSelectedCategoria(
        categoria?.nombre_categoría_producto ?? 'Seleccionar categoría',
      );
    }
  }, [selectedProduct, categorias]);

  const handleViewClick = () => {
    setSelectedProduct(producto);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleCategoriaChange = (categoria: categorias_productos) => {
    const mappedCategoria = {
      id_categoria: categoria.id_categoría_producto,
      nombre_categoria: categoria.nombre_categoría_producto,
    };
    setSelectedCategoria(mappedCategoria.nombre_categoria);
    // Aquí deberías actualizar la categoría del producto seleccionado si es necesario
  };

  const handleSave = () => {
    // Aquí puedes manejar la lógica para guardar los cambios
    // ...

    // Luego de guardar, muestra el toast
    toast('Producto actualizado', {
      description: 'Los datos del producto se han actualizado con éxito',
    });

    handleClose(); // Cerrar el diálogo
  };

  return (
    <TableCell className='flex text-center'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-full px-2' onClick={handleViewClick}>
            <SquarePen size={23} color='#ffffff' />
          </Button>
        </DialogTrigger>
        {selectedProduct && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Editar producto</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='nombreProducto'
                  className='col-span-1 text-right text-sm'
                >
                  Nombre del producto:
                </Label>
                <input
                  id='nombreProducto'
                  type='text'
                  defaultValue={selectedProduct.nombre_producto}
                  className='col-span-3 rounded border p-2'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='descripcionProducto'
                  className='col-span-1 text-right text-sm'
                >
                  Descripción:
                </Label>
                <textarea
                  id='descripcionProducto'
                  defaultValue={selectedProduct.descripcion_producto}
                  className='col-span-3 rounded border p-2'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='precioProducto'
                  className='col-span-1 text-right text-sm'
                >
                  Precio:
                </Label>
                <input
                  id='precioProducto'
                  type='text'
                  defaultValue={selectedProduct.precio}
                  className='col-span-3 rounded border p-2'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='categoriaProducto'
                  className='col-span-1 text-right text-sm'
                >
                  Categoría:
                </Label>
                <div className='col-span-3'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='w-full rounded-md border p-2'>
                      {selectedCategoria}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-2 w-full rounded-md bg-white shadow-lg'>
                      {categorias.map((categoria) => (
                        <DropdownMenuItem
                          key={categoria.id_categoría_producto}
                          className='flex w-full cursor-pointer items-center px-4 py-2 hover:bg-gray-100'
                          onSelect={() => handleCategoriaChange(categoria)}
                        >
                          {categoria.nombre_categoría_producto}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='stockProducto'
                  className='col-span-1 text-right text-sm'
                >
                  Stock:
                </Label>
                <input
                  id='stockProducto'
                  type='number'
                  defaultValue={selectedProduct.stock}
                  className='col-span-3 rounded border p-2'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='button' onClick={handleSave}>
                Actualizar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='mx-3 rounded-full px-2' onClick={handleViewClick}>
            <Eye size={23} color='#ffffff' />
          </Button>
        </DialogTrigger>
        {selectedProduct && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Ver detalles del producto</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='nombreProductoLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Nombre:
                </Label>
                <Label htmlFor='nombreProducto' className='col-span-3'>
                  {selectedProduct.nombre_producto}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='descripcionProductoLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Descripción:
                </Label>
                <Label htmlFor='descripcionProducto' className='col-span-3'>
                  {selectedProduct.descripcion_producto}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='precioProductoLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Precio:
                </Label>
                <Label htmlFor='precioProducto' className='col-span-3'>
                  {selectedProduct.precio}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='categoriaProductoLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Categoría:
                </Label>
                <Label htmlFor='categoriaProducto' className='col-span-3'>
                  {selectedCategoria}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='stockProductoLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Stock:
                </Label>
                <Label htmlFor='stockProducto' className='col-span-3'>
                  {selectedProduct.stock}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='fotoPrincipalLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Foto principal:
                </Label>
                <div className='col-span-3'>
                  <img
                    src={selectedProduct.foto_principal}
                    alt='Foto del producto'
                    className='h-20 w-20 object-cover'
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type='button' onClick={handleClose}>
                Aceptar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </TableCell>
  );
};

export default ActionsCellsProduct;
