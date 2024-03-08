import React from 'react'

function FeatureCard() {
    const Cards = [
        {
            title: "Tournament Creation",
            desc: "Easily create and customize tournaments for different sports or games , Define tournament format, rules, and scheduling parameters. Easily create and customize tournaments with just a few clicks.",
        },
        {
            title: "Event Management",
            desc: "Create and manage events within tournaments, allowing for multiple activities or game categories.",
        },
        {
            title: "Player Profiles",
            desc: "Comprehensive player profiles with personal information, achievements, and statistics , Easily search and filter players based on various criteria.",
        },
    ]
    return (
        <>
            {
                Cards.map((card, index) => {
                    return (
                        <div key={index} className="lg:w-[30%] h-[340px] bg-white rounded-2xl shadow-xl text-left flex flex-col p-4 mx-4 my-4">
                            <section className="flex w-[80%] items-center">
                                <img src="assets/Tournment.png" className="h-[60%] w-[50%]" alt="" />
                                <h1 className="w-full text-3xl font-bold text-main">{card.title}</h1>
                            </section>
                            <section>
                                <p className="text-lg">{card.desc}</p>
                            </section>
                        </div>
                    )
                })
            }
        </>
    )
}

export default FeatureCard