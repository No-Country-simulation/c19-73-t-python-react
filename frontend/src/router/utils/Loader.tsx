import { LoaderCircle } from 'lucide-react';

export const Loader = () => {
  return (
    <div className='flex items-center justify-center align-middle'>
      <LoaderCircle size={48} className='animate-spin text-white' />
    </div>
  );
};
