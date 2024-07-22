import { ColumnDef } from "@tanstack/react-table";
import type { usuario } from "../router/views/manage-users/user";
import { SquarePen, Eye, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell } from "./ui/table";


export const columns: ColumnDef<usuario>[]=[
    {
        accessorKey: "nombre",
        header: "Nombre completo",
    },
    {
        accessorKey: "rol_id",
        header: "Rol",
    },
    {
        accessorKey: "telefono",
        header: "Teléfono",
    },
    {
        accessorKey: "correo",
        header: "E-mail",
    },
    {
        id:"actions",
        header:"Actions",
        cell: () =>(
            <TableCell className='flex text-center'>
              <div className='px-1'>
                <Button className='rounded-full px-2'>
                  <SquarePen size={23} color='#ffffff' />
                </Button>
              </div>
              <div className='px-1'>
                <Button className='rounded-full px-2'>
                  <Eye size={23} color='#ffffff' />
                </Button>
              </div>
              <div className='px-1'>
                <Button className='rounded-full px-2' variant={'destructive'}>
                  <Trash2 size={23} color='#ffffff' />
                </Button>
              </div>
            </TableCell>
        ),
    },
];