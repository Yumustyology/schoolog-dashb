import { Inter_400, Inter_800, poppins_500 } from '@/app/lib/config/font.config'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Button } from '../../atoms/Button'

type IsNotVerifiedProps = {
    title: string,
}

function IsNotVerified({ title }: IsNotVerifiedProps) {
    return (
        <main className=" w-full flex items-center justify-center ">
            <div className="flex flex-col items-start max-w-lg w-full gap-6">
                <div>
                    <h2 className={cn('text-[#101928] text-xl mb-6', Inter_800.className)}>
                        {title}
                    </h2>
                    <p className={cn('text-[#101928] text-sm', Inter_400.className)}>
                        Enter verification code sent{' '}
                        <Link href='/' className="text-primary">to adekoyatoluwani5@gmail.com</Link>
                    </p>
                </div>

                <div className=''>
                    <InputOTP maxLength={6}  >
                        <InputOTPGroup className="flex laptop:gap-4 gap-2">
                            <InputOTPSlot
                                className={cn('otp-input',
                                    poppins_500.className
                                )}
                                index={0}
                            />
                            <InputOTPSlot
                                className={cn('otp-input',
                                    poppins_500.className
                                )}
                                index={1}
                            />
                            <InputOTPSlot
                                className={cn('otp-input',
                                    poppins_500.className
                                )}
                                index={2}
                            />
                            <InputOTPSlot
                                className={cn('otp-input',
                                    poppins_500.className
                                )}
                                index={3}
                            />
                            <InputOTPSlot
                                className={cn('otp-input',
                                    poppins_500.className
                                )}
                                index={4}
                            />
                            <InputOTPSlot
                                className={cn('otp-input',
                                    poppins_500.className
                                )}
                                index={5}
                            />

                        </InputOTPGroup>
                    </InputOTP>

                </div>

                <div className="text-left">
                    <p className={cn('text-[#101928] text-sm mb-6', Inter_400.className)}>
                        Didn’t get the code? <Link href='/' className="text-primary">Resend</Link>
                    </p>
                    <p className={cn('text-primary text-sm', Inter_400.className)}>34 secs</p>
                </div>

                <Button name='Verify Account' />
            </div>



        </main>
    )
}

export default IsNotVerified