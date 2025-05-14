'use client'
import { Inter_400, Inter_500, poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import Button from '@/components/atoms/form/Button'
import Modal from '@/components/molecules/Modal'
import React from 'react'
import { useEntity } from 'simpler-state'
import { closeAddStaffPermissionModal, isAddStaffPermissionOpen } from '@/app/lib/entities/staff.entity'
import { PermissionToggle } from './PermissionToggle'
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme'
import Input from '@/components/atoms/form/Input'




export const AddNewStaffRoleModal = () => {
    const isOpen = useEntity(isAddStaffPermissionOpen)
    const { theme } = useSlgTheme()
    return (

        <Modal
            isOpen={isOpen}
            onClose={closeAddStaffPermissionModal}
            title="Add role"
        >
            <div className='max-h-80 overflow-y-scroll px-2'>
                <div className="">

                    <p
                        className={cn('text-base text-center my-5', poppins_500.className)}
                    >
                        Select the role you want to Add its  <br /> permission
                    </p>



                    <Input
                        id="role"
                        label="Role"
                        type="text"
                        labelClassName="label"
                        className=" h-11 rounded-lg"
                        name="text"
                        placeholder="Input role name "
                    // value={loginInfo.password}
                    // handleChange={updateLoginInfo}
                    />
                  



                    <form action="" method="post" className='flex flex-col gap-4'>
                        <h6 className={cn('text-sm text-gray1 mt-8 mb-2', Inter_400.className)}> Select actions this role can access </h6>
                        <PermissionToggle permissionID='accessDashboard' permissionName='Access Dashboard' />
                        <PermissionToggle permissionID='manageStudents' permissionName='Manage students' />
                        <PermissionToggle permissionID='accessStuidentsDetails' permissionName='Access students details' />
                    </form>

                </div>

            </div>
            

                <Button wide round className="h-12 mt-7" onClick={closeAddStaffPermissionModal}>
                    Add role
                </Button>
            
        </Modal>

    )
}
