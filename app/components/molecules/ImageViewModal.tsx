import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
    IconButton,
    Typography,
    Card,
} from "@material-tailwind/react";
import Image from "next/image";
import { largeUploadedAssignment, uploadedAssignment } from "@/app/assets";
import Cancel from "../atoms/icons/ModalIcons/Cancel";
import { cn } from "@/lib/utils";
import { poppins_500 } from "@/app/lib/config/font.config";

export function ImageViewModal() {
    const [open, setOpen] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleOpen = () => setOpen((cur) => !cur);
    const handleIsFavorite = () => setIsFavorite((cur) => !cur);

    return (
        <>
            <Card
                className=" cursor-pointer shadow-none  transition-opacity hover:opacity-90"
                onClick={handleOpen}
            >
                <div className='flex gap-4'>
                    <Image src={uploadedAssignment} alt='Assignment' />
                    <Image src={uploadedAssignment} alt='Assignment' />
                </div>
            </Card>


            <Dialog size="xs" open={open} handler={handleOpen} className="bg-[#232323] rounded-xl ">
                <DialogHeader className="justify-between border-b border-[#4F4F4F]">
                    <div>
                        <p className={cn('text-white text-[18px]', poppins_500.className)}> Assignment questions</p>
                    </div>

                    <div className="bg-gray3 rounded-full ">
                        <Cancel strokeColor="#FFFFFF" />
                    </div>

                </DialogHeader>
                <DialogBody className="">
                    <CarouselImage />
                </DialogBody>
                <DialogFooter className="border-t border-[#4F4F4F] flex justify-start gap-3">
                    
                        <Image src={uploadedAssignment} alt='Assignment' height={60} width={100} />
                        <Image src={uploadedAssignment} alt='Assignment' height={60} width={100} />
                        <Image src={uploadedAssignment} alt='Assignment' height={60} width={100} />
                
                </DialogFooter>
            </Dialog>
        </>
    );
}



import { Carousel } from "@material-tailwind/react";

export function CarouselImage() {
    return (
        <Carousel
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            <Image src={largeUploadedAssignment} alt=""
                className="object-cover"
            />
            <Image src={largeUploadedAssignment} alt=""
                className="object-cover"
            />
            <Image src={largeUploadedAssignment} alt=""
                className="object-cover"
            />
        </Carousel>
    );
}