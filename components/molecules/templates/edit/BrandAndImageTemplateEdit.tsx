'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { Inter_600, Inter_400 } from '@/app/lib/config/font.config';
import FileUploader from '@/components/atoms/form/FileUploader';
import CustomImageUploaderSmall from './CustomImageUploaderSmall';
import resourcesActions from '@/app/lib/actions/resources.action';
import websiteContentActions, {
  BrandSection,
} from '@/app/lib/actions/website-content.action';
import showToast from '@/app/lib/utils/toast';

type ImageField = {
  label: string;
  fieldName: string;
};

type BrandAndImageSettingsFormProps = {
  imageFields: ImageField[];
};

export function BrandAndImageTemplateEdit({
  imageFields,
}: BrandAndImageSettingsFormProps) {
  const [selectedFiles, setSelectedFiles] = React.useState<
    Record<string, File | null>
  >({});
  const [savedUrls, setSavedUrls] = React.useState<Record<string, string>>({});
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    websiteContentActions
      .getMyWebsiteContent()
      .then((res) => {
        const brand = res.data?.brand;
        if (brand) {
          const urls: Record<string, string> = {};
          if (brand.websiteLogo) urls.websiteLogo = brand.websiteLogo;
          if (brand.heroSectionImage) urls.heroSectionImage = brand.heroSectionImage;
          if (brand.aboutUsImage) urls.aboutUsImage = brand.aboutUsImage;
          if (brand.retinaLogo) urls.retinaLogo = brand.retinaLogo;
          setSavedUrls(urls);
        }
      })
      .catch(() => {
        // no saved content yet
      });
  }, []);

  const handleImageChange = (fieldName: string, file: File) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const uploadedUrls: Record<string, string> = { ...savedUrls };
      for (const [fieldName, file] of Object.entries(selectedFiles)) {
        if (!file) continue;
        const uploaded = await resourcesActions.uploadResource({ file, name: file.name });
        if (uploaded.data?.fileUrl) {
          uploadedUrls[fieldName] = uploaded.data.fileUrl;
        }
      }
      const payload: BrandSection = {
        websiteLogo: uploadedUrls.websiteLogo,
        heroSectionImage: uploadedUrls.heroSectionImage,
        aboutUsImage: uploadedUrls.aboutUsImage,
        retinaLogo: uploadedUrls.retinaLogo,
      };
      await websiteContentActions.saveBrandSection(payload);
      setSavedUrls(uploadedUrls);
      setSelectedFiles({});
      showToast('Brand & images saved', 'brand-save', { type: 'success' });
    } catch {
      showToast('Failed to save brand & images', 'brand-save-failed', { type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg mb-8">
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
            Brand and images settings
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Input and edit template & brand images.
          </p>
        </div>
        <Button type="button" onClick={handleSave} disabled={saving} className="text-white text-sm rounded-full">
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {imageFields.map(({ label, fieldName }, index) => (
          <div key={index} className="bg-white relative w-full mb-6">
            <label
              className={cn(
                'block text-left w-full text-base mb-2 text-gray1 font-medium',
                poppins_400.className
              )}
            >
              {label}
            </label>
            <FileUploader
              className="flex items-center !bg-[#F8F8F8] lg:h-[70px] overflow-hidden"
              onFileSelected={(file) => handleImageChange(fieldName, file!)}
              renderUI={(props) => (
                <CustomImageUploaderSmall
                  className="flex flex-row items-center gap-4"
                  {...props}
                  selectedFile={selectedFiles[fieldName] || null}
                />
              )}
              overwriteAccepted={true}
            />
          </div>
        ))}
      </div>
    </form>
  );
}
