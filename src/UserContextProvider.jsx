import React, { createContext, useContext, useState } from 'react';
import { useLocalState } from './components/common';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useLocalState('isEtiteUserLoggedIn', false);
  const [loggedInUser, setLoggedInUser] = useLocalState('etiteLoggedInUser', null);

  const [eventsGlobal, setEventsGlobal] = useState(null);
  const [ticketsGlobal, setTicketsGlobal] = useState(null);

  const login = (user) => {
    setLoggedInUser(user);
    setIsUserLoggedIn(true);
  };

  const logout = () => {
    setLoggedInUser(null);
    setIsUserLoggedIn(false);
  };

  const addEventsGlobal = (events) => {
    setEventsGlobal(events);
  }
  const addTicketsGlobal = (tickets) => {
    setTicketsGlobal(tickets);
  }


  return (
    <UserContext.Provider value={{ isUserLoggedIn, loggedInUser, eventsGlobal, ticketsGlobal, login, logout, addEventsGlobal, addTicketsGlobal}}>
      {children}
    </UserContext.Provider>
  );
};
