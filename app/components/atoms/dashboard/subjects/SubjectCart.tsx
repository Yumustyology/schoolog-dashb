import Image from 'next/image';
import { cn } from '@/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Link from 'next/link';

interface Subject {
  subject: string;
  textbookImg: string;
  textbookName: string;
  teacherImg: string;
  teacher: string;
  number_of_topics_covered: number;
  number_of_topics: number;
}

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  return (
    <div key={subject.subject} className="flex flex-col gap-4 min-w-[300px]">
      <Link href="/student/subjects/1234">
        <Image
          className="w-full"
          src={subject.textbookImg}
          alt={subject.subject}
        />
      </Link>
      <div className="flex flex-col gap-3">
        <Link href="/student/subjects/1234">
          <h3
            className={cn(
              'text-base text-gray1 font-semibold',
              poppins_500.className
            )}
          >
            {subject.subject}
          </h3>
        </Link>
        <p className={cn('text-sm text-gray6', poppins_400.className)}>
          {subject.textbookName}
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
