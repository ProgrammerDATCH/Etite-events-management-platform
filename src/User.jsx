import React from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { UserContextProvider } from './UserContextProvider'

export const User = () => {
  return (
    <UserContextProvider>
    <div className="bg-bgColor text-textColor">
      <NavBar />
      <div className="p-2 pt-16 my-10 flex items-center justify-center">
        <Outlet />
      </div>
      <Footer />    
    </div>
    </UserContextProvider>
  )
}
