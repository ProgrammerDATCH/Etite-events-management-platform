import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ticketsApi, changeTicketApi, deleteTicket } from '../Api';
import { commonStyleClasses } from '../../components/common';
import { LoadingAPI } from '../adminComponents/common/LoadingAPI';
import { useNavigate, useParams } from 'react-router-dom';
import TicketsTable from '../adminComponents/common/TicketsTable';

export const ManageTickets = () => {

  const navigate = useNavigate()

  const { eventId } = useParams();
  if (!eventId) navigate('/admin/events?msg=choose_event_first')

  const [loading, setLoading] = useState(false)
  const [isDoing, setIsDoing] = useState(false)
  const [tickets, setTickets] = useState([])

  const approveTicket = async(id) => {
    setIsDoing(true)
    const {status, message} = await changeTicketApi(id, "approved")
    if(status) toast.success("Approved, User received Email.")
    else toast.warn(message)
    getData()
    setIsDoing(false)
  }

  const rejectTicket = async(id) => {
    setIsDoing(true)
    const {status, message} = await changeTicketApi(id, "rejected")
    if(status) toast.success("Rejected successfully")
    else toast.warn(message)
    getData()
    setIsDoing(false)
  }

  const deleteTicketHandler = async(id) => {
    setIsDoing(true)
    const {status, message} = await deleteTicket(id)
    if(status) toast.success("Deleted successfully")
    else toast.warn(message)
    getData()
    setIsDoing(false)
};


  useEffect(() => { getData() }, [])

  async function getData() {
    try {
      setLoading(true)
      const { status, message } = await ticketsApi(eventId);
      setLoading(false)
      if (status) {
        setTickets(message)
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(`An error occurred while getting data: ${error.message}`);
    }
  }


  return (
    <>
      <div className={`${commonStyleClasses(null, null, null).adminDiv} mt-5 bg-white`}>
        {
          loading ? 
          (
            <LoadingAPI name="Tickets" />
          ) 
          : tickets.length == 0 ? 
          (<><div className="text-xl">No booked Tickets on this events yet</div></>)
          :
          (tickets && <TicketsTable tickets={tickets} onApprove={approveTicket} onDelete={deleteTicketHandler} onReject={rejectTicket} isDoing={isDoing} />)
        }
      </div>
    </>
  );
};

