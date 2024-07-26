import React from 'react'
import Navbar from '../../components/doctor/navbar/Navbar'
import PatientDetailPage from '../../components/doctor/SinglePatientDetailsPage'


const SinglePagePatient :React.FC = () => {
  return (
    <>
    <Navbar/> 
    <PatientDetailPage/>
    </>
    
  )
}

export default SinglePagePatient;