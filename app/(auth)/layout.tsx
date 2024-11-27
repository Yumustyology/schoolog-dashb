import React from 'react'

function Authlayout({ children }: { children: React.ReactNode }) {
    return (
        <>

            <main className='flex w-[100%] '>
                <div className='w-[45%] h-[100vh]  bg-green-900'>

                </div>

                <div className='w-[55%] h-[100vh]'>
                    {children}
                </div>

            </main >
        </>
    )
}

export default Authlayout