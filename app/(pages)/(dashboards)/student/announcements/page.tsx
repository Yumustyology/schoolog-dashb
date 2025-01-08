'use client';
import Search from '@/app/components/atoms/form/SearchInput';
import { DatePicker } from '@/app/components/atoms/form/DatePicker';
import Button from '@/app/components/atoms/form/Button';
import { DrawerSide } from '@/app/components/molecules/dashboard/DrawerSide';
import {
  Inter_400,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Announcements } from '@/types';
import SelectBox from '@/app/components/atoms/dashboard/subjects/Select';
import PaginationBox from '@/app/components/atoms/dashboard/subjects/Pagination';

const announcements: Announcements = [
  {
    headline: '2024 Midterm break starts from June 11 to June 16',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
    date: '21/05/2015',
  },
  {
    headline: '2024 Midterm break starts from June 11 to June 16',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
    date: '21/05/2015',
  },
  {
    headline: '2024 Midterm break starts from June 11 to June 16',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
    date: '21/05/2015',
  },
  {
    headline: '2024 Midterm break starts from June 11 to June 16',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
    date: '21/05/2015',
  },
  {
    headline: '2024 Midterm break starts from June 11 to June 16',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
    date: '21/05/2015',
  },
];
function page() {
    const [open, setOpen] = useState(false);
  
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
  return (
    <div className="bg-white w-full p-6 mt-6 rounded-lg  h-auto">
      <div className="flex items-center mb-8 gap-4 w-1/2">
        <Search placeholder="Search Title and keywords" />
        <DatePicker className='w-max' />
      </div>
      <div className="flex flex-col gap-4">
        {announcements.map((announcement, index) => {
          return (
            <Button
            wide
            onClick={openDrawer}
              childrenClassName="w-full !justify-between items-start gap-8" 
              className="!justify-start text-left items-start flex p-3 bg-[#F8F8F8] border border-[#E5E5EA] rounded-md"
              key={index}
            >
              <div>
                <h2 className={cn('text-sm text-gray1', poppins_500.className)}>
                  {announcement.headline}
                </h2>
                <p
                  className={cn('text-sm text-[#6B6B6B] ', Inter_400.className)}
                >
                  {announcement.content}
                </p>
              </div>
              <div>
                <p
                  className={cn('text-sm text-[#6B6B6B] ', Inter_400.className)}
                >
                  {announcement.date}
                </p>
              </div>
            </Button>
          );
        })}
         <footer className="mt-6 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h5> Showing </h5>
            <SelectBox />
          </div>

          <div>
            <PaginationBox />
          </div>
        </footer>
      </div>

      <DrawerSide open={open} close={closeDrawer} title="Announcement details" subtitle="21/05/2024">
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div className="mt-6">
            <Typography>
              <h2
                className={cn(
                  'text-[20px] text-gray1 mb-4',
                  poppins_500.className
                )}
              >
                2024 Midterm break starts from June 11 to June 16
              </h2>
              <p
                className={cn('text-sm text-[#071E3B]', poppins_400.className)}
              >
                Lorem ipsum dolor sit amet consectetur. Ultricies felis lacus
                massa mi massa dignissim. Gravida vel nunc dictum in pretium
                fusce vulputate. Tristique ultrices etiam diam enim eleifend nec
                ornare et. Blandit eu sed pellentesque sit leo ornare lacus
                semper. Eget facilisi amet volutpat sit felis senectus aliquet
                vitae penatibus. Viverra nulla auctor quam egestas. Risus
                gravida nunc consectetur donec sit cras justo. Volutpat
                vestibulum vitae odio sagittis nisl feugiat. Elit id enim
                scelerisque amet. Enim proin accumsan arcu arcu ultricies
                volutpat sit. Quis sed eget massa amet feugiat varius odio
                massa. Nullam mi eget porttitor mattis. Turpis suspendisse
                sagittis ultricies non at adipiscing. Id ac amet sit nisl
                vivamus. Leo ultricies ornare pulvinar netus at semper nulla.
                Egestas id ipsum orci viverra quam risus tempus semper nec.
                Nunc.
              </p>
            </Typography>
          </div>
        </div>
        <div className="px-6 mt-6">
          <Button
          onClick={closeDrawer}
            round
            wide
            className="absolute bottom-3 bg-primary left-0 right-0 w-full text-white flex gap-3"
          >
            Okay
          </Button>
        </div>
      </DrawerSide>
    </div>
  );
}

export default page;
