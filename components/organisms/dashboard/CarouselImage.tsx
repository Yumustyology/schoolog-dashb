'use client';
import { Carousel } from '@material-tailwind/react';
import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
} from 'react';

import Image, { StaticImageData } from 'next/image';
import { carouselImageRefType } from '@/app/types';
import { cn } from '@/app/lib/utils';

export const CarouselImage = forwardRef<
  carouselImageRefType,
  {
    setActiveFooterImg: Dispatch<SetStateAction<number>>;
    className?: string;
    images: string[] | StaticImageData[];
  }
>(
  (
    props: {
      setActiveFooterImg: any;
      className?: string;
      images: string[] | StaticImageData[];
    },
    ref
  ) => {
    let setActiveIndexTab: (arg: number) => void;
    const activeTab: number = 0;

    useImperativeHandle(ref, () => ({
      setActiveIndexTab,
    }));

    useEffect(() => props.setActiveFooterImg(activeTab), [activeTab]);
    return (
      <Carousel
        className={cn('rounded-xl', props?.className)}
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
        {props?.images?.map((image, index) => (
          <Image
            onClick={() => setActiveIndexTab(2)}
            src={image}
            alt="Assignment"
            className={cn('object-cover')}
            layout="fill"
            key={index}
          />
        ))}
      </Carousel>
    );
  }
);

CarouselImage.displayName = 'CarouselImage';
