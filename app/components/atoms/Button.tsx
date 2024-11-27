import React from 'react'

export const Button = ({ name }: { name: string }) => {
    return (
        <div className='mt-16 w-full text-center bg-primary py-3 rounded-full '>
            <button className='text-white' >{name}</button>
        </div>
    )
}
