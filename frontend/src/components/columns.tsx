import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';

import { getRol, rol } from '../core/rol';
import type { usuario } from '../core/user';
import ActionsCell from './actions-cells';

export const useColumns = () => {
  const [roles, setRoles] = useState<rol[]>([]);

  useEffect(() => {
    getRol().then(setRoles);
  }, []);

  const getRoleName = (rol_id: number) => {
    const role = roles.find((role) => role.rol_id === rol_id);
    return role ? role.nombre : 'Desconocido';
  };

  const columns: ColumnDef<usuario>[] = [
    {
      accessorKey: 'nombre',
      header: 'Nombre completo',
    },
    {
      id: 'rol_id',
      header: 'Rol',
      cell: ({ row }) => getRoleName(row.original.rol_id ?? 0),
    },
    {
      accessorKey: 'telefono',
      header: 'Teléfono',
    },
    {
      accessorKey: 'correo',
      header: 'E-mail',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ActionsCell usuario={row.original} />,
    },
  ];

  return columns;
};
