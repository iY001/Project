import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoPersonFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ApiUrl } from '../../../../../Config/ApiUrl';
function Players({ setShowPlayers, teamPlayers, team, teamID }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log("teamPlayers", teamPlayers);
    console.log("teamID", teamID);
    console.log("team", team);
    const deleteTeam = async () => {
        try {
            const promise = new Promise(async (resolve, reject) => {
                setLoading(true);
                try {
                    await ApiUrl.delete(`/team/${teamPlayers[0].id}`);
                    resolve();
                    setLoading(false);
                    setShowPlayers(false);
                    navigate(0);
                    console.log("Team deleted successfully");
                } catch (error) {
                    setLoading(false);
                    console.error('Error deleting player:', error);
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

    console.log("teamPlayers", teamPlayers);
    return (
        <>
            {/* make if no players don't show */}
            {teamPlayers ?
                <>
                    {/* Players list */}
                    <div className="absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center bg-gray-100 bg-opacity-50 p-0 transition-transform ease-in duration-300 ">
                        <div className="mx-auto h-fit max-w-md bg-white border-0 shadow-lg sm:rounded-xl md:w-full w-[80%]">
                            {/* Header section */}
                            <section className='flex justify-between items-center py-4 px-5 border-b-2'>
                                <h1 className="text-3xl text-main font-medium">Players <p className='text-main text-sm font-semibold'>{team.team_name}</p></h1>
                                <button onClick={() => setShowPlayers(false)}><IoClose className='text-main text-3xl' /></button>
                            </section>
                            {/* Players section */}
                            <section className='flex flex-col px-5 bg-gray-100 py-4 h-[290px] overflow-y-scroll'>
                                {teamPlayers.map((player) => (
                                    <div className='flex flex-col' key={player.id}>
                                        <section className='flex justify-between items-center'>
                                            <section className='flex flex-col'>
                                                <h1 className='text-main text-2xl font-bold'>{player.name}</h1>
                                                <p className='text-main text-sm font-semibold'>{player.score ? "Score: " + player.score : "Score: 0"}</p>
                                            </section>
                                            <section>
                                                <GoPersonFill className='text-main text-3xl' />
                                            </section>
                                        </section>
                                    </div>
                                ))}
                            </section>
                            {/* Footer section */}
                            <section className='flex justify-end items-center py-4 px-5 border-b-2'>
                                <button onClick={() => deleteTeam()} className='bg-main lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-white px-8 py-1 rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Delete</button>
                            </section>
                        </div>
                    </div>
                </> : <h1>No Players</h1>}
            <ToastContainer position="bottom-right" autoClose={2000} />
            {/* Render EditForm if showEditForm is true */}
        </>
    )
}

export default Players;