import { Button } from '@/app/components/atoms/Button'
import Input from '@/app/components/molecules/auth/Input'
import Link from 'next/link'
import React from 'react'

function Login() {
    return (
        <div className='w-164 py-28 px-14'>
            <div className='flex flex-col gap-4  '>

                <div className='pt-18 mx-auto text-center mb-4'>
                    <h1 className='text-[26px] font-semibold mb-2 leading-[39px]'> Welcome to  <span className='text-primary'>  EduSpaher </span> </h1>
                    <p className='text-gray text-[13px] w-[308px] leading-[20px]'>Lorem ipsum dolor sit amet consectetur. Sapien ipsum lorem volutpat magna tortor.</p>
                </div>

                <form action="" className='mx-auto'>
                    <Input labelName='Email' type='email' name='email' placeholder='Input email address' />

                    <Input labelName='Password' type='password' name='password' placeholder='**************' />

                    <Button name='Log in' />

                </form>

                <div className='text-center mt-8 text-[#323232] text-4 leading-7'>
                    <p> Don't have an account? <Link href='register' className='text-primary'> Sign up  </Link>  </p>

                </div>

            </div>
        </div>)
}

export default Login