import React from 'react'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/(Dashboard)/Dashboard'
import SignUp from './Pages/SignUp/SignUp'
import SignIn from './Pages/SignIn/SignIn'
import { useCookies } from 'react-cookie'
import AlreadyLoggedIn from './Pages/Status/AlreadyLoggedIn'
import NotFound from './Pages/Status/NotFound'


function App() {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {
          token &&
          <>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/already-logged-in" element={<AlreadyLoggedIn />} />
          </>
        }
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App