import React from 'react';
import TodayClassesPillBox from '../../atoms/dashboard/classes/TodayClassesPillBox';

const TodayClassesList = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <TodayClassesPillBox />
      <TodayClassesPillBox image={true} />
      <TodayClassesPillBox />
      <TodayClassesPillBox image={true} />
      <TodayClassesPillBox />
      <TodayClassesPillBox image={true} />
      <TodayClassesPillBox />
      <TodayClassesPillBox image={true} />
      <TodayClassesPillBox />
      <TodayClassesPillBox image={true} />
      <TodayClassesPillBox />
    </div>
  );
};

export default TodayClassesList;
