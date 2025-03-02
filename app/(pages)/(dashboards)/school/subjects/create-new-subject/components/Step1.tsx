import Button from '@/app/components/atoms/form/Button'
import Input from '@/app/components/atoms/form/Input'
import { UploadImageIcon, Upload_Icon } from '@/app/components/atoms/icons/Icons'
import ProgressPageNumber from '@/app/components/molecules/auth/PageNumber'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import React from 'react'

function Step1() {
    return (
        <div>
            <ProgressPageNumber activeStep={1} totalSteps={3} />
            {/* <ProgressPageNumber totalSteps={3} /> */}
            <div className='mb-12 mt-6'>
                <h2 className={cn('text-xltext-gray1 mb-1', poppins_500.className)}>Create Subject</h2>
                <p className={cn('text-sm text-gray3', poppins_400.className)}>Input the details of the subject  </p>
            </div>
            <Input
                id="subject"
                label="Subject title"
                type="text"
                labelClassName="label"
                className="input h-14 rounded-lg"
                name="text"
                placeholder="Subject title"
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
            />

            <div className='flex justify-between items-center border border-gray5 p-2 mt-6 rounded-[66px]'>
                <div className='flex items-center gap-3'>
                    <Button className='bg-gray4 rounded-full w-10 h-10 flex items-center justify-center border border-gray4'>
                        <UploadImageIcon />
                    </Button>
                    <p className={cn('text-sm text-gray6', poppins_400.className)}> Upload subject cover image </p>
                </div>

                <Button round className='bg-[#E8EBEA] h-[33px]'>
                    <Upload_Icon />
                    <span className={cn('text-sm text-primary', poppins_400.className)}>
                        Upload
                    </span>
                </Button>

            </div>
        </div>
    )
}

export default Step1