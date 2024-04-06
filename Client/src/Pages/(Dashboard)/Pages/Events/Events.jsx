import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../Config/ApiUrl';
import { GoPersonFill } from "react-icons/go";
import AddEvent from './Components/AddEvent';

const Event = ({ event }) => {
    const start_date = new Date(event.start_date)
    const end_date = new Date(event.end_date)
    console.log("events", event)
    const [team, setTeam] = useState([])
    const [error, setError] = useState("")
    const getTeam = async () => {
        try {
            const response = await ApiUrl.get("/team")
            const seletedTeam = response.data.find((team) => team.id === event.team_id)
            setTeam(seletedTeam)
        } catch (err) {
            console.log(err)
            setError(err, "Something went wrong")
        }
    }

    useEffect(() => {
        getTeam()
    }, [])
    return (
        <div className='flex flex-col py-4 px-5 bg-main rounded-md'>
            <section className='flex justify-between items-center'>
                <section className='flex flex-col'>
                    <h1 className='text-white text-2xl font-bold'>{event.event_name}</h1>
                    <p className='text-gray-50 text-sm font-semibold'>Start Date: {start_date.toDateString()} </p>
                    <p className='text-gray-50 text-sm font-semibold'>End Date: {end_date.toDateString()}</p>
                </section>
            </section>
            <section className='flex justify-between items-center'>
                <section className='flex flex-col'>
                    <h1 className='text-white text-2xl font-bold'>Organizer</h1>
                    <p className='text-gray-50 text-sm font-semibold'>
                        {event.organizer_name}
                    </p>
                    <p className='text-gray-50 text-sm font-semibold'>{ } </p>
                    <h1 className='text-white text-2xl font-bold'>Venues</h1>
                    <p className='text-gray-50 text-sm font-semibold'>{event.venue} </p>
                </section>
            </section>
        </div>
    )
}

function Events() {
    const [showForm, setShowForm] = useState(false);
    const [events, setEvents] = useState([])
    const [error, setError] = useState("")

    // Information about a player
    const getEvents = async () => {
        try {
            const response = await ApiUrl.get("/event")
            setEvents(response.data)
        } catch (err) {
            console.log(err)
            setError(err, "Something went wrong")
        }
    }
    useEffect(() => {
        getEvents()
    }, [])
    return (
        <div className="md:py-2 lg:px-4">
            <h1 className="text-3xl text-main font-medium">Events</h1>

            <div className='p-12'>
                <section className='flex flex-row flex-wrap gap-3'>
                    {
                        error ? <h1>{error}</h1> :
                            events.map((event) => (
                                <Event event={event} />
                            ))
                    }
                </section>
            </div>

            <div className='flex justify-end p-12'>
                <button onClick={() => setShowForm(!showForm)} className='bg-main hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 active:ring-gray-400 text-white font-bold rounded-[4.4px] py-4 px-8'>Add Event</button>
            </div>
            {showForm && <AddEvent showForm={showForm} setShowForm={setShowForm} />}
        </div>
    )
}

export default Events