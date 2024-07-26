import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { USER_API } from '../../constants';
import styled from 'styled-components';

// Styled components for setting overflow-x hidden
const Container = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

const Body: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const departmentResponse = await axiosJWT.get(`${USER_API}/departments`);
        console.log('Department response:', departmentResponse);

        if (departmentResponse.data.success) {
          const listedDepartments = departmentResponse.data.departments.filter(
            (department: any) => department.isListed
          );
          setDepartments(listedDepartments);

          const departmentIds = listedDepartments.map(
            (department: any) => department._id
          );

          const response = await axiosJWT.get(`${USER_API}/doctors`);

          console.log('Doctor response:', response);

          const filteredDoctors = response.data.doctors.filter(
            (doctor: any) =>
              departmentIds.includes(doctor.department) &&
              doctor.isApproved === true
          );

          console.log('Filtered doctors:', filteredDoctors);

          setDoctors(filteredDoctors);
        } else {
          throw new Error("Failed to fetch department details");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-fuchsia-800 font-bold mb-5">Our Services</h1>

        {/* Online and Offline Consultation Cards */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {/* Online Consultation Card */}
          <Link to="/doctors" className="max-w-xs w-full">
            <div className="bg-gray-100 rounded-lg shadow-2xl border border-gray-300 flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-105">
              <img src="https://plus.unsplash.com/premium_photo-1661671883217-0b7e7dd5003a?q=80&w=1770&auto=format&fit=crop" alt="Online Consultation" className="h-72 w-full object-cover rounded-t-lg mt-7 transition-transform duration-300 hover:scale-105" />
              <div className="p-4 text-center">
                <h2 className="text-lg text-fuchsia-800 font-semibold mb-2">Online Consultation</h2>
                <p className="text-fuchsia-500 mb-4">Book an appointment for online consultation.</p>
              </div>
            </div>
          </Link>

          {/* 24/7 Health Support */}
          <Link to="/chat" className="max-w-xs w-full">
            <div className="bg-gray-100 rounded-lg shadow-2xl border border-gray-300 flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-105">
              <img src="https://plus.unsplash.com/premium_photo-1661699717204-82c08926c77a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Offline Consultation" className="h-72 w-full object-cover rounded-t-lg mt-7 transition-transform duration-300 hover:scale-105" />
              <div className="p-4 text-center">
                <h2 className="text-lg text-fuchsia-800 font-semibold mb-2">24/7 Health Support</h2>
                <p className="text-fuchsia-500 mb-4">Reliable medical advice and assistance whenever you need it</p>
              </div>
            </div>
          </Link>

          {/* Offline Consultation Card */}
          <Link to="/PatientRights" className="max-w-xs w-full">
            <div className="bg-gray-100 rounded-lg shadow-2xl border border-gray-300 flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-105">
              <img src="https://media.istockphoto.com/id/1473559425/photo/female-medical-practitioner-reassuring-a-patient.jpg?s=612x612&w=0&k=20&c=kGbm-TE5qdppyyiteyip7_CzKLktyPrRuWD4Zz2EcqE=" alt="Offline Consultation" className="h-72 w-full object-cover rounded-t-lg mt-7 transition-transform duration-300 hover:scale-105" />
              <div className="p-4 text-center">
                <h2 className="text-lg text-fuchsia-800 font-semibold mb-2">Patient Rights and Responsibilities</h2>
                <p className="text-fuchsia-500 mb-4">Right to obtain reasonable care and treatment.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Doctors Section */}
        <h1 className="text-2xl text-fuchsia-800 font-bold mb-5">Our Doctors</h1>
        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {doctors.map((doctor) => (
            <Link to="/doctors" key={doctor._id}>
              <div className="shadow-md rounded-lg p-6 cursor-pointer flex flex-col justify-center items-center bg-fuchsia-100 hover:bg-fuchsia-100 transition-transform duration-300 hover:scale-105">
                <img
                  src={doctor.profileImage}
                  alt="Doctor"
                  className="w-64 h-64 mx-auto rounded mb-4 transition-transform duration-300 hover:scale-105"
                />
                <h2 className="text-xl font-semibold text-center mb-2">
                  {doctor.doctorName}
                </h2>
                <p className="text-gray-600 text-m font-medium text-center mb-2">
                {departments[doctor.department as string]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Body;
