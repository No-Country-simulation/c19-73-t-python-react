import React, { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Label } from '@radix-ui/react-label';
import { Eye, EyeOff, SquarePen } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import type { rol } from '../core/rol';
import { getRol } from '../core/rol';
import type { usuario } from '../core/user';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { TableCell } from './ui/table';

interface ActionsCellProps {
  usuario: usuario;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ usuario }) => {
  const [selectedUsuario, setSelectedUsuario] = useState<usuario | null>(null);
  const [roles, setRoles] = useState<rol[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('Seleccionar rol');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesData = await getRol();
      setRoles(rolesData);
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    setIsPasswordMatch(password === repeatPassword);
  }, [password, repeatPassword]);

  useEffect(() => {
    if (selectedUsuario) {
      const role = roles.find((r) => r.rol_id === selectedUsuario.rol_id);
      setSelectedRole(role?.nombre ?? 'Seleccionar rol');
    }
  }, [selectedUsuario, roles]);

  const handleViewClick = () => {
    setSelectedUsuario(usuario);
  };

  const handleClose = () => {
    setSelectedUsuario(null);
    // Limpiar los campos de contraseña al cerrar
    setPassword('');
    setRepeatPassword('');
  };

  const handleRoleChange = (rol: rol) => {
    setSelectedRole(rol.nombre);
    // Aquí deberías actualizar el rol del usuario seleccionado si es necesario
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRepeatPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setIsRepeatPasswordVisible(!isRepeatPasswordVisible);
  };

  const handleSave = () => {
    // Aquí puedes manejar la lógica para guardar los cambios
    // ...

    // Luego de guardar, muestra el toast
    toast('Usuario modificado', {
      description: 'El usuario seleccionado ha sido modificado con éxito',
    });

    // Luego de guardar, limpia los campos de contraseña
    setPassword('');
    setRepeatPassword('');
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
        {selectedUsuario && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Editar información</DialogTitle>
              <DialogDescription className='text-sm'>
                Solo podrá modificar la contraseña y los roles de los usuarios.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='Nombre'
                  className='col-span-1 text-right text-sm'
                >
                  Nombre:
                </Label>
                <Label htmlFor='nombre' className='col-span-3'>
                  {selectedUsuario.nombre}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='rolLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Rol actual:
                </Label>
                <Label htmlFor='rol' className='col-span-3'>
                  {selectedRole}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='rolLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Nuevo rol:
                </Label>
                <div className='col-span-3'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='w-full rounded-md border p-2'>
                      {selectedRole}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-2 w-full rounded-md bg-white shadow-lg'>
                      {roles.map((rol) => (
                        <DropdownMenuItem
                          key={rol.rol_id}
                          className='flex w-full cursor-pointer items-center px-4 py-2 hover:bg-gray-100'
                          onSelect={() => handleRoleChange(rol)}
                        >
                          {rol.nombre}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='col-span-4 text-center text-sm'>
                  Si desea cambiar la contraseña, utilizar este apartado, si no,
                  omitirlo.
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='contraseñaLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Contraseña:
                </Label>
                <div className='col-span-3 flex items-center'>
                  <Input
                    id='contraseña'
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    className='mr-2'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={togglePasswordVisibility}
                    className='p-2'
                  >
                    {isPasswordVisible ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </Button>
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='contraseñaRepLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Repetir contraseña:
                </Label>
                <div className='col-span-3 flex items-center'>
                  <Input
                    id='contraseñaRep'
                    type={isRepeatPasswordVisible ? 'text' : 'password'}
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    className='mr-2'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={toggleRepeatPasswordVisibility}
                    className='p-2'
                  >
                    {isRepeatPasswordVisible ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type='button'
                onClick={handleSave}
                disabled={!isPasswordMatch}
              >
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
        {selectedUsuario && (
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Ver información de usuario</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='nombreLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Nombre:
                </Label>
                <Label htmlFor='nombre' className='col-span-3'>
                  {selectedUsuario.nombre}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='telefonoLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Teléfono:
                </Label>
                <Label htmlFor='telefono' className='col-span-3'>
                  {selectedUsuario.telefono}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='correoLabel'
                  className='col-span-1 text-right text-sm'
                >
                  E-mail:
                </Label>
                <Label htmlFor='correo' className='col-span-3'>
                  {selectedUsuario.correo}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='direccionLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Dirección:
                </Label>
                <Label htmlFor='direccion' className='col-span-3'>
                  {selectedUsuario.direccion}
                </Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='rolLabel'
                  className='col-span-1 text-right text-sm'
                >
                  Rol:
                </Label>
                <Label htmlFor='rol' className='col-span-3'>
                  {selectedRole}
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

export default ActionsCell;
