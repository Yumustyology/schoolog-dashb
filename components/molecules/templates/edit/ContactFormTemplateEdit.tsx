import React, { useEffect, useState } from 'react';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import { PhoneNumberInput } from '@/components/atoms/form/PhoneNumberInput';
import TagsInput from 'react-tagsinput';
import websiteContentActions from '@/app/lib/actions/website-content.action';
import showToast from '@/app/lib/utils/toast';

interface ContactFormData {
  websiteName: string;
  address: string;
  email: string;
  customUrl: string;
  supportEmail: string;
  phoneNumber: string;
}

const ContactFormTemplateEdit: React.FC = () => {
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    websiteName: '',
    address: '',
    email: '',
    customUrl: '',
    supportEmail: '',
    phoneNumber: '',
  });

  const [tags, setTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    websiteContentActions
      .getMyWebsiteContent()
      .then((res) => {
        const contact = res.data?.contact;
        if (contact) {
          setContactFormData((prev) => ({
            ...prev,
            websiteName: contact.websiteName ?? prev.websiteName,
            address: contact.address ?? prev.address,
            email: contact.email ?? prev.email,
            customUrl: contact.customUrl ?? prev.customUrl,
            supportEmail: contact.supportEmail ?? prev.supportEmail,
            phoneNumber: contact.phoneNumber ?? prev.phoneNumber,
          }));
          if (contact.seoKeywords) setTags(contact.seoKeywords);
        }
      })
      .catch(() => {
        // no saved content yet — keep defaults
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await websiteContentActions.saveContactSection({ ...contactFormData, seoKeywords: tags });
      showToast('Contact information saved', 'contact-save', { type: 'success' });
    } catch {
      showToast('Failed to save contact information', 'contact-save-failed', { type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const handlePhoneNumberChange = (phone: string) => {
    setContactFormData((prev) => ({
      ...prev,
      phoneNumber: phone,
    }));
  };

  return (
    <form className="bg-white p-6 rounded-lg mb-8">
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn('font-semibold text-black1 mb-2 text-lg')}>
            Contact information
          </h2>
          <p className={cn('text-[#475467] text-sm')}>
            Set and change your contact information
          </p>
        </div>
        <Button type="button" onClick={handleSave} disabled={saving} className="text-white text-sm rounded-full">
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Input
            inputClassName={cn('text-base text-gray1')}
            id="website-name"
            label="Website name"
            type="text"
            labelClassName="label"
            className="input h-14 rounded-lg"
            name="websiteName"
            placeholder="Website name"
            value={contactFormData.websiteName}
            handleChange={handleContactFormChange}
          />
          <Input
            inputClassName={cn('text-base text-gray1')}
            id="address"
            label="Address"
            type="text"
            labelClassName="label mt-6"
            className="input h-14 rounded-lg"
            name="address"
            placeholder="Input address"
            value={contactFormData.address}
            handleChange={handleContactFormChange}
          />
          <Input
            inputClassName={cn('text-base text-gray1')}
            id="email"
            label="Email Address"
            type="email"
            labelClassName="label mt-6"
            className="input h-14 rounded-lg"
            name="email"
            placeholder="Email Address"
            value={contactFormData.email}
            handleChange={handleContactFormChange}
          />
        </div>
        <div>
          <Input
            inputClassName={cn('text-base text-gray1')}
            id="custom-url"
            label="Custom URL"
            type="text"
            labelClassName="label"
            className="input h-14 rounded-lg"
            name="customUrl"
            placeholder="Custom URL"
            value={contactFormData.customUrl}
            handleChange={handleContactFormChange}
          />
          <PhoneNumberInput
            className={cn('text-base text-gray1 input h-14 rounded-lg')}
            id="phoneNumber"
            label="Phone number"
            labelClassName="label mt-6"
            onPhoneChange={handlePhoneNumberChange}
          />
          <Input
            inputClassName={cn('text-base text-gray1')}
            id="support-email"
            label="Support Email Address"
            type="email"
            labelClassName="label mt-6"
            className="input h-14 rounded-lg mb-8"
            name="supportEmail"
            placeholder="Support Email Address"
            value={contactFormData.supportEmail}
            handleChange={handleContactFormChange}
          />
        </div>
      </div>
      <TagsInput
        value={tags}
        onChange={handleTagsChange}
        className="p-0"
        tagProps={{ className: 'react-tagsinput-tag' }}
        inputProps={{
          placeholder: 'Add SEO keywords to your website',
          className:
            'border border-[#D9DCE0] rounded-lg p-4 outline-none bg-transparent h-[50px] flex-grow w-full',
        }}
      />
    </form>
  );
};

export default ContactFormTemplateEdit;
