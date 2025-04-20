import Activities from '@/components/atoms/icons/SideBar/Activities';
import Annoucement from '@/components/atoms/icons/SideBar/Annoucement';
import Attendance from '@/components/atoms/icons/SideBar/Attendance';
import Dashboard from '@/components/atoms/icons/SideBar/Dashboard';
import Library from '@/components/atoms/icons/SideBar/Library';
import LiveClassIcon from '@/components/atoms/icons/SideBar/LiveClassIcon';
import Material from '@/components/atoms/icons/SideBar/Material';
import Message from '@/components/atoms/icons/SideBar/Message';
import PaymentIcon from '@/components/atoms/icons/SideBar/PaymentIcon';
import Result from '@/components/atoms/icons/SideBar/Result';
import Subjects from '@/components/atoms/icons/SideBar/Subjects';
import SuggestionBoxIcon from '@/components/atoms/icons/SideBar/SuggestionBoxIcon';
import Timetable from '@/components/atoms/icons/SideBar/Timetable';
import ClassesIcon from '@/components/atoms/icons/SideBar/ClassesIcon';
import ParentsIcon from '@/components/atoms/icons/SideBar/ParentsIcon';
import StudentsIcon from '@/components/atoms/icons/SideBar/StudentsIcon';
import FinanceIcon from '@/components/atoms/icons/SideBar/FinanceIcon';
import StaffsIcon from '@/components/atoms/icons/dashboard/StaffsIcon';
import AdmissionIcon from '@/components/atoms/icons/SideBar/AdmissionIcon';

export type SidebarItemsType = {
  title: string;
  url?: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  subItems?: {
    title: string;
    url: string;
  }[];
}[];

export const studentSidebarItems: SidebarItemsType = [
  {
    title: 'Dashboard',
    url: '/student',
    icon: <Dashboard />,
    activeIcon: <Dashboard color="#FFFFFF" />,
  },
  {
    title: 'Subjects',
    url: '/student/subjects',
    icon: <Subjects />,
    activeIcon: <Subjects color="#FFFFFF" />,
  },
  {
    title: 'Materials',
    url: '/student/materials',
    icon: <Material />,
    activeIcon: <Material color="#FFFFFF" />,
  },
  {
    title: 'Timetable',
    url: '/student/timetable',
    icon: <Timetable />,
    activeIcon: <Timetable color="#FFFFFF" />,
  },
  {
    title: 'Live classes',
    url: '/student/live-classes',
    icon: <LiveClassIcon />,
    activeIcon: <LiveClassIcon color="#FFFFFF" />,
  },
  {
    title: 'Attendance',
    url: '/student/attendance',
    icon: <Attendance />,
    activeIcon: <Attendance color="#FFFFFF" />,
  },
  {
    title: 'Library',
    url: '/student/library',
    icon: <Library />,
    activeIcon: <Library color="#FFFFFF" />,
  },
  {
    title: 'Message',
    url: '/student/message',
    icon: <Message />,
    activeIcon: <Message color="#FFFFFF" />,
  },
  {
    title: 'Activities & events',
    url: '/student/activities',
    icon: <Activities />,
    activeIcon: <Activities color="#FFFFFF" />,
  },
  {
    title: 'Results',
    url: '/student/results',
    icon: <Result />,
    activeIcon: <Result color="#FFFFFF" />,
  },
  {
    title: 'Payments',
    url: '/student/payments',
    icon: <PaymentIcon />,
    activeIcon: <PaymentIcon color="#FFFFFF" />,
  },
  {
    title: 'Announcement',
    url: '/student/announcements',
    icon: <Annoucement />,
    activeIcon: <Annoucement color="#FFFFFF" />,
  },
  {
    title: 'Suggestion box',
    url: '/student/suggestions-box',
    icon: <SuggestionBoxIcon />,
    activeIcon: <SuggestionBoxIcon color="#FFFFFF" />,
  },
];

export const shoolSidebarItems: SidebarItemsType = [
  {
    title: 'Dashboard',
    url: '/school',
    icon: <Dashboard />,
    activeIcon: <Dashboard color="#FFFFFF" />,
  },
  {
    title: 'Subjects',
    url: '/school/subjects',
    icon: <Subjects />,
    activeIcon: <Subjects color="#FFFFFF" />,
  },
  {
    title: 'Classes',
    url: '/school/classes',
    icon: <ClassesIcon />,
    activeIcon: <ClassesIcon color="#FFFFFF" />,
  },
  {
    title: 'Students',
    url: '/school/students',
    icon: <StudentsIcon />,
    activeIcon: <StudentsIcon color="#FFFFFF" />,
  },
  {
    title: 'Parents',
    url: '/school/parents',
    icon: <ParentsIcon />,
    activeIcon: <ParentsIcon color="#FFFFFF" />,
  },
  {
    title: 'Staffs',
    icon: <StaffsIcon />,
    activeIcon: <StaffsIcon color="#FFFFFF" />,
    subItems: [
      {
        title: 'Teaching',
        url: '/school/teaching-staffs',
      },
      {
        title: 'Non Teaching',
        url: '/school/non-teaching-staffs',
      },
    ],
  },
  {
    title: 'Timetable',
    url: '/school/timetable',
    icon: <Timetable />,
    activeIcon: <Timetable color="#FFFFFF" />,
  },
  {
    title: 'Attendance',
    url: '/school/attendance',
    icon: <Attendance />,
    activeIcon: <Attendance color="#FFFFFF" />,
  },
  {
    title: 'Live classes',
    url: '/school/live-classes',
    icon: <LiveClassIcon />,
    activeIcon: <LiveClassIcon color="#FFFFFF" />,
  },
  {
    title: 'Library',
    url: '/school/library',
    icon: <Library color="#828282" />,
    activeIcon: <Library color="#FFFFFF" />,
  },
  {
    title: 'Admission',
    url: '/school/admission',
    icon: <AdmissionIcon color="#828282"  />,
    activeIcon: <AdmissionIcon color="#FFFFFF" />,
  },
  {
    title: 'Finance',
    icon: <FinanceIcon />,
    activeIcon: <FinanceIcon color="#FFFFFF" />,
    subItems: [
      {
        title: 'Summary',
        url: '/school/finance',
      },
      {
        title: 'Fee payments',
        url: '/school/finance/fee-payments',
      },
      {
        title: 'Payrolls',
        url: '/school/finance/payrolls',
      },
      {
        title: 'Invoice',
        url: '/school/finance/invoices',
      },
    ],
  },
  {
    title: 'Message',
    url: '/school/message',
    icon: <Message />,
    activeIcon: <Message color="#FFFFFF" />,
  },
  {
    title: 'Activities & events',
    url: '/school/activities',
    icon: <Activities />,
    activeIcon: <Activities color="#FFFFFF" />,
  },
  {
    title: 'Template',
    url: '/school/templates',
    icon: <SuggestionBoxIcon />,
    activeIcon: <SuggestionBoxIcon color="#FFFFFF" />,
  },
  {
    title: 'Announcement',
    url: '/school/announcements',
    icon: <Annoucement />,
    activeIcon: <Annoucement color="#FFFFFF" />,
  },
  {
    title: 'Suggestion box',
    url: '/school/suggestions-box',
    icon: <SuggestionBoxIcon />,
    activeIcon: <SuggestionBoxIcon color="#FFFFFF" />,
  },
];
