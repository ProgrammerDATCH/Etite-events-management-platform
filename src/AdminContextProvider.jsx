import React, { createContext, useContext, useState } from 'react';
import { useLocalState } from './components/common';

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminContextProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useLocalState('isEtiteAdminLoggedIn', false);
  const [loggedInAdmin, setLoggedInAdmin] = useLocalState('etiteLoggedInAdmin', null);

  const [dashboardData, setDashboardData] = useState(null)
  const [users, setUsers] = useState(null)
  const [allEvents, setEvents] = useState(null);

  const addDashboardData = (data) =>{
    setDashboardData(data);
  }

  const addEvents = (data) =>{
    setEvents(data);
  }

  const addUsers = (data) =>{
    setUsers(data)
  }

  const loginAdmin = (admin) => {
    setLoggedInAdmin(admin);
    setIsAdminLoggedIn(true);
  };

  const logoutAdmin = () => {
    setLoggedInAdmin(null);
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{
       isAdminLoggedIn, loggedInAdmin, loginAdmin, logoutAdmin, 
       dashboardData, addDashboardData, users, addUsers,
       allEvents, addEvents
       }}>
      {children}
    </AdminContext.Provider>
  );
};
