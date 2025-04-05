import React from 'react'

function AdminDashboard() {
    return (
        <>
            <div className='w-full flex flex-col flex-nowrap justify-center md:px-20 '>
                <div className='w-full flex justify-between items-center  py-4 px-2' >
                    <div>
                        <img src="adminlogo.png" alt="" className='w-36 relative' />
                    </div>
                    <div>
                        <button className='py-2 px-6 rounded-full bg-black text-white cursor-pointer text-center font-medium'>Logout</button>
                    </div>
                </div>
                <div className=''>dsudd</div>

            </div>
        </>
    )
}

export default AdminDashboard