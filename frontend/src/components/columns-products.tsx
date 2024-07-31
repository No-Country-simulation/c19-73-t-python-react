// components/columns.tsx
import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { productos } from '../core/productos';
import { categorias_productos, getCategorias } from '../core/categorias_productos';
import { tiendas } from '../core/tienda';
import { getTiendas } from '../core/tienda'; // Asegúrate de tener una función para obtener las tiendas
import ActionsCellsProduct from './actions-cells-product'; // Asegúrate de tener el componente ActionsCellsProduct

export const useColumns_productos = () => {
  const [categorias, setCategorias] = useState<categorias_productos[]>([]);
  const [tiendas, setTiendas] = useState<tiendas[]>([]);

  useEffect(() => {
    getCategorias().then(setCategorias);
    getTiendas().then(setTiendas);
  }, []);

  const getCategoriaNombre = (id_categoria: number | undefined) => {
    const categoria = categorias.find(categoria => categoria.id_categoría_producto === id_categoria);
    return categoria ? categoria.nombre_categoría_producto : 'Desconocido';
  };

  const getTiendaNombre = (id_tienda: number | undefined) => {
    const tienda = tiendas.find(tienda => tienda.id_tienda === id_tienda);
    return tienda ? tienda.nombre_tienda : 'Desconocido';
  };

  const columns: ColumnDef<productos>[] = [
    {
      accessorKey: 'nombre_producto',
      header: 'Nombre',
    },
    {
      accessorKey: 'id_categoría',
      header: 'Categoría',
      cell: ({ row }) => getCategoriaNombre(row.original.id_categoría),
    },
    {
      accessorKey: 'id_tienda',
      header: 'Tienda',
      cell: ({ row }) => getTiendaNombre(row.original.id_tienda),
    },
    {
      accessorKey: 'precio',
      header: 'Precio Unitario',
    },
    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => <ActionsCellsProduct producto={row.original} />,
    },
  ];

  return columns;
};
