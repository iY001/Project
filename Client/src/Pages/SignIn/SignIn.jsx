import React, { useState } from 'react'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { ApiUrl } from '../../Config/ApiUrl';

function SignIn() {
  const [cookies, setCookie] = useCookies(['token']);
  const token = cookies.token;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({});

  // Redirect to dashboard if user is already logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

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
          !formData.email ||
          !formData.password
        ) {
          setError("Fill all the fields");
        }

        ApiUrl.post('/user/login', formData).then((response) => {
          const token = response.data.token;
          const user = response.data.user;
          setCookie('token', token);
          setCookie('user', user);
          console.log(token)
        })
        // Simulate a pending state for 3 seconds
        await setTimeout(() => {
          resolve();
        })
      } catch (error) {
        // Handle the error (e.g., display an error message)
        console.error('Error creating account:', error);
        reject(error);
      }
      // localStorage.setItem('user', JSON.stringify(user))
      // setCookie('token', token)
    })

    // Display toast with pending, success, and error states
    toast.promise(resolveAfter3Sec, {
      pending: 'Logging in...',
      success: 'Logged in 👌',
      error: error || 'Error logging in',
    });
  }
  return (
    <><section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <img className="w-[20%]" src="assets/Navbar - icon.png" alt />
          </div>
          <div className="flex items-center justify-center mt-6">
            <Link to="/signin" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 dark:border-main ">
              sign in
            </Link>
            <Link to="/signup" className="w-1/3 pb-4 font-medium text-center text-gray-300 capitalize border-b dark:border-gray-400">
              sign up
            </Link>
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
          <div className="mt-6">
            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-main rounded-lg hover:bg-main hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-main focus:ring-opacity-50">
              Sign In
            </button>
            <div className="mt-6 text-center ">
              <a href="#" className="text-sm text-blue-500 hover:underline dark:text-main">
                Don't Have an Account?
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  )
}

export default SignIn


// <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 ">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//             </svg>
//             <h2 className="mx-3 text-gray-400">Profile Photo</h2>
//             <input id="dropzone-file" type="file" className="hidden" />
//           </label> Image Upload Input
