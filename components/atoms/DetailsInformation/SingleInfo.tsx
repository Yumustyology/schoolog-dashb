import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import React from 'react'


type SingleInfoProps = {
  leftText: string,
  leftValue: string,
  rightText?: string,
  rightValue?: string,
}
export const SingleInfo = ({ leftText, leftValue, rightText, rightValue }: SingleInfoProps) => {
  return (
    <div className="flex justify-between items-center">

      <div className="flex justify-between items-center w-full mt-10">
        <div>
          <h3
            className={cn('text-sm text-black1', poppins_500.className)}
          >
            {leftValue}
          </h3>
          <p className={cn('text-sm text-gray', poppins_400.className)}>
            {leftText}
          </p>
        </div>

        <div className='text-right'>
          <h3
            className={cn('text-sm text-black1', poppins_500.className)}
          >
            {rightValue}
          </h3>
          <p className={cn('text-sm text-gray', poppins_400.className)}>
            {rightText}
          </p>
        </div>
      </div>
    </div>
  )
}
