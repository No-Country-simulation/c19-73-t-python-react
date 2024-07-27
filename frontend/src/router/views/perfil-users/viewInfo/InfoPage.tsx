import { useEffect, useState } from 'react';
import { Button } from "../../../../components/ui/button";
import { useNavigate } from 'react-router-dom';
import { getUser, usuario } from '../../../../core/user'; // Asegúrate de ajustar la ruta

export const InfoPage = () => {
    const [user, setUser] = useState<usuario | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const users = await getUser();
            // Suponiendo que obtienes el usuario con id_usuario 1 (ajusta según sea necesario)
            const currentUser = users.find(u => u.id_usuario === 1);
            setUser(currentUser || null);
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>; // Manejo de estado de carga
    }

    return (
        <div className="flex items-center justify-center py-24 px-24">
            <div className="flex flex-col w-full max-w-7xl p-12 bg-accent border rounded-lg border-primary">
                <h1 className="text-3xl  text-center">Mi Perfil</h1>
                <div className="user-info w-full flex flex-col">
                    <h3 className="text-sm mt-3 mb-6 text-center">Información personal</h3>
                    <hr className='text-black' />
                    <div className="flex flex-row justify-between w-full pt-5">
                        <div className="flex flex-col space-y-2 font-bold text-right w-1/4">
                            <span>Nombre:</span>
                            <span>Telefono:</span>
                            <span>Email:</span>
                            <span>Direccion:</span>
                        </div>
                        <div className="flex flex-col space-y-2 w-3/4 ml-4">
                            <span>{user.nombre}</span>
                            <span>{user.telefono}</span>
                            <span>{user.correo}</span>
                            <span>{user.direccion}</span>
                        </div>
                    </div>
                </div>
                <Button
                    className='w-full h-14 rounded-full md:w-auto text-white mt-6'
                    onClick={() => navigate('/viewInfo/edit')}
                    variant={'outline'}
                >
                    Editar información
                </Button>
            </div>
        </div>
    );
};
