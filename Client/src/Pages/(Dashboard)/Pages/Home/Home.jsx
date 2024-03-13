import React, { useEffect, useState } from 'react';
import Box from './Components/Box';
import { ApiUrl } from '../../../../Config/ApiUrl';
import { RiUserLine } from "react-icons/ri";
import { GoPersonFill } from "react-icons/go";

function Dashboard() {
    const [loadingPlayers, setLoadingPlayers] = useState(false);
    const [loadingTeams, setLoadingTeams] = useState(false);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [events, setEvents] = useState([]);
    const [err, setError] = useState();

    const getPlayers = async () => {
        try {
            setLoadingPlayers(true);
            const response = await ApiUrl.get("/player");
            setPlayers(response.data);
        } catch (err) {
            console.log(err);
            setError("Something went wrong with players");
        } finally {
            setLoadingPlayers(false);
        }
    }

    const getTeams = async () => {
        try {
            setLoadingTeams(true);
            const response = await ApiUrl.get("/team");
            setTeams(response.data);
        } catch (err) {
            console.log(err);
            setError("Something went wrong with teams");
        } finally {
            setLoadingTeams(false);
        }
    }

    const getEvents = async () => {
        try {
            setLoadingEvents(true);
            const response = await ApiUrl.get("/event");
            setEvents(response.data);
        } catch (err) {
            console.log(err);
            setError("Something went wrong with events");
        } finally {
            setLoadingEvents(false);
        }
    }

    useEffect(() => {
        getPlayers();
        getTeams();
        getEvents();
    }, [])

    const sortedPlayers = players.slice(0, 3).sort((a, b) => b.score - a.score);

    return (
        <div className="md:py-2 lg:px-4">
            <h1 className="text-2xl text-main font-bold uppercase">Dashboard</h1>

            <div className='flex justify-center md:justify-start flex-wrap gap-3 p-12'>
                <Box href="/dashboard/players" icon={RiUserLine} number={players.length} name="Players" loading={loadingPlayers} />
                <Box href="/dashboard/teams" icon={RiUserLine} number={teams.length} name="Teams" loading={loadingTeams} />
                <Box href="/dashboard/events" icon={RiUserLine} number={events.length} name="Events" loading={loadingEvents} />
                <Box href="/dashboard/events" icon={RiUserLine} number={events.length} name="Events" loading={loadingEvents} />
            </div>

            <h1 className="text-2xl text-main font-bold uppercase">Best Players</h1>

            <div className='flex w-full justify-center md:justify-start flex-wrap gap-3 p-12'>
                {!loadingPlayers && !err && (
                    <div className='flex justify-center md:justify-start flex-wrap'>
                        {sortedPlayers.map((player) => (
                            <div className='lg:w-[30%] w-full p-12 flex flex-col bg-gray-100 shadow-lg rounded-md mr-4 ring-2 ring-opacity-30 ring-main mb-6' key={player.id}>
                                <div className='flex flex-col text-left'>
                                    <GoPersonFill className='text-main text-6xl mx-auto' />
                                    <h1 className='text-main text-2xl w-full'>
                                        {player.name}
                                    </h1>
                                    <p className='text-gray-500'>Score: {player.score}</p>
                                    <p className='text-gray-500'>Team: {player.team.team_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {err && (
                    <h1>{err}</h1>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
