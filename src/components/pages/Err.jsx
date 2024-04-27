import React from 'react'

export const Err = ({err, getData}) => {
    return (
        <div className='w-full flex justify-center'>
            <div className='border border-red-500 shadow-lg shadow-red-600 my-5 p-5 w-11/12 md:w-2/3 lg:w-1/3'>
                <p className='text-red-500'><span className='text-textColor'>Ooops Failed🥹:</span> {err}</p>
                <button onClick={getData} className="bg-white text-bgColor px-5 py-2 rounded-md text-base my-3">Try Again</button>
            </div>
        </div>
    )
}
