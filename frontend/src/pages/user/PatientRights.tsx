import React from 'react';
import Navbar from '../../components/user/Navbar/Navbar';
import Footer from '../../components/user/Footer/Footer';
import DoctorDetailsPage from '../../components/user/PatientRightsPage';



const PatientRights: React.FC = () => {
  return (
    <>
      <Navbar />
      
      <DoctorDetailsPage/>
      <Footer />
    </>
  );
};

export default PatientRights;