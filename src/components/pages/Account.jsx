import React, { useEffect, useState } from 'react';
import { commonStyleClasses } from '../common';
import { useUserContext } from '../../UserContextProvider';
import { MustLoggin } from './MustLoggin';
import { userTicketsAPI, deleteUserTicketApi } from '../Api';
import { toast } from 'react-toastify';
import UserTicketsTable from '../UserTicketsTable';

export const Account = () => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const { isUserLoggedIn, loggedInUser, ticketsGlobal, addTicketsGlobal } = useUserContext();

    useEffect(() => {
        if (!ticketsGlobal) getData();
    }, []);

    function extractInfo(tickets) {
        return tickets.map(ticket => ({
            _id: ticket._id,
            eventTitle: ticket.eventId.title,
            eventMaxTickets: ticket.eventId.maxTickets,
            amount: ticket.amount,
            status: ticket.status,
        }));
    }

    async function getData() {
        setLoading(true);
        setErr("");
        try {
            const { status, message } = await userTicketsAPI();
            if (status) {
                addTicketsGlobal(message)
            } else {
                setErr(message);
                toast.error(message);
            }
        } catch (error) {
            toast.error(`An error occurred while getting data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const deleteTicketHandler = async (id) => {
        setLoading(true);
        try {
            const { status, message } = await deleteUserTicketApi(id);
            if (status) {
                toast.success("Ticket deleted successfully");
                getData();
            } else {
                toast.warn(message);
            }
        } catch (error) {
            toast.error(`An error occurred while deleting the ticket: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={commonStyleClasses().parentDiv}>

            {isUserLoggedIn ? (
                <>
                    <h1 className="text-4xl font-bold mb-8">My Account</h1>
                    <div className="text-start my-4 flex flex-wrap justify-center gap-5 items-center flex-col lg:flex-row">
                        <div className="bg-bgColor p-4 rounded-lg shadow-lg shadow-black w-11/12 lg:w-11/12 ">
                            <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                            <p className="text-textColorMiddle">Name: {loggedInUser.name}</p>
                            <p className="text-textColorMiddle">Email: {loggedInUser.email}</p>
                        </div>
                        <div className="bg-bgColor p-4 rounded-lg shadow-lg shadow-black w-11/12 lg:w-11/12">
                            <h2 className="text-2xl font-bold text-center my-5">My Tickets</h2>
                            {loading && <div className='w-32 h-16 p-4 m-4 animate-pulse rounded-md bg-gray text-white'>Loading Your Tickets</div>}
                            {ticketsGlobal && <UserTicketsTable tickets={extractInfo(ticketsGlobal)} onDelete={deleteTicketHandler} />}
                        </div>
                    </div>
                </>) : (
                <MustLoggin />
            )}
        </div>
    );
};