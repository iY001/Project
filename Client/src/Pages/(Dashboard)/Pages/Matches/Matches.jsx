import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../Config/ApiUrl'
import Match from './Components/Match'
import AddMatch from './Components/AddMatch'



function Matches() {
  const [matches, setMatches] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState("")

  const getMatches = async () => {
    try {
      const response = await ApiUrl.get("/match")
      setMatches(response.data)
    } catch (err) {
      console.log(err)
      setError(err, "Something went wrong")
    }
  }

  useEffect(() => {
    getMatches()
  }, [])
  console.log("match", matches)
  return (
    <div className="md:py-2 lg:px-4">
      <h1 className="text-3xl text-main font-medium">Matches</h1>

      <div className='p-12'>
      {
  matches.length === 0 ? (
    <h1 className='text-3xl text-main font-bold'>No matches found</h1>
  ) : (
    matches.map((match, index) => (
      <Match key={match.id} match={match} teams={match.teams} index={index} />
    ))
  )
}
      </div>

      <div className='flex flex-row-reverse gap-4 p-12'>
        <button onClick={() => { setShowForm(!showForm) }} className='bg-main hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 active:ring-gray-400 text-white font-bold rounded-[4.4px] py-4 px-8 duration-300'>Create New Match</button>
        <button className='bg-main hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 active:ring-gray-400 text-white font-bold rounded-[4.4px] py-4 px-8 duration-300'>Reset</button>
      </div>
      {
        showForm && <AddMatch setShowForm={setShowForm} />
      }
    </div >
  )
}

export default Matches