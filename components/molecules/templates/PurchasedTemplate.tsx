'use client';

import { thumbnailImage } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn, formatCurrency } from '@/app/lib/utils';
import { carouselImageRefType } from '@/app/lib/types';
import { CarouselImage } from '@/components/organisms/dashboard/CarouselImage';
import Image from 'next/image';
import React, { useRef } from 'react';
import useSWR from 'swr';
import paymentsActions from '@/app/lib/actions/payments.action';
import type { Template } from '@/app/lib/actions/templates.action';
import Empty from '@/components/molecules/empty/Empty';
import { NoSubjectIcon } from '@/components/atoms/icons/Icons';

const PurchasedTemplate = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const carouselImageRef = useRef<carouselImageRefType | null>(null);

  const { data, isLoading } = useSWR(['payments-purchases'], () =>
    paymentsActions.listMyPurchases()
  );
  const purchase = data?.data?.[0];
  const template: Template | undefined =
    purchase && typeof purchase.templateId !== 'string'
      ? purchase.templateId
      : undefined;

  const handleSetActiveIndex = (arg: number) => {
    if (carouselImageRef?.current) {
      setActiveIndex(arg);
      carouselImageRef?.current?.setActiveIndexTab(arg);
    }
  };

  if (!isLoading && !template) {
    return (
      <Empty
        icon={<NoSubjectIcon />}
        title="No purchased template yet"
        description="Buy a template from the Landing Pages tab to build your school website"
        buttonText="Browse templates"
        route="/school/templates"
      />
    );
  }

  if (!template) return null;

  const images =
    template.previewImages.length > 0
      ? template.previewImages
      : [thumbnailImage];

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
                {template.name} -
              </h3>
            </div>
            <p
              className={cn(
                'text-xl font-normal text-gray6',
                poppins_500.className
              )}
            >
              &nbsp;{formatCurrency(template.price, template.currency)}{' '}
              {template.billingInterval !== 'one_time' && (
                <span className={cn(poppins_400.className, 'text-xs')}>
                  /{template.billingInterval === 'yearly' ? 'yearly' : 'monthly'}
                </span>
              )}
            </p>
          </div>
        </div>
        <div>
          <CarouselImage
            setActiveFooterImg={(arg) => {
              setActiveIndex(arg);
            }}
            images={images}
            ref={carouselImageRef}
            className="!h-[606px] w-full relative --overflow-hidden"
          />
        </div>

        <div className="overflow-auto sidebar-scroll border-t mt-6 flex justify-start gap-3">
          {images.map((image, index) => (
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
            {template.description}
          </p>
        </div>
        {template.features.length > 0 && (
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
              {template.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedTemplate;
