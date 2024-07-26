import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineGraphProps {
  doctors: any[];
  users: any[];
  appointments: any[];
  payments: any[];
}

const LineGraph: React.FC<LineGraphProps> = ({ doctors, users, appointments, payments }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [appointmentsData, setAppointmentsData] = useState<number[]>([]);
  const [usersData, setUsersData] = useState<number[]>([]);
  const [doctorsData, setDoctorsData] = useState<number[]>([]);
  const [paymentsData, setPaymentsData] = useState<number[]>([]);
  const [view, setView] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const generateMonthlyCounts = (data: any[], key: string) => {
      const counts = Array(12).fill(0);
      data.forEach(item => {
        const date = new Date(item[key]);
        const month = date.getMonth();
        counts[month]++;
      });
      return counts;
    };

    const generateYearlyCounts = (data: any[], key: string) => {
      const counts: Record<string, number> = {};
      data.forEach(item => {
        const date = new Date(item[key]);
        const year = date.getFullYear();
        counts[year] = (counts[year] || 0) + 1;
      });
      return counts;
    };

    const monthlyLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (view === 'monthly') {
      const doctorsMonthlyCounts = generateMonthlyCounts(doctors, 'createdAt');
      const usersMonthlyCounts = generateMonthlyCounts(users, 'createdAt');
      const appointmentsMonthlyCounts = generateMonthlyCounts(appointments, 'createdAt');
      const paymentsMonthlyCounts = generateMonthlyCounts(payments, 'createdAt');

      setLabels(monthlyLabels);
      setDoctorsData(doctorsMonthlyCounts);
      setUsersData(usersMonthlyCounts);
      setAppointmentsData(appointmentsMonthlyCounts);
      setPaymentsData(paymentsMonthlyCounts);
    } else {
      const doctorsYearlyCounts = generateYearlyCounts(doctors, 'createdAt');
      const usersYearlyCounts = generateYearlyCounts(users, 'createdAt');
      const appointmentsYearlyCounts = generateYearlyCounts(appointments, 'createdAt');
      const paymentsYearlyCounts = generateYearlyCounts(payments, 'createdAt');

      const years = Array.from(new Set([
        ...Object.keys(doctorsYearlyCounts),
        ...Object.keys(usersYearlyCounts),
        ...Object.keys(appointmentsYearlyCounts),
        ...Object.keys(paymentsYearlyCounts),
      ])).map(year => parseInt(year, 10));

      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      const yearlyLabels: any = [];
      for (let year = minYear - 2; year <= maxYear + 2; year++) {
        yearlyLabels.push(year.toString());
      }

      const completeYearlyCounts = (counts: Record<string, number>) => {
        const completeCounts = yearlyLabels.map((year: any) => counts[year] || 0);
        return completeCounts;
      };

      setLabels(yearlyLabels);
      setDoctorsData(completeYearlyCounts(doctorsYearlyCounts));
      setUsersData(completeYearlyCounts(usersYearlyCounts));
      setAppointmentsData(completeYearlyCounts(appointmentsYearlyCounts));
      setPaymentsData(completeYearlyCounts(paymentsYearlyCounts));
    }
  }, [view, doctors, users, appointments, payments]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Doctors',
        data: doctorsData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Users',
        data: usersData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Appointments',
        data: appointmentsData,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
      {
        label: 'Payments',
        data: paymentsData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const options:any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly/Yearly Data',
      },
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-white shadow-lg rounded-lg mt-4">
      <div className="flex justify-end w-full mb-4">
        <button
          onClick={() => setView(view === 'monthly' ? 'yearly' : 'monthly')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {view === 'monthly' ? 'Switch to Yearly View' : 'Switch to Monthly View'}
        </button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
