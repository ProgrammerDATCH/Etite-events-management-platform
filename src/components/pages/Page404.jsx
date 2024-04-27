import React from 'react';
import { commonStyleClasses } from '../common';
import { page404img } from '../assets';

const Page404 = () => {
  return (
    <div className={commonStyleClasses().parentDiv}>
      <div className="text-center my-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-8">404 - Page Not Found</h1>
        <img src={page404img} className="w-[100px]"/>
        <p className="mb-4">The page you are looking for doen't exist!.</p>
      </div>
    </div>
  );
};

export default Page404;
