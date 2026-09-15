import Dot from '@/components/atoms/dashboard/subjects/Dot';
import View from '@/components/atoms/dashboard/subjects/View';
import Marked from '@/components/atoms/icons/dashboard/Marked';
import Unmarked from '@/components/atoms/icons/dashboard/Unmarked';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { BookOpen } from 'lucide-react';

import React from 'react';
import Button from '@/components/atoms/form/Button';
import EyeClose from '@/components/atoms/icons/EyeClose';
import { TopicDetailDrawer } from '@/components/atoms/dashboard/subjects/SubjectsDrawer/TopicDetailsDrawer';
import Empty from '@/components/molecules/empty/Empty';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
type TopicsList = {
  id?: string;
  isMarked: boolean;
  topic: string;
  week: number;
  date: string;
  view: React.ReactNode;
  status?: string;
  details?: string;
  subtopics?: {
    isMarked: boolean;
    subtopic: string;
  }[];
}[];

const topicsList: TopicsList = [
  {
    isMarked: true,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
    status: 'Completed',
    details:
      'The success of any study or survey often hinges on the quality of its participants. This report provides an in-depth analysis of participant engagement, performance, and overall contributions within recent studies conducted on our platform. By highlighting key metrics and participant feedback, this report aims to showcase the value participants bring to our research ecosystem.',
    subtopics: [
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
    ],
  },
  {
    isMarked: false,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
    status: 'Completed',
    details:
      'The success of any study or survey often hinges on the quality of its participants. This report provides an in-depth analysis of participant engagement, performance, and overall contributions within recent studies conducted on our platform. By highlighting key metrics and participant feedback, this report aims to showcase the value participants bring to our research ecosystem.',
    subtopics: [
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
    ],
  },
  {
    isMarked: false,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
    status: 'Completed',
    details:
      'The success of any study or survey often hinges on the quality of its participants. This report provides an in-depth analysis of participant engagement, performance, and overall contributions within recent studies conducted on our platform. By highlighting key metrics and participant feedback, this report aims to showcase the value participants bring to our research ecosystem.',
    subtopics: [
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
    ],
  },
  {
    isMarked: true,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
    status: 'Completed',
    details:
      'The success of any study or survey often hinges on the quality of its participants. This report provides an in-depth analysis of participant engagement, performance, and overall contributions within recent studies conducted on our platform. By highlighting key metrics and participant feedback, this report aims to showcase the value participants bring to our research ecosystem.',
    subtopics: [
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
    ],
  },
  {
    isMarked: true,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
    status: 'Completed',
    details:
      'The success of any study or survey often hinges on the quality of its participants. This report provides an in-depth analysis of participant engagement, performance, and overall contributions within recent studies conducted on our platform. By highlighting key metrics and participant feedback, this report aims to showcase the value participants bring to our research ecosystem.',
    subtopics: [
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
    ],
  },
  {
    isMarked: true,
    topic:
      'Assessing the Efficacy of Plant-Based Diets in Reducing Cardiovascular Risks',
    week: 1,
    date: 'Nov, 12 2024 - 9am',
    view: <View />,
    status: 'Completed',
    details:
      'The success of any study or survey often hinges on the quality of its participants. This report provides an in-depth analysis of participant engagement, performance, and overall contributions within recent studies conducted on our platform. By highlighting key metrics and participant feedback, this report aims to showcase the value participants bring to our research ecosystem.',
    subtopics: [
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
      {
        isMarked: true,
        subtopic: 'Introduction to personal assessments',
      },
    ],
  },
];

function Topics({ items, isLoading }: { items?: TopicsList; isLoading?: boolean }) {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const { theme } = useSlgTheme();
  const list = items ?? topicsList;

  if (isLoading) {
    // simple shimmer placeholder while topics load
    const placeholders = Array.from({ length: 4 }).map((_, i) => (
      <Card key={`shimmer-${i}`} className="bg-[#F8F8F8] shadow-none w-full mb-4">
        <CardBody className="w-full flex items-center gap-3 p-3">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
        </CardBody>
      </Card>
    ));

    return <>{placeholders}</>;
  }

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center my-2">
        <Empty
          icon={<BookOpen className="w-16 h-16 text-primary" />}
          title="No curriculum topics added yet"
          description='No topics or modules have been added to this curriculum yet. Use the "Edit Curriculum" button above to add topics and schedule learning modules.'
        />
      </div>
    );
  }

  return (
    <>
      {list.map((topic, idx) => {
        return (
          <Card
            key={topic.id || `topic-${idx}-${topic.topic}`}
            className="bg-[#F8F8F8] shadow-none w-full mb-4"
          >
            <CardBody className="w-full flex justify-between items-center gap-3 p-3">
              <div>
                {topic.isMarked ? (
                  <Marked color={theme.primary} />
                ) : (
                  <Unmarked />
                )}
              </div>

              <Typography
                className={cn('text-sm text-gray6 flex-1', Inter_500.className)}
              >
                {topic.topic}
                {topic.details ? (
                  <Typography
                    className={cn(
                      'text-sm text-gray mt-2',
                      poppins_400.className
                    )}
                  >
                    {topic.details}
                  </Typography>
                ) : null}
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

              <Button
                onClick={() => {
                  setShowDrawer(true);
                }}
                className={cn(
                  'bg-[#EAEAEA] text-gray3 flex gap-3 text-sm rounded-full',
                  poppins_400.className
                )}
              >
                <EyeClose />
                <span>View</span>
              </Button>
            </CardBody>
            <TopicDetailDrawer
              isTopicDetailsOpen={showDrawer}
              setIsTopicDetailsOpen={setShowDrawer}
              week={topic.week}
              topic={topic.topic}
              details={topic.details}
              status={topic.status}
              subtopics={topic.subtopics}
            />
          </Card>
        );
      })}
    </>
  );
}

export default Topics;
