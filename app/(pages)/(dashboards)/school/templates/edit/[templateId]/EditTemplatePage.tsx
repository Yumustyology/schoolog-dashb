'use client';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { BrandAndImageTemplateEdit } from '@/components/molecules/templates/edit/BrandAndImageTemplateEdit';
import ContactFormTemplateEdit from '@/components/molecules/templates/edit/ContactFormTemplateEdit';
import FAQTemplateEdit from '@/components/molecules/templates/edit/FAQTemplateEdit';
import PartnerLogosTemplateEdit from '@/components/molecules/templates/edit/PartnerLogosTemplateEdit';
import SocialSettingsTemplateEdit from '@/components/molecules/templates/edit/SocialSettingsTemplateEdit';
import TestimonialTemplateEdit from '@/components/molecules/templates/edit/TestimonialTemplateEdit';
import React  from 'react';
import 'react-tagsinput/react-tagsinput.css';


const EditTemplatePage = () => {

  const imageFields = [
    { label: 'Website Logo', fieldName: 'websiteLogo' },
    { label: 'Hero Section Image', fieldName: 'heroSectionImage' },
    { label: 'About Us Image', fieldName: 'aboutUsImage' },
    { label: 'Retina logo', fieldName: 'retinaLogo' },
  ];


  const breadcrumbs = [
    { label: 'Templates', isActive: false },
    { label: 'Purchased Template', isActive: false },
    { label: 'Edit Template', isActive: true },
  ];

  // const handleImageChange = (file: File) => {
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

  //  const uploadImage = async () => {
  //  if (!selectedFile) {
  //    showToast('Please select a file', 'select-image', {
  //      type: 'info',
  //    });
  //    return;
  //  }

  //  setIsUploading(true);
  //  const formData = new FormData();
  //  formData.append('file', selectedFile);

  //  try {
  //    const response = await uploadUserFile(formData);
  //    showToast(response.data.message, response.data.message, {
  //      type: 'success',
  //    });

  //    revalidateFiles();
  //    setSelectedFile(null);
  //  } catch (error: unknown) {
  //    showToast('Error uploading image', 'Error uploading image', {
  //      type: 'error',
  //    });
  //  } finally {
  //    setIsUploading(false);
  //  }
  //  };

  return (
    <div>
      <BreadcrumbBox crumbs={breadcrumbs} className="mb-8" />
      <ContactFormTemplateEdit />
      <SocialSettingsTemplateEdit />
      <BrandAndImageTemplateEdit imageFields={imageFields} />
      <PartnerLogosTemplateEdit />
      <FAQTemplateEdit />
      <TestimonialTemplateEdit />
    </div>
  );
};

export default EditTemplatePage;



