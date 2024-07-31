// components/columns.tsx
import { ColumnDef } from '@tanstack/react-table';

import { categorias_productos } from '../core/categorias_productos';
import ActionsCellsCategory from './actions-cells-category';

export const useColumns_categorias = () => {
  const columns: ColumnDef<categorias_productos>[] = [
    {
      accessorKey: 'nombre_categoría_producto',
      header: 'Nombre de la categoría',
    },
    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => <ActionsCellsCategory categoria={row.original} />,
    },
  ];

  return columns;
};
