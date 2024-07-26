import React from 'react';
import { Link } from 'react-router-dom';
import { DoctorInterface } from '../../types/DoctorInterface';

interface RequestedDoctorDataProps {
  doctors: DoctorInterface[];
  currentPage: number;
  doctorsPerPage: number;
}

const RequestedDoctorData: React.FC<RequestedDoctorDataProps> = ({ doctors, currentPage, doctorsPerPage }) => {
  return (
    <>
      {doctors.map((doctor, index) => (
        <tr key={doctor._id} className="bg-white border-b dark:bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-fuchsia-200">
          <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-fuchsia-950">
            {(currentPage - 1) * doctorsPerPage + index + 1} {/* Display serial number */}
          </td>
          <td className="px-6 py-4 text-left text-fuchsia-950">{doctor.doctorName}</td>
          <td className="px-6 py-4 text-left text-fuchsia-950">{doctor.email}</td>
          <td className="px-6 py-4 text-left text-fuchsia-950">{doctor.department}</td>
          <td className="px-6 py-4 text-left text-fuchsia-950">
            <Link to={`/admin/doctors/${doctor._id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </td>
          <td className="px-6 py-4 text-left">
            <Link
              to={`/admin/doctors/${doctor._id}/verification`}
              className="bg-fuchsia-900 hover:bg-fuchsia-800 text-white font-bold py-2 px-4 rounded ml-10"
            >
              Verify
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default RequestedDoctorData;
