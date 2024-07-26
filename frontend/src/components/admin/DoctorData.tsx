import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADMIN_API } from '../../constants';
import axiosJWT from '../../utils/axiosService';
import { DoctorInterface } from '../../types/DoctorInterface';
import { clearDoctor } from '../../redux/slices/DoctorSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DoctorDataProps {
  doctors: DoctorInterface[];
  currentPage: number;
  doctorsPerPage: number;
}

const DoctorData: React.FC<DoctorDataProps> = ({ doctors }) => {
  const dispatch = useDispatch();

  const handleCheckboxChange = (doctor: DoctorInterface) => {
    const action = doctor.isBlocked ? "unblock" : "block";
    const toastId = toast(
      <div>
        <p>Do you really want to {action} this doctor?</p>
        <button
          onClick={() => {
             doctors.map((item) => {
              if (doctor._id === item._id) {
                doctor.isBlocked = !doctor.isBlocked;
                if (doctor.isBlocked) {
                  dispatch(clearDoctor());
                }
              }
              return item;
            });

            axiosJWT.patch(`${ADMIN_API}/block_doctor/${doctor._id}`)
              .then(response => {
                if (response.data.success) {
                  toast.success(response.data.message);
                }
              }).catch((err) => console.log(err));

            toast.dismiss(toastId);
          }}
          className="bg-blue-500 text-white p-1 m-1 rounded"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(toastId)}
          className="bg-gray-500 text-white p-1 m-1 rounded"
        >
          No
        </button>
      </div>,
      { autoClose: false }
    );
  };

  return (
    <>
      <ToastContainer />
      {doctors.map((doctor: DoctorInterface, index: number) => (
        <tr key={doctor._id} className="bg-white border-b dark:bg-white dark:border-black-700 hover:bg-gray-50 dark:hover:bg-fuchsia-200">
          <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-fuchsia-950">
            {index + 1}
          </td>
          <td className="px-6 py-4 text-left text-fuchsia-950">{doctor.doctorName}</td>
          <td className="px-6 py-4 text-left text-fuchsia-950">{doctor.email}</td>
          <td className="px-6 py-4 text-left text-fuchsia-950">{doctor.department}</td>
          <td className="px-6 py-4 text-left text-fuchsia-950">
            {doctor.isVerified ? 'Yes' : 'No'}
          </td>
          <td className="px-6 py-4 text-left text-fuchsia-950">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${doctor.isBlocked ? "bg-red-500" : "bg-green-400"}`}></div>
              <p>{doctor.isBlocked ? "Blocked" : "Active"}</p>
            </div>
          </td>
          <td className="px-6 py-4 text-left">
            <Link to={`/admin/doctors/${doctor._id}`} className="text-blue-950 hover:underline">
              View Details
            </Link>
          </td>
          <td className="px-6 py-4 text-left">
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={doctor.isBlocked}
                  onChange={() => handleCheckboxChange(doctor)}
                  className="sr-only"
                />
                <div className={`box block h-6 w-10 rounded-full border-2 ${doctor.isBlocked ? "bg-red-500 border-red-700" : "bg-primary border-fuchsia-950"}`}></div>
                <div className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-950 transition ${doctor.isBlocked ? "translate-x-full" : ""}`}></div>
              </div>
            </label>
          </td>
        </tr>
      ))}
    </>
  );
};

export default DoctorData;
