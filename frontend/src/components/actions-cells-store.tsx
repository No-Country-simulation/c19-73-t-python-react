import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Label } from '@radix-ui/react-label';
import { Eye, SquarePen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import type { estados_tienda } from '../core/estados_tienda';
import type { tiendas } from '../core/tienda';
import { Button } from './ui/button';
import { get_estado_tiendas } from '../core/estados_tienda';
import { toast } from 'sonner';
import { TableCell } from './ui/table';

interface ActionsCellProps {
  tienda: tiendas;
}

const ActionsCellsStore: React.FC<ActionsCellProps> = ({ tienda }) => {
  const [selectedTienda, setSelectedTienda] = useState<tiendas | null>(null);
  const [estados, setEstados] = useState<estados_tienda[]>([]);
  const [selectedEstado, setSelectedEstado] = useState<string>('Seleccionar estado');

  useEffect(() => {
    const fetchEstados = async () => {
      const estadosData = await get_estado_tiendas();
      setEstados(estadosData);
    };

    fetchEstados();
  }, []);

  useEffect(() => {
    if (selectedTienda) {
      const estado = estados.find(e => e.id_estado_tienda === selectedTienda.id_estado_tienda);
      setSelectedEstado(estado?.nombre_estado_tienda ?? 'Seleccionar estado');
    }
  }, [selectedTienda, estados]);

  const handleViewClick = () => {
    setSelectedTienda(tienda);
  };

  const handleClose = () => {
    setSelectedTienda(null);
  };

  const handleEstadoChange = (estado: estados_tienda) => {
    setSelectedEstado(estado.nombre_estado_tienda);
    // Aquí deberías actualizar el estado de la tienda seleccionada si es necesario
  };

  const handleSave = () => {
    // Aquí puedes manejar la lógica para guardar los cambios
    // ...

    // Luego de guardar, muestra el toast
    toast("Estado de la tienda modificado", {
      description: "El estado de la tienda seleccionada ha sido modificado con éxito"
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
        {selectedTienda && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Editar estado de la tienda</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='Nombre' className='col-span-1 text-right text-sm'>
                  Nombre de la tienda:
                </Label>
                <Label htmlFor='nombre' className='col-span-3'>
                  {selectedTienda.nombre_tienda}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='estadoActual' className='col-span-1 text-right text-sm'>
                  Estado actual:
                </Label>
                <Label htmlFor='estado' className='col-span-3'>
                  {selectedEstado}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='nuevoEstado' className='col-span-1 text-right text-sm'>
                  Nuevo estado:
                </Label>
                <div className='col-span-3'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='w-full rounded-md border p-2'>
                      {selectedEstado}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-2 w-full rounded-md bg-white shadow-lg'>
                      {estados.map((estado) => (
                        <DropdownMenuItem
                          key={estado.id_estado_tienda}
                          className='flex w-full items-center px-4 py-2 cursor-pointer hover:bg-gray-100'
                          onSelect={() => handleEstadoChange(estado)}
                        >
                          {estado.nombre_estado_tienda}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type='button'
                onClick={handleSave}
              >
                Actualizar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-full px-2 mx-3' onClick={handleViewClick}>
            <Eye size={23} color='#ffffff' />
          </Button>
        </DialogTrigger>
        {selectedTienda && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Ver información de la tienda</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='nombreLabel' className='col-span-1 text-right text-sm'>
                  Nombre:
                </Label>
                <Label htmlFor='nombre' className='col-span-3'>
                  {selectedTienda.nombre_tienda}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='descripcionLabel' className='col-span-1 text-right text-sm'>
                  Descripción:
                </Label>
                <Label htmlFor='descripcion' className='col-span-3'>
                  {selectedTienda.descripcion}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='logoLabel' className='col-span-1 text-right text-sm'>
                  Logo:
                </Label>
                <div className='col-span-3'>
                  <img src={selectedTienda.logo_tienda} alt="Logo de la tienda" className='w-20 h-20 object-cover' />
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='bancoLabel' className='col-span-1 text-right text-sm'>
                  Nombre del banco:
                </Label>
                <Label htmlFor='banco' className='col-span-3'>
                  {selectedTienda.nombre_banco}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='cuentaLabel' className='col-span-1 text-right text-sm'>
                  Número de cuenta:
                </Label>
                <Label htmlFor='cuenta' className='col-span-3'>
                  {selectedTienda.numero_de_cuenta}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='tipoCuentaLabel' className='col-span-1 text-right text-sm'>
                  Tipo de cuenta:
                </Label>
                <Label htmlFor='tipoCuenta' className='col-span-3'>
                  {selectedTienda.tipo_cuenta_bancaria}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='cciLabel' className='col-span-1 text-right text-sm'>
                  CCI:
                </Label>
                <Label htmlFor='cci' className='col-span-3'>
                  {selectedTienda.cci}
                </Label>
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

export default ActionsCellsStore;
