import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { ADMIN_API } from '../../constants';
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';
import showToast from "../../utils/toaster";
import { AxiosError } from 'axios';

const AddDepartmentPage: React.FC = () => {
  const [departmentName, setDepartmentName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosJWT.post(
        `${ADMIN_API}/addDepartment`,
        { departmentName }
      );
      if (response.data.success) {
        showToast('Department added successfully!', 'success');
        navigate('/admin/department');
      } else {
        showToast('Failed to add department', 'error');
      }
    } catch (error: unknown) {
      let errorMessage = 'An error occurred while adding the department';
      
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      
      showToast(errorMessage, 'error');
      console.error('Error adding department:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center text-fuchsia-950">Add Department</h1>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="departmentName" className="block text-fuchsia-700 text-sm font-bold mb-2">
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-fuchsia-950 text-white rounded hover:bg-fuchsia-600"
              >
                Add Department
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/department')}
                className="px-4 py-2 bg-fuchsia-300 text-gray-700 rounded hover:bg-fuchsia-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentPage;
