'use client';

import { thumbnailImage } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { openTemplateCheckoutModal } from '@/app/lib/entities/template-checkout.entity';
import { cn, formatCurrency } from '@/app/lib/utils';
import { carouselImageRefType } from '@/app/lib/types';
import Button from '@/components/atoms/form/Button';
import CardPosIcon from '@/components/atoms/icons/dashboard/CardPosIcon';
import EyeClose from '@/components/atoms/icons/EyeClose';
import TemplateCheckoutModal from '@/components/molecules/templates/TemplateCheckoutModal';
import { CarouselImage } from '@/components/organisms/dashboard/CarouselImage';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import templatesActions from '@/app/lib/actions/templates.action';
import showToast from '@/app/lib/utils/toast';

const TemplateInfo = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const params = useParams<{ template: string }>();
  const templateId = params.template;
  const router = useRouter();
  const searchParams = useSearchParams();

  const carouselImageRef = useRef<carouselImageRefType | null>(null);

  const { data, isLoading, mutate } = useSWR(
    templateId ? ['template', templateId] : null,
    () => templatesActions.fetchTemplateById(templateId)
  );
  const template = data?.data;

  useEffect(() => {
    if (searchParams.get('paystack_checkout')) {
      showToast(
        "Payment received — we're verifying it now, this can take a few seconds",
        'paystack-checkout-return',
        { type: 'success' }
      );
      router.replace(`/school/templates/${templateId}`);
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetActiveIndex = (arg: number) => {
    if (carouselImageRef?.current) {
      setActiveIndex(arg);
      carouselImageRef?.current?.setActiveIndexTab(arg);
    }
  };

  if (isLoading || !template) {
    return (
      <div className="bg-white p-6 rounded-xl mt-3 w-full text-center text-gray6 py-20">
        {isLoading ? 'Loading template…' : 'Template not found'}
      </div>
    );
  }

  const images =
    template.previewImages.length > 0 ? template.previewImages : [thumbnailImage];

  return (
    <div className="bg-white p-6 rounded-xl mt-3 w-full">
      <div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col mb-9">
            <div className="flex justify-between items-center">
              <h3
                className={cn(
                  'text-2xl text-gray1 font-semibold',
                  poppins_500.className
                )}
              >
                {template.name}
              </h3>
            </div>
            <p
              className={cn(
                'text-xl mt-3 font-normal text-gray6',
                poppins_500.className
              )}
            >
              {formatCurrency(template.price, template.currency)}{' '}
              {template.billingInterval !== 'one_time' && (
                <span className={cn(poppins_400.className, 'text-xs')}>
                  /{template.billingInterval === 'yearly' ? 'yearly' : 'monthly'}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-4 mb-8">
            <Button
              flat
              outlined
              round
              className="bg-transparent gap-2 px-6 h-[44px] rounded-full"
            >
              <EyeClose color="#21B55A" />
              <span>Preview</span>
            </Button>
            <Button
              onClick={() =>
                openTemplateCheckoutModal({
                  templateId: template._id,
                  name: template.name,
                  amount: template.price,
                  currency: template.currency,
                })
              }
              round
              className="gap-2 px-6 h-[44px] rounded-full"
            >
              <CardPosIcon />
              <span>Buy template</span>
            </Button>
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
      <TemplateCheckoutModal onPurchased={() => mutate()} />
    </div>
  );
};

export default TemplateInfo;
