import React from 'react'
import { DrawerSide } from '../DrawerSide'
import { Typography } from '@material-tailwind/react'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import Button from '@/components/atoms/form/Button'

const AnnoucementSideDrawer = ({open, closeDrawer}: {open: boolean, closeDrawer: ()=>void}) => {
    return (
        <DrawerSide
            open={open}
            close={closeDrawer}
            title="Announcement details"
            subtitle="21/05/2024"
        >
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
                <div className="mt-6">
                    <Typography>
                        <h2
                            className={cn(
                                'text-[20px] text-gray1 mb-4',
                                poppins_500.className
                            )}
                        >
                            2024 Midterm break starts from June 11 to June 16
                        </h2>
                        <p
                            className={cn('text-sm text-[#071E3B]', poppins_400.className)}
                        >
                            Lorem ipsum dolor sit amet consectetur. Ultricies felis lacus
                            massa mi massa dignissim. Gravida vel nunc dictum in pretium
                            fusce vulputate. Tristique ultrices etiam diam enim eleifend nec
                            ornare et. Blandit eu sed pellentesque sit leo ornare lacus
                            semper. Eget facilisi amet volutpat sit felis senectus aliquet
                            vitae penatibus. Viverra nulla auctor quam egestas. Risus
                            gravida nunc consectetur donec sit cras justo. Volutpat
                            vestibulum vitae odio sagittis nisl feugiat. Elit id enim
                            scelerisque amet. Enim proin accumsan arcu arcu ultricies
                            volutpat sit. Quis sed eget massa amet feugiat varius odio
                            massa. Nullam mi eget porttitor mattis. Turpis suspendisse
                            sagittis ultricies non at adipiscing. Id ac amet sit nisl
                            vivamus. Leo ultricies ornare pulvinar netus at semper nulla.
                            Egestas id ipsum orci viverra quam risus tempus semper nec.
                            Nunc.
                        </p>
                    </Typography>
                </div>
            </div>
            <div className="px-6 mt-6">
                <Button
                    onClick={closeDrawer}
                    round
                    wide
                    className="absolute bottom-3 bg-primary left-0 right-0 w-full text-white flex gap-3"
                >
                    Okay
                </Button>
            </div>
        </DrawerSide>

    )
}

export default AnnoucementSideDrawer