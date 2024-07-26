import React from 'react'
import Navbar from '../../components/doctor/navbar/Navbar'
import PatientListPage from '../../components/doctor/PatientList'


const ListPage:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <PatientListPage/>
    </>
    
  )
}

export default ListPage