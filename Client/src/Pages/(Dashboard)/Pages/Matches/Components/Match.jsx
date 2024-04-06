import { useEffect, useState } from "react";
import { ApiUrl } from "../../../../../Config/ApiUrl";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
const Match = ({ match, teams, index }) => {
    const [loading, setLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const navigate = useNavigate();
    const [matchEvent , setMatchEvent] = useState();


    const getMatchEvent = async () => {
        try {
            const response = await ApiUrl.get(`/event/${match.event_id}`);
            console.log("res",response);
            setMatchEvent(response.data);
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getMatchEvent();
    }, [])
    const deleteMatch = async () => {
        try {
            setRemoveLoading(true);
            await ApiUrl.delete(`/match/${match.id}`);
            navigate(0);
            setRemoveLoading(false);
        } catch (err) {
            console.log(err)
        }
    }
    const addPoint = async (data) => {
        try {
            setAddLoading(true); // Set loading state to true
            const { match_id, point } = data;
            // Fetch current match data
            const matchResponse = await ApiUrl.get(`/match/${match_id}`);
            const matchData = matchResponse.data;
            // Determine which team's score to update
            let updatedTeamId;
            let updatedScoreField;
            if (data.team1) {
                updatedTeamId = data.team1;
                updatedScoreField = 'score1';
            } else if (data.team2) {
                updatedTeamId = data.team2;
                updatedScoreField = 'score2';
            } else {
                throw new Error('Invalid team specified');
            }
            // Update match score
            matchData[updatedScoreField] += point;
            // Update match data
            await ApiUrl.put(`/match/${match_id}`, matchData);

            // Update team score
            const teamResponse = await ApiUrl.get(`/team/${updatedTeamId}`);
            const teamData = teamResponse.data;
            const updatedScore = teamData.total_score + point; // Calculate the updated score
            // Update team data
            await ApiUrl.put(`/team/${updatedTeamId}`, { total_score: updatedScore });

        } catch (err) {
            console.log(err);
            throw err; // Rethrow the error to be handled by the caller
        } finally {
            setAddLoading(false); // Set loading state to false
            navigate(0)
        }
    };
    const removePoint = async (data) => {
        try {
            setRemoveLoading(true); // Set loading state to true
            const { match_id } = data;
            // Fetch current match data
            const matchResponse = await ApiUrl.get(`/match/${match_id}`);
            const matchData = matchResponse.data;
            // Determine which team's score to update
            let updatedTeamId;
            let updatedScoreField;
            if (data.team1) {
                updatedTeamId = data.team1;
                updatedScoreField = 'score1';
            } else if (data.team2) {
                updatedTeamId = data.team2;
                updatedScoreField = 'score2';
            } else {
                throw new Error('Invalid team specified');
            }
            // Decrease match score by 1 point
            matchData[updatedScoreField] -= 1;
            // Update match data
            await ApiUrl.put(`/match/${match_id}`, matchData);

            // Update team score by decreasing 1 point
            const teamResponse = await ApiUrl.get(`/team/${updatedTeamId}`);
            const teamData = teamResponse.data;
            const updatedScore = teamData.total_score - 1; // Decrease the score by 1
            // Update team data
            await ApiUrl.put(`/team/${updatedTeamId}`, { total_score: updatedScore });

        } catch (err) {
            console.log(err);
            throw err; // Rethrow the error to be handled by the caller
        } finally {
            setRemoveLoading(false); // Set loading state to false
            navigate(0);
        }
    };
    const resetMatchPoints = async (data) => {
        try {
            setResetLoading(true); // Set loading state to true
            const { match_id } = data;
            // Fetch current match data
            const matchResponse = await ApiUrl.get(`/match/${match_id}`);
            const matchData = matchResponse.data;
            // Reset scores for both teams to 0
            matchData.score1 = 0;
            matchData.score2 = 0;
            // Update match data
            await ApiUrl.put(`/match/${match_id}`, matchData);

        } catch (err) {
            console.log(err);
            throw err; // Rethrow the error to be handled by the caller
        } finally {
            setResetLoading(false); // Set loading state to false
            navigate(0);
        }
    };
    const formattedDate = format(new Date(match.match_date), 'yyyy-MM-dd');

    console.log("teams" , teams);
    
    console.log("match" , match);
    console.log("matchEvent" , matchEvent);
    return (
        <>
            <div className='w-full bg-main bg-opacity-90 p-4 rounded-lg mb-6'>
                <section className="flex lg:flex-row flex-col items-center">
                    <section className="flex lg:flex-row items-center flex-col lg:w-[50%] w-full lg:gap-3">
                        <h1 className='text-3xl text-white font-medium'>Match {index + 1}</h1>
                        <h1 className='text-md text-gray-100 font-medium'>{ matchEvent ? matchEvent.event_name : "N/A"}</h1>
                        <h1 className='text-md text-white font-medium'>{formattedDate}</h1>
                    </section>
                    <section className="flex lg:flex-row justify-end lg:items-center flex-col lg:w-[50%] w-full lg:gap-3">
                        <button disabled={loading? true : false} onClick={() => deleteMatch()} className="text-md bg-red-700 p-2 rounded-md hover:bg-red-600 text-white font-medium duration-300">{deleteLoader ? "Deleting..." : "Delete"}</button>
                    </section>
                </section>
                <div className='w-full mt-2 flex justify-center lg:flex-nowrap flex-wrap text-center  bg-white rounded-lg'>
                    <section className='w-full flex flex-col lg:flex-row justify-between items-center h-24 bg-sec rounded-lg drop-shadow-lg'>
                        <h1 className='text-3xl text-main w-1/2 font-bold'>{teams[0] ? teams[0].team1.team_name : "N/A"}</h1>
                        <h1 className='text-3xl text-gray-700 w-1/2'>{match ? match.score1 : "N/A"}</h1>
                    </section>
                    <section className='lg:w-[20%] w-full text-center h-24 bg-sec rounded-lg drop-shadow-lg'>
                        <img src="/assets/Versus - icon.png" className='lg:w-fit w-fit lg:h-24 h-full mx-auto' alt="" />
                    </section>
                    <section className='w-full flex flex-col-reverse lg:flex-row-reverse justify-between items-center h-24  bg-sec rounded-lg drop-shadow-lg'>
                        <h1 className='text-3xl text-main w-1/2 font-bold'>{teams[0] ? teams[0].team2.team_name : "N/A"}</h1>
                        <h1 className='text-3xl text-gray-700 w-1/2'>{match.score2}</h1>
                    </section>
                </div>
                <div className='w-full flex justify-between  pt-2'>
                    <section className='w-1/2 flex lg:flex-row flex-col gap-2'>
                        <button disabled={loading? true : false}
                            onClick={() => addPoint(
                                {
                                    match_id: match.id,
                                    team1: teams[0].team1.id,
                                    point: 1
                                },
                                // Pass setLoading function to addPoint
                            )}
                            className='bg-white lg:ml-0 ml-2 hover:bg-opacity-80 duration-300 text-main lg:w-fit w-24 px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'
                        >
                            {addLoading ? 'Loading...' : 'Add Point'}
                        </button>
                        <button disabled={loading? true : false}
                            onClick={() => removePoint(
                                {
                                    match_id: match.id,
                                    team1: teams[0].team1.id,
                                    point: 1
                                },
                                // Pass setLoading function to addPoint
                            )} className='bg-white lg:ml-0 ml-2 hover:bg-opacity-80 duration-300 text-main lg:w-fit w-24 px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>{removeLoading ? 'Loading...' : 'Remove Point'}</button>
                        <button disabled={loading? true : false}
                            onClick={() => resetMatchPoints(
                                {
                                    match_id: match.id,
                                },
                                // Pass setLoading function to addPoint
                            )} className='bg-white lg:ml-0 ml-2 hover:bg-opacity-80 duration-300 text-main lg:w-fit w-24 px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>{resetLoading ? 'Loading...' : 'Clear'}</button>
                    </section>
                    <section className='w-1/2 flex lg:flex-row-reverse flex-col gap-2'>
                        <button disabled={loading? true : false}
                            onClick={() => addPoint(
                                {
                                    match_id: match.id,
                                    team2: teams[0].team2.id,
                                    point: 1
                                },
                                // Pass setLoading function to addPoint
                            )}
                            className='bg-white lg:ml-0 ml-2 hover:bg-opacity-80 duration-300 text-main lg:w-fit w-24 px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'
                        >
                            {addLoading ? 'Loading...' : 'Add Point'}
                        </button >
                        <button disabled={loading? true : false}
                            onClick={() => removePoint(
                                {
                                    match_id: match.id,
                                    team2: teams[0].team2.id,
                                    point: 1
                                },
                                // Pass setLoading function to addPoint
                            )} className='bg-white lg:ml-0 ml-2 hover:bg-opacity-80 duration-300 text-main lg:w-fit w-24 px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>{deleteLoader ? 'Loading...' : 'Remove Point'}</button>
                        <button disabled={loading? true : false}
                            onClick={() => resetMatchPoints(
                                {
                                    match_id: match.id,
                                },
                                // Pass setLoading function to addPoint
                            )} className='bg-white lg:ml-0 ml-2 hover:bg-opacity-80 duration-300 text-main lg:w-fit w-24 px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>{resetLoading ? 'Loading...' : 'Clear'}</button>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Match;