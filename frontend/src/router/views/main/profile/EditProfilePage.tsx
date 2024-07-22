import { EditUserForm } from './components/EditUserForm';

export const EditProfilePage = () => {
  return (
    <div className='self-center w-full p-6 max-w-prose'>
      <h1 className='text-5xl text-center'>Usuario</h1>
      <EditUserForm />
    </div>
  );
};
