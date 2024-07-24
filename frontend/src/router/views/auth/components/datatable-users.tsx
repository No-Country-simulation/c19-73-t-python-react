import { useState } from 'react';
import DatatablePagination from '../../../../components/datatable-pagination';
import {InputSearch } from '../../../../components/ui/input';

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';

interface DatatableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  caption?: string;
  globalFilterColumn?: string;
}

export default function Datatable_Users<TData, TValue>({
  data,
  columns,
  caption,
  globalFilterColumn,
}: DatatableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 5,
    pageIndex: 0,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      {globalFilterColumn &&(
        <InputSearch
        placeholder='Nombre o rol del usuario que deseas encontrar'
        value={(table.getColumn(globalFilterColumn)?.getFilterValue() as string) ?? 
          ""
        }
        onChange={(event) =>
          table.getColumn(globalFilterColumn)
          ?.setFilterValue(event.target.value)
        }
        className='max-w-md mb-5 align-center'
        />
      )}
      <div className='rounded-md border'>
        <Table>
          {caption && <TableCaption>Lista de usuarios</TableCaption>}

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='pt-5 mx-5'>
      <DatatablePagination table={table} />
      </div>

    </div>
  );
}
