import React from 'react'
import Dashboard from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Matches from './Pages/Matches/Matches';
import Teams from './Pages/Teams/Teams';
import Players from './Pages/Players/Players';
import Events from './Pages/Events/Events';

function Content() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="home" element={<Dashboard />} />
                <Route path="events" element={<Events />} />
                <Route path="matches/*" element={<Matches />} />
                <Route path="teams/*" element={<Teams />} />
                <Route path="players/*" element={<Players />} />
            </Routes>
        </>
    )
}

export default Content