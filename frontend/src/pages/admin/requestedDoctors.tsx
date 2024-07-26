import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';
import RequestedDoctorData from '../../components/admin/RequestDoctors';
import { DoctorInterface } from '../../types/DoctorInterface';
import { ADMIN_API } from '../../constants';

const RequestedDoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${ADMIN_API}/doctors`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data.doctors.filter((doctor: DoctorInterface) => !doctor.isApproved));
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const totalDoctors = doctors.length;
  const totalPages = Math.ceil(totalDoctors / doctorsPerPage);

  const currentDoctors = doctors.slice((currentPage - 1) * doctorsPerPage, currentPage * doctorsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
        <div className="flex-grow p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4  text-fuchsia-800">Requested Doctor List</h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-fuchsia-950  text-white">
                    <th className="px-6 py-3 text-left">Serial Number</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Department</th>
                    <th className="px-6 py-3 text-left">Details</th>
                    <th className="px-6 py-3 text-left">Verification Request</th>
                  </tr>
                </thead>
                <tbody>
                  <RequestedDoctorData doctors={currentDoctors} currentPage={currentPage} doctorsPerPage={doctorsPerPage} />
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-fuchsia-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-fuchsia-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedDoctorList;
