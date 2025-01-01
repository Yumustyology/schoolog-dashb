'use client';
import Search from '@/app/components/atoms/Search';
import { DatePicker } from '@/app/components/atoms/dashboard/materials/DatePicker';
import Button from '@/app/components/atoms/form/Button';
import { DrawerSide } from '@/app/components/molecules/dashboard/DrawerSide';
import {
  Inter_400,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import { Announcements } from '@/type';
import { Typography } from '@material-tailwind/react';
import React from 'react';

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
  return (
    <div className="bg-white w-full p-6 mt-6 rounded-lg  h-auto">
      <div className="flex items-center mb-3 gap-4 w-1/2">
        <Search placeholderName="Search Title and keywords" />
        <DatePicker />
      </div>
      <div className="flex flex-col gap-4 ">
        {announcements.map((announcement, index) => {
          return (
            <div
              className="flex gap-8 p-3 items-center bg-[#F8F8F8] border border-[#E5E5EA] rounded-md"
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
            </div>
          );
        })}
      </div>

      <DrawerSide title="Announcement details" subtitle="21/05/2024">
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
            round
            wide
            className="absolute bottom-3 bg-primary left-0 right-0 w-full text-white flex gap-3"
          >
            {' '}
            Okay{' '}
          </Button>
        </div>
      </DrawerSide>
    </div>
  );
}

export default page;
