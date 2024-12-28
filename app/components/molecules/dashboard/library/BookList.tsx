import { mathTextbook } from '@/app/assets'
import { poppins_400 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import { AvailbeBooks } from '@/type'
import Image from 'next/image'
import React from 'react'


const availbleBooksList: AvailbeBooks = [
    {
        title: 'General Mathematics',
        class: 'SSS 1',
        availableCopies: 23,
        coverImage: mathTextbook
    },
    {
        title: 'General Mathematics',
        class: 'SS1',
        availableCopies: 23,
        coverImage: mathTextbook
    },
    {
        title: 'General Mathematics',
        class: 'SS1',
        availableCopies: 23,
        coverImage: mathTextbook
    },
    {
        title: 'General Mathematics',
        class: 'SS1',
        availableCopies: 23,
        coverImage: mathTextbook
    },
    {
        title: 'General Mathematics',
        class: 'SS1',
        availableCopies: 23,
        coverImage: mathTextbook
    },
    {
        title: 'General Mathematics',
        class: 'SS1',
        availableCopies: 23,
        coverImage: mathTextbook
    },

]
function BookList() {
    return (
        <div className='grid grid-cols-5'> 

            {availbleBooksList.map((book) => (
                <div key={book.title} className='w-[200px] flex flex-col gap-2 mb-6'>
                    <Image src={book.coverImage} alt={book.title} />
                    <h2 className={cn('text-sm text-black2', poppins_400.className)}>{book.title}</h2>
                    <div className='flex items-center gap-4'>
                        <p className={cn('text-xs text-gray6', poppins_400.className)}> {book.class} Class </p>
                        <p className={cn('text-sm text-gray6', poppins_400.className)}> {book.availableCopies} Left</p>
                    </div>

                </div>
            ))

            }

        </div>
    )
}

export default BookList