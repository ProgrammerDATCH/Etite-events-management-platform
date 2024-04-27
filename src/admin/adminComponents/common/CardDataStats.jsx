import React, { ReactNode } from 'react';


const CardDataStats = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke flex flex-col items-center justify-center bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">

      <div className="flex h-16 w-32 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex justify-between gap-6 flex-col items-center">
        <span className="relative flex h-8 w-32 animate-pulse">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75"></span>
          <span className="absolute text-white text-xl rounded-full h-full w-full bg-sky-500 flex justify-center items-center">{total}</span>
        </span>
        <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
};

export default CardDataStats;
