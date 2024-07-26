import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { USER_API } from '../../constants';
import {  FaVideo } from 'react-icons/fa'; 

const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [departments, setDepartments] = useState<any[]>([]); // Changed to an array
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctors/${id}`);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${USER_API}/departments`); // Assuming the endpoint for fetching departments
        setDepartments(response.data.departments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDoctorDetails();
    fetchDepartments();
  }, [id]);

  const handleOnlineBookAppointment = () => {
    navigate(`/appoinmentOnline/${id}`);
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  // Function to render appointment button based on consultation type
  const renderAppointmentButton = () => {
    return (
      <button onClick={handleOnlineBookAppointment} className="bg-fuchsia-800 text-white py-2 px-4 rounded-lg mt-4">
        <FaVideo className="mr-2" /> Online Appointment
      </button>
    );
  };

  // Function to get department name by ID
  const getDepartmentName = (id: string) => {
    const department = departments.find(department => department._id === id);
    return department ? department.departmentName : 'Unknown Department';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Doctor Details</h1>
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Left Section */}
        <div className="md:w-1/3 mb-4 md:mb-0 ">
          <img src={doctor.profileImage} alt="Doctor" className="h-96 w-96 rounded-lg shadow-md" />
        </div>
        {/* Right Section */}
        <div className="md:w-2/3 md:pl-8">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-gray-600 text-m font-medium text-center mb-2">
              {getDepartmentName(doctor.department)}
            </p>
            <p className="text-lg">{doctor.doctorName}</p>
            <p className="text-lg text-green-500 font-bold">Verified</p>
            {renderAppointmentButton()}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-lg">{doctor.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
