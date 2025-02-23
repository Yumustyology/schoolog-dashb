import { biology1 } from '@/app/assets';
import Button from '@/app/components/atoms/form/Button';
import { ArchiveIcon, DeleteIcon } from '@/app/components/atoms/icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import SchoolStats from '../atoms/SchoolStat';

function SubjectInfoCard({ role }: { role: "school" | "student" | "parent" }) {
    return (
        <Card className="bg-white py-6 px-6 rounded-md col-span-2 border-none">
            <CardHeader className="w-full p-0 mb-10">
                <div className="flex items-center gap-3">
                    <Image src={biology1} alt="Subject Image" />

                    {role === 'student' && (

                        <div>
                            <h1 className={cn('text-sm text-black1', poppins_500.className)}>
                                Biology
                            </h1>
                            <p className={cn('text-sm text-gray', poppins_400.className)}>
                                {' '}
                                <span className="text-primary">4</span>/32 topics covered
                            </p>
                        </div>
                    )}

                    {
                        role === "school" && (
                            <div>
                                <h1 className={cn('text-sm text-black1', poppins_500.className)}>
                                    Biology
                                </h1>
                                <p className={cn('text-sm text-gray mt-1.5', poppins_500.className)}>
                                    SS1
                                </p>
                            </div>
                        )
                    }

                </div>
            </CardHeader>

            <CardContent className="flex flex-col p-0 gap-8">
                <main className="flex justify-between items-center">
                    {role == "student" && (
                        <>
                            <div>
                                <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                                    Monday - 22nd Nov, 2024
                                </h3>
                                <p className={cn('text-sm text-gray', poppins_400.className)}>
                                    Next class
                                </p>
                            </div>

                            <div>
                                <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                                    9:00am{' '}
                                </h3>
                                <p className={cn('text-sm text-gray', poppins_400.className)}>
                                    Next class time
                                </p>
                            </div>
                        </>
                    )
                    }

                    {role == "school" && (
                        
                        <SchoolStats/>
                    )
                    }

                </main>

                {role === "student" && (
                    <div>
                        <p className={cn('text-sm text-gray', poppins_400.className)}>
                            Next class topic
                        </p>
                        <h3 className={cn('text-sm text-gray6', poppins_500.className)}>
                            Teacher Professional Development and Student Outcomes
                        </h3>
                    </div>
                )
                }

                {role === 'school' && (
                    <div className='flex space-x-4'>
                        <Button round flat className={cn('flex text-r2 h-[48px] w-[191px] border border-r2',)} >
                            <DeleteIcon />
                            <span className={cn('text-base text-r2', poppins_500.className )}>
                                Delete Subject
                            </span>
                        </Button>

                        <Button round className={cn('flex h-[48px] w-[191px] bg-light',)} >
                            < ArchiveIcon color='#21B55A'/>
                            <span className={cn('text-base text-primary', poppins_500.className )}>
                                Archive Subject
                            </span>
                        </Button>

                    </div>
                )}

            </CardContent>
        </Card >
    );
}

export default SubjectInfoCard;
