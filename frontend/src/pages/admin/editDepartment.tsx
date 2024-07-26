import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { ADMIN_API } from '../../constants';
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';
import showToast from "../../utils/toaster";
import { AxiosError } from 'axios';

const EditDepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState('');
  const [isListed, setIsListed] = useState(false);
   
  useEffect(() => {
    axiosJWT.put(`${ADMIN_API}/department/${id}`)
      .then(response => {
        setDepartmentName(response.data.departmentName);
        setIsListed(response.data.isListed);
      })
      .catch(error => {
        console.log(error);
        showToast('Failed to fetch department details', 'error');
      });
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosJWT.put(
        `${ADMIN_API}/department/${id}`,
        { departmentName, isListed }
      );
      if (response.data.success) {
        showToast('Department updated successfully!', 'success');
        navigate('/admin/department');
      } else {
        showToast('Failed to update department', 'error');
      }
    } catch (error: unknown) {
      let errorMessage = 'An error occurred while updating the department';

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      showToast(errorMessage, 'error');
      console.error('Error updating department:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center text-fuchsia-950">Edit Department</h1>
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
            <div className="mb-4">
              <label htmlFor="isListed" className="block text-fuchsia-700 text-sm font-bold mb-2">
                Is Listed
              </label>
              <input
                type="checkbox"
                id="isListed"
                checked={isListed}
                onChange={(e) => setIsListed(e.target.checked)}
                className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-fuchsia-950 text-white rounded hover:bg-fuchsia-600"
              >
                Save Changes
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

export default EditDepartmentPage;
