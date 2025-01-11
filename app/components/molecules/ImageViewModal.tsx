import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
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
import { cn } from '@/lib/utils';
import { poppins_500 } from '@/app/lib/config/font.config';

type carouselImageRefType = {
  setActiveIndexTab: (arg: number) => void;
};

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
        <DialogHeader className="justify-between border-b border-[#4F4F4F]">
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
            ref={carouselImageRef}
          />
        </DialogBody>
        <DialogFooter className="border-t border-[#4F4F4F] flex justify-start gap-3">
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


import { Carousel } from '@material-tailwind/react';
import Button from '../atoms/form/Button';

export const CarouselImage = forwardRef<
  carouselImageRefType,
  { setActiveFooterImg: Dispatch<SetStateAction<number>> }
>((props: { setActiveFooterImg: any }, ref) => {

  let setActiveIndexTab: (arg: number) => void;
  let activeTab: number = 0;

  useImperativeHandle(ref, () => ({
    setActiveIndexTab,
  }));

  useEffect(() => props.setActiveFooterImg(activeTab), [activeTab]);
  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => {
        setActiveIndexTab = setActiveIndex;
        props?.setActiveFooterImg(activeIndex);
        return (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => {
                  setActiveIndex(i);
                }}
              />
            ))}
          </div>
        );
      }}
    >
      <Image
        onClick={() => setActiveIndexTab(2)}
        src={largeUploadedAssignment}
        alt="Assignment"
        className="object-cover"
      />
      <Image
        src={largeUploadedAssignment}
        alt="Assignment"
        className="object-cover"
      />
      <Image
        src={largeUploadedAssignment}
        alt="Assignment"
        className="object-cover"
      />
    </Carousel>
  );
});
