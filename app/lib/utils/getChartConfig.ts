'use client';
import { Inter_400 } from '@/app/lib/config/font.config';
import { themes } from '../themes/themeConfig';

import type { ApexOptions } from 'apexcharts';
import { themeState } from '../entities/theme.entity';

export interface ChartParams {
  series: ApexAxisChartSeries; // e.g. [{ name: 'Grades', data: [ ... ] }]
  categories?: string[]; // e.g. ['Apr','May',…]
  height?: number;
}

export function getChartConfig({
  series,
  categories = [],
  height = 240,
}: ChartParams): {
  series: ApexAxisChartSeries;
  options: ApexOptions;
  type: 'line';
  height: number;
} {
  const themeKey = themeState.use();

  const theme = themes[themeKey];

  const options: ApexOptions = {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: [theme?.primary],
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
    },
    markers: { size: 0 },
    xaxis: {
      categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          colors: '#4F4F4F',
          fontSize: '9px',
          fontFamily: Inter_400.className,
          fontWeight: 400,
        },
      },
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
      xaxis: { lines: { show: true } },
      padding: { top: 5, right: 0 },
    },
    fill: { opacity: 0.8 },
    tooltip: { theme: 'light' },
  };

  return {
    type: 'line',
    height,
    series,
    options,
  };
}
