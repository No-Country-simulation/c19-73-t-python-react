import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../components/ui/button';

export const MyProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('/profile/edit')}>
        Editar Información
      </Button>
    </div>
  );
};
