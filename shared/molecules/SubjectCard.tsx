import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Link from 'next/link';
import { OptionIcon } from '@/app/components/atoms/icons/Icons';

interface Subject {
  id: number;
  subject: string;
  textbookImg: string;
  currentTopic: string;
  teacherImg: string;
  teacher: string;
  number_of_topics_covered: number;
  number_of_topics: number;
  students: {
    image: string;
    name: string;
  }[];
}

interface SubjectCardProps {
  subject: Subject;
  role: 'school' | 'student' | 'teacher';
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, role }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    // Close dropdown if clicked outside
    React.useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  return (
    <div key={subject.subject} className="flex flex-col gap-4 min-w-[300px]">
      <Link href={`/${role}/subjects/1234`}>
        <Image
          className="w-full"
          src={subject.textbookImg}
          alt={subject.subject}
        />
      </Link>
      <div className="flex flex-col gap-3">
        <Link href={`/${role}/subjects/1234`}>
          <div className='flex justify-between items-center'>
            <h3
              className={cn(
                'text-base text-gray1 font-semibold',
                poppins_500.className
              )}
            >
              {subject.subject}
            </h3>
            {role === 'school' && (
              <div>
                <OptionIcon />
              </div>
              <OptionsSubjectSUbjectDropdown 
            )}
          </div>
        </Link>
        <p className={cn('text-sm text-gray6', poppins_400.className)}>
          {subject.currentTopic}
        </p>
        <div
          className={cn(
            'flex items-center gap-2 text-gray6',
            poppins_400.className
          )}
        >
          <div className="flex items-center gap-2">
            <Image src={subject.teacherImg} alt={subject.teacher} />
            <span>{subject.teacher}</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-gray2"></div>
          <p className="text-sm">
            <span className="font-semibold">
              {subject.number_of_topics_covered}{' '}
            </span>
            /{subject.number_of_topics} topics covered
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
