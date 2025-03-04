import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';

export default function SchoolStats() {
  return (
    <section className="grid grid-cols-2 gap-6 w-full">
      {/* Total Students */}
      <div className="flex flex-col items-start">
        <h3 className={cn('text-sm text-black1', poppins_500.className)}>
          150
        </h3>
        <p className={cn('text-sm text-gray', poppins_400.className)}>
          Total Students
        </p>
      </div>

      {/* Average Performance */}
      <div className="flex flex-col items-start">
        <h3
          className={cn(
            'text-sm text-black1 text-right',
            poppins_500.className
          )}
        >
          90%
        </h3>
        <p className={cn('text-sm text-gray', poppins_400.className)}>
          Average Performance
        </p>
      </div>

      {/* Teacher Attendance */}
      <div className="flex flex-col items-start">
        <h3 className={cn('text-sm text-black1', poppins_500.className)}>
          80%
        </h3>
        <p className={cn('text-sm text-gray', poppins_400.className)}>
          Teacher attendance
        </p>
      </div>

      {/* Student Attendance */}
      <div className="flex flex-col items-start">
        <h3 className={cn('text-sm text-black1', poppins_500.className)}>
          90%
        </h3>
        <p className={cn('text-sm text-gray', poppins_400.className)}>
          Student attendance
        </p>
      </div>

      {/* Curriculum Covered */}
      <div className="flex flex-col items-start">
        <h3 className={cn('text-sm text-black1', poppins_500.className)}>
          52%
        </h3>
        <p className={cn('text-sm text-gray', poppins_400.className)}>
          Curriculum Covered
        </p>
      </div>

      {/* Resources */}
      <div className="flex flex-col items-start">
        <h3 className={cn('text-sm text-black1', poppins_500.className)}>52</h3>
        <p className={cn('text-sm text-gray', poppins_400.className)}>
          Resources
        </p>
      </div>
    </section>
  );
}
