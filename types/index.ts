export type ActivitiesAndEvent = {
  image: any;
  title: string;
  type: string;
  mode: string;
  date: string;
  category: string;
  price: string;
}[];

export type AvailbeBooks = {
  title: string;
  class: string;
  availableCopies: number;
  coverImage: any;
}[];

export type Borrowedbooks = {
  title: string;
  dueStatus: boolean;
  dueDate: string;
  duePrice: string;
  daysLeft: string;
  availableCopies: number;
  coverImage: any;
}[];

export type Announcements = {
  headline: string;
  content: string;
  date: string;
}[];

export type MaterialType = {
  type: string;
  icon: React.ReactNode;
  name: string;
  size: string;
  date: string;
}[];

