import Button from '../atoms/form/Button';
import React, { useRef } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
} from '@material-tailwind/react';
import Image from 'next/image';
import { largeUploadedAssignment, uploadedAssignment } from '@/app/assets';
import Cancel from '../atoms/icons/ModalIcons/Cancel';
import { cn } from '@/app/lib/utils';
import { poppins_500 } from '@/app/lib/config/font.config';
import { CarouselImage } from '../organisms/dashboard/CarouselImage';
import { carouselImageRefType } from '@/app/lib/types';

export function ImageViewModal() {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const carouselImageRef = useRef<carouselImageRefType | null>(null);

  const footerImages = [
    uploadedAssignment,
    uploadedAssignment,
    uploadedAssignment,
  ];

  const handleOpen = () => setOpen((cur) => !cur);

  const handleSetActiveIndex = (arg: number) => {
    if (carouselImageRef?.current) {
      setActiveIndex(arg);
      carouselImageRef?.current?.setActiveIndexTab(arg);
    }
  };

  return (
    <>
      <Card
        className=" cursor-pointer shadow-none  transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
        <div className="flex gap-4">
          <Image src={uploadedAssignment} alt="Assignment" />
          <Image src={uploadedAssignment} alt="Assignment" />
        </div>
      </Card>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-[#232323] rounded-xl "
      >
        <DialogHeader className="justify-between border-b border-gray6">
          <div>
            <p className={cn('text-white text-[18px]', poppins_500.className)}>
              Assignment questions
            </p>
          </div>

          <Button
            onClick={handleOpen}
            className="!py-0 !px-0 bg-gray3 rounded-full h-[40px] w-[40px]"
          >
            <Cancel strokeColor="#FFFFFF" />
          </Button>
        </DialogHeader>
        <DialogBody className="">
          <CarouselImage
            setActiveFooterImg={(arg) => {
              setActiveIndex(arg);
            }}
            images={[
              largeUploadedAssignment,
              largeUploadedAssignment,
              largeUploadedAssignment,
            ]}
            ref={carouselImageRef}
          />
        </DialogBody>
        <DialogFooter className="border-t border-gray6 flex justify-start gap-3">
          {footerImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              height={60}
              width={100}
              className={`cursor-pointer ${
                activeIndex === index ? 'border-2 border-white' : ''
              }`}
              onClick={() => handleSetActiveIndex(index)}
            />
          ))}
        </DialogFooter>
      </Dialog>
    </>
  );
}
