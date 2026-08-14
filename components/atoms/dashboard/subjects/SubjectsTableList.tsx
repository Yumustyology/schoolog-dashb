"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { cn } from "@/app/lib/utils";
import { Inter_500 } from "@/app/lib/config/font.config";
import { NoSubjectIcon } from "@/components/atoms/icons/Icons";
import PaginationControl from "@/components/atoms/pagination/PaginationControl";
import subjectsActions from "@/app/lib/actions/subjects.action";
import { Skeleton } from "@/components/ui/skeleton";
import Empty from "@/components/molecules/empty/Empty";
import { useClassGradeFilter } from "@/app/lib/hooks/useClassGradeFilter";
import { getClassGradeName } from '@/app/lib/utils/classGradeUtils';
import type { Meta } from '@/app/lib/types/meta.types';
import SubjectCard from '@/components/molecules/dashboard/subjects/SubjectCard';

type SubjectType = {
  _id: string;
  name: string;
  coverImage?: string | null;
  description?: string | null;
  teacher?: string | null;
  classGradeIds?: { _id: string; name: string; level: number }[];
};

type Props = {
  search: string;
  debouncedSearch: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  setPage: (n: number) => void;
  pageSize: number;
  setPageSize: (n: number) => void;
  hasEverLoadedData: boolean;
  setHasEverLoadedData: (v: boolean) => void;
  classId?: string | null;
  activeTab?: 'active' | 'archived';
};

export default function SubjectsTableList({
  debouncedSearch,
  page,
  setPage,
  pageSize,
  setPageSize,
  hasEverLoadedData,
  setHasEverLoadedData,
  classId = null,
  activeTab = 'active',
}: Props) {
  const { classGrades, classGradeIsLoading, selectedClassGrade } = useClassGradeFilter({
    disableUrlSync: !!classId,
  });

  const effectiveClassGrades = classId ?? selectedClassGrade ?? '';

  const swrKey = ["subjects", debouncedSearch || "", effectiveClassGrades || "", page, pageSize, activeTab];

  const { data: subjectsResp, isLoading } = useSWR(swrKey, async () => {
    const q: Record<string, string | number | boolean | string[]> = { page, limit: pageSize };
    if (debouncedSearch) q.search = debouncedSearch;
    if (effectiveClassGrades) {
      // Pass class filter as `classGrade` (singular) instead of array
      const classGradeValue = Array.isArray(effectiveClassGrades)
        ? effectiveClassGrades[0]
        : String(effectiveClassGrades);
      q.classGrade = classGradeValue;
    }
    if (activeTab === 'archived') {
      q.archived = true;
    } else {
      q.archived = false;
    }
    return subjectsActions.getSchoolSubjects(q as any);
  });

  const subjects: SubjectType[] = Array.isArray(subjectsResp?.data) ? (subjectsResp?.data as SubjectType[]) : [];
  const meta = (subjectsResp?.meta as Meta) ?? ({ count: 0 } as Meta);
  const computedTotalPages = Math.max(1, Math.ceil((meta.count || 0) / pageSize));

  useEffect(() => {
    if (typeof subjectsResp !== "undefined") setHasEverLoadedData(true);
  }, [subjectsResp, setHasEverLoadedData]);

  const loading = (classGradeIsLoading && !selectedClassGrade) || isLoading;
  const isSearching = (debouncedSearch || "").toString().trim().length > 0 || !!selectedClassGrade;
  const showNoResults = subjects.length === 0 && !loading && isSearching;
  const showNoSubjectCreated = subjects.length === 0 && !loading && !isSearching && hasEverLoadedData;

  const selectedClassLabel = selectedClassGrade === 'all'
    ? 'All'
    : (classGradeIsLoading && (!classGrades || classGrades.length === 0))
      ? 'Loading…'
      : getClassGradeName(selectedClassGrade ?? undefined, classGrades, '');

  return (
    <div className="my-8">
      {classGrades.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoSubjectIcon />}
            title="No subject added"
            description="You have not yet added any subject"
            buttonText="+ Add subject"
          />
        </div>
      ) : (
        <>
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 border border-gray4 rounded">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : showNoSubjectCreated ? (
            <div className="col-span-full p-6 text-center">
              <div className="w-full flex justify-center"><NoSubjectIcon /></div>
              <h3 className={cn("text-lg font-semibold text-black1 mt-8", Inter_500.className)}>No subjects found</h3>
            </div>
          ) : showNoResults ? (
            (selectedClassGrade && !(debouncedSearch || '').trim().length) ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6"><NoSubjectIcon /></div>
                <p className={cn("text-[#071E3B] text-lg font-semibold mb-2", Inter_500.className)}>No subjects found in {selectedClassLabel || 'selected class'}</p>
                <p className={cn("text-[#667085] text-sm")}>Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6"><NoSubjectIcon /></div>
                <p className={cn("text-[#071E3B] text-lg font-semibold mb-2", Inter_500.className)}>No subjects found for “{debouncedSearch}”</p>
                <p className={cn("text-[#667085] text-sm")}>Try adjusting your search terms or filters</p>
              </div>
            )
          ) : (
            <>
              <section className="mt-[6vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subjects.map((sub: SubjectType) => (
                  <SubjectCard
                    key={sub._id}
                    classGradeId={selectedClassGrade}
                    subject={{
                      _id: sub._id,
                      name: sub.name,
                      coverImage: sub.coverImage || '',
                      currentTopic: sub.description || '',
                      teacher: sub.teacher,
                      numberOfTopicsCovered: 0,
                      numberOfTopics: 0,
                      students: [],
                      classGrades: sub.classGradeIds,
                      archived: activeTab === 'archived',
                    }}
                    role="school"
                  />
                ))}
              </section>

              <div className="mt-6">
                <PaginationControl
                  totalPages={computedTotalPages}
                  currentPage={page}
                  setCurrentPage={setPage}
                  pageSize={pageSize}
                  onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                  }}
                  hasNextPage={page < computedTotalPages}
                  hasPrevPage={page > 1}
                  recordLength={meta.count || subjects.length}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
