'use client';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { FilterButtonGroup } from '@/components/atoms/FilterButton';
import Button from '@/components/atoms/form/Button';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import AssignmentIcon from '@/components/atoms/icons/dashboard/AssignmentIcon';
import CardPosIcon from '@/components/atoms/icons/dashboard/CardPosIcon';
import MoneysIcon from '@/components/atoms/icons/dashboard/MoneysIcon';
import ParentIcon from '@/components/atoms/icons/dashboard/ParentIcon';
import DashboardLinkBox from '@/components/molecules/dashboard/DashboardLinkBox';
import RevenueAnalytics from '@/components/molecules/dashboard/finance/RevenueAnalytics';
import React from 'react';
import { activities1 } from '@/app/assets';
import Image from 'next/image';
import { OptionIcon } from '@/components/atoms/icons/Icons';
import PaymentCategory from '@/components/molecules/dashboard/finance/PaymentCategory';
import CardTickIcon from '@/components/atoms/icons/dashboard/CardTick';
import FeeCategoryModal from '@/components/molecules/dashboard/finance/FeeCategoryModal';
import DeleteFeeModal from '@/components/molecules/dashboard/finance/DeleteFeeCategory';
import ActivatePaymentModal from '@/components/molecules/dashboard/finance/ActivatePaymentModal';
import {
  openActivateFeeCategoryModal,
  openFeeCategoryModal,
  openSalaryCategoryModal,
} from '@/app/lib/entities/payment.entity';
import SalaryCategoryModal from '@/components/molecules/dashboard/finance/SalaryCategoryModal';

const Page = () => {
  return (
    <div className="w-full rounded-lg bg-white-- min-h-[40dvh]">
      <div className="flex justify-between">
        <BreadcrumbBox
          crumbs={[
            {
              label: 'Finance',
              isActive: true,
            },
          ]}
        />
        <div className="flex gap-4">
          <Button
            flat
            outlined
            onClick={openActivateFeeCategoryModal}
            round
            className="bg-transparent gap-2 px-6 h-[44px] rounded-full"
          >
            <CardTickIcon />
            <span>Initiate salary</span>
          </Button>
          <Button
            onClick={openActivateFeeCategoryModal}
            round
            className="gap-2 px-6 h-[44px] rounded-full"
          >
            <CardPosIcon />
            <span>Activate payment</span>
          </Button>
        </div>
      </div>
      <section>
        <div className="h-full flex  justify-between items-center mt-6">
          <FilterButtonGroup onFilterChange={console.log} />
          <DatePicker
            className="rounded-md w-fit"
            calenderContainerClassName="mr-3"
          />
        </div>

        <div className="mt-8 grid grid-cols-4 gap-4 mb-8 h-[134px]">
          <DashboardLinkBox
            title="Total Teachers"
            count={'$3,200,500'}
            baseText="120 Non teaching staff"
            icon={<MoneysIcon />}
            iconBgColor="bg-[#FFFF331F]"
            baseTextClassName="text-white"
            countClassName="text-white"
            titleClassName="text-white"
            className="bg-gradient-to-br from-[#21B55A] to-[#0E4F27] !text-white"
          />
          <DashboardLinkBox
            title="Due payments"
            count={'12,250'}
            to="/student/subjects"
            icon={<AssignmentIcon color="#EB5757" />}
            iconBgColor="bg-[#EB57571F]"
          />
          <DashboardLinkBox
            title="Payroll disbursed"
            count={'38'}
            to="/student/events"
            icon={<ParentIcon color="#27AE60" />}
            iconBgColor="bg-[#27AE601F]"
          />
          <DashboardLinkBox
            title="Payment types"
            count={'8'}
            to="/student/events"
            icon={<CardPosIcon color="#9B51E0" />}
            iconBgColor="bg-[#9B51E01F]"
          />
        </div>
        <div className="mt-8 flex gap-6">
          <div className="bg-white flex-grow p-6 rounded-lg">
            <div className="flex justify-between w-full items-center mb-5">
              <h2
                className={cn('font-semibold text-lg', poppins_600.className)}
              >
                Revenue trend
              </h2>
              <DatePicker
                className={cn(
                  'text-xs cursor-pointer text-gray6 2 w-[101px] border-gray4 bg-[#F7F7F8] flex justify-between rounded-full h-[38px] items-center px-3 py-1.5',
                  poppins_400.className
                )}
                placeholder={'Pick date'}
              />
            </div>
            <RevenueAnalytics />
          </div>
          <div className="min-w-[334px] bg-white rounded-md p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className={cn('text-base text-gray1', poppins_500.className)}>
                Due payments
              </h4>
              <p
                className={cn(
                  'text-sm text-primary cursor-pointer',
                  poppins_500.className
                )}
              >
                See all
              </p>
            </div>
            <div className="overflow-auto sidebar-scroll pr-2.5 max-h-[350px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                <div key={val} className="mt-4">
                  <div className="border border-[#14342C0F] min-h-[70px] rounded-lg p-3 flex items-center gap-[10px]">
                    <div className="flex-grow flex gap-[12px]">
                      <div className="h-[42px] w-[42px] bg-green-300 rounded-full overflow-hidden relative">
                        <Image
                          src={activities1}
                          alt="image"
                          className="rounded-full object-cover"
                          fill
                        />
                      </div>
                      <div>
                        <h5 className={cn('text-sm ', poppins_500.className)}>
                          Muhammad Jamiu
                        </h5>
                        <div className="flex items-center gap-[6px] mt-1">
                          <p
                            className={cn(
                              poppins_400.className,
                              'text-gray3 text-xs'
                            )}
                          >
                            08/02/2024
                          </p>
                          <div className="h-[6px] w-[6px] bg-[#D9D9D9] rounded-full" />
                          <p
                            className={cn(
                              poppins_500.className,
                              'text-sm text-gray1'
                            )}
                          >
                            ₦15,000
                          </p>
                        </div>
                      </div>
                    </div>
                    <OptionIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 grid-cols-2">
          <PaymentCategory
            onClickAddButton={openFeeCategoryModal}
            title="Fees categories"
            subTitle="Click on any category to view details, edit or delete"
          />
          <PaymentCategory
            onClickAddButton={openSalaryCategoryModal}
            title="Salary categories"
            subTitle="Click on any category to view details, edit or delete"
          />
        </div>
      </section>
      <FeeCategoryModal />
      <SalaryCategoryModal />
      <DeleteFeeModal />
      <ActivatePaymentModal />
    </div>
  );
};

export default Page;
