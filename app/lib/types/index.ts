export type { ApiResponse, ApiListResponse, ApiMeta } from './api-response.types';
import type { StaticImageData } from 'next/image';

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
  coverImage: string | StaticImageData;
}[];

export type Borrowedbooks = {
  title: string;
  dueStatus: boolean;
  dueDate: string;
  duePrice: string;
  daysLeft: string;
  availableCopies: number;
  coverImage: string | StaticImageData;
}[];

export type Announcements = {
  headline: string;
  content: string;
  date: string;
}[];

export type carouselImageRefType = {
  setActiveIndexTab: (arg: number) => void;
};
