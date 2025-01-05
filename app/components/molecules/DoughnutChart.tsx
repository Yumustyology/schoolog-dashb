'use client';

import * as React from 'react';
import { Label, Pie, PieChart, LabelProps } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CardContent } from '@/components/ui/card';

interface ChartData {
  status: 'present' | 'absent';
  // status: "present" | "late" | "absent";
  count: number;
  fill: string;
}

const chartData: ChartData[] = [
  { status: 'present', count: 275, fill: 'hsl(var(--chart-1))' },
  // { status: "late", count: 200, fill: "hsl(var(--chart-2))" },
  { status: 'absent', count: 287, fill: 'hsl(var(--chart-3))' },
];

interface ChartConfigItem {
  label: string;
  color: string;
}

const chartConfig: Record<string, ChartConfigItem> = {
  present: {
    label: 'Present',
    color: 'hsl(var(--chart-1))',
  },
  // late: {
  //   label: "Late",
  //   color: "hsl(var(--chart-2))",
  // },
  absent: {
    label: 'Absent',
    color: 'hsl(var(--chart-3))',
  },
};

function DoughnutChart() {
  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  const legendItems = Object.keys(chartConfig).map((key) => {
    const { label, color } = chartConfig[key];
    return { label, color };
  });

  return (
    <div className="flex w-full flex-col">
      <CardContent className="flex-1 w-full pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[250px] p-0 flex-shrink-0 aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }: LabelProps) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="w-full flex justify-center gap-6 items-center">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoughnutChart;
