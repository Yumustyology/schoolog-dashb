'use client';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarHeader } from '../../molecules/dashboard/CalendarHeader';
import { cn } from '@/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';

// const image =
  // 'https://s3-alpha-sig.figma.com/img/8a09/8ce1/c44d7c312754dac3775d3216a9946b7b?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qo6pmW7VSJY9qaQaTtqf32Mf5ETEVLDu61vfbLXBDrE3lKFiYsWqVutB0zIFODfieyhIvfA6o39epMtvFxqTN5Cw8VkvoY3dAA1nsTLZAT3Vo7l4Vy0P6K1FEOu7JpDZc0pDxY2xCfbbsjAd8iDEcLzar66DYqszqx0twjsI-WaQyFtaOaC~1C8WhWCIueK~6MArw~NSckCFme-6NUX62Oo5qfIzuvR7RjOY8dJgBFjzXapV4d8QYTjVILK98kLk9rvZEgxropfYvmd6x7R5Lp~60oM90SSMb0cQV3EBWuM8uFtaesjCHOJS8Dsu9XdQlCSBb6gwgA3OZzDcSSWicw__';

type ActivityEvent = {
  eventName: string;
  start: Date;
  end: Date;
  type: 'Jet' | 'Quiz' | 'Sport' | 'Party' | 'Excursion' | 'Spelling';
};

const activitiesAndEvents: ActivityEvent[] = [
  {
    eventName: 'Jet Club Meeting',
    start: moment('2025-01-14T10:00:00').toDate(),
    end: moment('2025-01-14T12:00:00').toDate(),
    type: 'Jet',
  },
  {
    eventName: 'Excursion',
    start: moment('2025-01-20T10:00:00').toDate(),
    end: moment('2025-01-20T12:00:00').toDate(),
    type: 'Excursion',
  },

  {
    eventName: 'Interhouse Sport',
    start: moment('2025-01-18T10:00:00').toDate(),
    end: moment('2025-01-18T12:00:00').toDate(),
    type: 'Sport',
  },
  {
    eventName: 'Quiz',
    start: moment('2025-01-29T12:00:00').toDate(),
    end: moment('2025-01-29T14:00:00').toDate(),
    type: 'Quiz',
  },
  {
    eventName: 'Excursion',
    start: moment('2025-02-18T10:00:00').toDate(),
    end: moment('2025-02-18T12:00:00').toDate(),
    type: 'Party',
  },
  {
    eventName: 'Spelling Bee',
    start: moment('2025-01-10T10:00:00').toDate(),
    end: moment('2025-01-10T12:00:00').toDate(),
    type: 'Spelling',
  },
  {
    eventName: 'End of the year party',
    start: moment('2025-01-27T10:00:00').toDate(),
    end: moment('2025-01-27T12:00:00').toDate(),
    type: 'Party',
  },
];

const localizer = momentLocalizer(moment);

const eventStyleGetter = (event: ActivityEvent) => {
  let backgroundColor = 'lightgray';
  let color = '#252525';

  switch (event.type) {
    case 'Jet':
      backgroundColor = '##F2C94C14';
      color = 'white';
      break;
    case 'Excursion':
      backgroundColor = '#E7F6EC';
      color = '#0F973D';
      break;
    case 'Sport':
      backgroundColor = '#FAD6E6';
      color = '#AA336A';
      break;
    case 'Quiz':
      backgroundColor = '#FFF4CC';
      color = '#D68102';
      break;
    case 'Party':
      backgroundColor = '#FFE0E0';
      color = '#D63333';
      break;
    case 'Spelling':
      backgroundColor = '#DADCF3';
      color = '#4E5AB6';
      break;
    default:
      break;
  }

  return {
    style: {
      backgroundColor,
      color,
      borderRadius: '5px',
      padding: '5px',
      fontWeight: 'bold',
      height: '100%',
      width: '100%',
    },
  };
};

const EventContent = ({ event }: { event: ActivityEvent }) => (
  <div className="p-2 flex items-center h-full">
    <div>
      <p className={cn('text-xs font-semibold', poppins_400.className)}>
        {event.eventName}
      </p>
    </div>
  </div>
);

export const MyActivitiesCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={activitiesAndEvents}
      startAccessor="start"
      endAccessor="end"
      className={cn('', poppins_400.className)}
      defaultView="month"
      style={{ height: 800 }}
      components={{
        toolbar: CalendarHeader,
        event: EventContent,
      }}
      eventPropGetter={(event) => eventStyleGetter(event as ActivityEvent)}
    />
  </div>
);
