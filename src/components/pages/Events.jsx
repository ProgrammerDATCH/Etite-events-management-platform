import React, { useEffect, useState } from 'react';
import { commonStyleClasses } from '../common';
import { eventsApi, ticketsAPI, userTicketsAPI } from '../Api'
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import ImageHolder from '../ImageHolder';
import { image } from '../assets';
import { useUserContext } from '../../UserContextProvider';
import { useNavigate } from 'react-router-dom';

export const Events = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { isUserLoggedIn, eventsGlobal, addEventsGlobal, ticketsGlobal, addTicketsGlobal } = useUserContext()

  useEffect(() => {
    if (!eventsGlobal) getData();
    if (!ticketsGlobal) getTickets();
  }, []);

  async function getTickets() {
    try {
      const { status, message } = await userTicketsAPI();
      if (status) {
        addTicketsGlobal(message)
      }
    } catch (error) { }
  }

  async function getData() {
    setLoading(true);
    setErr("");
    try {
      const { status, message } = await eventsApi();
      if (status) {
        addEventsGlobal(message)
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

  return (
    <div className={commonStyleClasses(false, null).parentDiv}>
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      {loading ? (
        <div className='animate-pulse'>
          <div className='text-3xl flex justify-center my-2'> <FaSpinner className='animate-spin' /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingEvent />
            <LoadingEvent />
            <LoadingEvent />
          </div>
        </div>
      ) : err ? (
        <div className='w-full flex justify-center'>
          <div className='border border-red-500 shadow-lg shadow-red-600 my-5 p-5 w-11/12 md:w-2/3 lg:w-1/3'>
            <p className='text-red-500'><span className='text-textColor'>Error:</span> {err}</p>
            <button onClick={getData} className="bg-white text-bgColor px-5 py-2 rounded-md text-base my-3">Retry</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsGlobal && eventsGlobal.map((event) => (
            <EventCard key={event._id} event={event} isUserLoggedIn={isUserLoggedIn} ticketsGlobal={ticketsGlobal} />
          ))}
        </div>
      )}
    </div>
  );
};

const EventCard = ({ event, isUserLoggedIn, ticketsGlobal }) => {
  const navigate = useNavigate()
  const [ticketsNumber, setTicketsNumber] = useState(1)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (ticketsGlobal && ticketsGlobal.length > 0) {
      const bookedEvent = ticketsGlobal.find(ticket => ticket.eventId._id === event._id);
      if (bookedEvent) {
        setSent(true);
      }
    }
  }, []);


  const handleMinusClick = () => {
    if (ticketsNumber > 1) {
      setTicketsNumber(ticketsNumber - 1);
    }
  };
  const handlePlusClick = () => {
    if (ticketsNumber < event.maxTickets) {
      setTicketsNumber(ticketsNumber + 1);
    }
  };
  const bookTicket = async () => {
    setSending(true)
    const { status, message } = await ticketsAPI(event._id, ticketsNumber)
    setSending(false)
    if (status) { setSent(true); toast.success("Ticket Booked, You will receive Email once Approved.") }
    else toast.warn("Error: " + message)
  }
  return (
    <div className={`bg-bgColor p-4 rounded-lg shadow-lg shadow-black flex flex-col items-center`}>
      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
      <ImageHolder src={event.image} alt={event.title} />
      <p className="text-textColorMiddle">On: {event.date}</p>
      <p className="text-textColorMiddle">At: {event.location}</p>
      <p className="text-textColorMiddle">Available Tickets: {event.maxTickets}</p>
      <div className="mt-auto">{isUserLoggedIn ? (
        <div className="book flex justify-center items-center flex-col">
          {!sent && <div className='flex justify-center items-center'>
            <button onClick={handleMinusClick} className='w-6 h-6 flex justify-center items-center bg-white text-black text-2xl rounded-md p-2 m-1'>-</button>
            <input
              type="number"
              className="mx-2 text-center w-16 text-black text-xl"
              value={ticketsNumber}
              readOnly
            />
            <button onClick={handlePlusClick} className='w-6 h-6 flex justify-center items-center bg-white text-black text-2xl rounded-md p-2 m-1'>+</button>
          </div>}
          <>
            {!sent ? <button
              onClick={bookTicket}
              disabled={sending}
              className="cursor-pointer rounded-md border border-primary px-5 py-3 text-base font-medium transition bg-textColor text-bgColor flex justify-center items-center"
            >
              Book {ticketsNumber} Tickets
            </button> : <span className='my-4 shadow-md shadow-white p-3 rounded-md text-xl'>Booked, You will receive Email once Approved.</span>}
          </>
        </div>

      ) : (
        <button onClick={() => { navigate('/login') }} className="cursor-pointer rounded-md border border-primary px-5 py-3 text-base font-medium  transition bg-textColor text-bgColor flex justify-center items-center">
          Login to Book a Ticket
        </button>
      )}
      </div>
    </div>
  )
}


const LoadingEvent = () => {
  return (
    <div className={`bg-bgColor p-4 rounded-lg shadow-lg shadow-black`}>
      <h2 className="text-xl font-semibold mb-2">Event</h2>
      <img src={image} />
      <p className="text-textColorMiddle">Details of Event is loading...</p>
    </div>
  )
}


