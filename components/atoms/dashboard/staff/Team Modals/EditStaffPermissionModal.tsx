'use client'
import { Inter_400, Inter_500, poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import Button from '@/components/atoms/form/Button'
import { AdditionIcon, Upload_Icon2 } from '@/components/atoms/icons/Icons'
import Modal from '@/components/molecules/Modal'
import React from 'react'
import { useEntity } from 'simpler-state'
import { closeEditStaffPermissionModal, isEditStaffPermissionOpen } from '@/app/lib/entities/staff.entity'
import { NonTeachingStaffDropdownRole } from '@/components/atoms/form/NonTeachingStaffRoleDropdown'
import { PermissionToggle } from './PermissionToggle'
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme'




export const EditStaffPermissionModal = () => {
    const isOpen = useEntity(isEditStaffPermissionOpen)
    const {theme} = useSlgTheme()
    return (

        <Modal
            isOpen={isOpen}
            onClose={closeEditStaffPermissionModal}
            title="Edit permission"
        >
            <div className='max-h-80 overflow-y-scroll px-2'>
                <div className="">

                    <p
                        className={cn('text-base text-center my-5', poppins_500.className)}
                    >
                        Select the role you want to edit its  <br /> permission
                    </p>

                    <NonTeachingStaffDropdownRole />
                    <Button
                        round
                        className="p-2 bg-[#21B55A1F] my-3"
                    >
                        <AdditionIcon color={theme.primary}  />
                        <span className={cn('text-sm text-primary', Inter_500.className)}>
                            Add new role
                        </span>
                    </Button>



                    <form action="" method="post" className='flex flex-col gap-4'>
                        <h6 className={cn('text-sm text-gray1 mt-8 mb-2', Inter_400.className)}> Select actions this role can access </h6>
                        <PermissionToggle permissionID='accessDashboard' permissionName='Access Dashboard' />
                        <PermissionToggle permissionID='manageStudents' permissionName='Manage students' />
                        <PermissionToggle permissionID='accessStuidentsDetails' permissionName='Access students details' />
                    </form>

                </div>

            </div>
            <div className='flex items-center justify-between gap-4'>
                <Button wide flat round className="h-12 mt-7 text-primary border border-primary" onClick={closeEditStaffPermissionModal}>
                    Cancel
                </Button>

                <Button wide round className="h-12 mt-7" onClick={closeEditStaffPermissionModal}>
                    Save
                </Button>
            </div>
        </Modal>

    )
}
