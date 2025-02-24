'use client';
import { teacherImg } from '@/app/assets';
import Button from '@/app/components/atoms/form/Button';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { generateTimetableTimeSlots } from '@/app/lib/utils/generateTimetableTimeSlots';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { CiAlignBottom, CiAlignRight } from 'react-icons/ci';

type TimetableSlot = {
  subject: string;
  time: string;
  teacherName: string;
  teacherAvatar: any;
};

type Timetable = {
  [key: string]: TimetableSlot[];
};

const subjectColors: {
  [key: string]: { bgColor: string; borderColor: string };
} = {
  Mathematics: { bgColor: "bg-[#27AE6014]", borderColor: "border-[#27AE60]" },
  "English Language": {
    bgColor: "bg-[#F2994A14]",
    borderColor: "border-[#F2994A73]",
  },
  "Computer Science": {
    bgColor: "bg-[#2F80ED14]",
    borderColor: "border-[#2F80ED]",
  },
  "Break Time": { bgColor: "bg-transparent", borderColor: "border-none" },
  Yoruba: { bgColor: "bg-[#F2C94C14]", borderColor: "border-[#F2C94C]" },
  Economics: { bgColor: "bg-[#56CCF214]", borderColor: "border-[#56CCF214]" },
  Biology: { bgColor: "bg-[#2148ED14]", borderColor: "border-[#2148ED]" },
  Physis: { bgColor: "bg-[#2D9CDB14]", borderColor: "border-[#2D9CDB]" },
  Chemistry: { bgColor: "bg-[#EB575714]", borderColor: "border-[#EB5757]" },
  "Agricultural Science": {
    bgColor: "bg-[#EB575714]",
    borderColor: "border-[#EB5757]",
  },
  "Free Period": { bgColor: "bg-yellow-300", borderColor: "border-yellow-700" },
};

const TeacherInfo: React.FC<{ name: string; avatar: string }> = ({
  name,
  avatar,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={avatar}
        alt={`${name}'s Avatar`}
        className="w-6 h-6 rounded-full border-2 border-gray-300"
      />
      <span className="text-xs font-medium text-gray3">{name}</span>
    </div>
  );
};

// Reusable Timetable Slot component
const TimetableSlotComponent: React.FC<{
  subject: string;
  time: string;
  teacherName: string;
  teacherAvatar: any;
}> = ({ subject, time, teacherName, teacherAvatar }) => {
  const isFreeOrBreakTime =
    subject === "Free Period" || subject === "Break Time";
  return (
    <div
      className={`px-3 py-3 m-1.5 text-left rounded-lg text-sm text-gray1 h-[130px] ${subjectColors[subject]?.bgColor} border ${subjectColors[subject]?.borderColor} flex flex-col justify-between`}
    >
      <div>
        <p className={cn("text-sm text-gray1", poppins_500.className)}>
          {subject}
        </p>
        <p className={cn("text-xs text-gray3 mt-2.5", poppins_400.className)}>
          {time}
        </p>
      </div>

      {/* Render teacher info only if subject is not "Free Period" */}
      {!isFreeOrBreakTime && (
        <div className="mt-11--">
          <TeacherInfo name={teacherName} avatar={teacherAvatar} />
        </div>
      )}
    </div>
  );
};

const url =
  "https://s3-alpha-sig.figma.com/img/8a09/8ce1/c44d7c312754dac3775d3216a9946b7b?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qo6pmW7VSJY9qaQaTtqf32Mf5ETEVLDu61vfbLXBDrE3lKFiYsWqVutB0zIFODfieyhIvfA6o39epMtvFxqTN5Cw8VkvoY3dAA1nsTLZAT3Vo7l4Vy0P6K1FEOu7JpDZc0pDxY2xCfbbsjAd8iDEcLzar66DYqszqx0twjsI-WaQyFtaOaC~1C8WhWCIueK~6MArw~NSckCFme-6NUX62Oo5qfIzuvR7RjOY8dJgBFjzXapV4d8QYTjVILK98kLk9rvZEgxropfYvmd6x7R5Lp~60oM90SSMb0cQV3EBWuM8uFtaesjCHOJS8Dsu9XdQlCSBb6gwgA3OZzDcSSWicw__";

const TimetableComponent: React.FC = () => {
  const timetableData: Timetable = {
    Monday: [
      {
        subject: "Mathematics",
        time: "8:10 AM - 8:50 AM",
        teacherName: "Mr. Smith",
        teacherAvatar: url,
      },
      {
        subject: "Free Period ",
        time: "8:50 AM - 9:30 AM",
        teacherName: "No Teacher",
        teacherAvatar: url,
      },
      {
        subject: "Computer Science",
        time: "9:30 AM - 10:10 AM",
        teacherName: "Mrs. Johnson",
        teacherAvatar: url,
      },
      {
        subject: "Break Time",
        time: "10:50 AM - 11:40 AM",
        teacherName: "No Teacher",
        teacherAvatar: url,
      },
      {
        subject: "Yoruba",
        time: "12:40 PM - 1:20 PM",
        teacherName: "Mr. Ade",
        teacherAvatar: url,
      },
      {
        subject: "Economics",
        time: "1:20 PM - 2:10 PM",
        teacherName: "Ms. Bakare",
        teacherAvatar: url,
      },
      {
        subject: "Free Period ",
        time: "8:50 AM - 9:30 AM",
        teacherName: "No Teacher",
        teacherAvatar: url,
      },
    ],
    Tuesday: [
      {
        subject: "Mathematics",
        time: "8:10 AM - 8:50 AM",
        teacherName: "Mr. Smith",
        teacherAvatar: url,
      },
      {
        subject: "English Language",
        time: "8:50 AM - 9:30 AM",
        teacherName: "Mrs. Walker",
        teacherAvatar: url,
      },
      {
        subject: "Computer Science",
        time: "9:30 AM - 10:10 AM",
        teacherName: "Mrs. Johnson",
        teacherAvatar: url,
      },
      {
        subject: "Break Time",
        time: "10:50 AM - 11:40 AM",
        teacherName: "No Teacher",
        teacherAvatar: url,
      },
      {
        subject: "Free Period ",
        time: "8:50 AM - 9:30 AM",
        teacherName: "",
        teacherAvatar: url,
      },
      {
        subject: "History",
        time: "1:20 PM - 2:10 PM",
        teacherName: "Ms. Bakare",
        teacherAvatar: url,
      },
      {
        subject: "Chemistry",
        time: "2:10 PM - 3:00 PM",
        teacherName: "Mr. Williams",
        teacherAvatar: url,
      },
    ],
    Wednesday: [
      {
        subject: "Economics",
        time: "8:10 AM - 8:50 AM",
        teacherName: "Mr. Smith",
        teacherAvatar: url,
      },
      {
        subject: "Free Period ",
        time: "8:50 AM - 9:30 AM",
        teacherName: "",
        teacherAvatar: url,
      },
      {
        subject: "Computer Science",
        time: "9:30 AM - 10:10 AM",
        teacherName: "Mrs. Johnson",
        teacherAvatar: url,
      },
      {
        subject: "Break Time",
        time: "10:50 AM - 11:40 AM",
        teacherName: "No Teacher",
        teacherAvatar: url,
      },
      {
        subject: "Yoruba",
        time: "12:40 PM - 1:20 PM",
        teacherName: "Mr. Ade",
        teacherAvatar: url,
      },
      {
        subject: "History",
        time: "1:20 PM - 2:10 PM",
        teacherName: "Ms. Bakare",
        teacherAvatar: url,
      },
      {
        subject: "Free Period ",
        time: "8:50 AM - 9:30 AM",
        teacherName: "",
        teacherAvatar: url,
      },
    ],
    Thursday: [
      {
        subject: "Free Period ",
        time: "8:50 AM - 9:30 AM",
        teacherName: "",
        teacherAvatar: url,
      },
      {
        subject: "English Language",
        time: "8:50 AM - 9:30 AM",
        teacherName: "Mrs. Walker",
        teacherAvatar: url,
      },
      {
        subject: "Mathematics",
        time: "9:30 AM - 10:10 AM",
        teacherName: "Mrs. Johnson",
        teacherAvatar: url,
      },
      {
        subject: "Break Time",
        time: "10:50 AM - 11:40 AM",
        teacherName: "No Teacher",
        teacherAvatar: url,
      },
      {
        subject: "Yoruba",
        time: "12:40 PM - 1:20 PM",
        teacherName: "Mr. Ade",
        teacherAvatar: url,
      },
      {
        subject: "History",
        time: "1:20 PM - 2:10 PM",
        teacherName: "Ms. Bakare",
        teacherAvatar: url,
      },
      {
        subject: "Chemistry",
        time: "2:10 PM - 3:00 PM",
        teacherName: "Mr. Williams",
        teacherAvatar: url,
      },
    ],
    Friday: [
      {
        subject: "Mathematics",
        time: "8:10 AM - 8:50 AM",
        teacherName: "Mr. Smith",
        teacherAvatar: url,
      },
      {
        subject: "English Language",
        time: "8:50 AM - 9:30 AM",
        teacherName: "Mrs. Walker",
        teacherAvatar: url,
      },
      {
        subject: "Computer Science",
        time: "9:30 AM - 10:10 AM",
        teacherName: "Mrs. Johnson",
        teacherAvatar: url,
      },
      {
        subject: "Break Time",
        time: "10:50 AM - 11:40 AM",
        teacherName: "No Teacher",
        teacherAvatar: url,
      },
      {
        subject: "Yoruba",
        time: "12:40 PM - 1:20 PM",
        teacherName: "Mr. Ade",
        teacherAvatar: url,
      },
      {
        subject: "Chemistry",
        time: "1:20 PM - 2:10 PM",
        teacherName: "Ms. Bakare",
        teacherAvatar: url,
      },
      {
        subject: "Free Period ",
        time: "8:50 AM - 9:30 AM",
        teacherName: "",
        teacherAvatar: url,
      },
    ],
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [isVertical, setIsVertical] = useState(true);

  const startTime = '08:10';
  const endTime = '15:30';
  const interval = 40;
  // const overrides = [
  //   { start: '11:30', end: '12:00', interval: 30 },
  //   { start: '14:00', end: '14:20', interval: 20 },
  // ];
  const numberOfPeriods = 12;

  const result = generateTimetableTimeSlots(
    startTime,
    endTime,
    interval,
    [],
    // overrides,
    numberOfPeriods
  );

  console.log(result);

  return (
    <>
      <div className="flex items-center gap-2 -mb-2">
        <Button
          outlined
          className="p-1 bg-transparent"
          onClick={() => setIsVertical(true)}
        >
          <CiAlignBottom color="#21B55A" size={30} />
        </Button>
        <Button
          outlined
          className="p-1 bg-transparent"
          onClick={() => setIsVertical(false)}
        >
          <CiAlignRight color="#21B55A" size={30} />
        </Button>
      </div>

      <div className="overflow-x-auto py-6">
        <table
          className={cn(
            'min-w-full text-xs text-center text-gray-500',
            poppins_500.className
          )}
        >
          {isVertical ? (
            <>
              <thead
                className={cn(
                  'text-xl text-gray uppercase bg-[#F7F7F7] p-2',
                  poppins_500.className
                )}
              >
                <tr>
                  <th scope="col" className="px-6 py-3 text-gray">
                    Time
                  </th>
                  {days.map((day) => (
                    <th key={day} scope="col" className="px-6 py-3 text-gray">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Iterate over each subject slot by index */}
                {Array.from({
                  length: Math.max(
                    ...Object.values(timetableData).map((day) => day.length)
                  ),
                }).map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {/* Render the time for each slot */}
                    <td className="px-2 py-4 text-xs text-gray-500">
                      {result.timeSlots[rowIndex] || 'No Time'}
                    </td>

                    {/* Render the subject for each day in this row */}
                    {days.map((day) => {
                      const slot = timetableData[day]?.[rowIndex]; // Get the slot for this day and row
                      return (
                        <td key={`${day}-${rowIndex}`} className="px-2 py-4">
                          {slot ? (
                            <TimetableSlotComponent
                              subject={slot.subject || 'No Subject'}
                              time={slot.time || 'No Time'}
                              teacherName={slot.teacherName || 'No Teacher'}
                              teacherAvatar={slot.teacherAvatar || teacherImg}
                            />
                          ) : (
                            'No Slot'
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <>
              <thead
                className={cn(
                  'text-xl text-gray uppercase bg-[#F7F7F7] p-2',
                  poppins_500.className
                )}
              >
                <tr>
                  <th scope="col" className="px-6 py-3 text-gray">
                    Time
                  </th>
                  {timetableData.Monday.map((slot, index) => (
                    <th scope="col" key={index} className="px-6 text-xs py-3 text-gray">
                      {slot.time}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days?.map((day) => (
                  <>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="px-2 py-4 text-xs text-gray">{day}</td>
                      {timetableData[day]?.map((slot, index) => (
                        <>
                          <td>
                            <TimetableSlotComponent
                              subject={
                                timetableData[day]?.[index]?.subject ||
                                'No Subject'
                              }
                              time={
                                timetableData[day]?.[index]?.time || 'No Time'
                              }
                              teacherName={
                                timetableData[day]?.[index]?.teacherName ||
                                'No Teacher'
                              }
                              teacherAvatar={
                                timetableData[day]?.[index]?.teacherAvatar ||
                                teacherImg
                              }
                            />
                          </td>
                        </>
                      ))}
                    </tr>
                  </>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default TimetableComponent;
