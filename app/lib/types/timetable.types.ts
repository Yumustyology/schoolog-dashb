export type TimetableSlot = {
  subject: string;
  time: string;
  teacherName: string;
  teacherAvatar: any;
};

export type Timetable = {
  [key: string]: TimetableSlot[];
};
