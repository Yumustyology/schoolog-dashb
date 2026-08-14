export type SubjectType = {
  _id: string;
  name: string;
  coverImage?: string | null;
  description?: string | null;
  teacher?: any;
  students?: { image?: string; name?: string }[];
  classGrades?: { _id: string; name: string; level: number }[];
  currentTopic?: string;
  numberOfTopicsCovered?: number;
  numberOfTopics?: number;
  archived?: boolean;
};
