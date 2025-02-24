import Dot from '@/app/components/atoms/dashboard/subjects/Dot';
import View from '@/app/components/atoms/dashboard/subjects/View';
import Marked from '@/app/components/atoms/icons/dashboard/Marked';
import Unmarked from '@/app/components/atoms/icons/dashboard/Unmarked';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import { Card, CardBody, Tooltip, Typography } from '@material-tailwind/react';

import React from 'react';
type TopicsList = {
  isMarked: boolean;
  topic: string;
  week: number;
  date: string;
  view: React.ReactNode;
}[];

const topicsList: TopicsList = [
  {
    isMarked: true,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
  },
  {
    isMarked: false,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
  },
  {
    isMarked: false,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
  },
  {
    isMarked: true,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
  },
  {
    isMarked: true,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
  },
  {
    isMarked: true,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
  },
];

function Topics() {
  return (
    <>
      {topicsList.map((topic) => {
        return (
          <Card
            key={topic.topic}
            className="bg-[#F8F8F8] shadow-none w-full mb-4"
          >
            <CardBody className="w-full flex justify-between items-center gap-3 p-3">
              <div>{topic.isMarked ? <Marked /> : <Unmarked />}</div>

              <Typography
                className={cn('text-sm text-gray6 flex-1', Inter_500.className)}
              >
                {topic.topic}
                <Typography
                  className={cn(
                    'text-xs text-gray flex items-center gap-4 mt-[6px]',
                    poppins_400.className
                  )}
                >
                  <p className="">Week {topic.week}</p>
                  <Dot size={1} color="#D9D9D9" />
                  {topic.date}
                </Typography>
              </Typography>

              <Tooltip>{topic.view}</Tooltip>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
}

export default Topics;
