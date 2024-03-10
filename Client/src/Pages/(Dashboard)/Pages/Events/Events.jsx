import React, { useState } from 'react'
import AddForm from '../../Components/AddForm';

function Events() {
    const [showForm, setShowForm] = useState(false);
    return (
        <div className="md:py-2 lg:px-4">
            <h1 className="text-3xl text-main font-medium">Events</h1>

            <div className='p-12'>
                <section className='flex flex-row'>

                </section>
            </div>

            <div className='flex justify-end p-12'>
                <button onClick={() => setShowForm(!showForm)} className='bg-main hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 active:ring-gray-400 text-white font-bold rounded-[4.4px] py-4 px-8'>Add User</button>
            </div>
            {showForm && <AddForm showForm={showForm} setShowForm={setShowForm} />}
        </div>
    )
}

export default Events