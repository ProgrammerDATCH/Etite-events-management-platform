import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const TicketsTable = ({ tickets, onDelete, onApprove, onReject, isDoing }) => {
    return (
        <>
            {isDoing && <div className="w-full h-16 bg-black text-white flex justify-center items-center flex-col text-xl animate-pulse">
                <FaSpinner className='text-6xl text-white animate-spin' />
                <p>Loading...</p>
            </div>}
            <div className="overflow-x-auto rounded-xl dark:bg-bgColor bg-textColorHover ">

                <table className="w-full whitespace-nowrap divide-y dark:divide-gray-200 divide-grey">
                    <thead className='dark:bg-bgColor2 bg-textColorMiddle'>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">_id</th>
                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">eventTitle</th>
                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">eventMaxTickets</th>
                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">userName</th>
                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">userEmail</th>
                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">Amount</th>
                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">Status</th>
                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-lg leading-4 font-medium text-gray-500 dark:text-gray-400 tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-6 dark:divide-boxdark divide-white">
                        {tickets.map((ticket, index) => (
                            <tr key={index} className="transition-all hover:rounded-lg hover:bg-white hover:text-black hover:cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">{ticket._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">{ticket.eventId.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">{ticket.eventId.maxTickets}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">{ticket.userId.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">{ticket.userId.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">{ticket.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100 uppercase">{ticket.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 dark:text-gray-100">
                                    <button onClick={() => onDelete(ticket._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    <button onClick={() => onApprove(ticket._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">Approve</button>
                                    <button onClick={() => onReject(ticket._id)} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-2">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TicketsTable;