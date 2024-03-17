import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Components/formStyle.css';
import axios from 'axios';
import { ApiUrl } from '../../../../../Config/ApiUrl';
import { useNavigate } from 'react-router-dom';
function AddEvent({ setShowForm }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    event_name: "",
    start_date: "",
    end_date: "",
    max_score: "",
    venue: "",
    organizer_name: "",
    organizer_email: "",
    organizer_phone_number: ""
  });

  console.log(formData)
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsResponse] = await Promise.all([
          ApiUrl.get("/team")
        ]);
        setTeams(teamsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true)

      // Create event

      await ApiUrl.post("/event", formData);

      // Show success message
      toast.success("Match created successfully!");

      // Reset form and navigate
      setFormData({
        event_name: "",
        start_date: "",
        end_date: "",
        max_score: "",
        venue: "",
        organizer_name: "",
        organizer_email: "",
        organizer_phone_number: ""
      });
      setLoading(false)
      navigate(0);
    } catch (error) {
      setLoading(false)
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center bg-gray-100 bg-opacity-50 p-0  transition-transform ease-in duration-300 ">
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl md:w-full w-[80%]">
          <section className='flex justify-between items-center mb-8'>
            <h1 className="text-2xl text-main    font-bold">Create New Event</h1>
            <button onClick={() => setShowForm(false)}>Close</button>
          </section>
          <form id="form" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5">
              <input onChange={handleInputChange} type="text" name="event_name" placeholder=" " required className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Event Name</label>
              <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
            </div>
            <div className="relative z-0 w-full mb-5">
              <input onChange={handleInputChange} type="text" name="organizer_name" placeholder=" " required className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Organizer name</label>
              <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
            </div>
            <div className="relative z-0 w-full mb-5">
              <input onChange={handleInputChange} type="text" name="organizer_email" placeholder=" " required className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Organizer Email</label>
              <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
            </div>
            <div className="relative z-0 w-full mb-5">
              <input onChange={handleInputChange} type="text" name="organizer_phone_number" placeholder=" " required className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Organizer Phonenumber</label>
              <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
            </div>
            <div className="relative z-0 w-full mb-5">
              <input onChange={handleInputChange} type="text" name="max_score" placeholder=" " required className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Max Score</label>
              <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
            </div>

            <div className="relative z-0 w-full mb-5">
              <input onChange={handleInputChange} type="date" name="start_date" placeholder=" " className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              <label htmlFor="match_date" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Start Date</label>
              <span className="text-sm text-red-600 hidden" id="error">match date is required</span>
            </div>
            <div className="relative z-0 w-full mb-5">
              <input onChange={handleInputChange} type="date" name="end_date" placeholder=" " className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              <label htmlFor="match_date" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter End Date</label>
              <span className="text-sm text-red-600 hidden" id="error">match date is required</span>
            </div>
            <div className="relative z-0 w-full mb-5">
              <input onChange={handleInputChange} type="text" name="venue" placeholder=" " required className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">venue</label>
              <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
            </div>
            <button
              disabled={loading}
              id="button"
              type="button"
              onClick={handleSubmit} // Call the handleSubmit function on button click // Disable the button while the form is being submitted
              className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-main hover:text-white hover:bg-opacity-80 hover:shadow-lg focus:outline-none"
            >
              {loading ? 'Submitting...' : 'Send'}
            </button>
          </form>
        </div >
      </div >
      <ToastContainer position="bottom-right" autoClose={1000} />
    </>
  )
}

export default AddEvent