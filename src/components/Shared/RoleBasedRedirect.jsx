import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRole from '../../hooks/useRole';

const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { role} = useRole()

  useEffect(() => {
    if (role === 'Admin') {
      navigate('/dashboard/adminhomepage');
    } else if (role === 'Seller') {
      navigate('/dashboard/sellerhomepage');
    } else if (role === 'User') {
      navigate('/dashboard/userpaymenthistory');
    } 

  }, [role, navigate]);

 // লোডিং মেসেজ
};

export default RoleBasedRedirect;
