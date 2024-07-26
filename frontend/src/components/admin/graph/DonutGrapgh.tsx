import { FC, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const DonutChart: FC<{ doctors: any[], users: any[], appointments: any[], payments: any[] }> = ({ doctors, users, appointments, payments }) => {
  const [chartData, setChartData] = useState({
    options: {
      labels: ['Doctors', 'Users', 'Appointments', 'Payments'],
    },
    series: [0, 0, 0, 0],
  });

  useEffect(() => {
    setChartData({
      options: {
        labels: ['Doctors', 'Users', 'Appointments', 'Payments'],
      },
      series: [doctors.length, users.length, appointments.length, payments.length],
    });
  }, [doctors, users, appointments, payments]);

  return (
    <div className="flex justify-center items-center ml-6 shadow-lg rounded-lg p-4 bg-white mt-1">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="380"
      />
    </div>
  );
};

export default DonutChart;
