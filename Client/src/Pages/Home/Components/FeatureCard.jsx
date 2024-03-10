import React from 'react'

function FeatureCard() {
    const Cards = [
        {
            title: "Tournament Creation",
            icon: "assets/Feature - 1.png",
            desc: "Easily create and customize tournaments for different sports or games , Define tournament format, rules, and scheduling parameters. Easily create and customize tournaments with just a few clicks.",
        },
        {
            title: "Event Management",
            icon: "assets/Feature - 2.png",
            desc: "Create and manage events within tournaments, allowing for multiple activities or game categories.",
        },
        {
            title: "Player Profiles",
            icon: "assets/Feature - 3.png",
            desc: "Comprehensive player profiles with personal information, achievements, and statistics , Easily search and filter players based on various criteria.",
        },
    ]
    return (
        <>
            {
                Cards.map((card, index) => {
                    return (
                        <div key={index} className="lg:w-[30%] mx-4 lg:my-8 lg:p-6 flex flex-col text-left">
                            <section className="flex lg:w-[80%] md:w-[50%] w-full justify-center mx-auto items-center lg:p-12 p-6">
                                <img src={card.icon} className="w-[50%]" alt="" />
                            </section>
                            <section className='flex flex-col w-full h-[100%]'>
                                <h1 className="w-full lg:text-2xl md:text-xl font-bold">{card.title}</h1>
                                <p className="text-md">{card.desc}</p>
                            </section>
                            <a href="" className='text-main'>Learn More →</a>
                        </div>
                    )
                })
            }
        </>
    )
}

export default FeatureCard