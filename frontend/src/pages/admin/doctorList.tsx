import React, { useState } from 'react';
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';
import useDoctors from "../../hooks/useDoctors";
import DoctorData from "../../components/admin/DoctorData";
import { FaSearch } from 'react-icons/fa';

const DoctorList: React.FC = () => {
  const { doctors } = useDoctors();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const doctorsPerPage = 8;

  const approvedDoctors = doctors.filter(doctor => doctor.isApproved);

  const filteredDoctors = approvedDoctors.filter(doctor =>
    doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDoctors = filteredDoctors.length;
  const totalPages = Math.ceil(totalDoctors / doctorsPerPage);

  const currentDoctors = filteredDoctors.slice((currentPage - 1) * doctorsPerPage, currentPage * doctorsPerPage);

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
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mb-4 text-fuchsia-800">Doctor List</h1>
              <div className="relative ml-20">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-fuchsia-200 text-fuchsia-800 px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500" />
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-fuchsia-950 text-white">
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Department</th>
                    <th className="px-6 py-3 text-left">Verified</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Details</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <DoctorData doctors={currentDoctors} currentPage={currentPage} doctorsPerPage={doctorsPerPage} />
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

export default DoctorList;
