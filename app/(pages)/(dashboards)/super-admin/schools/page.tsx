'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { formatDate } from '@/app/lib/utils/dateUtils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Search from '@/components/atoms/form/SearchInput';
import platformSchoolsActions from '@/app/lib/actions/platformSchools.action';

const Page = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useSWR(['platform-schools', search], () =>
    platformSchoolsActions.fetchAllSchools(search)
  );
  const schools = data?.data || [];

  return (
    <main>
      <BreadcrumbBox crumbs={[{ label: 'Schools', isActive: true }]} className="mb-0" />

      <div className="bg-white p-6 my-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn('text-lg text-black1', poppins_500.className)}>
            Schools ({schools.length})
          </h2>
          <Search
            placeholder="Search schools..."
            className="min-w-[300px] h-[38px] rounded-full bg-[#F7F7F7] border border-gray4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className={cn('text-gray border-b border-gray4', poppins_500.className)}>
              <tr>
                <th className="py-3 pr-4">School</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Location</th>
                <th className="py-3 pr-4">Tenant</th>
                <th className="py-3 pr-4">Plan</th>
                <th className="py-3 pr-4">Joined</th>
              </tr>
            </thead>
            <tbody className={cn(poppins_400.className)}>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray">
                    Loading…
                  </td>
                </tr>
              )}
              {!isLoading && schools.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray">
                    No schools found
                  </td>
                </tr>
              )}
              {schools.map((school) => (
                <tr key={school._id} className="border-b border-gray4">
                  <td className="py-3 pr-4 text-black1">{school.name}</td>
                  <td className="py-3 pr-4">{school.email}</td>
                  <td className="py-3 pr-4">
                    {[school.state, school.country].filter(Boolean).join(', ')}
                  </td>
                  <td className="py-3 pr-4">{school.tenantDomain || school.slug}</td>
                  <td className="py-3 pr-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      No plan assigned
                    </span>
                  </td>
                  <td className="py-3 pr-4">{formatDate(school.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Page;
