'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import subjectsActions from '@/app/lib/actions/subjects.action';
import ChatThread from '@/components/molecules/dashboard/message/ChatThread';
import type { ClassGrade } from '@/app/lib/types/class.types';

type Thread =
  | { scope: 'class'; id: string; label: string }
  | { scope: 'subject'; id: string; label: string };

export default function SchoolMessagePage() {
  const [selected, setSelected] = useState<Thread | null>(null);

  const { data: classesResp } = useSWR('/class-grades/school-all', () =>
    classGradeActions.fetchClassGradesAll()
  );
  const { data: subjectsResp } = useSWR('/subjects/school-all', () =>
    subjectsActions.getSchoolSubjects({ limit: 100 })
  );

  const classes = (classesResp?.data as ClassGrade[] | undefined) || [];
  const subjects = (subjectsResp?.data as { _id: string; name: string }[] | undefined) || [];

  return (
    <main>
      <BreadcrumbBox crumbs={[{ label: 'Message', isActive: true }]} className="mb-0" />

      <div className="bg-white mt-6 rounded-xl flex h-[calc(100vh-180px)] overflow-hidden">
        <aside className="w-[280px] border-r border-gray4 overflow-y-auto">
          <div className="p-4">
            <h3 className={cn('text-xs text-gray6 uppercase mb-2', poppins_500.className)}>
              Classes
            </h3>
            <div className="flex flex-col gap-1">
              {classes.map((c) => (
                <button
                  key={c._id}
                  type="button"
                  onClick={() => setSelected({ scope: 'class', id: c._id, label: c.name })}
                  className={cn(
                    'text-left px-3 py-2 rounded-lg text-sm',
                    selected?.scope === 'class' && selected.id === c._id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray4 text-black1'
                  )}
                >
                  {c.name}
                </button>
              ))}
              {classes.length === 0 && (
                <p className={cn('text-xs text-gray6 px-3', poppins_400.className)}>
                  No classes yet
                </p>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray4">
            <h3 className={cn('text-xs text-gray6 uppercase mb-2', poppins_500.className)}>
              Subjects
            </h3>
            <div className="flex flex-col gap-1">
              {subjects.map((s) => (
                <button
                  key={s._id}
                  type="button"
                  onClick={() => setSelected({ scope: 'subject', id: s._id, label: s.name })}
                  className={cn(
                    'text-left px-3 py-2 rounded-lg text-sm',
                    selected?.scope === 'subject' && selected.id === s._id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray4 text-black1'
                  )}
                >
                  {s.name}
                </button>
              ))}
              {subjects.length === 0 && (
                <p className={cn('text-xs text-gray6 px-3', poppins_400.className)}>
                  No subjects yet
                </p>
              )}
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col p-4">
          {selected ? (
            <>
              <h2 className={cn('text-base text-black1 mb-3', poppins_500.className)}>
                {selected.label}
              </h2>
              <ChatThread
                scope={selected.scope}
                classGradeId={selected.scope === 'class' ? selected.id : undefined}
                subjectId={selected.scope === 'subject' ? selected.id : undefined}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className={cn('text-sm text-gray6', poppins_400.className)}>
                Select a class or subject to start messaging
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
