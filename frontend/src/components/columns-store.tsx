// components/columns.tsx
import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';

import { estados_tienda, get_estado_tiendas } from '../core/estados_tienda';
import { tiendas } from '../core/tienda';
import ActionsCellsStore from './actions-cells-store';

export const useColumns_store = () => {
  const [estados, setEstados] = useState<estados_tienda[]>([]);

  useEffect(() => {
    get_estado_tiendas().then(setEstados);
  }, []);

  const getEstadoNombre = (id_estado_tienda: number | undefined) => {
    const estado = estados.find(
      (estado) => estado.id_estado_tienda === id_estado_tienda,
    );
    return estado ? estado.nombre_estado_tienda : 'Desconocido';
  };

  const columns: ColumnDef<tiendas>[] = [
    {
      accessorKey: 'logo_tienda',
      header: 'Logo',
      cell: ({ row }) => (
        <img
          src={row.original.logo_tienda}
          alt='Logo'
          className='h-10 w-10 object-cover'
        />
      ),
    },
    {
      accessorKey: 'nombre_tienda',
      header: 'Nombre de la tienda',
    },
    {
      accessorKey: 'id_estado_tienda',
      header: 'Estado',
      cell: ({ row }) => getEstadoNombre(row.original.id_estado_tienda),
    },
    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => <ActionsCellsStore tienda={row.original} />,
    },
  ];

  return columns;
};
