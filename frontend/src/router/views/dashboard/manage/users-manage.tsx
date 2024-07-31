import { useEffect, useState } from 'react';

import { useColumns } from '../../../../components/columns';
import { LabelH1 } from '../../../../components/ui/label';
import { getUser } from '../../../../core/user';
import Datatable_Users from '../../auth/components/datatable-users';

interface Usuario {
  id_usuario?: number;
  nombre: string;
  telefono: string;
  direccion: string;
  correo: string;
  contrasena: string;
  rol_id?: number; // Cambia a number si el rol_id es numérico
}

function UsersManage() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const columns = useColumns(); // Cambia a useColumns para obtener las columnas

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUser();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <section className='pt-10'>
      <div className='px-10 py-10'>
        <div className='pb-10 text-center'>
          <LabelH1>Usuarios</LabelH1>
        </div>

        <Datatable_Users
          data={users}
          columns={columns}
          caption='Lista de usuarios.'
          globalFilterColumn='nombre'
        />
      </div>
    </section>
  );
}

export default UsersManage;
