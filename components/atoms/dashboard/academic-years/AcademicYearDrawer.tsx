import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { DrawerSide } from '@/components/molecules/dashboard/DrawerSide';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { cn } from '@/app/lib/utils';
import Switch from '../../form/Switch';
import { DeleteIcon } from '../../icons/Icons';
import useSWR from 'swr';
import { getAcademicYearById } from '@/app/lib/actions/academicYear.actions';
import type {
  AcademicTerm,
  AcademicHoliday,
} from '@/app/lib/types/academicYear.types';
import AcademicYearDrawerSkeleton from '@/components/atoms/skeleton/AcademicYearDrawerSkeleton';
import { formatDate } from '@/app/lib/utils/dateUtils';
import { getAcademicYearStatus } from '@/app/lib/utils/academic-years.utils';

interface AcademicYearDrawerProps {
  open: boolean;
  closeDrawer: () => void;
  academicYearId: string;
}

const AcademicYearDrawer: React.FC<AcademicYearDrawerProps> = ({
  open,
  closeDrawer,
  academicYearId,
}) => {
  const { data, isLoading, error } = useSWR(
    academicYearId ? `/get-academic-year/${academicYearId}` : null,
    () => getAcademicYearById(academicYearId)
  );


  if (isLoading) {
    return (
      <DrawerSide
        open={open}
        close={closeDrawer}
        title="Academic Year Details"
        subtitle="Academic Year Details"
      >
          <AcademicYearDrawerSkeleton />
      </DrawerSide>
    );
  }
  if (error || !data?.data) {
    // If data exists but error, show the name, else fallback
    const fallbackTitle = data?.data?.name ? data.data.name : "Academic Year Details";
    return (
      <DrawerSide
        open={open}
        close={closeDrawer}
        title={fallbackTitle}
        subtitle="Academic Year Details"
      >
        <></>
        {/* <div className="p-6 text-red-600">Failed to load academic year.</div> */}
      </DrawerSide>
    );
  }

  const academicYear = data.data;
  const status = getAcademicYearStatus(
    academicYear.startDate,
    academicYear.endDate
  );

  return (
    <DrawerSide
      open={open}
      close={closeDrawer}
      title={academicYear.name}
      subtitle="Academic Year Details"
    >
      <div className="p-6 flex flex-col h-full overflow-y-auto max-h-[90dvh] pb-10">
        <div className="mb-6">
          <Typography>
            <h2
              className={cn(
                'text-[18px] text-black1 mb-1.5',
                poppins_500.className
              )}
            >
              {formatDate(academicYear.startDate)} →{' '}
              {formatDate(academicYear.endDate)}
            </h2>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              Session Duration
            </p>
            <span
              className={cn(
                'mt-1 inline-block px-3 py-1 text-xs font-semibold rounded-full',
                poppins_500.className,
                status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : status === 'Completed'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-blue-100 text-blue-700'
              )}
            >
              {status}
            </span>
          </Typography>
        </div>

        <div className="space-y-6">
          {academicYear.terms && academicYear.terms.length > 0 ? (
            academicYear.terms.map((term: AcademicTerm) => (
              <div
                key={term._id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3
                      className={cn(
                        'text-black1 text-sm font-semibold',
                        poppins_500.className
                      )}
                    >
                      {term.name}
                    </h3>
                    <span
                      className={cn(
                        'text-gray3 text-sm',
                        poppins_400.className
                      )}
                    >
                      {formatDate(term.startDate)} →{' '}
                      {formatDate(term.endDate)}
                    </span>
                  </div>

                  <Switch
                    id={`term-${term._id}`}
                    checked={term.isCurrentlyActive}
                    onChange={() => {}}
                    disabled={true}
                    activeColor=""
                    activeBorder="border bg-primary border-primary"
                    inActiveBorder="border border-[#E0E0E0] bg-[#E0E0E0]"
                    inactiveColor="bg-[#EFEFEF]"
                  />
                </div>

                {/* Holidays */}
                {term.holidays && term.holidays.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {term.holidays.map((holiday: AcademicHoliday) => (
                      <div
                        key={holiday.id}
                        className="flex justify-between items-center bg-white border border-gray-200 rounded-md p-2"
                      >
                        <div>
                          <h4
                            className={cn(
                              'text-sm font-medium text-black1',
                              poppins_500.className
                            )}
                          >
                            {holiday.name}
                          </h4>
                          <p
                            className={cn(
                              'text-xs text-gray3',
                              poppins_400.className
                            )}
                          >
                            {holiday.type}
                          </p>
                        </div>
                        <div className="text-sm text-gray3">
                          {formatDate(holiday.date)}
                        </div>
                        <DeleteIcon
                          size={20}
                          className="text-red-600 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className={cn(
                      'text-gray3 text-sm mt-2',
                      poppins_400.className
                    )}
                  >
                    No holidays configured.
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className={cn('text-gray3 text-sm mt-2', poppins_400.className)}>
              No terms configured.
            </p>
          )}
        </div>
      </div>
    </DrawerSide>
  );
};

export default AcademicYearDrawer;
