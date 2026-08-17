'use client';

import React from 'react';
import useSWR from 'swr';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { Inter_500, poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { formatDate } from '@/app/lib/utils/dateUtils';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import Button from '@/components/atoms/form/Button';
import Modal from '@/components/molecules/Modal';
import { DeleteIcon, ArchiveIcon, UnarchiveIcon } from '@/components/atoms/icons/Icons';
import useArchiveSubject from '@/app/lib/hooks/useArchiveSubject';
import useUnarchiveSubject from '@/app/lib/hooks/useUnarchiveSubject';
import useDeleteSubject from '@/app/lib/hooks/useDeleteSubject';
import subjectsActions from '@/app/lib/actions/subjects.action';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import attendanceActions, {
  SubjectAttendanceSession,
} from '@/app/lib/actions/attendance.action';
import showToast from '@/app/lib/utils/toast';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import EditCurriculumLauncher from '@/components/molecules/dashboard/subjects/EditCurriculumLauncher';
import { classSubjectTypeBadgeClasses } from '@/components/molecules/dashboard/subjects/SubjectCard';
import type { ClassSubject } from '@/app/lib/types/class.types';
import MaterialsList from '@/components/molecules/dashboard/materials/MaterialList';
import ChatThread from '@/components/molecules/dashboard/message/ChatThread';

type StudentRow = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  studentSlugId?: string;
  departmentId?: { name: string } | null;
  className: string;
  classGradeId: string;
};

function CurriculumTab({ subject, classSubjects }: { subject: any; classSubjects: ClassSubject[] }) {
  const [totalStudents, setTotalStudents] = React.useState<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    async function loadCounts() {
      if (classSubjects.length === 0) {
        setTotalStudents(0);
        return;
      }
      const results = await Promise.all(
        classSubjects.map((cs) => {
          const classGradeId = typeof cs.classGradeId === 'object' ? cs.classGradeId._id : cs.classGradeId;
          return classGradeActions
            .getClassSubjectForSubjectAndClass(
              typeof cs.subjectId === 'object' ? cs.subjectId._id : cs.subjectId,
              classGradeId
            )
            .then((r) => r?.data?.students?.length || 0)
            .catch(() => 0);
        })
      );
      if (!cancelled) setTotalStudents(results.reduce((a, b) => a + b, 0));
    }
    loadCounts();
    return () => {
      cancelled = true;
    };
  }, [classSubjects]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
      <div className="border border-gray4 rounded-xl p-5">
        <h3 className={cn('text-2xl text-black1', poppins_600.className)}>
          {classSubjects.length}
        </h3>
        <p className={cn('text-sm text-gray mt-1', poppins_400.className)}>Total classes</p>
      </div>
      <div className="border border-gray4 rounded-xl p-5">
        <h3 className={cn('text-2xl text-black1', poppins_600.className)}>
          {totalStudents === null ? '…' : totalStudents}
        </h3>
        <p className={cn('text-sm text-gray mt-1', poppins_400.className)}>Total students</p>
      </div>
      <div className="border border-gray4 rounded-xl p-5 sm:col-span-3">
        <p className={cn('text-sm text-gray mb-1', poppins_400.className)}>Description</p>
        <p className={cn('text-sm text-black1', poppins_400.className)}>
          {subject?.description || 'No description provided.'}
        </p>
      </div>
    </div>
  );
}

function ClassesRulesTab({
  subjectId,
  classSubjects,
  onChanged,
}: {
  subjectId: string;
  classSubjects: ClassSubject[];
  onChanged: () => void;
}) {
  const [removingId, setRemovingId] = React.useState<string | null>(null);
  const [confirmingId, setConfirmingId] = React.useState<string | null>(null);

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      const resp = await classGradeActions.deleteClassSubject(id);
      if (resp?.status === 'success') {
        showToast('Class unlinked from subject', 'class-subject-removed', { type: 'success' });
        onChanged();
      } else {
        showToast('Could not remove this rule', 'class-subject-remove-failed', { type: 'error' });
      }
    } catch {
      showToast('An error occurred while removing this rule', 'class-subject-remove-error', {
        type: 'error',
      });
    } finally {
      setRemovingId(null);
      setConfirmingId(null);
    }
  };

  if (classSubjects.length === 0) {
    return (
      <p className={cn('text-sm text-gray6 p-4', poppins_400.className)}>
        This subject isn&apos;t linked to any class yet. Use &quot;Link Class&quot; from the
        subjects list to add one.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className={cn('text-left text-gray6 border-b border-gray4', poppins_500.className)}>
            <th className="py-3 px-2">Class</th>
            <th className="py-3 px-2">Type</th>
            <th className="py-3 px-2">Departments</th>
            <th className="py-3 px-2">Teacher(s)</th>
            <th className="py-3 px-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classSubjects.map((cs) => {
            const cls = typeof cs.classGradeId === 'object' ? cs.classGradeId : null;
            const teachers = Array.isArray(cs.teacherIds)
              ? (cs.teacherIds as any[]).filter((t) => typeof t === 'object')
              : [];
            const departments = Array.isArray(cs.departmentIds)
              ? (cs.departmentIds as any[]).filter((d) => typeof d === 'object')
              : [];
            return (
              <tr key={cs._id} className="border-b border-gray4">
                <td className="py-3 px-2">{cls?.name || '—'}</td>
                <td className="py-3 px-2">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs capitalize',
                      classSubjectTypeBadgeClasses[cs.type]
                    )}
                  >
                    {cs.type}
                  </span>
                </td>
                <td className="py-3 px-2">
                  {departments.length > 0
                    ? departments.map((d) => d.name).join(', ')
                    : '—'}
                </td>
                <td className="py-3 px-2">
                  {teachers.length > 0
                    ? teachers.map((t) => `${t.firstName} ${t.lastName}`).join(', ')
                    : 'No teacher assigned'}
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center justify-end gap-2">
                    <EditCurriculumLauncher classGradeId={cls?._id} subjectId={subjectId} />
                    <button
                      type="button"
                      className="text-r2 text-xs underline disabled:opacity-50"
                      disabled={removingId === cs._id}
                      onClick={() => setConfirmingId(cs._id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={!!confirmingId}
        onClose={() => setConfirmingId(null)}
        title="Remove class link"
      >
        <p className={cn('text-sm text-gray6 mb-6', poppins_400.className)}>
          Students in this class will no longer be linked to this subject. This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button outlined round className="px-6 h-[44px] bg-white text-primary" onClick={() => setConfirmingId(null)}>
            Cancel
          </Button>
          <Button
            round
            className="px-6 h-[44px] bg-r2"
            onClick={() => confirmingId && handleRemove(confirmingId)}
            disabled={!!removingId}
            loading={!!removingId}
          >
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function StudentsTab({ subjectId, classSubjects }: { subjectId: string; classSubjects: ClassSubject[] }) {
  const [selectedClassId, setSelectedClassId] = React.useState<string>('all');

  const swrKey = classSubjects.length > 0 ? ['subject-students', subjectId, classSubjects.map((c) => c._id).join(',')] : null;
  const { data: studentsResp, isLoading } = useSWR(swrKey, async () => {
    const results = await Promise.all(
      classSubjects.map(async (cs) => {
        const classGradeId = typeof cs.classGradeId === 'object' ? cs.classGradeId._id : cs.classGradeId;
        const className = typeof cs.classGradeId === 'object' ? cs.classGradeId.name : 'Class';
        const resp = await classGradeActions.getClassSubjectForSubjectAndClass(subjectId, classGradeId);
        const students = (resp?.data?.students || []) as any[];
        return students.map(
          (s): StudentRow => ({
            _id: s._id,
            firstName: s.firstName,
            lastName: s.lastName,
            email: s.email,
            studentSlugId: s.studentSlugId,
            departmentId: s.departmentId,
            className,
            classGradeId,
          })
        );
      })
    );
    return results.flat();
  });

  const allStudents = studentsResp || [];
  const classChips = [
    { id: 'all', name: 'All classes' },
    ...classSubjects.map((cs) => ({
      id: typeof cs.classGradeId === 'object' ? cs.classGradeId._id : cs.classGradeId,
      name: typeof cs.classGradeId === 'object' ? cs.classGradeId.name : 'Class',
    })),
  ];
  const visibleStudents =
    selectedClassId === 'all' ? allStudents : allStudents.filter((s) => s.classGradeId === selectedClassId);

  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-2 mb-4">
        {classChips.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedClassId(c.id)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs border',
              selectedClassId === c.id
                ? 'bg-primary text-white border-primary'
                : 'border-gray4 text-gray6'
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className={cn('text-sm text-gray6', poppins_400.className)}>Loading students…</p>
      ) : visibleStudents.length === 0 ? (
        <p className={cn('text-sm text-gray6', poppins_400.className)}>No students found.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className={cn('text-left text-gray6 border-b border-gray4', poppins_500.className)}>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Student ID</th>
              <th className="py-3 px-2">Class</th>
              <th className="py-3 px-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {visibleStudents.map((s) => (
              <tr key={`${s._id}-${s.classGradeId}`} className="border-b border-gray4">
                <td className="py-3 px-2">
                  {s.firstName} {s.lastName}
                </td>
                <td className="py-3 px-2">{s.studentSlugId || '—'}</td>
                <td className="py-3 px-2">{s.className}</td>
                <td className="py-3 px-2">{s.departmentId?.name || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function rateBarColor(pct: number) {
  if (pct >= 90) return 'bg-primary';
  if (pct >= 75) return 'bg-orange-500';
  return 'bg-r2';
}

function AttendanceTab({ subjectId, classSubjects }: { subjectId: string; classSubjects: ClassSubject[] }) {
  const [classFilter, setClassFilter] = React.useState('');
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [activeSession, setActiveSession] = React.useState<SubjectAttendanceSession | null>(null);

  const swrKey = ['subject-attendance', subjectId, classFilter, fromDate, toDate];
  const { data: attendanceResp, isLoading } = useSWR(swrKey, () =>
    attendanceActions.fetchSubjectAttendance(subjectId, {
      classGradeId: classFilter || undefined,
      from: fromDate || undefined,
      to: toDate || undefined,
    })
  );

  const sessions = attendanceResp?.data?.sessions || [];
  const studentRates = attendanceResp?.data?.studentRates || [];

  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          className="border border-gray4 rounded-lg px-3 py-2 text-sm"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="">All classes</option>
          {classSubjects.map((cs) => {
            const cls = typeof cs.classGradeId === 'object' ? cs.classGradeId : null;
            const id = cls?._id || (cs.classGradeId as string);
            return (
              <option key={cs._id} value={id}>
                {cls?.name || 'Class'}
              </option>
            );
          })}
        </select>
        <input
          type="date"
          className="border border-gray4 rounded-lg px-3 py-2 text-sm"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <span className="self-center text-gray6 text-sm">to</span>
        <input
          type="date"
          className="border border-gray4 rounded-lg px-3 py-2 text-sm"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className={cn('text-sm text-gray6', poppins_400.className)}>Loading attendance…</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className={cn('text-sm text-black1 mb-3', poppins_500.className)}>Sessions</h4>
            {sessions.length === 0 ? (
              <p className={cn('text-sm text-gray6', poppins_400.className)}>
                No attendance sessions recorded yet for this subject.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {sessions.map((s) => {
                  const presentCount = s.students.filter((e) => e.status === 'present').length;
                  const absentCount = s.students.length - presentCount;
                  const cls = typeof s.classGradeId === 'object' ? s.classGradeId : null;
                  return (
                    <button
                      key={s._id}
                      type="button"
                      onClick={() => setActiveSession(s)}
                      className="text-left border border-gray4 rounded-lg p-3 hover:border-primary"
                    >
                      <div className="flex justify-between items-center">
                        <span className={cn('text-sm', poppins_500.className)}>
                          {formatDate(s.date)} · {cls?.name || 'Class'}
                        </span>
                        <span className="text-xs text-gray6">
                          {presentCount} present · {absentCount} absent
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h4 className={cn('text-sm text-black1 mb-3', poppins_500.className)}>
              Per-student attendance rate
            </h4>
            {studentRates.length === 0 ? (
              <p className={cn('text-sm text-gray6', poppins_400.className)}>No data yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {studentRates.map((r) => (
                  <div key={r.studentId}>
                    <div className="flex justify-between text-xs text-gray6 mb-1">
                      <span>{r.name}</span>
                      <span>{r.ratePercent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray4 overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', rateBarColor(r.ratePercent))}
                        style={{ width: `${r.ratePercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Modal
        isOpen={!!activeSession}
        onClose={() => setActiveSession(null)}
        title="Session details"
      >
        {activeSession && (
          <div className="flex flex-col gap-2">
            <p className={cn('text-sm text-gray6 mb-2', poppins_400.className)}>
              {formatDate(activeSession.date)} ·{' '}
              {typeof activeSession.classGradeId === 'object'
                ? activeSession.classGradeId.name
                : 'Class'}
            </p>
            {activeSession.students.map((entry, idx) => {
              const student =
                typeof entry.studentId === 'object'
                  ? entry.studentId
                  : { _id: String(entry.studentId), firstName: 'Student', lastName: '' };
              return (
                <div
                  key={`${student._id}-${idx}`}
                  className="flex justify-between items-center border-b border-gray4 py-2 text-sm"
                >
                  <span>
                    {student.firstName} {student.lastName}
                  </span>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs capitalize',
                      entry.status === 'present'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    )}
                  >
                    {entry.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
}

function SubjectInfoPage({ subject }: { subject: string }) {
  const { theme } = useSlgTheme();

  const { data: subjectResp } = useSWR(['subject', subject], () =>
    subjectsActions.getSubjectById(subject)
  );
  const subjectData = subjectResp?.data;
  const isArchived = !!subjectData?.isArchived;

  const { data: classSubjectsResp, mutate: mutateClassSubjects } = useSWR(
    ['class-subjects-for-subject', subject],
    () => classGradeActions.fetchClassSubjects({ subjectId: subject })
  );
  const classSubjects: ClassSubject[] = classSubjectsResp?.data?.data || [];

  const archiveHook = useArchiveSubject(subject);
  const unarchiveHook = useUnarchiveSubject(subject);
  const deleteHook = useDeleteSubject(subject);

  const tabs = [
    { label: 'Curriculum', value: 'curriculum' },
    { label: 'Classes & Rules', value: 'classes-rules' },
    { label: 'Students', value: 'students' },
    { label: 'Attendance', value: 'attendance' },
    { label: 'Materials', value: 'materials' },
    { label: 'Message', value: 'message' },
  ];
  const { activeTab, handleTabClick } = useActiveTab('subject-info', tabs);

  return (
    <main className="">
      <div className="flex justify-between items-center">
        <BreadcrumbBox
          className="mb-0"
          crumbs={[
            { label: 'Subjects', isActive: false, href: '/school/subjects' },
            { label: (subjectData?.name as string) || 'Loading...', isActive: true },
          ]}
        />
        <div className="flex gap-3">
          <Button
            round
            flat
            className="h-[44px] border border-r2 text-r2 px-6"
            onClick={deleteHook.openDelete}
          >
            <DeleteIcon />
            <span className="ml-2">Delete Subject</span>
          </Button>
          {isArchived ? (
            <Button
              round
              className="h-[44px] bg-light text-primary px-6"
              onClick={unarchiveHook.openUnarchive}
            >
              <UnarchiveIcon color={theme.primary} />
              <span className="ml-2">Unarchive</span>
            </Button>
          ) : (
            <Button
              round
              className="h-[44px] bg-light text-primary px-6"
              onClick={archiveHook.openArchive}
            >
              <ArchiveIcon color={theme.primary} />
              <span className="ml-2">Archive</span>
            </Button>
          )}
        </div>
      </div>
      {deleteHook.DeleteConfirmModal}
      {archiveHook.ArchiveConfirmModal}
      {unarchiveHook.UnarchiveConfirmModal}

      <div className="bg-white p-6 mt-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <h1 className={cn('text-xl text-black1', poppins_600.className)}>
            {subjectData?.name as string}
          </h1>
          {!!subjectData?.code && (
            <span className={cn('text-sm text-gray6', poppins_400.className)}>
              ({subjectData.code as string})
            </span>
          )}
          {isArchived && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
              Archived
            </span>
          )}
        </div>
      </div>

      <div className="bg-white w-full p-6 mt-6 rounded-xl min-h-[398px] h-auto">
        <Tabs value={activeTab}>
          <TabsHeader
            className="transition-all text-sm px-2 py-2 mb-6 w-full max-w-[780px] bg-[#F1F1F1] h-[53px] rounded-full"
            indicatorProps={{ className: 'bg-transparent rounded-full shadow-none' }}
          >
            {tabs.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => handleTabClick(value)}
                className={cn('text-sm text-center', Inter_500.className)}
                activeClassName="rounded-full text-white bg-primary"
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>

          <TabsBody className="w-full p-0">
            <TabPanel value="curriculum" className="p-0">
              <CurriculumTab subject={subjectData} classSubjects={classSubjects} />
            </TabPanel>
            <TabPanel value="classes-rules" className="p-0">
              <ClassesRulesTab
                subjectId={subject}
                classSubjects={classSubjects}
                onChanged={() => mutateClassSubjects()}
              />
            </TabPanel>
            <TabPanel value="students" className="p-0">
              <StudentsTab subjectId={subject} classSubjects={classSubjects} />
            </TabPanel>
            <TabPanel value="attendance" className="p-0">
              <AttendanceTab subjectId={subject} classSubjects={classSubjects} />
            </TabPanel>
            <TabPanel value="materials" className="p-0">
              <MaterialsList subjectId={subject} />
            </TabPanel>
            <TabPanel value="message" className="p-0">
              <ChatThread scope="subject" subjectId={subject} />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </main>
  );
}

export default SubjectInfoPage;
