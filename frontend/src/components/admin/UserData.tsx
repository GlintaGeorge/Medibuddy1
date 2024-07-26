import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import 'react-toastify/dist/ReactToastify.css';
import { UserInterface } from "../../types/userInterface";

interface UserDataProps extends UserInterface {
  serial: number; // Add serial number prop
}

const UserData: React.FC<UserDataProps> = ({
  serial, // Destructure serial number
  _id,
  name,
  email,
  isBlocked,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isBlocked);

  const handleCheckboxChange = () => {
    const action = isChecked ? "unblock" : "block";
    const toastId = toast(
      <div>
        <p>Do you really want to {action} this user?</p>
        <button
          onClick={() => {
            setIsChecked(!isChecked);
            axiosJWT
              .patch(`${ADMIN_API}/block_user/${_id}`)
              .then((response) => {
                if (response.data.success) {
                  toast.success(response.data.message);
                }
              })
              .catch((err) => console.log(err));

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
      <tr className="bg-white border-b dark:bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-fuchsia-200">
        <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-fuchsia-950">
          {serial}
        </td>
        <td className="px-6 py-4 text-left text-fuchsia-950">{name}</td>
        <td className="px-6 py-4 text-left text-fuchsia-950">{email}</td>
        <td className="px-6 py-4 text-left text-fuchsia-950">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isChecked ? "bg-red-500" : "bg-green-400"
              }`}
            ></div>
            <p>{isChecked ? "Blocked" : "Active"}</p>
          </div>
        </td>
        <td className="px-6 py-4 text-left">
          <label className="flex cursor-pointer select-none items-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <div
                className={`box block h-6 w-10 rounded-full border-2 ${
                  isChecked ? "bg-red-500  border-red-700" : "bg-primary  border-fuchsia-950"
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-950 transition ${
                  isChecked ? "translate-x-full" : ""
                }`}
              ></div>
            </div>
          </label>
        </td>
      </tr>
    </>
  );
};

export default UserData;
