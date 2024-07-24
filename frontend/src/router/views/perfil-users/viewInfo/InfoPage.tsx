import { useAppSelector } from '../../../../store/index';
import { Button } from "../../../../components/ui/button";
import { useNavigate } from 'react-router-dom';

export const InfoPage = () => {
    const { displayName, email, phone, address } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    //bg-background

    return (
        <div className="flex flex-col items-center h-3/5 w-3/5 ">
            <h1 className="text-4xl mb-3">Mi Perfil</h1>
            <div className="user-info bg-violet-50 h-full w-full border rounded-lg border-primary flex flex-col items-center justify-around">
                <div className='w-3/4 flex flex-col items-center'>
                    <h3 className="text-2xl mt-3 mb-6">Informacion personal</h3>
                    <div  className="flex flex-row justify-around w-full">
                        <div className="flex flex-col space-y-2">
                            <span>Nombre:</span>
                            <span>Telefono:</span>
                            <span>Email:</span>
                            <span>Direccion:</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span>{displayName}</span>
                            <span>{phone}</span>
                            <span>{email}</span>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
                <Button
                    className='w-full h-14 rounded-full md:w-auto text-white'
                    onClick={() => navigate('/viewInfo/edit')}
                    variant={'outline'}
                >
                    Editar informacion
                </Button>
            </div>
        </div>
    )
}