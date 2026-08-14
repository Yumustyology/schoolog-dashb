'use client';

import { thumbnailImage } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { carouselImageRefType } from '@/app/lib/types';
import MakePaymentModal from '@/components/molecules/Payment/MakePaymentModal';
import { CarouselImage } from '@/components/organisms/dashboard/CarouselImage';
import Image from 'next/image';
import React, { useRef } from 'react';

const PurchasedTemplate = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const carouselImageRef = useRef<carouselImageRefType | null>(null);

  const footerImages = [
    thumbnailImage,
    thumbnailImage,
    thumbnailImage,
    thumbnailImage,
    thumbnailImage,
    thumbnailImage,
    thumbnailImage,
  ];

  const handleSetActiveIndex = (arg: number) => {
    if (carouselImageRef?.current) {
      setActiveIndex(arg);
      carouselImageRef?.current?.setActiveIndexTab(arg);
    }
  };

  return (
    <div className="">
      <div>
        <div className="flex justify-between items-start">
          <div className="flex items-center mb-9">
            <div className="flex justify-between items-center">
              <h3
                className={cn(
                  'text-3xl text-gray1 font-semibold',
                  poppins_500.className
                )}
              >
                Eleganza custom website -
              </h3>
            </div>
            <p
              className={cn(
                'text-xl font-normal text-gray6',
                poppins_500.className
              )}
            >
              &nbsp;₦10,000{' '}
              <span className={cn(poppins_400.className, 'text-xs')}>
                /monthly
              </span>
            </p>
          </div>
        </div>
        <div>
          <CarouselImage
            setActiveFooterImg={(arg) => {
              setActiveIndex(arg);
            }}
            images={[
              thumbnailImage,
              thumbnailImage,
              thumbnailImage,
              thumbnailImage,
              thumbnailImage,
              thumbnailImage,
              thumbnailImage,
            ]}
            ref={carouselImageRef}
            className="!h-[606px] w-full relative --overflow-hidden"
          />
        </div>

        <div className="overflow-auto sidebar-scroll border-t mt-6 flex justify-start gap-3">
          {footerImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              height={85}
              width={100}
              className={`cursor-pointer ${
                activeIndex === index ? 'border-2 border-white' : ''
              }`}
              onClick={() => handleSetActiveIndex(index)}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="mt-10 mb-6">
          <h2
            className={cn(
              'text-lg text-gray1 font-semibold',
              poppins_500.className
            )}
          >
            About template
          </h2>
          <p
            className={cn(
              'text-sm mt-2 font-normal text-gray6',
              poppins_500.className
            )}
          >
            Lorem ipsum dolor sit amet consectetur. Aliquet laoreet eu elit
            viverra. Dui nunc faucibus sollicitudin elementum in. Elit ac eget
            aenean tellus non ullamcorper faucibus consequat ac. Amet ultrices
            in ut cras mattis nunc aliquet. Vulputate vestibulum aliquam id id
            eget cursus nibh. Placerat mattis id vitae Lorem ipsum dolor sit
            amet consectetur. Aliquet laoreet eu elit viverra.{' '}
          </p>
        </div>
        <div className="mt-10 mb-6">
          <h2
            className={cn(
              'text-lg text-gray1 font-semibold',
              poppins_500.className
            )}
          >
            Qualities & Features
          </h2>
          <ul
            className={cn(
              'list-disc text-sm mt-2 font-normal text-gray6 pl-5 space-y-2',
              poppins_500.className
            )}
          >
            <li>
              Identify and prioritize high impact AI-appropriate use cases.
            </li>
            <li>Devise robust data strategies and risk mitigation tactics.</li>
            <li>
              Learn the foundational design principles for interactive AI user
              experiences.
            </li>
            <li>
              Assess the technical frameworks for designing and building a
              Minimal Lovable Product (MLP).
            </li>
            <li>
              Test your hypotheses with no-code solutions to AI prototyping.
            </li>
          </ul>
        </div>
      </div>
      <MakePaymentModal />
    </div>
  );
};

export default PurchasedTemplate;
