import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../Config/ApiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddForm from './Components/AddForm';
import EditForm from './Components/EditForm';
import { GoPersonFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Players from './Components/Players';


function Teams() {
    const [showForm, setShowForm] = useState(false);
    const [showPlayers, setShowPlayers] = useState(false)
    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [error, setError] = useState("")
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const getTeams = async () => {
        try {
            const response = await ApiUrl.get("/team")
            setTeams(response.data)
        } catch (err) {
            console.log(err)
            setError(err, "Something went wrong")
        }
    }
    useEffect(() => {
        getTeams()
    }, [])

    const deleteTeam = async () => {
        try {
            const promise = new Promise(async (resolve, reject) => {
                setLoading(true);
                try {
                    const response = await ApiUrl.delete(`/team/${selectedTeam.id}`);
                    toast.success(response.data.message);

                    setTimeout(() => {
                        resolve();
                        setLoading(false);
                        setShowPlayers(false);
                        navigate(0);
                    }, 2000);
                    console.log("Team deleted successfully");
                } catch (error) {
                    setLoading(false);
                    console.error('Error deleting player:', error);
                    toast.error(error.response.data.error);
                    reject(error);
                }
            });

            toast.promise(promise, {
                pending: 'Deleting Team...',
                success: 'Team deleted successfully 👌',
                error: 'Error deleting Team',
            });
        } catch (error) {
            console.error('Error deleting team:', error);
            // Handle error as needed
        }
    };
    const sortedTeams = teams.slice().sort((a, b) => b.total_score - a.total_score);
    console.log("from teams", teams.players)
    return (
        <div className="md:py-2 lg:px-4">
            <h1 className="text-3xl text-main font-medium">Teams</h1>

            <div className='p-12 flex flex-wrap lg:flex-row flex-col'>
                {
                    error ? <h1>{error}</h1> :
                        sortedTeams.map((team) => (
                            <div key={team.id} className='lg:w-[25%] h-[350px] bg-main bg-opacity-80 flex flex-col lg:mx-4 my-4 rounded-md shadow-xl ring-2 ring-main ring-opacity-50'>
                                <div className='w-full py-4 flex lg:flex-col flex-col text-6xl items-center px-4'>
                                    <section className='flex w-full'>
                                        <h1 className='text-white text-xl'>{team.team_name}</h1>
                                    </section>
                                    <section className='flex flex-wrap text-left w-full'>
                                        <h1 className='text-white text-2xl font-bold'></h1>
                                        <p className='text-gray-100 text-sm font-semibold mr-2'>Total Score : {team.total_score} </p>
                                        <p className='text-gray-100 text-sm font-semibold'>Captain : {team.coach_name}</p>
                                    </section>
                                </div>
                                {/* Info Section */}
                                <div className='w-full bg-gray-100 h-[80%] flex lg:flex-col flex-col text-6xl items-center ring-2 ring-gray-300 px-2 overflow-hidden'>
                                    <section className='w-full'>
                                        <h1 className='text-main text-opacity-70 uppercase font-bold text-xl'>Best Players</h1>
                                        <div className='w-full flex flex-wrap items-center'>
                                            {team.players.length === 0 ? (
                                                <h1 className='text-main text-xl mx-auto font-bold uppercase my-5'>No Players</h1>
                                            ) : (
                                                team.players
                                                    .slice()
                                                    .sort((a, b) => b.score - a.score)
                                                    .slice(0, 4)
                                                    .map((player) => (
                                                        <div className='w-[50%] text-center' key={player.id}>
                                                            <GoPersonFill className='text-main mx-auto' />
                                                            <h1 className='text-main text-xl'>{player.name}</h1>
                                                        </div>
                                                    ))
                                            )}
                                        </div>
                                    </section>
                                </div>
                                {/* Players Section */}
                                <section className='text-gray-100 py-2 h-[15%] hover:text-white flex lg:justify-end w-full justify-center '>
                                    {/* Pass the clicked team to the setShowPlayers function */}
                                    <button onClick={() => { setShowPlayers(!showPlayers); setPlayers(team.players); setSelectedTeam(team) }} className='bg-white lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-main px-8 py-1 rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>More</button>
                                    {/* Show the Players component if showPlayers is true */}
                                    {showPlayers && (
                                        <Players
                                            showPlayers={showPlayers}
                                            setShowPlayers={setShowPlayers}
                                            teamPlayers={players}
                                            team={selectedTeam}
                                            deleteTeam={deleteTeam}
                                        />
                                    )}
                                </section>
                            </div>
                        ))
                }
            </div>

            <div className='flex justify-end p-12'>
                <button onClick={() => setShowForm(!showForm)} className='bg-main hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 active:ring-gray-400 text-white font-bold rounded-[4.4px] py-4 px-8 duration-300'>Add Team</button>
            </div>
            {showForm && <AddForm showForm={showForm} setShowForm={setShowForm} />}
        </div>
    )
}

export default Teams