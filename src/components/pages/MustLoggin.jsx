import React from 'react'
import {useNavigate} from 'react-router-dom'

export const MustLoggin = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full flex justify-center'>
            <div className='border border-red-500 shadow-lg shadow-red-600 my-5 p-5 w-11/12 md:w-2/3'>
                <p className='text-red-500'> You must Login first!</p>
                <button onClick={()=>{navigate('/injira')}} className="bg-white text-bgColor px-5 py-2 rounded-md text-base my-3">Login</button>
            </div>
        </div>
    )
}
