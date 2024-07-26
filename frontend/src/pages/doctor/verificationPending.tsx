import React from 'react';
import { Link } from "react-router-dom";

const VerificationPending: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Verification Pending</h2>
        <p className="text-gray-700 text-center mb-4">
          Your account is awaiting approval from the admin. Please check back later.
        </p>
        <div className="flex justify-center">
          <Link to="/" className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-8 rounded">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
