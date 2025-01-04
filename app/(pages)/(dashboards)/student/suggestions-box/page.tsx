import Button from '@/app/components/atoms/form/Button'
import { Inter_600, poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import { Content } from 'next/font/google'
import React from 'react'


const suggestionBox = [
  {
    id: 1,
    title: 'Suggestion title goes here ',
    content: 'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
  {
    id: 2,
    title: 'Suggestion title goes here ',
    content: 'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
  {
    id: 3,
    title: 'Suggestion title goes here ',
    content: 'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
  {
    id: 4,
    title: 'Suggestion title goes here ',
    content: 'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
  {
    id: 4,
    title: 'Suggestion title goes here ',
    content: 'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
]

function page() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h3 className={cn('text-primary text-[16px]', poppins_600.className)}> Suggestions </h3>
        <Button round className={cn('text-white text-[16px]  flex gap-4 pt-3 px-8 bg-primary ', Inter_600.className)}> Make suggestion </Button>
      </div>

      <div className='grid grid-cols-3 gap-6 mt-4 p-4 bg-white'>

        {suggestionBox.map((suggestionBox, index) => {
          return (
            <div key={index} className='flex flex-col gap-3 w-[333px] border bg-[#fcfcfc] border-gray4 p-3.5 rounded-md'>
              <h4 className={cn('text-black text-sm', poppins_500.className)}> {suggestionBox.title} </h4>
              <p className={cn('text-gray1 text-xs', poppins_400.className)}> {suggestionBox.content} </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page