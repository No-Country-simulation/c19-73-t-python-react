import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { InputSearch } from '../../../components/ui/input';
import { LabelH1 } from '../../../components/ui/label';
import Datatable_Users from '../auth/components/datatable-users';
import { getUser } from './user';
import { columns } from '../../../components/columns';

interface Usuario {
  id_usuario: number;
  nombre: string;
  telefono: string;
  direccion: string;
  correo: string;
  contrasena: string;
  rol_id: string;
}

function UsersManage() {
  const [users, setUsers] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUser();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <section>
      <div className='px-10 py-10'>
        <div className='pb-10 text-center'>
          <LabelH1>Usuarios</LabelH1>
        </div>

        <Datatable_Users 
        data={users} 
        columns={columns} 
        caption='Lista de usuarios.'
        globalFilterColumn='nombre' />
      </div>
    </section>
  );
}

export default UsersManage;
