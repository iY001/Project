import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import Sidebar from './Sidebar';
import { Cookies, useCookies } from 'react-cookie';


function Navbar({ showSidebar, setShowSidebar }) {
    const [token, setTokenCookie , removeTokenCookie] = useCookies(['token']);
    const [cookies, setCookie , removeCookie] = useCookies(['user']);

    // Retrieve the 'user' cookie value
    const user = cookies.user;
    const handleRemoveCookie = () => {
        // Remove the 'user' cookie when the button is clicked
        removeTokenCookie('token', { path: '/' });
        removeCookie('user', { path: '/' });
    };
    console.log(user)
    return (
        <>
            <div className='relative md:w-full w-full flex items-center justify-between md:pr-6 pr-2 py-5 bg-main bg-opacity-80 shadow-lg'>
                <section>
                    {/*aside*/}
                    <div className='absolute top-0'>
                        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                    </div>
                    {/*aside*/}
                </section>
                <section className='flex items-center'>
                    <h1 className='text-xl text-gray-300 mx-4'>{user.username}</h1>
                    <button onClick={handleRemoveCookie} className=' text-red-600 hover:text-red-600 mt-1'><IoLogOutOutline className='h-fit text-2xl' />
                    </button>
                </section>
            </div>
            sad
        </>
    )
}

export default Navbar