import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export const LoadingAPI = ({name}) => {
    return (
        <div className='text-lg animate-pulse flex flex-col justify-center items-center mb-5'>
            <FaSpinner className='animate-spin text-4xl' />
            <span>{`Loading new ${name}...`}</span>
        </div>
    )
}
