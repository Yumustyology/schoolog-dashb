import React, { useEffect, useState } from 'react';
import { cn } from '@/app/lib/utils';
import {
  Inter_400,
  Inter_600,
  poppins_400,
} from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import FileUploader from '@/components/atoms/form/FileUploader';
import CustomImageUploaderSmall from './CustomImageUploaderSmall';
import { IoAdd } from 'react-icons/io5';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import resourcesActions from '@/app/lib/actions/resources.action';
import websiteContentActions from '@/app/lib/actions/website-content.action';
import showToast from '@/app/lib/utils/toast';

interface Testimonial {
  name: string;
  role: string;
  date: string;
  testimonial: string;
  image: File | null;
  savedImageUrl?: string;
}

const TestimonialTemplateEdit: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { name: '', role: '', date: '', testimonial: '', image: null },
  ]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    websiteContentActions
      .getMyWebsiteContent()
      .then((res) => {
        const saved = res.data?.testimonials;
        if (saved && saved.length > 0) {
          setTestimonials(
            saved.map((t) => ({
              name: t.name,
              role: t.role,
              date: t.date ?? '',
              testimonial: t.testimonial,
              image: null,
              savedImageUrl: t.image,
            }))
          );
        }
      })
      .catch(() => {
        // no saved content yet
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = await Promise.all(
        testimonials.map(async (t) => {
          let imageUrl = t.savedImageUrl;
          if (t.image) {
            const uploaded = await resourcesActions.uploadResource({ file: t.image, name: t.image.name });
            if (uploaded.data?.fileUrl) imageUrl = uploaded.data.fileUrl;
          }
          return { name: t.name, role: t.role, date: t.date, testimonial: t.testimonial, image: imageUrl };
        })
      );
      await websiteContentActions.saveTestimonialsSection(payload);
      showToast('Testimonials saved', 'testimonials-save', { type: 'success' });
    } catch {
      showToast('Failed to save testimonials', 'testimonials-save-failed', { type: 'error' });
    } finally {
      setSaving(false);
    }
  };

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
        <Button type="button" onClick={handleSave} disabled={saving} className="text-white text-sm rounded-full">
          {saving ? 'Saving…' : 'Save changes'}
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
            <FileUploader
              className="flex items-center --!bg-[#F8F8F8] tablet:h-[100px] laptop:h-[58px] overflow-hidden"
              onFileSelected={(file) => handleImageChange(index, file!)}
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
