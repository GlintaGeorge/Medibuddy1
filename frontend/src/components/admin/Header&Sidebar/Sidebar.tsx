import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../../redux/store/Store";
import { clearUser } from "../../../redux/slices/UserSlice";
import logout from "../../../utils/logout";
import { FaTachometerAlt, FaUserMd, FaUsers, FaSignOutAlt, FaBriefcaseMedical } from 'react-icons/fa';

const AdminSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUser());
    logout("Logout success");
    navigate("/admin/login");
  };
  return (
    <div className="bg-white text-fuchsia-800 w-64 py-4 px-6 h-full flex flex-col shadow-lg">
      <h1 className="text-2xl font-bold mb-8">MediBuddy</h1>
      <ul className="space-y-2">
        <li>
          <Link
            to="/admin"
            className="flex items-center py-2 px-4 rounded-md hover:bg-fuchsia-200"
          >
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/doctors"
            className="flex items-center py-2 px-4 rounded-md hover:bg-fuchsia-200"
          >
            <FaUserMd className="mr-2" />
            Verified Doctors
          </Link>
        </li>
        <li>
          <Link
            to="/admin/requesteddoctors"
            className="flex items-center py-2 px-4 rounded-md hover:bg-fuchsia-200"
          >
            <FaUserMd className="mr-2" />
            Requested Doctors
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="flex items-center py-2 px-4 rounded-md hover:bg-fuchsia-200"
          >
            <FaUsers className="mr-2" />
            Users
          </Link>
        </li>
        <li>
          
        </li>
        <li>
          <Link
            to="/admin/department"
            className="flex items-center py-2 px-4 rounded-md hover:bg-fuchsia-200"
          >
            <FaBriefcaseMedical className="mr-2" />
            Departments
          </Link>
        </li>
        <li onClick={handleLogout} className="cursor-pointer">
          <a className="flex items-center py-2 px-4 rounded-md hover:bg-fuchsia-200">
            <FaSignOutAlt className="mr-2" />
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
