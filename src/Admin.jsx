import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './admin/adminComponents/Sidebar';
import Header from './admin/adminComponents/Header';
import { AdminContextProvider } from './AdminContextProvider';

export const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AdminContextProvider>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </AdminContextProvider>
  )
}
