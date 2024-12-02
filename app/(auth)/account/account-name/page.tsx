import { poppins_400, poppins_600 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import React from 'react'

function page() {
    return (
        <div className=' max:w-full flex flex-col items-center justify-center min-h-screen py-28 px-36 mx-auto'>
            <div className='mb-12'>
                <h1 className={cn('text-[#101828] mb-2 text-3xl leading-10', poppins_600.className)} >
                    Input your  <span className='text-primary'> school name</span> <br /> to proceed
                </h1>
                <p className={cn('text-[#828282] text-base mt-4', poppins_400.className)}>
                    Lorem ipsum dolor sit amet consectetur. Blandit nibh convallis et imperdiet lobortis et. Egestas vitae bibendum morbi.
                </p>
            </div>

            <div className='flex justify-start gap-6 bg-[#D9DCE0] rounded-[100px] p-3 w-full'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22 22L20 20" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>


                <input type='search' placeholder='Search school' className='bg-transparent outline-none w-full text-gray1 ' />
            </div>

            <div className=''>
                <div>
                        
                </div>
                
                <div>
                    <h1>Tanke International School</h1>
                    <p>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.4133 5.15992C2.72664 -0.613413 11.28 -0.606746 12.5866 5.16659C13.3533 8.55325 11.2466 11.4199 9.39997 13.1933C8.05997 14.4866 5.93997 14.4866 4.5933 13.1933C2.7533 11.4199 0.646635 8.54659 1.4133 5.15992Z" stroke="#828282" />
                        </svg>

                        <span>
                            Lekki Penninsula II, Lekki, Lagos state
                        </span>
                    </p>
                    

                </div>
            </div>

        </div>
    )
}

export default page