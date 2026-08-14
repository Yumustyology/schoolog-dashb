'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';
import {
  Inter_600,
  Inter_400,
  poppins_400,
} from '@/app/lib/config/font.config';
import FileUploader from '@/components/atoms/form/FileUploader';
import CustomImageUploaderSmall from './CustomImageUploaderSmall';
import { IoAdd } from 'react-icons/io5';
import Button from '@/components/atoms/form/Button';
import resourcesActions from '@/app/lib/actions/resources.action';
import websiteContentActions from '@/app/lib/actions/website-content.action';
import showToast from '@/app/lib/utils/toast';

type Slot = { file: File | null; savedUrl?: string };

function PartnerLogosTemplateEdit() {
  const [slots, setSlots] = React.useState<Slot[]>([{}, {}, {}, {}, {}, {}].map(() => ({ file: null })));
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    websiteContentActions
      .getMyWebsiteContent()
      .then((res) => {
        const saved = res.data?.partnerLogos;
        if (saved && saved.length > 0) {
          setSlots(saved.map((p) => ({ file: null, savedUrl: p.logo })));
        }
      })
      .catch(() => {
        // no saved content yet
      });
  }, []);

  const handleImageChange = (index: number, file: File) => {
    setSlots((prev) => prev.map((slot, i) => (i === index ? { ...slot, file } : slot)));
  };

  const handleAddPartner = () => {
    setSlots((prev) => [...prev, { file: null }]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const uploaded = await Promise.all(
        slots.map(async (slot) => {
          if (slot.file) {
            const res = await resourcesActions.uploadResource({ file: slot.file, name: slot.file.name });
            return { logo: res.data?.fileUrl ?? slot.savedUrl ?? '' };
          }
          return { logo: slot.savedUrl ?? '' };
        })
      );
      await websiteContentActions.savePartnerLogosSection(uploaded.filter((p) => p.logo));
      showToast('Partner logos saved', 'partners-save', { type: 'success' });
    } catch {
      showToast('Failed to save partner logos', 'partners-save-failed', { type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg mb-8">
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
            Partners logos
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Upload and change partners logo
          </p>
        </div>

        <Button type="button" onClick={handleSave} disabled={saving} className="text-white text-sm rounded-full">
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {slots.map((slot, index) => (
          <div key={index} className="bg-white relative w-full ">
            <label
              className={cn(
                'block text-left w-full text-base mb-2 text-gray1 font-medium',
                poppins_400.className
              )}
            >
              Partner logo {index + 1}
            </label>
            <FileUploader
              className="flex items-center !bg-[#F8F8F8] lg:h-[70px] overflow-hidden"
              onFileSelected={(file) => handleImageChange(index, file!)}
              renderUI={(props) => (
                <CustomImageUploaderSmall
                  className="flex flex-row items-center gap-4"
                  {...props}
                  selectedFile={slot.file}
                />
              )}
              overwriteAccepted={true}
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={handleAddPartner}
        className="flex bg-[#F8F8F8] text-gray1 items-center rounded-full px-3 "
      >
        <IoAdd />
        Add Partner
      </Button>
    </form>
  );
}

export default PartnerLogosTemplateEdit;
