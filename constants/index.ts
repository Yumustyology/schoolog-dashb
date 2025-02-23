import {
  activities1,
  activities2,
  agricultural,
  avatar,
  biology,
  chemistry,
  computer,
  economics,
  geography,
  mathematics,
  nutrition,
  physics,
  teacherImg,
  teacherImg2,
} from '@/app/assets';
import { ActivitiesAndEvent } from '@/type';

export const subjectsList = [
  {
    id: 1,
    textbookImg: biology,
    subject: 'Biology',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
  {
    id: 2,
    textbookImg: chemistry,
    subject: 'Chemistry',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
  {
    id: 3,
    textbookImg: agricultural,
    subject: 'Agricultural Science',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
  {
    id: 4,
    textbookImg: computer,
    subject: 'Computer',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
  {
    id: 5,
    textbookImg: economics,
    subject: 'Economics',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
  {
    id: 6,
    textbookImg: geography,
    subject: 'Geography',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
  {
    id: 7,
    textbookImg: mathematics,
    subject: 'Mathematics',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
  {
    id: 8,
    textbookImg: nutrition,
    subject: 'Nutrition',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
  {
    id: 9,
    textbookImg: physics,
    subject: 'Physics',
    currentTopic: 'Teacher Professional Development and Student Outcomes',
    teacher: 'Esther Ezike',
    teacherImg: teacherImg,
    number_of_topics: '10',
    number_of_topics_covered: '4',
    students: [
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 },
      { name: 'Jamiu Yusuf', image: teacherImg2 }
    ]
  },
];

export const avatars = [
  {
    avater: avatar,
  },
  {
    avater: avatar,
  },
  {
    avater: avatar,
  },
  {
    avater: avatar,
  },
];

export const activitiesAndEvents: ActivitiesAndEvent = [
  {
    image: activities2,
    title: 'Jet club gathering',
    type: 'Event',
    mode: 'Physical',
    date: '16/03/202',
    category: 'For all students',
    price: 'FREE',
  },
  {
    image: activities1,
    title: 'End of the year party celebration',
    type: 'Event',
    mode: 'Physical',
    date: '16/03/202',
    category: 'For all students',
    price: 'N5,000',
  },
  {
    image: activities1,
    title: 'End of the year party celebration',
    type: 'Event',
    mode: 'Physical',
    date: '16/03/202',
    category: 'For all students',
    price: 'N5,000',
  },
  {
    image: activities1,
    title: 'End of the year party celebration',
    type: 'Event',
    mode: 'Physical',
    date: '16/03/202',
    category: 'For all students',
    price: 'N5,000',
  },
];

export const registeredActivitiesAndEvents: ActivitiesAndEvent = [
  {
    image: activities2,
    title: 'Jet club gathering',
    type: 'Event',
    mode: 'Physical',
    date: '16/03/202',
    category: 'For all students',
    price: 'FREE',
  },
  {
    image: activities1,
    title: 'End of the year party celebration',
    type: 'Event',
    mode: 'Physical',
    date: '16/03/202',
    category: 'For all students',
    price: 'N5,000',
  },
];

