import React from 'react';
import { commonStyleClasses } from './common';
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='animate__animated animate__zoomInUp animate__faster'>

      <div className="bg-bgColor2 p-4 rounded-lg shadow-lg mb-4 md:flex md:flex-col md:gap-4">
        <h2 className="text-xl font-semibold my-5 text-center">Etite Event Management Platform</h2>
        <p className="text-textColor my-5">Welcome to our Event Management Platform! This platform is designed to help you easily browse and book tickets for upcoming events organized by our company. Whether you're looking for a fun night out or a networking opportunity, our platform has you covered.</p>
        <div className="md:flex md:gap-4">
          <div className="md:w-1/2">
            <p className="text-textColor">Key Features:</p>
            <div className="ml-10">
              <span className='flex'><FaCheck className='text-yellow-500 mr-5' /> Browse and book tickets for upcoming events</span>
              <span className='flex'><FaCheck className='text-yellow-500 mr-5' /> View essential details such as event title, date, location, and ticket availability</span>
              <span className='flex'><FaCheck className='text-yellow-500 mr-5' /> Manage your bookings and easily cancel if needed</span>
            </div>
            <p className='flex p-4 m-4 justify-center'>
               <button onClick={() => { navigate('/events') }} className="cursor-pointer rounded-md border border-primary px-5 py-3 text-base font-medium  transition bg-textColor text-bgColor flex justify-center items-center">
              See Upcoming Events
            </button>
            </p>
          </div>
          <div className="md:w-1/2">
            <p className="text-textColor">Using our platform is simple and intuitive, with a focus on providing you with a seamless experience from start to finish. We've ensured that our design is clean and user-friendly, making it easy for you to find and book your desired events.</p>
            <p className="text-textColor">Get started today and discover the exciting events we have lined up for you!</p>
            <p className='flex p-4 m-4 justify-center'>
               <button onClick={() => { navigate('/login') }} className="cursor-pointer rounded-md border border-primary px-5 py-3 text-base font-medium  transition bg-textColor text-bgColor flex justify-center items-center">
              Login to Book a Ticket
            </button>
            </p>
           
          </div>
        </div>
      </div>



    </div>
  );
};
