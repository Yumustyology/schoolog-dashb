import React from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/atoms/Button'
import Input from '@/app/components/molecules/auth/Input'
import EyeOpen from '@/app/components/atoms/icons/EyeOpen'

function Register() {
    return (
        <div className='w-164 py-28 px-14'>
            <div className='flex flex-col gap-4  '>
                <EyeOpen/>

                <div className='pt-18 mx-auto text-center mb-4'>
                    <h1 className='text-[26px] font-semibold mb-2 leading-[39px]'> Welcome to  <span className='text-primary'>  EduSpaher </span> </h1>
                    <p className='text-gray text-[13px] w-[308px] leading-[20px]'>Lorem ipsum dolor sit amet consectetur. Sapien ipsum lorem volutpat magna tortor.</p>
                </div>

                <form action="" className='mx-auto'>
                    <Input labelName='Full name' type='text' name='fullname' placeholder='Input your name' />
                    <Input labelName='Email' type='email' name='email' placeholder='Input email address' />
                    <Input labelName='Password' type='password' name='password' placeholder='**************' />
                    <Input labelName='Confirm Password' type='password' name='confirm-password' placeholder='**************' />


                    <Button name='Register' />

                </form>

                <div className='text-center mt-8 text-[#323232] text-4 leading-7'>
                    <p> Already have an account? <Link href='login' className='text-primary'> Log in  </Link>  </p>
                    <p className='mt-4'>
                        By Signing In, you agree to our <Link href='/' className='text-primary'> terms of services  </Link>  <br />
                        and that you have read our <Link href='/' className='text-primary'> privacy policy </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Register