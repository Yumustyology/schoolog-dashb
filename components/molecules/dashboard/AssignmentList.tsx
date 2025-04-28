import { cn } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';

const notifications = [
  {
    title: 'Introduction to state of Matter',
    subject: 'Biology',
    date: '12/20/24',
    status: 'Due',
  },
  {
    title: 'State of matter assignment ',
    subject: 'Physics',
    date: '12/20/24',
    status: 'Due',
  },
  {
    title: 'State of matter assignment ',
    subject: 'French',
    date: '12/20/24',
    status: 'Due',
  },
  {
    title: 'State of matter assignment ',
    status: 'pending',
    subject: 'Geography',
    date: '12/20/24',
  },
  {
    title: 'State of matter assignment ',
    status: 'completed',
    date: '12/20/24',
    subject: 'Arabic',
  },
  {
    title: 'State of matter assignment ',
    status: 'completed',
    date: '12/20/24',
    subject: 'Civic Education',
  },
];

type AssignmentListProps = React.ComponentProps<typeof Card>;

export function AssignmentList({ className, ...props }: AssignmentListProps) {
  return (
    <Card
      className={cn('w-[321px] border-none rounded-xl', className)}
      {...props}
    >
      <CardHeader>
        <CardTitle
          className={cn(
            'text-base flex w-full justify-between',
            poppins_600.className
          )}
        >
          <span>Assignments</span>
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
              className="border-b p-3.5 rounded-b-lg border-b-gray4 mb-4 last:mb-0 grid grid-cols-[1fr_auto] items-center"
            >
              <div>
                <p
                  className={cn(
                    'text-sm font-medium mb-1.5 text-[#001F3F]',
                    poppins_500.className
                  )}
                >
                  {notification.title}
                </p>
                <p
                  className={cn(
                    'text-gray6 text-xs gap-1.5 flex items-center',
                    poppins_400.className
                  )}
                >
                  <span>{notification.subject}</span>
                  <div className="bg-[#D9D9D9] h-1 w-1 rounded-full" />
                  <span>{notification.date}</span>
                  <div className="bg-[#D9D9D9] h-1 w-1 rounded-full" />
                  <span
                    className={cn(
                      notification.status == 'pending'
                        ? 'text-[#F2994A]'
                        : notification.status == 'completed'
                          ? 'text-success'
                          : 'text-[#EB5757]'
                    )}
                  >
                    {notification.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
