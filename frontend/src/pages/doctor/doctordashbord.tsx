import React from 'react'
import Navbar from '../../components/doctor/navbar/Navbar'
import Banner from '../../components/doctor/Banner'
import Footer from '../../components/doctor/footer/Footer'
import Body from '../../components/doctor/Body'

const doctorDashboard:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <Banner/>
    <Body/>
    <Footer style={''}/>
    </>
    
  )
}

export default doctorDashboard