'use client';
import { activities1 } from '@/app/assets';
import Dot from '@/app/components/atoms/dashboard/subjects/Dot';
import Button from '@/app/components/atoms/form/Button';
import RequestIcon from '@/app/components/atoms/icons/ModalIcons/RequestIcon';
import CalendarIcon from '@/app/components/atoms/icons/dashboard/CalendarIcon';
import CategoryIcon from '@/app/components/atoms/icons/dashboard/CategoryIcon';
import Modal from '@/app/components/molecules/Modal';
import { DrawerSide } from '@/app/components/molecules/dashboard/DrawerSide';
import FormModal from '@/app/components/molecules/dashboard/FormModal';
import QuestionBox from '@/app/components/molecules/dashboard/QuestionBox';
import YesNoQuestion from '@/app/components/molecules/dashboard/YesNoQuestionnBox';
import {
  Inter_400,
  Inter_600,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { activitiesAndEvents } from '@/constants';
import { cn } from '@/lib/utils';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';

function ActivitiesAndEvents() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);
  const [openDrawer,setOpenDrawer] = React.useState(false);

  const onClose = () => setIsModalOpen(false);
  return (
    <>
    <div className="w-full">
      <section className="grid desktop:grid-cols-3 xlgDesktop:grid-cols-4 gap-6">
        {activitiesAndEvents.map((activitiesAndEvent:any) => {
          return (
            <div
              key={activitiesAndEvent.title}
              className="flex flex-col gap-4 w-full --max-w-[333px] bg-white flex-1"
            >
              <div className="h-[161px] relative">
                <Image
                  onClick={()=>setOpenDrawer(true)}
                  className="w-[333px]- w-full h-[161px] object-cover rounded-[8px]"
                  src={activitiesAndEvent.image}
                  alt={activitiesAndEvent.title}
                />
                <p
                  className={cn(
                    'border border-[#FFFFFFA6] absolute top-3 right-3  bg-[#00000059] text-white rounded-[32px] py-1 px-2 ',
                    poppins_500.className
                  )}
                >
                  {activitiesAndEvent.price}
                </p>
              </div>
              <div className=" flex flex-col gap-3">
                <h2
                onClick={()=>setOpenDrawer(true)}
                  className={cn('text-base text-gray1', poppins_500.className)}
                >
                  {activitiesAndEvent.title}
                </h2>

                <div
                  className={cn(
                    'flex items-center gap-2 text-gray3 text-sm',
                    poppins_500.className
                  )}
                >
                  <span className="text-gray3">{activitiesAndEvent.type} </span>
                  <Dot />
                  <span>{activitiesAndEvent.mode}</span>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-2 text-gray6 text-xs',
                    poppins_400.className
                  )}
                >
                  <span className="flex items-center gap-1">
                    <CalendarIcon />
                    {activitiesAndEvent.date}{' '}
                  </span>
                  <span className="flex items-center gap-1">
                    <CategoryIcon />
                    {activitiesAndEvent.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>
  
        <FormModal
          isOpen={isModalOpen}
          onClose={onClose}
          proceedClick={()=>{
            onClose()
            setIsRequestModalOpen(true)
          }}
          backClick={onClose}
          title="Registration form"
          body="Are you sure you want to submit this answer? You will be graded based on the answer provided"
        >
          <div>
            <h2 className={cn('text-2xl text-gray1 ', Inter_600.className)}>
              Fill the <span className="text-primary"> Registration form </span>
            </h2>
            <p className={cn('text-sm text-gray mt-1', Inter_400.className)}>
              Fill the registration form to proceed with your registration
            </p>
          </div>

          <div className="mt-[63px]">
            <QuestionBox />
            <div>
              <YesNoQuestion question="Do you have any club you presently partake in?" />
              <Input
                placeholder="Input the club name"
                className="h-[56px] mt-6 border border-gray2 rounded-md"
              />
            </div>
            <div>
              <YesNoQuestion question="Have you previously joined a jet club in the past" />
              <Input
                placeholder="Input the club name"
                className="h-[56px] mt-6 border border-gray2 rounded-md"
              />
            </div>

            <div className="mt-6">
              <Label
                className={cn(
                  'text-[16px] text-gray1 mt-6',
                  Inter_400.className
                )}
              >
                What name do you prefer to be called?
              </Label>
              <Input
                placeholder="Input the text here..."
                className="h-[56px] mt-3 border border-gray2 rounded-md"
              />
            </div>
          </div>
        </FormModal>
    

  
                <Modal isOpen={isRequestModalOpen} onClose={()=>setIsRequestModalOpen(false)} title="Request">
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-8">
                            <RequestIcon />
                        </div>
                        <h3 className={cn('text-lg', Inter_600.className)}>
                            {' '}
                            Request sent{' '}
                        </h3>
                        <p
                            className={cn(
                                'text-center text-gray3 mt-4 px-3',
                                Inter_400.className
                            )}
                        >
                            You will be notified once the admin accept your request
                        </p>
                    </div>

                    <Button onClick={()=>setIsRequestModalOpen(false)} wide round className="h-12 mt-7">
                        Okay
                    </Button>
                </Modal>
          
    </div>

     <DrawerSide open={openDrawer} close={()=>setOpenDrawer(false)} title="Event Details">
        <div className="sidebar-scroll-- p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div className="relative h-[233px]">
            <Image
              src={activities1}
              alt="activities"
              className="rounded-md object-cover h-[233px]"
            />
            <p
              className={cn(
                'border border-[#FFFFFFA6] absolute top-3 right-3  bg-[#00000059] text-white rounded-[32px] py-1 px-2 ',
                poppins_500.className
              )}
            >
              N5,000
            </p>
          </div>
          <div className="mt-6">
            <Typography>
              <h2
                className={cn('text-xl text-gray1 mb-2', poppins_500.className)}
              >
                Jet club student organization
              </h2>
            </Typography>
            <Typography>
              <span
                className={cn(
                  'text-sm flex items-center text-gray6 gap-1.5',
                  poppins_400.className
                )}
              >
                Event <Dot /> Physical <CalendarIcon /> 16/03/2024{' '}
                <CategoryIcon /> For all students
              </span>
            </Typography>
            <Typography className="my-4">
              <span
                className={cn(
                  'text-sm flex items-center text-gray6 gap-1.5',
                  poppins_400.className
                )}
              >
                Registration ends on{' '}
                <span className="text-gray1"> 16/03/2024 </span>
              </span>
            </Typography>
            <p
              className={cn(
                'text-sm flex items-center text-gray gap-1.5 mb-3',
                poppins_400.className
              )}
            >
              About us
            </p>
            <p
              className={cn(
                'text-sm flex items-center text-[#071E3B] gap-1.5',
                poppins_400.className
              )}
            >
              Agriculture is the cornerstone of food security, serving as the
              primary means of sustenance and economic stability for nations
              worldwide. It encompasses the cultivation of crops and livestock,
              which are essential for providing the food supply that suppor.
            </p>
          </div>
        </div>
        <div className="px-6 mt-6">
          <Button
            round
            wide
            className="absolute bottom-3  left-0 right-0 w-full"
          >
            Register
          </Button>
        </div>
      </DrawerSide>
    </>
  );
}

export default ActivitiesAndEvents;
