'use client';
import React, { useState } from 'react';
import ClassCard from '@/components/molecules/dashboard/classes/classCard';
import { classes } from '@/app/constants';
import Modal from '@/components/molecules/Modal';
import { SelectSubject } from '@/components/atoms/dashboard/materials/SelectSubject';
import Button from '@/components/atoms/form/Button';
import CircleMark from '@/components/atoms/icons/CircleMark';
import {
  poppins_500,
  poppins_700,
  Inter_500,
  poppins_600,
  poppins_400,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import SearchInput from '@/components/atoms/form/SearchInput';
import Input from '@/components/atoms/form/Input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Classes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const [categoryname, setCategoryname] = useState('');
  const handleSubmit = () => {
    setSubmitted(true);
  };
  return (
    <>
      <div className="flex justify-between items-center mb-10 px-6">
        <h1 className={cn('text-xl font-semibold text-[#21B55A]', poppins_700)}>
          Class
        </h1>
        <div className={cn('flex gap-4', Inter_500)}>
          <Button
            onClick={() => setModalOpen(true)}
            className="text-primary border focus:outline-none border-[#21B55A] bg-white rounded-full h-14 w-60"
          >
            Create class category
          </Button>
          <Button className="bg-primary text-white rounded-full h-14 w-60 focus:outline-none">
            + Create new class
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8">
        <div className="flex justify-between items-center mb-10 px-3">
          <div className="flex max-w-[42vw] gap-4">
            <SearchInput
              className="border-gray4 bg-white w-60 h-10 text-nowrap"
              placeholder="Search class, Student or Teacher"
            />
            <SelectSubject className="w-[200px]" />
          </div>
          <div className="bg-gray4 flex items-center text-gray3 gap-2.5 p-4 rounded-full">
            <Button className="bg-primary text-white rounded-full focus:outline-none">
              All Class
            </Button>
            <Button className="bg-white text-gray3 rounded-full focus:outline-none">
              Class category
            </Button>
            <Button className="bg-white text-gray3 rounded-full focus:outline-none">
              Archived
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white">
          {classes.map((classData: any, i: number) => (
            <ClassCard key={i} classData={classData} role={'school'} />
          ))}
        </div>
      </div>

      {/* Create Class Category Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSubmitted(false);
        }}
        title={submitted ? 'Create category' : 'Create class category'}
      >
        {submitted ? (
          <>
            <div className="flex justify-center items-center">
              <div className="bg-green-100 rounded-full h-32 w-32 relative z-10">
                <div className="flex justify-center items-center bg-green-300 rounded-full h-20 w-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <CircleMark />
                </div>
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center pb-5  text-nowrap pt-2">
              <span className={cn('font-semibold text-xl', poppins_600)}>
                Class category created successfully
              </span>
              <span className={cn(poppins_400 , "py-4 text-[#667085] text-lg")}>
                You have successfully created new class category
              </span>
            </div>
            <Button
              onClick={() => {
                setModalOpen(false);
                setSubmitted(false);
              }}
              round
              wide
              className="rounded-full h-12 text-base"
            >
              Okay
            </Button>
          </>
        ) : (
          <div className="p-3">
            <div
              className={cn(
                'text-base flex justify-center pb-5  text-nowrap',
                poppins_500
              )}
            >
              <span>Input the details of the category you want to create</span>
            </div>

            <div className="gap-4 space-y-10">
              <div>
                <Label htmlFor="categoryname" className="text-base">
                  Class category name
                </Label>
                <Input
                  id="categoryname"
                  type="text"
                  // onChange={(e) => {
                  //   setCategoryname(e.target.value)
                  // }}
                  placeholder="Input class category"
                  className="w-full h-10 border border-gray1 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="involved" className="text-base">
                  Class involved
                </Label>
                <Select>
                  <SelectTrigger className="w-full h-11 border border-gray1 text-gray1 rounded-lg">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class1">Class 1</SelectItem>
                    <SelectItem value="class2">Class 2</SelectItem>
                    <SelectItem value="class3">Class 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSubmit}
                round
                wide
                className="mt-8 rounded-full h-12 text-base"
                // className="bg-primary text-white rounded-full h-14 w-full mt-4 focus:outline-none "
              >
                Create class category
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Classes;
