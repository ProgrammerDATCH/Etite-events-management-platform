import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaTicketAlt, FaUser } from 'react-icons/fa'
import CardDataStats from './adminComponents/common/CardDataStats'
import ChartOne from './adminComponents/common/ChartOne'
import { getDashboardData } from './Api'
import { useAdminContext } from '../AdminContextProvider'
import { toast } from 'react-toastify'

export const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const { dashboardData, addDashboardData } = useAdminContext()

  useEffect(() => {
    if (!dashboardData) getData();
  }, []);

  async function getData() {
    setLoading(true);
    try {
      const { status, message } = await getDashboardData();
      if (status) {
        addDashboardData(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(`An error occurred while getting data: ${error.message}`);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">

        <CardDataStats title="Total Users" total={dashboardData ? dashboardData.users : "Loading..."} rate="2%" levelUp>
          <FaUser className='fill-primary dark:fill-white w-22 ' />
        </CardDataStats>

        <CardDataStats title="Total Events" total={dashboardData ? dashboardData.events : "Loading..."} rate="30%" levelUp>
          <FaCalendarAlt className='fill-primary dark:fill-white w-22 ' />
        </CardDataStats>

        <CardDataStats title="Total Tickets" total={dashboardData ? dashboardData.tickets : "Loading..."} rate="30%" levelUp>
          <FaTicketAlt className='fill-primary dark:fill-white w-22 ' />
        </CardDataStats>
        
      </div>

      <div className="mt-4 flex flex-col gap-5">
        {dashboardData && <ChartOne users={dashboardData.users} events={dashboardData.events} tickets={dashboardData.tickets} />}
      </div>

    </div>

  )
}

