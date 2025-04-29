import { poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo'
import React from 'react'

export const TeacherOthersInfoCard = () => {
  return (
    <div className="bg-white py-6 px-6 flex flex-col justify-between h-[390px] rounded-md col-span-2 border-none">
        <h4 className={cn('text-lg text-black1', poppins_500.className)}>Guardian details </h4>

        <div>
        <SingleInfo leftText='email' leftValue='jimohjamiu2000@gmail.com' rightText='Guardian contact' rightValue='08082116547'/>
        <SingleInfo leftText='Account name' leftValue='Ademola Adeolu' rightText='Bank name' rightValue='United Bank of Africa'/>
        <SingleInfo leftText='Account number' leftValue='0245237876' rightText='Payroll category' rightValue='Level 8 teachers'/>
        <SingleInfo leftText='Address' leftValue='No 42, Abacha road, Maraba, FCT, Abuja' />
        </div>

    </div>
  )
}

