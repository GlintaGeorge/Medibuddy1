import React from 'react'
import Navbar from '../../components/doctor/navbar/Navbar'
import DoctorStatusPage from '../../components/doctor/DoctorStatusPage'


const DoctorStatus :React.FC = () => {
  return (
    <>
    <Navbar/> 
    <DoctorStatusPage/>
    </>
    
  )
}

export default DoctorStatus;