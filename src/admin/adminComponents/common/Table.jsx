import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Table = ({ data, handleDelete, isDoing }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(data[0]).map((key) => key)

  const handleUpdate = (id) => {
    navigate(`/admin/events/update/${id}`);
  };

  return (
    <>
      {isDoing && <div className="w-full h-16 bg-black text-white flex justify-center items-center flex-col text-xl animate-pulse">
        <FaSpinner className='text-6xl text-white animate-spin' />
        <p>Loading...</p>
      </div>}

      <div className="overflow-x-auto rounded-xl dark:bg-bgColor bg-textColorHover">
        <table className="w-full whitespace-nowrap divide-y dark:divide-gray-200 divide-grey">
          <thead className='dark:bg-bgColor2 bg-textColorMiddle'>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400  tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-6 dark:divide-boxdark divide-white">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition-all hover:rounded-lg hover:bg-white hover:text-black hover:cursor-pointer">
                {Object.keys(row).map((key, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">
                    {key.toLowerCase() === 'image' ? (
                      <img src={row[key]} alt="Image" className='w-16 rounded-md' />
                    ) : (
                      row[key]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">
                  <button onClick={() => navigate(`/admin/tickets/${row["_id"]}`)} className="px-4 py-2 bg-green-500 text-white rounded-md mr-2">View Tickets</button>
                  <button onClick={() => handleUpdate(row["_id"])} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Update</button>
                  <button onClick={() => handleDelete(row["_id"])} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
