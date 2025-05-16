'use client';
import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Modal from '@/components/molecules/Modal';
import React from 'react';
import { useEntity } from 'simpler-state';
import {
  closeStaffPermissionsModal,
  isStaffPermissionsOpen,
} from '@/app/lib/entities/staff.entity';
import { PermissionToggle } from './PermissionToggle';

export const StaffPermissionsModal = () => {
  const isOpen = useEntity(isStaffPermissionsOpen);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeStaffPermissionsModal}
      title="Permission"
    >
      <div className="max-h-80 overflow-y-scroll px-2">
        <div className="">
          <p
            className={cn('text-base text-center my-5', poppins_500.className)}
          >
            Input role name and select the features <br /> this role will have
            access to
          </p>

          <form action="" method="post" className="flex flex-col gap-4">
            <PermissionToggle
              permissionID="accessDashboard"
              permissionName="Access Dashboard"
            />
            <PermissionToggle
              permissionID="manageStudents"
              permissionName="Manage students"
            />
            <PermissionToggle
              permissionID="accessStudentsDetails"
              permissionName="Access students details"
            />
            <PermissionToggle
              permissionID="manageStaff"
              permissionName="Manage staff"
            />
            <PermissionToggle
              permissionID="accessStaffLists"
              permissionName="Access staff lists"
            />
            <PermissionToggle
              permissionID="accessSubject"
              permissionName="Access subject"
            />
            <PermissionToggle
              permissionID="manageSubject"
              permissionName="Manage subject"
            />
          </form>
        </div>
      </div>

      <Button
        wide
        round
        className="h-12 mt-7"
        onClick={closeStaffPermissionsModal}
      >
        Save
      </Button>
    </Modal>
  );
};
