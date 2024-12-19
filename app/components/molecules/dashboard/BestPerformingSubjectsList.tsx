import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';

const notifications = [
  {
    title: 'Mathematics',
    grade: '80%',
    description: '1 hour ago',
  },
  {
    title: 'English',
    grade: '60%',
    description: '1 hour ago',
  },
  {
    title: 'Yoruba',
    description: '2 hours ago',
    grade: '30%',
  },
  {
    title: 'Biology',
    description: '2 hours ago',
    grade: '20%',
  },
  {
    title: 'Physics',
    description: '2 hours ago',
    grade: '15%',
  },
  {
    title: 'Geography',
    description: '2 hours ago',
    grade: '10%',
  },
];

type BestPerformingProps = React.ComponentProps<typeof Card>;

export function BestPerformingSubjectsList({
  className,
  ...props
}: BestPerformingProps) {
  return (
    <Card
      className={cn('w-[321px] border-none rounded-xl ', className)}
      {...props}
    >
      <CardHeader>
        <CardTitle
          className={cn(
            'text-base flex w-full justify-between',
            poppins_600.className
          )}
        >
          <span>Best performing subjects</span>
          <span
            className={cn(
              'text-primary text-sm font-normal',
              poppins_400.className
            )}
          >
            See all
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 mt-0 max-h-[320px] overflow-auto sidebar-scroll">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="border p-4 border-[#F2F2F2] bg-[#FCFCFC] rounded-lg mb-4 last:mb-0 grid grid-cols-[1fr_auto] items-center"
            >
              <div>
                <p
                  className={cn(
                    'text-sm font-semibold text-[#001F3F]',
                    poppins_500.className
                  )}
                >
                  {notification.title}
                </p>
                <p
                  className={cn(
                    'text-[#4F4F4F] text-xs',
                    poppins_400.className
                  )}
                >
                  {notification.description}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    'text-sm font-semibold text-[#001F3F]',
                    poppins_600.className
                  )}
                >
                  {notification.grade}
                </p>
                <p
                  className={cn(
                    'text-xs text-[#BDBDBD]',
                    poppins_400.className
                  )}
                >
                  Total grade
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
