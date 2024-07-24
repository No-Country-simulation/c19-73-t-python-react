import React, { useState } from 'react';

import { Label } from '@radix-ui/react-label';
import { Eye, SquarePen, Trash2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import type { usuario } from '../core/user';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { TableCell } from './ui/table';

interface ActionsCellProps {
  usuario: usuario;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ usuario }) => {
  const [selectedUsuario, setSelectedUsuario] = useState<usuario | null>(null);

  const handleViewClick = () => {
    setSelectedUsuario(usuario);
  };

  const handleClose = () => {
    setSelectedUsuario(null);
  };

  return (
    <TableCell className='flex text-center'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-full px-2' onClick={handleViewClick}>
            <SquarePen size={23} color='#ffffff' />
          </Button>
        </DialogTrigger>
        {selectedUsuario && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Editar información</DialogTitle>
              <DialogDescription>
                Solo podrá modificar la contraseña y los roles de los usuarios.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='Nombre' className='col-span-1 text-right font-bold'>
                  Nombre
                </Label>
                <Label htmlFor='nombre' className='col-span-3'>
                  {selectedUsuario.nombre}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='rolLabel' className='col-span-1 text-right font-bold'>
                  Rol actual
                </Label>
                <Label htmlFor='rol' className='col-span-3'>
                  {selectedUsuario.rol_id}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='rolLabel' className='col-span-1 text-right'>
                  Cambiar rol
                </Label>
                <Label htmlFor='correo' className='col-span-3'>
                  Aqui deberia de cambiarse rol con un combobox o un select
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='col-span-4'>
                  Si desea cambiar la contraseña, utilizar este apartado, si no,
                  omitirlo.
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='contraseñaLabel'
                  className='col-span-1 text-right'
                >
                  Contraseña
                </Label>
                <Input
                  id='contraseña'
                  defaultValue='*******'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='contraseñaLabel'
                  className='col-span-1 text-right'
                >
                  Repetir contraseña
                </Label>
                <Input
                  id='contraseñaRep'
                  defaultValue='*******'
                  className='col-span-3'
                />
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
      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-full px-2' onClick={handleViewClick}>
            <Eye size={23} color='#ffffff' />
          </Button>
        </DialogTrigger>
        {selectedUsuario && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Ver información de usuario</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='nombreLabel' className='col-span-1 text-right'>
                  Nombre
                </Label>
                <Label htmlFor='nombre' className='col-span-3'>
                  {selectedUsuario.nombre}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='telefonoLabel'
                  className='col-span-1 text-right'
                >
                  Teléfono
                </Label>
                <Label htmlFor='telefono' className='col-span-3'>
                  {selectedUsuario.telefono}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='correoLabel' className='col-span-1 text-right'>
                  E-mail
                </Label>
                <Label htmlFor='correo' className='col-span-3'>
                  {selectedUsuario.correo}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='direccionLabel'
                  className='col-span-1 text-right'
                >
                  Dirección
                </Label>
                <Label htmlFor='direccion' className='col-span-3'>
                  {selectedUsuario.direccion}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='rolLabel' className='col-span-1 text-right'>
                  Rol
                </Label>
                <Label htmlFor='rol' className='col-span-3'>
                  {selectedUsuario.rol_id}
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
      <div className='px-1'>
        <Button className='rounded-full px-2' variant={'destructive'}>
          <Trash2 size={23} color='#ffffff' />
        </Button>
      </div>
    </TableCell>
  );
};

export default ActionsCell;
