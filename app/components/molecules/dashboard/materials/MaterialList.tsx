import React from 'react';
import Search from '@/app/components/atoms/form/SearchInput';
import { DatePicker } from '@/app/components/atoms/form/DatePicker';
import { SelectSubject } from '@/app/components/atoms/dashboard/materials/SelectSubject';
import Material from './Material';
import { MaterialType } from '@/types/materials.types';
import BreadcrumbBox, {
  BreadcrumbItemType,
} from '@/app/components/atoms/dashboard/subjects/Breadcrumb';

interface MaterialsListProps {
  materials: MaterialType[];
  breadcrumb?: BreadcrumbItemType[];
}
const MaterialsList: React.FC<MaterialsListProps> = ({
  materials,
  breadcrumb,
}) => {
  return (
    <div>
      {breadcrumb && (
        <>
          <BreadcrumbBox crumbs={breadcrumb} />
          <div className="flex max-w-[42vw] gap-4">
            <Search
              className="border-gray4 bg-white"
              placeholder="Search materials, Subject"
            />
            <SelectSubject className="w-[200px]" />
            <DatePicker />
          </div>
        </>
      )}
      <main className="my-5 gap-5 grid grid-cols-1 md:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 xlgDesktop:grid-cols-6">
        {materials.map((material) => (
          <div key={material.name}>
            <Material {...material} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default MaterialsList;
