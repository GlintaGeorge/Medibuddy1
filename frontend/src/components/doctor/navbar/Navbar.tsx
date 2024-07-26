import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer/reducer';
import { clearDoctor } from '../../../redux/slices/DoctorSlice';
import { useAppDispatch } from '../../../redux/store/Store';
import showToast from '../../../utils/toaster';
import logo from '../../../assets/images/logo.png'; // Import the logo image

// Navbar component
const Navbar: React.FC = () => {
  // Retrieve doctor information from Redux store
  const doctor = useSelector((state: RootState) => state.DoctorSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  

  // Handle logout function
  const handleLogout = () => {
    dispatch(clearDoctor());
    navigate('/doctor/login');
    showToast("Logout successfully", "success");
  };

  return (
    <nav className="bg-white shadow-lg w-full">
      <div className="px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="Logo" className="h-8 mr-2" />
            <Link to="/" className="text-fuchsia-950 font-bold text-xl">MediBuddy</Link>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center mr-20">
            <div className="hidden md:block">
              <Link to="/doctor" className="text-fuchsia-800 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/doctor/slot" className="text-fuchsia-800 px-3 py-2 rounded-md text-sm font-medium">Slot</Link>
            </div>
            {/* Profile and Login */}
            <div className="flex items-center">
              {doctor.isAuthenticated && doctor.role === 'doctor' ? (
                <>
                  <Link to="/doctor/patientList" className="text-fuchsia-800 px-3 py-2 rounded-md text-sm font-medium">Appointment</Link>
                  <Link to="/doctor/profile" className="text-fuchsia-800 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                  <Link to={`/doctor/status/${doctor.id}`} className="text-fuchsia-800 px-3 py-2 rounded-md text-sm font-medium">Verification</Link>
                  <Link to="/doctor/chat" className="text-fuchsia-800 px-3 py-2 rounded-md text-sm font-medium">Chat</Link>
                  <button onClick={handleLogout} className="bg-fuchsia-950 px-3 py-2 text-white text-sm font-medium hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2">Logout</button>
                </>
              ) : (
                <Link to="/doctor/login" className="bg-fuchsia-950 px-3 py-2 text-white text-sm font-medium hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
