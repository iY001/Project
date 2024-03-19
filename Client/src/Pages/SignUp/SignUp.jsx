import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, redirect, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiUrl } from '../../Config/ApiUrl';

function SignUp() {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/already-logged-in')
    }
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resolveAfter3Sec = new Promise(async (resolve, reject) => {
      try {
        if (
          !formData.username ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError("Fill all the fields");
          return;
        }
        if (
          formData.password !== formData.confirmPassword
        ) {
          setError("Passwords don't match");
          return;
        }
        // Simulate a pending state for 3 seconds

        // Make a POST request to your signup API endpoint
        const response = await ApiUrl.post('/user/register', formData);
        await setTimeout(() => {
          setError(response.data.error);
          resolve();
          navigate('/signin');
        }, 3000);
      } catch (error) {
        // Handle the error (e.g., display an error message)
        console.error('Error creating account:', error);
        reject(error);
      }
    });

    // Display toast with pending, success, and error states
    toast.promise(resolveAfter3Sec, {
      pending: 'Creating account...',
      success: 'Account created successfully 👌',
      error: error || 'Error creating account',
    });
  };


  return (
    <><section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <img className="w-[20%]" src="assets/Navbar - icon.png" alt />
          </div>
          <div className="flex items-center justify-center mt-6">
            <Link to="/signin" className="w-1/3 pb-4 font-medium text-center text-gray-300 capitalize border-b dark:border-gray-400 ">
              sign in
            </Link>
            <Link to="/signup" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 dark:border-main ">
              sign up
            </Link>
          </div>
          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input onChange={handleChange} name="username" value={formData.username} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11   dark:border-gray-600 focus:border-main dark:focus:main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
          </div>
          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input onChange={handleChange} name="email" value={formData.email} type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11   dark:border-gray-600 focus:border-main dark:focus:main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
          </div>
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input onChange={handleChange} name="password" value={formData.password} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg   dark:border-gray-600 focus:border-main dark:focus:main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
          </div>
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input onChange={handleChange} name="confirmPassword" value={formData.confirmPassword} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg   dark:border-gray-600 focus:border-main dark:focus:main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" />
          </div>
          <div className="mt-6">
            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-main rounded-lg hover:bg-main hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-main focus:ring-opacity-50">
              Sign Up
            </button>
            <div className="mt-6 text-center ">
              <a href="#" className="text-sm text-blue-500 hover:underline dark:text-main">
                Already have an account?
              </a>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </section>

    </>
  )
}

export default SignUp


// <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 ">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//             </svg>
//             <h2 className="mx-3 text-gray-400">Profile Photo</h2>
//             <input id="dropzone-file" type="file" className="hidden" />
//           </label> Image Upload Input
