import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { RiMenu3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Navbar() {
  const links = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About',
      link: '#footer',
    },
    {
      name: 'Features',
      link: '#features',
    },
  ];

  const [cookies, setCookie] = useCookies(['token']);
  const token = cookies.token
  if(token){
    links.push({
      name: 'Dashboard',
      link: '/dashboard'
    })
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='relative w-full flex lg:justify-center justify-between items-center lg:px-0 px-4'>
        <section className='lg:w-[30%] flex lg:justify-center items-center'>
          <img
            src="assets/Navbar - icon.png"
            className='w-[18%]'
            alt=""
          />
          <h1 className='text-2xl px-4'>Win it</h1>
        </section>

        <div className='lg:w-[20%] lg:hidden flex justify-center items-center'>
          <button
            onClick={() => setOpen(!open)}
            className='lg:hidden'
          >
            <RiMenu3Line size={30} />
          </button>
        </div>

        {/** Mobile Dropdown */}
        <ul
          className={`bg-white z-10 lg:hidden absolute w-full flex justify-center text-center flex-col items-center duration-300 ${open ? 'flex md:top-[86px] top-[56px]' : 'hidden top-[-300px]'
            }`}
        >
          {links.map((link, index) => (
            <li
              key={index}
              className='w-full py-2 text-black hover:text-main active:text-main focus:text-main duration-300'
            >
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
          <li className='w-full py-2 text-black hover:text-main active:text-main focus:text-main duration-300'>
            <button className='rounded-lg text-black'>
              Get Started
            </button>
          </li>
        </ul>

        {/** Desktop Navigation */}
        <ul
          className={`bg-white z-10 lg:static absolute lg:w-[50%] lg:flex hidden justify-normal items-center duration-300 ${open ? 'flex top-[56px]' : 'hidden top-[-300px]'
            }`}
        >
          {links.map((link, index) => (
            <li
              key={index}
              className='px-4  lg:w-fit w-full text-black hover:text-main active:text-main focus:text-main duration-300'
            >
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
        <div className='lg:w-[20%]  hidden px-4 lg:flex justify-center items-center'>
          <Link to="/signup" className='bg-main px-10 py-3 rounded-lg text-white'>
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
