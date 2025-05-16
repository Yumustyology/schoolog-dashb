'use client';

import { useState } from 'react';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo';
import Button from '@/components/atoms/form/Button';
import { EditIcon } from '@/components/atoms/icons/Icons';

export function AchievementsComments() {
  const [activeTab, setActiveTab] = useState('achievements');

  const data = [
    {
      label: 'Achievements',
      value: 'achievements',
      desc: <Achievements />,
    },
    {
      label: 'Comments',
      value: 'comments',
      desc: <Comments />,
    },
  ];

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {data.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={cn(
              'py-2 px-4 text-sm font-medium transition-colors duration-200',
              activeTab === value
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-primary',
              poppins_500.className
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {data.map(({ value, desc }) =>
          activeTab === value ? (
            <div key={value} className="text-sm text-gray-700">
              {desc}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

const achievements = [
  {
    title: 'School Headboy',
    date: 'June 24, 2024 - till date',
  },
  {
    title: 'Best in Biology',
    date: 'Last update on June 12',
    grade: '98%',
    text: 'Total Grade',
  },
  {
    title: 'Best in Mathematics',
    date: 'Last update on June 12',
    grade: '98%',
    text: 'Total Grade',
  },
];

const Achievements = () => {
  return (
    <div className="flex flex-col gap-6">
      {achievements.map((achievement) => (
        <div className="bg-[#FCFCFC] rounded-md p-3 border border-gray4">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3
                className={cn(
                  'text-sm text-black1 mb-1',
                  poppins_500.className
                )}
              >
                {achievement.title}
              </h3>
              <p className={cn('text-xs text-gray', poppins_400.className)}>
                {achievement.date}
              </p>
            </div>

            <div className="text-right">
              <h3
                className={cn(
                  'text-sm text-black1 mb-1',
                  poppins_500.className
                )}
              >
                {achievement.grade}
              </h3>
              {achievement.grade && (
                <p
                  className={cn(
                    'text-xs text-[#BDBDBD]',
                    poppins_400.className
                  )}
                >
                  Total Grade
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <Button wide className=" bg-gray11 text-center py-2.5 text-gray6">
        {' '}
        See all{' '}
      </Button>
    </div>
  );
};

const Comments = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="flex-1 leading-relaxed">
        {' '}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
        consequuntur excepturi necessitatibus iusto sunt eaque dolor molestiae,
        dolores modi, quis autem nostrum placeat ipsum iure consectetur cumque
        molestias ut eius!
      </p>
      <p className="flex-1 leading-relaxed">
        {' '}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
        consequuntur excepturi necessitatibus iusto sunt eaque dolor molestiae,
        dolores modi, quis autem nostrum placeat ipsum iure consectetur cumque
        molestias ut eius!
      </p>
      <Button wide className="mt-auto bg-gray11 text-center py-2.5 text-gray6">
        {' '}
        <EditIcon /> <span> Edit </span>{' '}
      </Button>
    </div>
  );
};
