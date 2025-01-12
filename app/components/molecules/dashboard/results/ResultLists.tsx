'use client';

import {
  Inter_400,
  Inter_500,
  Inter_600,
  poppins_400,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import { Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { ResultTable } from './ResultTable';
import EyeOpen from '@/app/components/atoms/icons/EyeOpen';
import FormModal from '../FormModal';
import Input from '@/app/components/atoms/form/Input';
import SelectComp from '@/app/components/atoms/form/Select';
import HideArrow from '@/app/components/atoms/icons/SideBar/HideArrow';
import Button from '@/app/components/atoms/form/Button';
import DownloadIcon from '@/app/components/atoms/icons/dashboard/DownloadIcon';
import ScreenIcon from '@/app/components/atoms/icons/dashboard/ScreenIcon';
import Dot from '@/app/components/atoms/dashboard/subjects/Dot';

type TableDescription = {
  id: number;
  class: string;
  term: string;
  date: string;
  time: string;
  number_of_subjects: number;
  paid?: boolean;
  open: boolean;
};

const tableDescription: TableDescription[] = [
  {
    id: 1,
    class: 'SS1',
    term: 'first',
    date: 'Nov 12, 2024',
    time: '9am',
    number_of_subjects: 7,
    paid: false,
    open: false,
  },
  {
    id: 2,
    class: 'SS1',
    term: 'second',
    date: 'Dec 12, 2024',
    time: '10am',
    paid: true,
    number_of_subjects: 6,
    open: false,
  },
];

export function ResultLists(): JSX.Element {
  const [openTable, setOpenTable] = useState<Record<number, boolean>>({});
  const [viewResultModalOpen, setViewResultModalOpen] = useState(false);

  const toggleDrawer = (id: number): void => {
    setOpenTable((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <Card className="h-full w-full overflow-scroll p-3.5 mt-8 shadow-none">
        <SelectComp
          placeholder="All Class"
          className=""
          triggerClasses={cn(
            poppins_400.className,
            'mb-6 text-xs cursor-pointer text-gray6 2 text-center gap-1.5 w-max border-gray4 flex justify-between rounded-full h-[38px] items-center px-3 py-2'
          )}
          value=""
          onValueChange={console.log}
          options={[
            {
              id: 'all',
              name: 'All Class',
            },
            {
              id: 'jss1',
              name: 'JSS1',
            },
            {
              id: 'jss2',
              name: 'JSS2',
            },
            {
              id: 'jss3',
              name: 'JSS3',
            },
          ]}
        />
        {tableDescription.map((description) => (
          <div
            key={description.id}
            className={cn(
              'border-[#E0E0E0] border mb-6 rounded-md',
              description.paid ? '' : 'bg-[#F8F8F8]'
            )}
          >
            <div className="flex justify-between items-center p-3.5">
              <div>
                <h4
                  className={cn(
                    'text-sm text-gray6 mb-1.5',
                    Inter_500.className
                  )}
                >
                  {description.class} {description.term} term result
                </h4>
                <div
                  className={cn(
                    'flex items-center gap-2 text-gray3 text-xs',
                    poppins_400.className
                  )}
                >
                  <span className="text-gray3 text-xs">
                    {description.number_of_subjects} subjects
                  </span>
                  <Dot size={1} />
                  <span className="text-gray3 text-xs">
                    {description.date} - {description.time}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                {openTable[description.id] ? (
                  description.paid ? (
                    <Button
                      to="/student/results/ss1/1st"
                      round
                      className={cn(
                        'text-primary text-[16px] flex gap-4 bg-primary1',
                        Inter_600.className
                      )}
                    >
                      <ScreenIcon /> <span>Full screen</span>
                    </Button>
                  ) : null
                ) : null}

                {description.paid ? (
                  <Button
                    round
                    className={cn(
                      'text-white text-[16px] flex gap-4 bg-primary',
                      Inter_600.className
                    )}
                  >
                    <DownloadIcon size="20" color="#ffffff" />{' '}
                    <span>Download</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setViewResultModalOpen(true)}
                    round
                    className={cn(
                      'text-gray3 text-[16px] flex gap-4 bg-[#EAEAEA]',
                      Inter_600.className
                    )}
                  >
                    <EyeOpen color="#828282" size="20" /> <span>View</span>
                  </Button>
                )}

                <div
                  className={cn(
                    'cursor-pointer transform transition-transform duration-300',
                    openTable[description.id] ? 'rotate-180' : 'rotate-0'
                  )}
                  onClick={() =>
                    description.paid
                      ? toggleDrawer(description.id)
                      : setViewResultModalOpen(true)
                  }
                >
                  <HideArrow />
                </div>
              </div>
            </div>

            <div
              className={cn(
                'overflow-hidden transition-all duration-500 ease-in-out px-3.5',
                openTable[description.id] ? 'max-h-[1000px] mt-4' : 'max-h-0'
              )}
            >
              <ResultTable />
            </div>
          </div>
        ))}
      </Card>

      <FormModal
        isOpen={viewResultModalOpen}
        onClose={() => setViewResultModalOpen(false)}
        title="Check result"
      >
        <div>
          <div>
            <h2 className={cn('text-2xl text-gray1 ', Inter_600.className)}>
              Input <span className="text-primary"> result code </span>
            </h2>
            <p className={cn('text-sm text-gray mt-1', Inter_400.className)}>
              Input the 5 unique code issued to your parents after purchasing
              the report card pass
            </p>
          </div>

          <div className="mt-10">
            <Input
              label="Report card code"
              labelClassName="-mb-3"
              placeholder="Input code"
              className="h-[56px] mt-6 border border-gray2 rounded-md"
            />
          </div>
        </div>
      </FormModal>
    </>
  );
}
