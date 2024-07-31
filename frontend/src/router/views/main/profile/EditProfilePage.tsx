import { EditUserForm } from './components/EditUserForm';

export const EditProfilePage = () => {
  return (
    <div className='w-full max-w-prose self-center p-6'>
      <h1 className='text-center text-5xl'>Usuario</h1>
      <EditUserForm />
    </div>
  );
};
