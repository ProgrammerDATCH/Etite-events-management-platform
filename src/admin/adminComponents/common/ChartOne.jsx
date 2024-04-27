import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = ({ users, events, tickets }) => {
  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    xaxis: {
      categories: ['Total Users', 'Total Events', 'Total Tickets'],
      labels: {
        style: {
          colors: '#3B82F6',
        },
      },
    },
  };

  const series = [{
    name: 'Total',
    data: [users, events, tickets],
  }];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div id="chartOne" className="-ml-5">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartOne;
