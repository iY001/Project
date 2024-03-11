import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoPersonFill } from "react-icons/go";
import { ApiUrl } from '../../../../Config/ApiUrl'
import AddForm from './Components/AddForm';
import { IoClose } from "react-icons/io5";
import { redirect, useNavigate } from 'react-router-dom';

const ReadMore = ({ setShowMore, selectedPlayer }) => {
    const navigate = useNavigate();
    console.log(selectedPlayer.id)
    const deletePlayer = async (playerId) => {
        console.log(playerId)
        try {
            // Use react-toastify to show a loading message
            const promise = new Promise(async (resolve, reject) => {
                try {
                    await ApiUrl.delete(`/player/${playerId}`);
                    resolve();
                    setShowMore(false);
                    navigate(0);
                } catch (error) {
                    console.error('Error deleting player:', error);
                    reject(error);
                }
            });

            toast.promise(promise, {
                pending: 'Deleting player...',
                success: 'Player deleted successfully 👌',
                error: 'Error deleting player',
            });
        } catch (error) {
            console.error('Error deleting player:', error);
            // Handle error as needed
        }
    };
    return (
        <>
            <div className="absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center bg-gray-100 bg-opacity-50 p-0  transition-transform ease-in duration-300 ">
                <div className="mx-auto h-fit max-w-md bg-white border-0 shadow-lg sm:rounded-xl md:w-full w-[80%]">
                    <section className='flex justify-between items-center py-4 px-5 border-b-2'>
                        <h1 className="text-3xl text-main font-medium">INFORMATION <p className='text-main text-sm font-semibold'>{selectedPlayer.name}</p></h1>

                        <button onClick={() => setShowMore(false)}><IoClose className='text-main text-3xl' /></button>
                    </section>
                    <section className='flex flex-col px-5 bg-gray-100 py-4 h-[290px] overflow-y-scroll'>
                        <h1 className='text-gray-800 text-xl font-bold '>Playing At <span className='text-main'>{selectedPlayer.team ? selectedPlayer.team.team_name : "N/A"}</span></h1>
                        <h1 className='text-gray-800 text-xl font-bold '>Age: {selectedPlayer.age ? selectedPlayer.age : "N/A"}</h1>
                        <h1 className='text-gray-800 text-xl font-bold '>Gender: {selectedPlayer.gender ? selectedPlayer.gender : "N/A"}</h1>
                        <h1 className='text-gray-800 text-xl font-bold '>Email: {selectedPlayer.email ? selectedPlayer.email : "N/A"}</h1>
                        <h1 className='text-gray-800 text-xl font-bold '>Phone Number: {selectedPlayer.phone_number ? selectedPlayer.phone_number : "N/A"}</h1>
                    </section>
                    <section className='flex justify-end items-center py-4 px-5 border-b-2'>
                        <button className='bg-main lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-white px-8 py-1 rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Edit</button>
                        <button onClick={() => deletePlayer(selectedPlayer.id)} className='bg-main lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-white px-8 py-1 rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Delete</button>
                    </section>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </>
    )
}

function Players() {
    const [showForm, setShowForm] = useState(false);
    const [players, setPlayers] = useState([])
    const [error, setError] = useState("")

    // Information about a player
    const [showMore, setShowMore] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const getPlayers = async () => {
        try {
            const response = await ApiUrl.get("/player")
            setPlayers(response.data)
        } catch (err) {
            console.log(err)
            setError(err, "Something went wrong")
        }
    }
    useEffect(() => {
        getPlayers()
    }, [])

    console.log(players)
    return (
        <>
            <div className="md:py-2 lg:px-4">
                <h1 className="text-3xl text-main font-medium">Players</h1>

                <div className='p-12 flex flex-wrap'>
                    {
                        error ? <h1>{error}</h1> :
                            players.map((player) => (
                                <div className='lg:w-[25%]  h-[40%] bg-main bg-opacity-80 flex flex-col p-4 lg:mx-4 my-4 rounded-md shadow-xl ring-2 ring-main ring-opacity-50'>
                                    <div className='w-full flex lg:flex-row-reverse flex-col text-6xl items-center'>
                                        <section className='lg:w-[50%] flex justify-end'>
                                            <GoPersonFill className='text-white' />
                                        </section>
                                        <section className='text-left lg:w-[50%]'>
                                            <h1 className='text-white text-2xl font-bold'>{player.name}</h1>
                                            <p className='text-gray-100 text-sm font-semibold'>{player.team ? `Playing  at ${player.team.team_name}` : "No Team"}</p>
                                        </section>
                                    </div>
                                    <section onClick={() => {
                                        setSelectedPlayer(player);
                                        setShowMore(!showMore);
                                    }} className='text-gray-100 hover:text-white flex lg:justify-end mr-3'>
                                        <button>More</button>
                                    </section>
                                </div>
                            ))
                    }
                </div>

                <div className='flex justify-end p-12'>
                    <button onClick={() => setShowForm(!showForm)} className='bg-main hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 active:ring-gray-400 text-white font-bold rounded-[4.4px] py-4 px-8'>Add Player</button>
                </div>
                {showForm && <AddForm showForm={showForm} setShowForm={setShowForm} />}
                {showMore && <ReadMore showMore={showMore} setShowMore={setShowMore} selectedPlayer={selectedPlayer} />}

            </div>
        </>
    )
}

export default Players