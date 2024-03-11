import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../Config/ApiUrl';
import AddForm from './Components/AddForm';
import { GoPersonFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
function Players({ setShowPlayers, teamPlayers, team }) {
    console.log(team)
    return (
        <>
            <div className="absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center bg-gray-100 bg-opacity-50 p-0  transition-transform ease-in duration-300 ">
                <div className="mx-auto h-fit max-w-md bg-white border-0 shadow-lg sm:rounded-xl md:w-full w-[80%]">
                    <section className='flex justify-between items-center py-4 px-5 border-b-2'>
                        <h1 className="text-3xl text-main font-medium">Players <p className='text-main text-sm font-semibold'>{team.team_name}</p></h1>

                        <button onClick={() => setShowPlayers(false)}><IoClose className='text-main text-3xl' /></button>
                    </section>
                    <section className='flex flex-col px-5 bg-gray-100 py-4 h-[290px] overflow-y-scroll'>
                        {

                            teamPlayers.map((player) => (
                                <div className='flex flex-col'>
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

                            ))
                        }
                    </section>
                    <section className='flex justify-between items-center py-4 px-5 border-b-2'>

                    </section>
                </div>
            </div>
        </>
    )
}

function Teams() {
    const [showForm, setShowForm] = useState(false);
    const [showPlayers, setShowPlayers] = useState(false)
    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [error, setError] = useState("")

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


    console.log(teams)
    return (
        <div className="md:py-2 lg:px-4">
            <h1 className="text-3xl text-main font-medium">Teams</h1>

            <div className='p-12 flex flex-wrap lg:flex-row flex-col'>
                {
                    error ? <h1>{error}</h1> :
                        teams.map((team) => (
                            <div className='lg:w-[25%] h-[350px] bg-main bg-opacity-80 flex flex-col lg:mx-4 my-4 rounded-md shadow-xl ring-2 ring-main ring-opacity-50'>
                                <div className='w-full py-4 flex lg:flex-col flex-col text-6xl items-center px-4'>
                                    <section className='flex w-full'>
                                        <h1 className='text-white text-xl'>{team.team_name}</h1>
                                    </section>
                                    <section className='flex flex-wrap text-left w-full'>
                                        <h1 className='text-white text-2xl font-bold '></h1>
                                        <p className='text-gray-100 text-sm font-semibold mr-2'>Total Score : {team.total_score} </p>
                                        <p className='text-gray-100 text-sm font-semibold'>Captain : {team.coach_name}</p>
                                    </section>
                                </div>
                                {/* Info Section */}
                                <div className='w-full bg-gray-200 h-[80%] flex lg:flex-col flex-col text-6xl items-center ring-2 ring-gray-300 px-2 overflow-hidden'>
                                    <section className='w-full'>
                                        <h1 className='text-main text-opacity-70 uppercase font-bold text-xl'>Best Players</h1>
                                        <div className='w-full flex flex-wrap items-center'>
                                            {
                                                team.players.length === 0 ? <h1 className='text-main text-xl mx-auto font-bold uppercase my-5'>No Players</h1> : team.players
                                                    .slice()
                                                    .sort((a, b) => b.score - a.score)
                                                    .slice(0, 4)
                                                    .map((player) => (
                                                        <div className='w-[50%] text-center' key={player.id}>
                                                            <GoPersonFill className='text-main mx-auto' />
                                                            <h1 className='text-main text-xl'>
                                                                {player.name}
                                                            </h1>
                                                        </div>
                                                    ))
                                            }

                                        </div>
                                    </section>
                                </div>
                                {/* Players Section */}
                                <section className='text-gray-100 py-2 h-[15%] hover:text-white flex lg:justify-end justify-center mr-3'>
                                    <button onClick={() => { setShowPlayers(!showPlayers); setPlayers(team.players) }} className='bg-white hover:bg-opacity-80 duration-300 text-main px-8 py-1 rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>More</button>
                                    {showPlayers && <Players showPlayers={showPlayers} setShowPlayers={setShowPlayers} teamPlayers={players} team={team} teamName={team.team_name} />}

                                </section>
                                {/* Readmore Section */}
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