import React from 'react';
import UpcomingEventPillBox from '../../atoms/dashboard/subjects/UpcomingEventPillBox';
import { subjects } from '@/constants';

const UpcomingEventLists = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <UpcomingEventPillBox subject={subject} />
      ))}
    </div>
  );
};

export default UpcomingEventLists;
