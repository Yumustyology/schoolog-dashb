import React from 'react';
import UpcomingEventPillBox from '../../atoms/dashboard/subjects/UpcomingEventPillBox';
import { subjectsList } from '@/constants';

const UpcomingEventLists = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {subjectsList.map((subject,index) => (
        <UpcomingEventPillBox key={index} subject={subject} />
      ))}
    </div>
  );
};

export default UpcomingEventLists;
