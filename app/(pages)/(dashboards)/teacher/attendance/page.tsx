'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import SelectComp from '@/components/atoms/form/Select';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import staffActions from '@/app/lib/actions/staff.action';
import studentActions from '@/app/lib/actions/student.actions';
import attendanceActions, {
  AttendanceStatus,
} from '@/app/lib/actions/attendance.action';
import showToast from '@/app/lib/utils/toast';

type Student = { _id: string; firstName: string; lastName: string };

const toDateInputValue = (d: Date) => d.toISOString().slice(0, 10);

const TeacherAttendancePage = () => {
  const searchParams = useSearchParams();
  const [classGradeId, setClassGradeId] = useState(
    searchParams.get('classGradeId') || ''
  );
  const [date, setDate] = useState<Date>(new Date());
  const [statuses, setStatuses] = useState<Record<string, AttendanceStatus>>({});
  const [saving, setSaving] = useState(false);

  const { data: profileResp } = useSWR(['staff-me'], () =>
    staffActions.fetchMyStaffProfile()
  );
  const profile = profileResp?.data;
  const classOptions = (profile?.classes || [])
    .map((c) => (typeof c.classGradeId === 'object' ? c.classGradeId : null))
    .filter((c): c is { _id: string; name: string } => !!c)
    .map((c) => ({ id: c._id, name: c.name }));

  useEffect(() => {
    if (!classGradeId && classOptions.length > 0) {
      setClassGradeId(classOptions[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classOptions.length]);

  const { data: studentsResp } = useSWR(
    classGradeId ? ['class-students', classGradeId] : null,
    () => studentActions.fetchStudents({ classGradeId, limit: 100 })
  );
  const students = (studentsResp?.data || []) as unknown as Student[];

  const dateStr = toDateInputValue(date);
  const { data: existingResp } = useSWR(
    classGradeId ? ['class-attendance', classGradeId, dateStr] : null,
    () => attendanceActions.fetchClassAttendance(classGradeId, dateStr)
  );

  useEffect(() => {
    const existing = existingResp?.data;
    if (existing?.students) {
      const map: Record<string, AttendanceStatus> = {};
      existing.students.forEach((s) => {
        map[s.studentId] = s.status;
      });
      setStatuses(map);
    } else {
      setStatuses({});
    }
  }, [existingResp]);

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    if (!profile || !classGradeId || students.length === 0) return;
    setSaving(true);
    try {
      await attendanceActions.recordClassAttendance({
        classGradeId,
        takenBy: profile._id,
        date: dateStr,
        students: students.map((s) => ({
          studentId: s._id,
          status: statuses[s._id] || AttendanceStatus.PRESENT,
        })),
      });
      showToast('Attendance saved', 'attendance-saved', { type: 'success' });
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <BreadcrumbBox
        className="mb-6"
        crumbs={[{ label: 'Attendance', isActive: true }]}
      />

      <div className="bg-white rounded-xl p-6 min-h-[60vh]">
        <div className="flex gap-4 mb-6 items-end">
          <SelectComp
            label="Class"
            htmlFor="classGradeId"
            value={classGradeId}
            onValueChange={setClassGradeId}
            placeholder="Select a class"
            options={classOptions}
            triggerClasses="rounded-full h-11 bg-[#F7F7F7] border-gray4"
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={(d) => d && setDate(d)}
          />
          <Button
            round
            className="h-[44px] px-6"
            onClick={handleSave}
            loading={saving}
            disabled={saving || !classGradeId || students.length === 0}
          >
            Save attendance
          </Button>
        </div>

        {classGradeId && students.length === 0 && (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            No students in this class.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {students.map((s) => {
            const status = statuses[s._id] || AttendanceStatus.PRESENT;
            return (
              <div
                key={s._id}
                className="flex items-center justify-between py-3 border-b border-gray4 last:border-b-0"
              >
                <p className={cn('text-sm text-gray1', Inter_500.className)}>
                  {s.firstName} {s.lastName}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus(s._id, AttendanceStatus.PRESENT)}
                    className={cn(
                      'text-xs px-4 py-1.5 rounded-full',
                      status === AttendanceStatus.PRESENT
                        ? 'bg-primary text-white'
                        : 'bg-[#F1F1F1] text-gray6'
                    )}
                  >
                    Present
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(s._id, AttendanceStatus.ABSENT)}
                    className={cn(
                      'text-xs px-4 py-1.5 rounded-full',
                      status === AttendanceStatus.ABSENT
                        ? 'bg-red-500 text-white'
                        : 'bg-[#F1F1F1] text-gray6'
                    )}
                  >
                    Absent
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendancePage;
