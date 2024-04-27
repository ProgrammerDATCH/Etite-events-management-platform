import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAdminContext } from '../../../AdminContextProvider';

const PrivateAdminRoute = ({ element, ...rest }) => {
  const { isAdminLoggedIn } = useAdminContext();

  return (
    <Route
      {...rest}
      element={isAdminLoggedIn ? element : <Navigate to="/admin/login" replace />}
    />
  );
};

export default PrivateAdminRoute;
