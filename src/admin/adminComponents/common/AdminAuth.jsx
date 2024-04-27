import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../../AdminContextProvider';

function AdminAuth({ children }) {
  const { isAdminLoggedIn } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) navigate("/admin/login");
  }, [isAdminLoggedIn, navigate]);

  return (
    <>
      {isAdminLoggedIn ? children : null}
    </>
  );
}

export default AdminAuth;