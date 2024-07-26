import React from 'react';
import Navbar from '../../components/user/Navbar/Navbar';
import AppointmentBookingPage from '../../components/user/OnlineBookingPage';




const Appoinment: React.FC = () => {
  return (
    <>
      <Navbar />
     <AppointmentBookingPage/>
     
    </>
  );
};

export default Appoinment;