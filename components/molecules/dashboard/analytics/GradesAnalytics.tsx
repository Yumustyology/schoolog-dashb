'use client';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import ArrowUpIcon from '@/components/atoms/icons/ArrowUpIcon';
import {
  Inter_400,
  Inter_800,
  poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { CardBody } from '@material-tailwind/react';
import dynamic from 'next/dynamic';
import { getChartConfig } from '@/app/lib/utils/getChartConfig';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const GradesAnalytics = () => {
  const data = [50, 40, 300, 320, 500, 350, 200, 230, 500];
  const categories = [
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const chartConfig = getChartConfig({
    series: [{ name: 'Grades', data }],
    categories,
    height: 240,
  });

  return (
    <div>
      <div className="flex items-end gap-3">
        <p className="text-black1 flex gap-1 items-end">
          <h2 className={cn(Inter_800.className, 'text-3xl')}>90</h2>
          <span className={Inter_400.className}>/</span>
          <span className={cn(Inter_400.className, 'text-gray3')}>
            average grade
          </span>
        </p>
        <div
          className={cn(
            'px-1.5 py-1 text-[#079455] rounded-full bg-[#21B55A1F] flex gap-1 items-center w-max pr-2 h-[28px] text-sm',
            poppins_500.className
          )}
        >
          <span className="flex-shrink-0">
            <ArrowUpIcon />
          </span>
          <span>40%</span>
        </div>
      </div>
      <CardBody className="px-0 pb-0 w-full">
        <Chart {...(chartConfig as any)} width={'100%'} />
      </CardBody>
    </div>
  );
};

export default GradesAnalytics;
