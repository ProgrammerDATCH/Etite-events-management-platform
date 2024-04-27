import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getEventByIdApi, updateEventApi } from '../Api';
import { commonStyleClasses } from '../../components/common';
import { FaSpinner } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

export const EventUpdate = () => {

  const navigate = useNavigate()

  const { eventId } = useParams();
  if (!eventId) navigate('/admin/events?msg=choose_event_first')

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    maxTickets: 0,
  });

  const [addingEvent, setAddingEvent] = useState(false);

  async function getData() {
    try {
      const { status, message } = await getEventByIdApi(eventId);
      if (status) {
        setEventData({
          title: message.title,
          date: message.date,
          location: message.location,
          maxTickets: message.maxTickets,
        });
      } else {
        toast.error(message);
        navigate('/admin/events?msg=try_again')
      }
    } catch (error) {
      toast.error(`An error occurred while getting data: ${error.message}`);
      navigate('/admin/events?msg=try_again')
    }
  }

  useEffect(() => {getData()}, [])

  async function handleAddEvent(e) {
    e.preventDefault();

    if (!eventData.title || !eventData.date || !eventData.location || eventData.maxTickets === 0) {
      toast.warn("Please fill all fields!");
      return;
    }

    setAddingEvent(true);
    const { status, message } = await updateEventApi(eventId, eventData.title, eventData.date, eventData.location, eventData.maxTickets);

    if (status) {
      toast.success(`Event "${eventData.title}" updated successfully!`);
      setEventData({
        title: "",
        image: "",
        date: "",
        location: "",
        maxTickets: 0,
      });
      navigate('/admin/events?msg=updated')
    } else {
      toast.error(message);
      navigate('/admin/events?msg=try_again')
    }
    setAddingEvent(false);
  }

  return (
    <>
      <div className={commonStyleClasses("courses", null, true).adminDiv}>
        <h1 className='text-5xl mb-10 text-center'>Update Event</h1>
        <form onSubmit={handleAddEvent} className='flex flex-col justify-center items-center'>
          <input
            type="text"
            placeholder="Title"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            className={`${commonStyleClasses(true, false).inputText}`}
          />
          <input
            type="date"
            placeholder="Date"
            value={eventData.date}
            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
            className={`${commonStyleClasses(true, false).inputText}`}
          />
          <input
            type="number"
            placeholder="Number of Tickets"
            value={eventData.maxTickets}
            onChange={(e) => setEventData({ ...eventData, maxTickets: e.target.value })}
            className={`${commonStyleClasses(true, false).inputText}`}
          />

          <textarea
            placeholder="Location"
            value={eventData.location}
            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
            className={`${commonStyleClasses(true, false).inputText} h-32`}
          />
          <button
            type="submit"
            disabled={addingEvent}
            className="mb-6 w-2/3 sm:w-1/3 cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium transition text-bgColor flex justify-center items-center"
          >
            {addingEvent && <span className='text-bgColor animate-spin text-2xl mr-1'><FaSpinner /></span>}
            {addingEvent ? "Updating..." : "Update"}
          </button>
        </form>
      </div>

      
    </>
  );
};
