'use client';
import React, { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Search from '@/components/atoms/form/SearchInput';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import { SelectSubject } from '@/components/atoms/dashboard/materials/SelectSubject';
import Material from './Material';
import type { MaterialType } from '@/app/lib/types/materials.types';
import BreadcrumbBox, {
  BreadcrumbItemType,
} from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Empty from '@/components/molecules/empty/Empty';
import MaterialIcon from '@/components/atoms/icons/SideBar/Material';
import AddFolderIcon from '@/components/atoms/icons/dashboard/materials/AddFolderIcon';
import Button from '@/components/atoms/form/Button';
import { cn } from '@/app/lib/utils';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import { UploadResourcesModal } from '@/components/atoms/dashboard/subjects/subjectsInfoModals/UploadResourcesModal';
import { CreateFolderModal } from '@/components/molecules/dashboard/materials/CreateFolderModal';
import resourcesActions from '@/app/lib/actions/resources.action';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import MaterialCardSkeleton from '@/components/atoms/skeleton/MaterialCardSkeleton';
import { useUrlFilter } from '@/app/lib/hooks/useUrlFilter';
import {
  appendFolderPath,
  convertResourceToMaterial,
  getCurrentFolderId,
  parseFolderPath,
  removeLastFolderPath,
  sliceFolderPath,
} from '@/app/lib/utils/resource.util';
import { BackArrowIcon } from '@/components/atoms/icons/Icons';

/**
 * MaterialsList Component
 * 
 * URL-based folder navigation:
 * - Root: /student/materials?classGrade=xxx
 * - Level 1: /student/materials?classGrade=xxx&folder=folderId1
 * - Level 2: /student/materials?classGrade=xxx&folder=folderId1.folderId2
 * - Level 3: /student/materials?classGrade=xxx&folder=folderId1.folderId2.folderId3
 * 
 * The folder parameter contains a delimited path of folder IDs using '.' as separator.
 * This makes the entire navigation state shareable via URL.
 */

interface MaterialsListProps {
  classId?: string;
  subjectId?: string;
  breadcrumb?: BreadcrumbItemType[];
}

const MaterialsList: React.FC<MaterialsListProps> = ({
  classId: initialClassId,
  subjectId: initialSubjectId,
  breadcrumb,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useSlgTheme();

  // Use URL filter hooks for params
  const { value: classGradeId, setValue: setClassGradeId } = useUrlFilter({
    paramName: 'classGrade',
    defaultValue: initialClassId,
  });
  const { value: subjectId } = useUrlFilter({
    paramName: 'subjectId',
    defaultValue: initialSubjectId,
  });
  // Subject-scoped views (no classId prop) show materials across every
  // class the subject is taught in, so the class-grade picker doesn't apply.
  const showClassGradeFilter = !initialSubjectId || !!initialClassId;
  const { value: folderPath, setValue: setFolderPath } = useUrlFilter({ 
    paramName: 'folder' 
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const folderIds = parseFolderPath(folderPath);
  const currentFolderId = getCurrentFolderId(folderIds);



  const { data: resourcesResp, isLoading, mutate } = useSWR(
    classGradeId || subjectId
      ? ['/resources', {
          ...(classGradeId && { classGradeId }),
          ...(subjectId && { subjectId }),
          ...(currentFolderId && { folderId: currentFolderId })
        }]
      : null,
    async (key) => {
      const [, listParams] = key as [string, Record<string, string>];
      const resp = await resourcesActions.listResources(listParams);
      const resourceList = resp?.data || [];
      return resourceList.map(convertResourceToMaterial);
    }
  );

  const resources: MaterialType[] = resourcesResp || [];

  // Injects a placeholder item into the SWR cache immediately (no network
  // round-trip), so the list updates the instant a user submits — the
  // caller follows up with mutate() on success (reconciles with the real
  // server record) or removeOptimistic() on failure (rolls it back).
  const addOptimistic = (item: MaterialType) => {
    mutate((current) => [item, ...(current || [])], { revalidate: false });
  };

  const removeOptimistic = (tempId: string) => {
    mutate((current) => (current || []).filter((m) => m.id !== tempId), {
      revalidate: false,
    });
  };

  const folderDetails = folderIds.map((id, index) => ({
    id,
    name: `Folder ${index + 1}`,
  }));

  const handleFolderClick = (id: string) => {
    setFolderPath(appendFolderPath(folderPath, id));
  };

  const handleGoBack = () => {
    if (folderIds.length === 0) {
      return;
    }

    setFolderPath(removeLastFolderPath(folderIds));
  };

  const handleClassGradeChange = (value: string | string[]) => {
    const newClassId = Array.isArray(value) ? value[0] : value;
    setClassGradeId(newClassId);
    // Reset folder navigation when class changes
    setFolderPath(undefined);
  };

  const buildBreadcrumbHref = (nextFolderPath?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextFolderPath) {
      params.set('folder', nextFolderPath);
    } else {
      params.delete('folder');
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const handleUploadSuccess = async () => {
    setShowUploadModal(false);
    await mutate();
  };

  const folderBreadcrumbs: BreadcrumbItemType[] = (folderDetails || []).map(
    (folder, index) => {
      const nextPath = sliceFolderPath(folderIds, index);
      return {
        label: folder.name,
        href: buildBreadcrumbHref(nextPath),
        isActive: index === folderIds.length - 1,
      };
    }
  );

  const baseBreadcrumbs: BreadcrumbItemType[] = (breadcrumb || []).map((crumb, index) => ({
    ...crumb,
    isActive: folderIds.length === 0 && index === (breadcrumb?.length || 0) - 1,
  }));

  const mergedBreadcrumbs = [...baseBreadcrumbs, ...folderBreadcrumbs];

  return (
    <div>
      {breadcrumb && <BreadcrumbBox crumbs={mergedBreadcrumbs} />}
      <>
          {showClassGradeFilter && (
            <div className="flex flex-col gap-4 mb-4">
              <div className="w-full max-w-xs">
                <ClassGradeDropdown
                  value={classGradeId || ''}
                  onValueChange={handleClassGradeChange}
                  placeholder="Select class/level"
                  className="w-full"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex max-w-[42vw] gap-4 items-center flex-1">
              <Search
                className="border-gray4 bg-white"
                placeholder="Search materials, Subject"
              />
              {showClassGradeFilter && <SelectSubject className="w-[200px]" />}
              <DatePicker />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="whitespace-nowrap px-4 py-2"
              >
                + Upload Files
              </Button>
            </div>
          </div>
      </>

      <main className="my-5 gap-5 grid grid-cols-1 md:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 xlgDesktop:grid-cols-6">
        {!isLoading && folderIds.length > 0 && (
          <div
            onClick={handleGoBack}
            className="min-w-[180px] p-3 py-6 rounded-[12px] bg-white flex flex-col justify-center gap-4 cursor-pointer border border-transparent hover:border-primary transition-all"
            style={{
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.primary}10`;
              e.currentTarget.style.borderColor = theme.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            title="Go back to parent folder"
          >
            <div className="mx-auto">
              <BackArrowIcon color={theme.primary} />
            </div>
            <div className={cn('text-black1 text-center text-sm', 'font-medium')}>
              <h3>Back</h3>
            </div>
            <p className={cn('text-gray mx-auto text-xs', 'opacity-0')}>
              &nbsp;
            </p>
          </div>
        )}
        {!isLoading && resources.length > 0 && (
          <div
            onClick={() => setShowCreateModal(true)}
            className="min-w-[180px] p-3 py-6 rounded-[12px] bg-white flex flex-col justify-center gap-4 cursor-pointer border border-transparent hover:border-primary transition-all"
            style={{
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.primary}10`;
              e.currentTarget.style.borderColor = theme.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div className="mx-auto">
              <AddFolderIcon size="64" color={theme.primary} />
            </div>
            <div className={cn('text-black1 text-center text-sm', 'font-medium')}>
              <h3>Create New Folder</h3>
            </div>
            <p className={cn('text-gray mx-auto text-xs', 'opacity-0')}>
              &nbsp;
            </p>
          </div>
        )}

        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={`material-skeleton-${index}`}>
              <MaterialCardSkeleton />
            </div>
          ))
        ) : (
          resources.map((material) => (
            <div key={material.id}>
              <Material
                {...material}
                onFolderClick={
                  material.type === 'folder'
                    ? () => handleFolderClick(material.id!)
                    : undefined
                }
              />
            </div>
          ))
        )}
      </main>

      {!isLoading && resources.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 mt-5">
          <Empty
            icon={<MaterialIcon size="80" color={theme.primary} />}
            title="No materials found"
            description="There are currently no materials available"
          />
          <div className="mt-6 flex gap-2">
            <Button
              type="button"
              round
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-full"
            >
              + Create Folder
            </Button>
            <Button
              type="button"
              round
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 rounded-full"
              flat
            >
              + Upload Files
            </Button>
          </div>
        </div>
      )}


      <CreateFolderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        parentFolderId={currentFolderId || undefined}
        classGradeId={classGradeId || undefined}
        subjectId={subjectId || undefined}
        onOptimisticCreate={addOptimistic}
        onCreateError={removeOptimistic}
        onCreateSuccess={mutate}
      />

      <UploadResourcesModal
        isOpen={showUploadModal}
        setIsOpen={() => setShowUploadModal(false)}
        classGradeId={classGradeId || undefined}
        classId={initialClassId}
        folderId={currentFolderId || undefined}
        subjectId={subjectId || undefined}
        onOptimisticUpload={addOptimistic}
        onUploadError={removeOptimistic}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default MaterialsList;