import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div id='footer'>
            <footer className="bg-gray-50 bg-opacity-50">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="lg:w-[30%] mb-6 md:mb-0">
                            <span className='flex items-center'>
                                <img
                                    src="assets/Navbar - icon.png"
                                    className='w-[18%]'
                                    alt=""
                                />
                                <h1 className='text-2xl px-4 text-main font-bold'>Win it</h1>

                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-main uppercase ">CREATED BY</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <p>YOUSEF ABDELAZIZ</p>
                                    <p>ELHASANIN</p>
                                    <p className="font-bold hover:text-main cursor-pointer duration-300">Y1</p>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-main uppercase ">Follow us</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="https://github.com/iY001" className="hover:underline ">Github</a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/y001" className="hover:underline">Linked In</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-main sm:mx-auto lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://github.com/iY001" className="hover:underline">Y1</a>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-between sm:mt-0">
                            <Link to={"https://www.linkedin.com/in/y001"} target='_blank' className="text-gray-500 hover:text-main">
                                <svg className="w-4  h-4" fill="currentColor" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </Link>
                            <Link to={"https://github.com/iY001"} target="_blank" className="text-gray-500 hover:text-main ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">GitHub account</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
