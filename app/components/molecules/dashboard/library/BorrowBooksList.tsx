import { biologyTextbook, mathTextbook } from '@/app/assets'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import { Borrowedbooks } from '@/type'
import Image from 'next/image'
import React from 'react'

const borrowedBooks: Borrowedbooks = [
  {
    title: 'General Mathematics',
    dueStatus: false,
    dueDate: 'Monday, June 12',
    duePrice: 'N200',
    daysLeft: '6 days',
    availableCopies: 23,
    coverImage: mathTextbook
  },
  {
    title: 'General Mathematics',
    dueStatus: true,
    dueDate: 'Monday, June 12',
    duePrice: 'N200',
    daysLeft: '6 days',
    availableCopies: 23,
    coverImage: mathTextbook
  },
  {
    title: 'General Mathematics',
    dueStatus: false,
    dueDate: 'Monday, June 12',
    duePrice: 'N200',
    daysLeft: '6 days',
    availableCopies: 23,
    coverImage: mathTextbook
  },
  {
    title: 'Biology',
    dueStatus: false,
    dueDate: 'Monday, June 12',
    duePrice: 'N200',
    daysLeft: '6 days',
    availableCopies: 23,
    coverImage: biologyTextbook
  },

  {
    title: 'General Mathematics',
    dueStatus: true,
    dueDate: 'Monday, June 12',
    duePrice: 'N200',
    daysLeft: '6 days',
    availableCopies: 23,
    coverImage: mathTextbook
  },
  {
    title: 'Biology',
    dueStatus: true,
    dueDate: 'Monday, June 12',
    duePrice: 'N200',
    daysLeft: '6 days',
    availableCopies: 23,
    coverImage: biologyTextbook
  },




]

function BorrowBooksList() {
  return (
    <div className='grid grid-cols-5 gap-4'>
      {borrowedBooks.map((book) => (
        <div className='w-[190px]'>
          <div className='relative'>
            <Image src={book.coverImage} alt={book.coverImage} />

            {book.dueStatus ? <p> <p className={cn('absolute text-[11px] top-2 right-2 bg-white text-[#F2994A] py-1 px-1.5 rounded-full', poppins_500.className)}>{book.duePrice} <span className='text-[#BDBDBD]'> / day</span></p> </p>
              : <p className={cn('absolute text-[11px] top-2 right-2 bg-white text-primary py-1 px-1.5 rounded-full', poppins_500.className)}>{book.daysLeft} left</p>
            }
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className={cn('text-sm text-black2 mt-1', poppins_400.className)}>{book.title}</h2>
            <p className={cn(book.dueStatus ? 'text-xs text-[#EB5757]' : 'text-xs text-gray6', poppins_400.className)}> Due {book.dueDate}  </p>
          </div>

        </div>

      ))}
    </div>
  )
}

export default BorrowBooksList