import React from "react";
import {
  Drawer,
  Typography,
} from "@material-tailwind/react";
import Cancel from "../../atoms/icons/ModalIcons/Cancel";
import { cn } from "@/lib/utils";
import { Inter_600, poppins_400, poppins_500 } from "@/app/lib/config/font.config";
import { activities1 } from "@/app/assets";
import Image from "next/image";
import Dot from "../../atoms/dashboard/subjects/Dot";
import CalendarIcon from "../../atoms/icons/dashboard/CalendarIcon";
import CategoryIcon from "../../atoms/icons/dashboard/CategoryIcon";
import Button from "../../atoms/form/Button";

export function DrawerSide() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment >
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer placement="right" open={open} onClose={closeDrawer} size={494} >
        <div className="bg-primary text-white text-[16px] flex justify-between items-center w-full p-4">
          <p className={cn('text-[16px] ', Inter_600.className)}> Event Details</p>
          <div className="h-[32px] w-[32px] bg-white cursor-pointer  rounded-full flex items-center justify-center" onClick={closeDrawer}>
            <Cancel />
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]" >
          <div className="relative h-[233px]">
            <Image src={activities1} alt='activities' className="rounded-md object-cover h-[233px]" />
            <p className={cn('border border-[#FFFFFFA6] absolute top-3 right-3  bg-[#00000059] text-white rounded-[32px] py-1 px-2 ', poppins_500.className)}>N5,000</p>
          </div>
          <div className="mt-6">
            <Typography>
              <h2 className={cn('text-xl text-gray1 mb-2', poppins_500.className)}>Jet club student organization</h2>
            </Typography>
            <Typography>
              <span className={cn('text-sm flex items-center text-gray6 gap-1.5', poppins_400.className)}>
                Event <Dot /> Physical <CalendarIcon /> 16/03/2024 <CategoryIcon /> For all students
              </span>
            </Typography>
            <Typography className='my-4'>
              <span className={cn('text-sm flex items-center text-gray6 gap-1.5', poppins_400.className)}>
                Registration ends on <span className="text-gray1"> 16/03/2024 </span>
              </span>
            </Typography>
            <p className={cn('text-sm flex items-center text-gray gap-1.5 mb-3', poppins_400.className)}>About us</p>
            <p className={cn('text-sm flex items-center text-[#071E3B] gap-1.5', poppins_400.className)}>
              Agriculture is the cornerstone of food security, serving as the primary means of sustenance
              and economic stability for nations worldwide. It encompasses the cultivation of crops and livestock,
              which are essential for providing the food supply that suppor.

            </p>
        
          </div>
        </div>
        <div className="px-6 mt-6">
          <Button round wide className="absolute bottom-3  left-0 right-0 w-full">Register</Button>
        </div>

      </Drawer>
    </React.Fragment>
  );
}