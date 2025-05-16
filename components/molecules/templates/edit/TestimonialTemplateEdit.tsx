import React, { useState } from 'react';
import { cn } from '@/app/lib/utils';
import {
  Inter_400,
  Inter_600,
  poppins_400,
} from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import ImageUploader from '@/components/atoms/form/ImageUploader';
import CustomImageUploaderSmall from './CustomImageUploaderSmall';
import { IoAdd } from 'react-icons/io5';
import { DatePicker } from '@/components/atoms/form/DatePicker';

interface Testimonial {
  name: string;
  role: string;
  date: string;
  testimonial: string;
  image: File | null;
}

const TestimonialTemplateEdit: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { name: '', role: '', date: '', testimonial: '', image: null },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof Omit<Testimonial, 'image'>,
    value: string
  ) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][field] = value;
    setTestimonials(updatedTestimonials);
  };

  const handleImageChange = (index: number, file: File) => {
    if (!file) return;
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index].image = file;
    setTestimonials(updatedTestimonials);
  };

  const addNewTestimonial = () => {
    setTestimonials([
      ...testimonials,
      { name: '', role: '', date: '', testimonial: '', image: null },
    ]);
  };

  return (
    <form className="bg-white p-6 rounded-lg mb-8">
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
            Testimonials
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Edit and add testimonials to the website
          </p>
        </div>
        <Button className="text-white text-sm rounded-full">
          Save changes
        </Button>
      </div>

      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="grid tablet:grid-cols-1 laptop:grid-cols-2 gap-6 mb-6"
        >
          <Input
            label="Name"
            type="text"
            value={testimonial.name}
            handleChange={(e) =>
              handleInputChange(index, 'name', e.target.value)
            }
            className="input"
          />
          <Input
            label="Role or title"
            type="text"
            value={testimonial.role}
            handleChange={(e) => {
              handleInputChange(index, 'role', e.target.value);
              console.log(e);
            }}
            className="input"
          />
          {/* <Input
            label="Date"
            type="text"
            value={testimonial.date}
            handleChange={(e) =>
              handleInputChange(index, 'date', e.target.value)
            }
            className="input"
          /> */}
          <div>
            <label
              className={cn(
                'block text-left w-full text-base mb-2 text-gray1 font-medium',
                poppins_400.className
              )}
            >
              Date
            </label>
            <DatePicker
              calenderContainerClassName="mr-auto"
              onChange={(val) => {
                handleInputChange(index, 'date', val?.toString() || '');
              }}
              className="rounded-lg h-[60px] w-full flex-row-reverse justify-between"
            />
          </div>

          <div>
            <label
              className={cn(
                'block text-left w-full text-base mb-2 text-gray1 font-medium',
                poppins_400.className
              )}
            >
              Testimony image
            </label>
            <ImageUploader
              className="flex items-center --!bg-[#F8F8F8] tablet:h-[100px] laptop:h-[58px] overflow-hidden"
              onImageSelected={(file) => handleImageChange(index, file!)}
              renderUI={(props) => (
                <CustomImageUploaderSmall
                  className="flex flex-row items-center gap-4"
                  {...props}
                  selectedFile={testimonial.image}
                />
              )}
            />
          </div>
          <Input
            label="Testimonial"
            type="textarea"
            placeholder="Testimonial content"
            value={testimonial.testimonial}
            handleChange={(e) =>
              handleInputChange(index, 'testimonial', e.target.value)
            }
            className="input"
            rows={5}
          />
        </div>
      ))}

      <Button
        type="button"
        onClick={addNewTestimonial}
        className="flex bg-[#F8F8F8] text-gray1 items-center rounded-full px-3 "
      >
        <IoAdd />
        Add new testimonial
      </Button>
    </form>
  );
};

export default TestimonialTemplateEdit;
