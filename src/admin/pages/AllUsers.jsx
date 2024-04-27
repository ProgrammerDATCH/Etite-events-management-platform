import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllUsersApi } from '../Api';
import { commonStyleClasses, convertToHumanFriendlyDate } from '../../components/common';
import { FaSpinner } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'
import Table from '../adminComponents/common/Table';
import { useAdminContext } from '../../AdminContextProvider';

export const AllUsers = () => {
  const [loading, setLoading] = useState(false);

  const {users, addUsers} = useAdminContext();
  const location = useLocation();

  useEffect(() => {
    if (!users || location.search === '?new=added') {
      getData();
    }
  }, [location.search]);

  async function getData() {
    setLoading(true);
    try {
      const { status, message } = await getAllUsersApi();
      if (status) {
        addUsers(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(`An error occurred while getting data: ${error.message}`);
    }
    setLoading(false);
  }


  return (
    <>
      <div className={commonStyleClasses("courses", null, true).adminDiv}>
        <h1 className='text-5xl mb-10 text-center'>All Users</h1>
        {loading ? (
          <div className="flex items-center justify-center flex-col animate-pulse">
            <FaSpinner className="animate-spin text-4xl text-primary" />
            <span>Loading Users...</span>
          </div>
        ) : (
          users && <Table data={users} />
        )}
      </div>
    </>
  );
};
