import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Components/formStyle.css';
import axios from 'axios';
import { ApiUrl } from '../../../../../Config/ApiUrl';
import { useNavigate } from 'react-router-dom';
function EditForm({ setShowEditForm, team }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        team_name: team.team_name,
        total_score: team.total_score,
        coach_name: team.coach_name,
        coach_email: team.coach_email,
        coach_phone_number: team.coach_phone_number,
        players: [],
    });

    const [players, setPlayers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await ApiUrl.get("/player");
                setPlayers(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPlayers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (e) => {
        const { options } = e.target;
        const selectedOptions = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);
        setSelectedOptions(selectedOptions);
        setFormData({
            ...formData,
            players: selectedOptions,
        });
    };

    const handleSubmit = async () => {
        const promise = new Promise(async (resolve, reject) => {
            try {
                setLoading(true);
                const response = await ApiUrl.put('/team/' + team.id, formData);
                console.log('Data Updated successfully:', response.data);
                setLoading(false);
                resolve();
                setTimeout(() => {
                    setShowEditForm(false);
                    navigate(0);
                }, 2000);
            } catch (error) {
                console.error('Error Updating data:', error);
                reject(error);
            } finally {
                setLoading(false);
            }
        });

        toast.promise(promise, {
            pending: 'Updating data...',
            success: 'Data Updated successfully 👌',
            error: 'Error Updating data',
        });
    };
    return (
        <>
            <div className="absolute h-screen top-0 left-0 right-0 min-h-screen flex justify-center items-center bg-gray-100 bg-opacity-50 p-0  transition-transform ease-in duration-300 ">
                <div className="mx-auto max-w-md px-6 py-12  bg-white border-0 shadow-lg sm:rounded-3xl md:w-full w-[80%]">
                    <section className='flex justify-between items-center mb-8'>
                        <h1 className="text-2xl text-main    font-bold">Edit Team</h1>
                        <button onClick={() => setShowEditForm(false)} className='text-gray-800'>Close</button>
                    </section>
                    <form id="form" onSubmit={handleSubmit}>
                        <div className="relative z-0 w-full mb-5">
                            <input onChange={handleInputChange} value={formData.team_name} type="text" name="team_name" placeholder=" " required className="pt-3 text-gray-800 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                            <label htmlFor="team_name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Team Name</label>
                            <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
                        </div>
                        <div className="relative z-0 w-full mb-5">
                            <input onChange={handleInputChange} type="text" name="coach_name" value={formData.coach_name} placeholder=" " required className="pt-3 pb-2 text-gray-800 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                            <label htmlFor="coach_name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Your Coach Name</label>
                            <span className="text-sm text-red-600 hidden" id="error">coach_name is required</span>
                        </div>
                        <div className="relative z-0 w-full mb-5">
                            <input onChange={handleInputChange} value={formData.coach_email} type="email" name="coach_email" placeholder=" " className="pt-3 pb-2  text-gray-800 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                            <label htmlFor="email" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Coach Email Address</label>
                            <span className="text-sm text-red-600 hidden" id="error">Coach Email address is required</span>
                        </div>
                        <div className="relative z-0 w-full mb-5">
                            <input onChange={handleInputChange} value={formData.coach_phone_number} type="text" name="coach_phone_number" placeholder=" " className="pt-3 text-gray-800 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                            <label htmlFor="coach_phone_number" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Coach Phone number</label>
                            <span className="text-sm text-red-600 hidden" id="error">coach_phone_number is required</span>
                        </div>

                        <div className="relative z-0 w-full mb-5">
                            <select
                                onChange={handleSelectChange}
                                name="players" // assuming the form data field is 'players'
                                placeholder="Select players"
                                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none text-gray-800 focus:ring-0 focus:border-black border-gray-200"
                                multiple // Add the multiple attribute to allow multiple selections // Set the value based on your form data
                            >
                                {/* Empty option for optional selection */}
                                <option value="" disabled hidden />

                                {/* Use map to render options with player data */}
                                {players.map((player) => (
                                    <option
                                        key={player.id}
                                        value={player.id}
                                        className={` ${selectedOptions.includes(player.id) ? 'text-main' : 'text-gray-800'}`}
                                    >
                                        {player.name}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="select" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Select an Team</label>
                            <span className="text-sm text-red-600 hidden" id="error">Option has to be selected</span>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="relative z-0 w-full mb-5">
                                <input onChange={handleInputChange} value={formData.country} type="text" name="country" placeholder=" " className="pt-3 text-gray-800 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                                <label htmlFor="country" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Country</label>
                                <span className="text-sm text-red-600 hidden" id="error">Country is required</span>
                            </div>
                            <div className="relative z-0 w-full">
                                <input onChange={handleInputChange} value={formData.city} type="text" name="city" placeholder="" className="pt-3 text-gray-800 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                                <label htmlFor="city" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">City</label>
                                <span className="text-sm text-red-600 hidden" id="error">City is required</span>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="relative z-0 w-full mb-5">
                                <input onChange={handleInputChange} value={formData.state} type="text" name="state" placeholder=" " className="pt-3 text-gray-800 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
                                <label htmlFor="state" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">State</label>
                                <span className="text-sm text-red-600 hidden" id="error">State is required</span>
                            </div>
                            <div className="relative z-0 w-full">
                                <input onChange={handleInputChange} value={formData.address} type="text" name="address" placeholder="" className="pt-3 text-gray-800 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
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
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={1000} />
        </>
    )
}

export default EditForm