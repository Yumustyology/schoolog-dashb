import Dot from '@/components/atoms/dashboard/subjects/Dot';
import Locked from '@/components/atoms/dashboard/subjects/Locked';
import View from '@/components/atoms/dashboard/subjects/View';
import Marked from '@/components/atoms/icons/dashboard/Marked';
import Unmarked from '@/components/atoms/icons/dashboard/Unmarked';
import {
  Inter_500,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { Card, CardBody, Tooltip, Typography } from '@material-tailwind/react';
import React from 'react';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';

type AssignmentList = {
  mode: 'locked' | 'view' | 'active';
  topic: string;
  due_date: string;
  view: 'pending' | 'completed' | 'due' | 'locked';
  no_of_questions?: number;
  no_of_questions_answered?: number;
}[];

const assignmentsList: AssignmentList = [
  {
    mode: 'locked',
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    due_date: 'Nov, 12 2024 - 9am',
    view: 'locked',
  },
  {
    mode: 'locked',
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    due_date: 'Nov, 12 2024 - 9am',
    view: 'locked',
  },
  {
    mode: 'view',
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    due_date: 'Nov, 12 2024 - 9am',
    view: 'pending',
  },
  {
    mode: 'view',
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    due_date: 'Nov, 12 2024 - 9am',
    view: 'pending',
  },

  {
    mode: 'view',
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    due_date: 'Nov, 12 2024 - 9am',
    view: 'due',
  },
  {
    mode: 'view',
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    due_date: 'Nov, 12 2024 - 9am',
    view: 'due',
  },
  {
    mode: 'active',
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    due_date: 'Nov, 12 2024 - 9am',
    view: 'completed',
    no_of_questions: 20,
    no_of_questions_answered: 15,
  },
  {
    mode: 'active',
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    due_date: 'Nov, 12 2024 - 9am',
    view: 'completed',
    no_of_questions: 26,
    no_of_questions_answered: 5,
  },
];

function Assignments() {
  const {theme} = useSlgTheme()
  return (
    <>
      {assignmentsList.map((assignment) => {
        return (
          <Card
            key={assignment.topic}
            className="shadow-none w-full mb-4 border border-[#E0E0E0]"
          >
            <CardBody className="w-full flex justify-between items-center gap-3 p-3">
              <div>
                {assignment.view === 'pending' ? (
                  <Unmarked color="#F2994A" />
                ) : assignment.view === 'completed' ? (
                  <Marked color={theme.primary} />
                ) : assignment.view === 'due' ? (
                  <Unmarked color="#EB5757" />
                ) : (
                  <Unmarked />
                )}
              </div>

              <Typography
                className={cn('text-sm text-gray6 flex-1', Inter_500.className)}
              >
                {assignment.topic}
                <Typography
                  className={cn(
                    'text-xs text-gray flex items-center gap-4 mt-[6px]',
                    poppins_400.className
                  )}
                >
                  <p className="text-gray3">Due on</p>
                  {assignment.due_date}
                  <Dot size={1} color="#D9D9D9" />
                  <p className="text-gray3">
                    {assignment.no_of_questions} Questions
                  </p>
                </Typography>
              </Typography>

              <Tooltip>
                {assignment.mode === 'locked' ? (
                  <Locked />
                ) : assignment.mode === 'view' ? (
                  <View />
                ) : assignment.mode === 'active' ? (
                  <div>
                    <p
                      className={cn(
                        'text-primary text-[24px]',
                        poppins_600.className
                      )}
                    >
                      {' '}
                      {assignment.no_of_questions_answered}{' '}
                      <span
                        className={cn(
                          'text-gray text-xl',
                          poppins_400.className
                        )}
                      >
                        {' '}
                        / {assignment.no_of_questions}{' '}
                      </span>{' '}
                    </p>
                  </div>
                ) : (
                  <Locked />
                )}
              </Tooltip>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
}

export default Assignments;
