import React, { useEffect, useState } from 'react'
import { GoPersonFill } from "react-icons/go";
import { ApiUrl } from '../../../../Config/ApiUrl'
import AddForm from './Components/AddForm';

const readMore = () => {
    return (
        <>
            <section>
                <p className='text-white'>Email: { }</p>
            </section>
        </>
    )
}

function Players() {
    const [showForm, setShowForm] = useState(false);
    const [players, setPlayers] = useState([])
    const [error, setError] = useState("")

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
                                            <p className='text-gray-100 text-sm font-semibold'>Playing  at {player.team.team_name}</p>
                                        </section>
                                    </div>
                                    <section className='text-gray-100 hover:text-white flex lg:justify-end mr-3'>
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
            </div>
        </>
    )
}

export default Players