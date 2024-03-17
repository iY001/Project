import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Components/formStyle.css';
import axios from 'axios';
import { ApiUrl } from '../../../../../Config/ApiUrl';
import { useNavigate } from 'react-router-dom';
function AddForm({ setShowForm }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        age: Number,
        email: '',
        phonenumber: '',
        gender: '',
        country: '',
        city: '',
        address: '',
        state: '',
        team_id: ''
    });
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await ApiUrl.get("/team")
                setTeams(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getTeams()
    }, []);

    console.log(teams)

    // State variable to manage loading state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Function to handle form input onChange={handleInputChange} changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log("form submitted", formData)
    };
    const handleRadioChange = (value) => {
        setFormData({
            ...formData,
            gender: value,
        });
    };

    const handleAgeChange = (e) => {
        const value = parseInt(e.target.value);
        setFormData({
            ...formData,
            age: value,
        })
    }
    // Function to handle form submission
    const handleSubmit = async () => {
        const promise = new Promise(async (resolve, reject) => {
            try {
                // Start loading
                setLoading(true);

                // Make the API request using Axios to add a new player
                const response = await ApiUrl.post('/player', formData);

                // Handle the response as needed
                console.log('Data submitted successfully:', response.data);

                setLoading(false);
                // Close the form or perform any other necessary action


                // Resolve the promise
                resolve();

                setTimeout(() => {
                    setShowForm(false);
                    navigate(0);
                }, 2000)
            } catch (error) {
                // Handle errors
                setError(error.response.data.message || 'An error occurred while submitting the data.');
                console.error(error.response.data.message);

                // Reject the promise with the error
                reject(error);
            } finally {
                // Stop loading whether the request was successful or not
                setLoading(false);
            }
        });

        // Use react-toastify to show a loading message
        toast.promise(promise, {
            pending: 'Submitting data...',
            success: 'Data submitted successfully 👌',
            error: error || 'Error submitting data.',
        });
    };
    return (
        <>
            <div className="absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center bg-gray-100 bg-opacity-50 p-0  transition-transform ease-in duration-300 ">
                <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl md:w-full w-[80%]">
                    <section className='flex justify-between items-center mb-8'>
                        <h1 className="text-2xl text-main    font-bold">Add Player</h1>
                        <button onClick={() => setShowForm(false)}>Close</button>
                    </section>
                    <form id="form" onSubmit={handleSubmit}>
                        <div className="relative z-0 w-full mb-5">
                            <input onChange={handleInputChange} type="text" name="name" placeholder=" " required className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                            <label htmlFor="name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter name</label>
                            <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
                        </div>
                        <div className="relative z-0 w-full mb-5">
                            <input onChange={handleAgeChange} type="text" name="age" placeholder=" " required className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                            <label htmlFor="age" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Your Age</label>
                            <span className="text-sm text-red-600 hidden" id="error">Age is required</span>
                        </div>
                        <div className="relative z-0 w-full mb-5">
                            <input onChange={handleInputChange} type="email" name="email" placeholder=" " className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                            <label htmlFor="email" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter email address</label>
                            <span className="text-sm text-red-600 hidden" id="error">Email address is required</span>
                        </div>
                        <div className="relative z-0 w-full mb-5">
                            <input onChange={handleInputChange} type="text" name="phonenumber" placeholder=" " className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                            <label htmlFor="phonenumber" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Phone number</label>
                            <span className="text-sm text-red-600 hidden" id="error">phonenumber is required</span>
                        </div>
                        <fieldset className="relative z-0 w-full p-px mb-5">
                            <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">Choose an option </legend>
                            <div className="block pt-3 pb-2 space-x-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male" // Check if the radio value is 'Male'
                                        onChange={() => handleRadioChange('Male')} // Update the radio value to 'Male' on change
                                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"// Check if the radio value is 'Female'
                                        onChange={() => handleRadioChange('Female')} // Update the radio value to 'Female' on change
                                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                    />
                                    Female
                                </label>
                            </div>
                            <span className="text-sm text-red-600 hidden" id="error">
                                Option has to be selected
                            </span>
                        </fieldset>
                        <div className="relative z-0 w-full mb-5">
                            <select onChange={handleInputChange} name="team_id" placeholder="selet a team" className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200">
                                <option value selected disabled hidden />
                                {
                                    teams.map((team) => (
                                        <option value={team.id}>{team.team_name}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="select" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Select an Team</label>
                            <span className="text-sm text-red-600 hidden" id="error">Option has to be selected</span>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="relative z-0 w-full mb-5">
                                <input onChange={handleInputChange} type="text" name="country" placeholder=" " className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                                <label htmlFor="country" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Country</label>
                                <span className="text-sm text-red-600 hidden" id="error">Country is required</span>
                            </div>
                            <div className="relative z-0 w-full">
                                <input onChange={handleInputChange} type="text" name="city" placeholder="" className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                                <label htmlFor="city" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">City</label>
                                <span className="text-sm text-red-600 hidden" id="error">City is required</span>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="relative z-0 w-full mb-5">
                                <input onChange={handleInputChange} type="text" name="state" placeholder=" " className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                                <label htmlFor="state" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">State</label>
                                <span className="text-sm text-red-600 hidden" id="error">State is required</span>
                            </div>
                            <div className="relative z-0 w-full">
                                <input onChange={handleInputChange} type="text" name="address" placeholder="" className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                                <label htmlFor="address" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Address</label>
                                <span className="text-sm text-red-600 hidden" id="error">Address is required</span>
                            </div>
                        </div>
                        <button
                            id="button"
                            type="button"
                            onClick={handleSubmit} // Call the handleSubmit function on button click
                            disabled={loading} // Disable the button while the form is being submitted
                            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-main hover:text-white hover:bg-opacity-80 hover:shadow-lg focus:outline-none"
                        >
                            {loading ? 'Submitting...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={1000} />
        </>
    )
}

export default AddForm