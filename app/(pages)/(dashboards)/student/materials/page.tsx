import ExcelIcon from '@/app/components/atoms/icons/dashboard/materials/Excel';
import FolderIcon from '@/app/components/atoms/icons/dashboard/materials/Folder';
import ImageIcon from '@/app/components/atoms/icons/dashboard/materials/Image';
import MediumIcon from '@/app/components/atoms/icons/dashboard/materials/Medium';
import PdfIcon from '@/app/components/atoms/icons/dashboard/materials/Pdf';
import WordIcon from '@/app/components/atoms/icons/dashboard/materials/Word';
import React from 'react';
import MaterialsList from '@/app/components/molecules/dashboard/materials/MaterialList';
function page() {
  type Materials = {
    type: string;
    icon: React.ReactNode;
    name: string;
    size: string;
    date: string;
  }[];

  const materials: Materials = [
    {
      type: 'folder',
      icon: <FolderIcon />,
      name: 'Indices and its equations folder',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <FolderIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <PdfIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <WordIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <ExcelIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <MediumIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <ExcelIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <ImageIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <PdfIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <WordIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <ExcelIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <MediumIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <ExcelIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
    {
      type: 'material',
      icon: <ImageIcon />,
      name: 'File name goes here.extension',
      size: '760KB',
      date: '28/03/2024',
    },
  ];

  return (
    <>
      <MaterialsList
        breadcrumb={[
          {
            isActive: true,
            label: 'materials',
            href: '/student/materials',
          },
        ]}
        materials={materials}
      />
    </>
  );
}

export default page;
