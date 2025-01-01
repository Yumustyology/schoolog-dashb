import Search from '@/app/components/atoms/Search';
import { DatePicker } from '@/app/components/atoms/dashboard/materials/DatePicker';
import { SelectSubject } from '@/app/components/atoms/dashboard/materials/SelectSubject';
import ExcelIcon from '@/app/components/atoms/icons/dashboard/materials/Excel';
import FolderIcon from '@/app/components/atoms/icons/dashboard/materials/Folder';
import ImageIcon from '@/app/components/atoms/icons/dashboard/materials/Image';
import MediumIcon from '@/app/components/atoms/icons/dashboard/materials/Medium';
import PdfIcon from '@/app/components/atoms/icons/dashboard/materials/Pdf';
import WordIcon from '@/app/components/atoms/icons/dashboard/materials/Word';
import Materials from '@/app/components/molecules/dashboard/materials/Materials';
import React from 'react';
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
    <div>
      <div className="flex w-[600px] gap-6">
        <Search placeholderName="Search materials, Subject"></Search>
        <SelectSubject />
        <DatePicker />
      </div>

      <main className="flex flex-wrap flex-grow my-4 gap-4">
        {materials.map((material) => (
          <div key={material.name}>
            <Materials {...material} />
          </div>
        ))}
      </main>
    </div>
  );
}

export default page;
