import type { TermSessionType } from './academicYear.types';

export type CurriculumTopic = {
  id: string;
  title: string;
  description?: string;
  week?: number;
};

export type CurriculumEntry = {
  termId: string;
  termSession?: TermSessionType | null;
  classId?: string;
  topics: CurriculumTopic[];
  defaultWeek?: number;
};

export type SubjectTimetableEntry = {
  day: string;
  classId?: string | null;
  teacherId?: string | null;
  periods: number[];
};
