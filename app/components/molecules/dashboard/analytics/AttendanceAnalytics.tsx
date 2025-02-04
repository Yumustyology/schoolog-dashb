'use client';
import ArrowUpIcon from '@/app/components/atoms/icons/ArrowUpIcon';
import {
  Inter_400,
  Inter_500,
  Inter_800,
  poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';
import { CardBody } from '@material-tailwind/react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartConfig = {
  type: 'line',
  height: 240,
  series: [
    {
      name: 'Grades',
      data: [10, 50, 30, 70, 50, 330, 400, 630, 800],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: '',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#21B55A'],
    stroke: {
      lineCap: 'round',
      curve: 'smooth',
    },
    // colors: ["#FCC200"],
    // stroke: {
    //   lineCap: "round",
    //   curve: "smooth",
    //   colors: ["#FCC200"]
    // },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: '#4F4F4F',
          fontSize: '9px',
          fontFamily: Inter_400.className,
          fontWeight: 400,
        },
      },
      categories: [
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: '#4F4F4F',
          fontSize: '9px',
          fontFamily: Inter_400.className,
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: '#E5E5EA',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 0,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: 'light',
    },
  },
};

const AttendanceAnalytics = () => {
  return (
    <div>
      <div className="flex items-end gap-3">
        <p className="text-black1 flex gap-1 items-end">
          <h2 className={cn(Inter_800.className, 'text-3xl')}>60</h2>
          <span className={Inter_400.className}>/</span>
          <span className={cn(Inter_400.className, 'text-gray3')}>
            average attendance
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

export default AttendanceAnalytics;
