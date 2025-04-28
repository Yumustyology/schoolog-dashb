import { Announcements } from '@/app/types';
import Announcement from '@/components/atoms/dashboard/announcement/Announcement';
import React from 'react';
import Empty from '../../empty/Empty';
import {
  NoAnnouncementIcon,
  NoSuggestionIcon,
} from '@/components/atoms/icons/Icons';

const announcements: Announcements = [
  // {
  //     headline: '2024 Midterm break starts from June 11 to June 16',
  //     content:
  //         'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
  //     date: '21/05/2015',
  // },
  // {
  //     headline: '2024 Midterm break starts from June 11 to June 16',
  //     content:
  //         'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
  //     date: '21/05/2015',
  // },
  // {
  //     headline: '2024 Midterm break starts from June 11 to June 16',
  //     content:
  //         'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
  //     date: '21/05/2015',
  // },
  // {
  //     headline: '2024 Midterm break starts from June 11 to June 16',
  //     content:
  //         'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
  //     date: '21/05/2015',
  // },
  // {
  //     headline: '2024 Midterm break starts from June 11 to June 16',
  //     content:
  //         'Lorem ipsum dolor sit amet consectetur. Ac quisque eleifend libero et. Eget in sed nisi amet. Augue vitae lectus pellentesque cras aliquet amet.',
  //     date: '21/05/2015',
  // },
];
const AnnoucementsList = () => {
  return (
    <div className="flex flex-col gap-4">
      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoAnnouncementIcon />}
            title="No annoucement yet"
            description="You have not yet created any announcement. Click the button below to create announcement"
            buttonText="+ Create Annoucement"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {announcements.map((announcement, i) => {
            return (
              <Announcement key={i} announcement={announcement} type="school" />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnnoucementsList;
