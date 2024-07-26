import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/reducer/reducer';
import showToast from '../../../utils/toaster';
import { clearUser } from '../../../redux/slices/UserSlice';
import logo from '../../../assets/images/logo.png'; // Import the logo image
import { removeItemFromLocalStorage } from '../../../utils/Set&Get';
import { IoIosNotifications } from "react-icons/io";
import UserNotification from "../userNotification";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  

  const user = useSelector((state: RootState) => state.UserSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    removeItemFromLocalStorage("access_token");
    removeItemFromLocalStorage("refresh_token");
    showToast("Logged out successfully", "success");
    navigate('/login');
  };

  

  return (
    <nav className="bg-white shadow-lg w-full">
      <div className="px-4">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          {/* Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="logo" className="h-8 mr-2" />
            <Link to="/" className="text-fuchsia-950 font-bold text-xl">MediBuddy</Link>
          </div>
          <button
            className="block md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className={`w-full md:flex md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">


          {/* Navigation Links */}
          <div className="flex items-center">
            <div className="absolute top-1/2 ml-72 transform -translate-x-1/2 -translate-y-1/2 text-left animate-fadeInOut"></div>

            {/* Profile and Login/Logout */}
            <div className="flex flex-col md:flex-row items-center">
              {user.isAuthenticated && user.role === 'user' ? (
                <>
                <Link to="/" className="text-fuchsia-950 hover:bg-fuchsia-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link to="/profile" className="text-fuchsia-950 hover:bg-fuchsia-200 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                  <Link to="/doctors" className="text-fuchsia-950 hover:bg-fuchsia-200 px-3 py-2 rounded-md text-sm font-medium">Doctors</Link>
                  <Link to="/aboutUs" className="text-fuchsia-950 hover:bg-fuchsia-200 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                  <Link to="/contact" className="text-fuchsia-950 hover:bg-fuchsia-200 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                  <div className="relative">
                    <button
                     onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="px-3 py-2 rounded-md text-sm font-medium text-fuchsia-950 hover:bg-fuchsia-200 md:ml-2"
                    >
                      Services
                    </button>
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        <Link to="/appoinmentlist" className="block px-4 py-2 text-fuchsia-950 hover:bg-fuchsia-100">
                          Appointment List
                        </Link>
                        <Link to="/wallet" className="block px-4 py-2 text-fuchsia-950 hover:bg-fuchsia-100">
                          Wallet
                        </Link>
                      </div>
                    )}
                  </div>
                  <button onClick={handleLogout} className="text-fuchsia-950 px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-opacity-50 rounded-md ml-2">Logout</button>
                  <div
                  onClick={() => setNotification(true)}
                  className="flex items-center cursor-pointer"
                >
                  <IoIosNotifications className="text-[20px]" />
                </div>
                {notification && (
                  <UserNotification setNotification={setNotification} />
                )}
                </>
              ) : (
                <>
                <Link to="/" className="text-fuchsia-950 hover:bg-fuchsia-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/aboutUs" className="text-fuchsia-950 hover:bg-fuchsia-200 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                <Link to="/contact" className="text-fuchsia-950 hover:bg-fuchsia-200 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                <Link to="/login" className="text-white px-3 py-2 text-sm font-medium bg-fuchsia-950 hover:bg-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-opacity-50 rounded-md ml-2">Patient Login </Link>
                <Link to="/doctor/login" className="text-white px-3 py-2 text-sm font-medium bg-fuchsia-950 hover:bg-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-opacity-50 rounded-md ml-2">Doctor Login </Link>
                
                </>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
