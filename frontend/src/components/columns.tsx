import { ColumnDef } from '@tanstack/react-table';
import type { usuario } from '../router/views/manage-users/user';
import ActionsCell from './actions-cells';

export const columns: ColumnDef<usuario>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre completo',
  },
  {
    accessorKey: 'rol_id',
    header: 'Rol',
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
