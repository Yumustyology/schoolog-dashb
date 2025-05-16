import { biology1, teacherImg2 } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo';
import Button from '@/components/atoms/form/Button';
import EyeClose from '@/components/atoms/icons/EyeClose';
import Message from '@/components/atoms/icons/SideBar/Message';
import { CardHeader } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';

export const WardsInfoCard = () => {
  const numberOfWards = 2;
  return (
    <div className="bg-white py-6 px-6 flex flex-col justify-between h-[390px] rounded-md col-span-2 border-none">
      {numberOfWards <= 1 ? (
        <div>
          <div className=" flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image src={biology1} alt="Student_Image" />
              <div>
                <h1
                  className={cn('text-sm text-black1', poppins_500.className)}
                >
                  Muhammad Jamiu
                </h1>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  SS1 student
                </p>
              </div>
            </div>

            <div className="bg-light text-primary rounded-full py-1 px-6">
              Active
            </div>
          </div>

          <SingleInfo
            leftText="Student ID"
            leftValue="172928739HD"
            rightText="Date of birth"
            rightValue="March 15, 2010"
          />
          <SingleInfo
            leftText="Teacher attendance"
            leftValue="80%"
            rightText="Average performance"
            rightValue="90%"
          />
          <SingleInfo
            leftText="Secondary Gurdian"
            leftValue="Muhammad Adeolu"
            rightText="Secondary guardian number"
            rightValue="0806932341"
          />

          <div className="flex gap-3 items-center mt-4">
            <Button wide round className="h-[45px] bg-light">
              <Message color="#21B55A" />
              <p
                className={cn(
                  'ml-2 text-primary text-base',
                  poppins_500.className
                )}
              >
                Message
              </p>
            </Button>

            <Button wide round flat className="h-[45px] border border-primary">
              <EyeClose color="#21B55A" />
              <p
                className={cn(
                  'ml-2 text-primary text-base',
                  poppins_500.className
                )}
              >
                View Details
              </p>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h4 className={cn('text-lg text-black1', poppins_500.className)}>
            Students{' '}
          </h4>
          <SingleWardCard />
          <SingleWardCard />
          <SingleWardCard />
        </div>
      )}
    </div>
  );
};

export const SingleWardCard = () => {
  return (
    <div className="bg-gray11 rounded-full p-3.5">
      <div className="flex gap-5">
        <Image src={teacherImg2} alt="teacher-image" />
        <div className="flex justify-between items-center w-full">
          <div>
            <h3
              className={cn('text-sm text-gray6 mb-1', poppins_500.className)}
            >
              Jimoh Jamiu
            </h3>

            <div>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                SS1 Student
              </p>
            </div>
          </div>

          <Button
            round
            className={cn(
              'text-gray6 bg-[#EBEBEB] text-sm px-3 py-2 ',
              poppins_400.className
            )}
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
};
