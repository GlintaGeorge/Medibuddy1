import React from 'react';
import AdminImage from '../../assets/images/reg.jpg'; // Import the image
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import showToast from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validation";
import { ADMIN_API } from "../../constants";
import { useAppDispatch } from "../../redux/store/Store";
import { setUser } from "../../redux/slices/UserSlice";
import { setItemToLocalStorage } from '../../utils/Set&Get';
import backgroundImage from '../../assets/images/bg1.webp';


const AdminLoginForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateLogin,
      onSubmit: ({ email, password }) => {
        setIsSubmitting(true);
        axios
          .post(ADMIN_API + "/login", { email, password })
          .then(({ data }) => {
            const { name, role } = data.admin;
            const { message, access_token, refresh_token } = data;
            showToast(message, "success");
            setItemToLocalStorage('access_token', access_token); 
          setItemToLocalStorage("refresh_token",refresh_token)
            dispatch(setUser({ isAuthenticated: true, name, role }));
            navigate("/admin");
          })
          .catch(({ response }) => {
            const { message } = response.data;
            setIsSubmitting(false);
            showToast(message, "error");;
          });
      },
    });
    console.log(isSubmitting)
  return (
    <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form className="bg-white shadow-lg rounded-lg bg-opacity-10 p-8 flex flex-col lg:flex-row items-center justify-center lg:ml-20" onSubmit={formik.handleSubmit}>
        <img src={AdminImage} alt="Admin" className="rounded-full w-96 mb-6 lg:mr-8" /> 
        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-bold mb-6 mr-14 text-center text-white shadow-md">Admin Login</h2>
          <div className="mb-6">
            <label className="block text-white text-m  font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-fuchsia-700 leading-tight focus:outline-none mr-20 focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
          </div>
          <div className="mb-6">
            <label className="block text-white text-m font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-fuchsia-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-fuchsia-950 hover:bg-fuchsia-800     text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
