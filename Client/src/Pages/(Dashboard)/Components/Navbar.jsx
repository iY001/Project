import React, { useEffect } from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import Sidebar from './Sidebar';
import { useCookies } from 'react-cookie';
import { ApiUrl } from '../../../Config/ApiUrl';


function Navbar({ showSidebar, setShowSidebar }) {

    const [cookies, setCookie] = useCookies(['token']);
    const token = cookies.token;

    useEffect(() => {
        ApiUrl.get(`/user/${userId}`).then((response) => {
            console.log(response.data)
        })
    }, [])

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
                    <h1 className='text-xl text-gray-300 mx-4'>User</h1>
                    <button className=' text-red-600 hover:text-red-600 mt-1'><IoLogOutOutline className='h-fit text-2xl' />
                    </button>
                </section>
            </div>
            sad
        </>
    )
}

export default Navbar