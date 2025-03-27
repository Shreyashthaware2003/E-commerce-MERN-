import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Products from '../components/Products'

function Collection() {
    return (
        <>
            <div className="absolute top-28 w-full flex flex-col justify-center items-center px-4">
                <div className="w-full max-w-7xl flex flex-col justify-center items-center">
                    {/* Page Title & Breadcrumb */}
                    {/* <div className="flex flex-col w-full p-8 rounded-4xl shadow border border-gray-300 gap-2">
                      
                        <h1 className="text-base md:text-2xl font-semibold mb-6">
                            Showing results for: <span className="text-blue-600"></span>
                        </h1>

                        <span className="flex items-center gap-8">
                            <Link to="/">Home</Link>
                            <Link to="">Fashion</Link>
                            <Link to="">Men</Link>
                        </span>
                    </div> */}

                    {/* Sidebar & Content Layout */}
                    <div className=" mt-4 gap-4 w-full px-4 md:px-10">
                        {/* Sidebar */}
                        <div className="w-full">
                            <Sidebar />
                        </div>

                        {/* Right Content */}
                        <Products />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Collection