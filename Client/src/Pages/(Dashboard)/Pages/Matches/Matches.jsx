import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../Config/ApiUrl'

const Match = ({ match, updateScore }) => {
  console.log("teams", match)
  return (
    <>
      <div className='w-full bg-main bg-opacity-90 p-4 rounded-lg mb-6'>
        <h1 className='text-3xl text-white font-medium'>Match {match.id}</h1>
        <div className='w-full flex justify-center lg:flex-nowrap flex-wrap text-center  bg-white rounded-lg'>
          <section className='w-full flex flex-col lg:flex-row justify-between items-center h-24 bg-sec rounded-lg drop-shadow-lg'>
            <h1 className='text-3xl text-main w-1/2 font-bold'>{match.team1.team_name}</h1>
            <h1 className='text-3xl text-gray-700 w-1/2'>{match.team1.score}</h1>
          </section>
          <section className='lg:w-[20%] w-full text-center h-24 bg-sec rounded-lg drop-shadow-lg'>
            <img src="/assets/Versus - icon.png" className='lg:w-fit w-fit lg:h-24 h-full mx-auto' alt="" />
          </section>
          <section className='w-full flex flex-col-reverse lg:flex-row-reverse justify-between items-center h-24  bg-sec rounded-lg drop-shadow-lg'>
            <h1 className='text-3xl text-main w-1/2 font-bold'>{match.team2.team_name}</h1>
            <h1 className='text-3xl text-gray-700 w-1/2'>{match.team2.score}</h1>
          </section>
        </div>
        <div className='w-full flex justify-between pt-2'>
          <section className='w-1/2 flex lg:flex-row flex-col gap-2'>
            <button onClick={() => updateScore(match.id, 'team1', 'increment')} className='bg-white lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-main px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Add Point</button>
            <button onClick={() => updateScore(match.id, 'team1', 'decrement')} className='bg-white lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-main px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Remove Point</button>
            <button onClick={() => updateScore(match.id, 'team1', 'clear')} className='bg-white lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-main px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Clear</button>
          </section>
          <section className='w-1/2 flex lg:flex-row-reverse flex-col gap-2'>
            <button onClick={() => updateScore(match.id, 'team2', 'increment')} className='bg-white lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-main px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Add Point</button>
            <button onClick={() => updateScore(match.id, 'team2', 'decrement')} className='bg-white lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-main px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Remove Point</button>
            <button onClick={() => updateScore(match.id, 'team2', 'clear')} className='bg-white lg:ml-0 ml-5 hover:bg-opacity-80 duration-300 text-main px-8 py-1 font-bold rounded-sm mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Clear</button>
          </section>
        </div>
      </div>
    </>
  )
}
function Matches() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState("")
  const [matches, setMatches] = useState([]);

  const getTeams = async () => {
    try {
      const response = await ApiUrl.get("/team")
      setTeams(response.data)
    } catch (err) {
      console.log(err)
      setError(err, "Something went wrong")
    }
  }

  const generateMatches = () => {
    const homeTeams = teams.slice(0, 4).filter((team) => team.home === true).map((team) => ({
      ...team,
      score: 0,
    }));

    const awayTeams = teams.slice(0, 4).filter((team) => team.away === true).map((team) => ({
      ...team,
      score: 0,
    }));

    const newMatch = {
      id: matches.length + 1,
      team1: homeTeams[0] || null,
      team2: awayTeams[0] || null,
    };

    const generatedMatches = [...matches, newMatch];
    setMatches(generatedMatches);
  };

  const updateScore = (matchId, team, action) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId
          ? {
            ...match,
            [team]: {
              ...match[team],
              score:
                action === 'increment' ? match[team].score + 1 :
                  action === 'decrement' ? Math.max(match[team].score - 1, 0) :
                    0, // 'clear' action
            },
          }
          : match
      )
    );
  };
  useEffect(() => {
    getTeams();
  }, []);

  console.log("match", matches)
  console.log(teams)
  return (
    <div className="md:py-2 lg:px-4">
      <h1 className="text-3xl text-main font-medium">Matches</h1>

      <div className='p-12'>
        {
          matches.length === 0 ? <h1 className='text-3xl text-main font-bold'>No matches found</h1> :
            matches.map((match) => (
              <Match key={match.id} match={match} updateScore={updateScore} />
            ))
        }
      </div>

      <div className='flex flex-row-reverse gap-4 p-12'>
        <button onClick={generateMatches} className='bg-main hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 active:ring-gray-400 text-white font-bold rounded-[4.4px] py-4 px-8 duration-300'>Create New Match</button>
        <button onClick={() => { setMatches([]) }} className='bg-main hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 active:ring-gray-400 text-white font-bold rounded-[4.4px] py-4 px-8 duration-300'>Reset</button>
      </div>

    </div >
  )
}

export default Matches