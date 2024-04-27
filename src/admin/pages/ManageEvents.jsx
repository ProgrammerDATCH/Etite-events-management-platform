import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addEventApi, eventsApi, deleteEventApi } from '../Api';
import { commonStyleClasses, convertBase64, serverLink, truncateWord } from '../../components/common';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import Table from '../adminComponents/common/Table';
import { useAdminContext } from '../../AdminContextProvider';
import { LoadingAPI } from '../adminComponents/common/LoadingAPI'

export const ManageEvents = () => {
  const [eventData, setEventData] = useState({
    title: "",
    image: "",
    date: "",
    location: "",
    maxTickets: 0,
  });

  const [loading, setLoading] = useState(false)

  const [addingEvent, setAddingEvent] = useState(false);
  const [resetImageInfo, setResetImageInfo] = useState(false);

  const { allEvents, addEvents } = useAdminContext();

  useEffect(() => {
    if (!allEvents) getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const { status, message } = await eventsApi();
      setLoading(false);
      if (status) {
        addEvents(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(`An error occurred while getting data: ${error.message}`);
    }
  }

  const [isDoing, setIsDoing] = useState(false)
  async function handleDelete(id){
    setIsDoing(true)
    const {status, message } = await deleteEventApi(id)
    if(status) toast.success("Deleted successfully")
    else toast.warn(message)
    getData()
    setIsDoing(false)
  }

  function handleImageUpload(base64) {
    setEventData({ ...eventData, image: base64 });
  }

  async function handleAddEvent(e) {
    e.preventDefault();

    if (!eventData.title || !eventData.image || !eventData.date || !eventData.location || eventData.maxTickets === 0) {
      toast.warn("Please fill all fields!");
      return;
    }

    setAddingEvent(true);
    const { status, message } = await addEventApi(eventData.title, eventData.date, eventData.location, eventData.maxTickets, eventData.image);

    if (status) {
      getData()
      toast.success(`Event "${eventData.title}" added successfully!`);
      setEventData({
        title: "",
        image: "",
        date: "",
        location: "",
        maxTickets: 0,
      });
      getData();
    } else {
      toast.error(message);
    }
    setResetImageInfo(prev => !prev)
    setAddingEvent(false);
  }

  return (
    <>
      <div className={commonStyleClasses("courses", null, true).adminDiv}>
        <h1 className='text-5xl mb-10 text-center'>Add New Event</h1>
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

          <UploadInput handleImageUpload={handleImageUpload} resetImageInfo={resetImageInfo} />

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
            {addingEvent ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      {<div className={`${commonStyleClasses(null, null, null).adminDiv} mt-5 bg-white`}>
        <p className='my-4 shadow-md shadow-white p-3 rounded-md text-xl'>View Event Tickets, Edit & Delete</p>
        {loading ? <LoadingAPI name="Event" /> : allEvents && <Table data={allEvents} handleDelete={handleDelete} isDoing={isDoing} isFromEvents />}
      </div>}
    </>
  );
};



function UploadInput({ handleImageUpload, resetImageInfo }) {
  const [converting, setConverting] = useState(false);
  const [imageInfo, setImageInfo] = useState({
    name: "",
    size: "",
    extension: ""
  });
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    setImageInfo({
      name: "",
      size: "",
      extension: ""
    })
    setIsDraggingOver(false);
    setConverting(false);
  }, [resetImageInfo])

  const uploadImage = async (file) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    const fileSizeFormatted = fileSizeInMB < 1 ? (file.size / 1024).toFixed(2) + ' KB' : fileSizeInMB.toFixed(2) + ' MB';
    const nameParts = file.name.split('.');
    const extension = nameParts[nameParts.length - 1];

    setImageInfo({
      name: file.name,
      size: fileSizeFormatted,
      extension: extension,
    });

    setConverting(true);
    const base64 = await convertBase64(file);
    setConverting(false);
    handleImageUpload(base64);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed')
      return;
    }
    setIsDraggingOver(false);
    uploadImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-2/3 my-4 border-2 border-dashed rounded-lg cursor-pointer ${isDraggingOver ? 'border-green-500' : 'border-gray-300'} ${isDraggingOver ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-800'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-48"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FaCloudUploadAlt className={`w-10 h-10 mb-3 text-gray-400 ${converting ? ' animate-bounce' : ''}`} />

          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {converting ? (
              <span className="font-semibold text-green-500 animate-pulse">Getting Image ready for upload...</span>
            ) : imageInfo.name ? (
              <div className='font-semibold flex flex-col items-start gap-2'>
                <span>name: <span className='text-green-500'>{truncateWord(imageInfo.name, 10)}</span></span>
                <span>size: <span className='text-green-500'>{imageInfo.size}</span></span>
                <span>extension: <span className='text-green-500'>{truncateWord(imageInfo.extension.toUpperCase(), 5)}</span></span>
              </div>
            ) : (
              <span className="font-semibold">Drag and drop image here or click to upload</span>
            )}
          </p>
          {!imageInfo.name && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Accepts: SVG, PNG, JPG or GIF
            </p>
          )}
        </div>

        <input
          onChange={(e) => uploadImage(e.target.files[0])}
          id="dropzone-file"
          type="file"
          accept='image/*'
          className="hidden"
        />

      </label>
    </div>
  );
}
