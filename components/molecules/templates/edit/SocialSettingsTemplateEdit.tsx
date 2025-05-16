import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import React, { useState } from 'react';

// Define the type for the form data
interface SocialFormData {
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
}

const SocialSettingsTemplateEdit = () => {
  // Initialize state with specific type SocialFormData
  const [socialFormData, setSocialFormData] = useState<SocialFormData>({
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
  });

  // Define the social media fields dynamically
  const socialMediaFields = [
    { label: 'LinkedIn', name: 'linkedin' },
    { label: 'Facebook', name: 'facebook' },
    { label: 'Twitter', name: 'twitter' },
    { label: 'Instagram', name: 'instagram' },
  ];

  // Handle form input change dynamically
  const handleSocialFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialFormData((prev) => ({
      ...prev,
      [name]: value, // TypeScript now knows that `name` is a key of `socialFormData`
    }));
  };

  return (
    <form className="bg-white p-6 rounded-lg mb-8">
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn('font-semibold text-black1 mb-2 text-lg')}>
            Social settings
          </h2>
          <p className={cn('text-[#475467] text-sm')}>
            Input and edit social links for this application
          </p>
        </div>
        <Button className="text-white text-sm rounded-full">
          Save changes
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {socialMediaFields.map((field, index) => (
          <div key={index}>
            <Input
              inputClassName={cn('text-base text-gray1')}
              id={`${field.name}-url`}
              label={field.label}
              type="text"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name={field.name}
              placeholder={`Enter ${field.label} profile URL`}
              value={socialFormData[field.name as keyof SocialFormData]}
              handleChange={handleSocialFormChange}
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default SocialSettingsTemplateEdit;
