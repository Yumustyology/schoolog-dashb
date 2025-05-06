import { Inter_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React from 'react'

export const PermissionToggle = ({ permissionID, permissionName }: { permissionID: string, permissionName: string }) => {
    return (
        <div className='bg-gray11 py-4 px-3 rounded-xl flex justify-between'>
            <Label htmlFor={permissionID} className={cn('text-gray1  text-base', Inter_500.className)} >{permissionName}</Label>
            <Switch id={permissionID} />
        </div>


    )
}




