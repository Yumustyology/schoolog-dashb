'use client';

import Input from '@/components/atoms/form/Input';
import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useState } from 'react';
import { RelationshipDropdownList } from '@/components/atoms/form/RelationshipDropdownList';
import GuardianSearchSelect, { GuardianItem } from '@/components/molecules/dashboard/students/GuardianSearchSelect';
import { useEntity } from 'simpler-state';
import { createStudentEntity, setCreateStudentField } from '@/app/lib/entities/student.entity';
import { X } from 'lucide-react';

export default function Step2() {
  const student = useEntity(createStudentEntity);

  const [selectedGuardian, setSelectedGuardian] = useState<GuardianItem | null>(null);

  // Rehydrate selected guardian from the persisted entity when the step remounts.
  // Only treat the guardian as a "selected" card if we have an actual guardianId
  // (i.e. it was selected from the list). If only guardianName is present
  // (typed manually) we should not show the selected card.
  React.useEffect(() => {
    if (!selectedGuardian && student.guardianId) {
      setSelectedGuardian({
        id: student.guardianId,
        _id: student.guardianId,
        name: student.guardianName || undefined,
        firstName: undefined,
        lastName: undefined,
        email: student.guardianEmail || undefined,
        phoneNumber: student.guardianPhone || undefined,
        relationship: student.guardianRelationship || undefined,
      });
    }
    // only run when the relevant persisted fields change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student.guardianId, student.guardianEmail, student.guardianPhone, student.guardianRelationship]);

  const handleSelectGuardian = (g: GuardianItem) => {
    if (!g) return;
    setSelectedGuardian(g);
    createStudentEntity.set((prev) => ({
      ...prev,
      guardianId: g.id || g._id || null,
      guardianName:
        g.firstName || g.name
          ? `${g.firstName || ''} ${g.lastName || ''}`.trim() || g.name
          : null,
      guardianEmail: g.email || null,
      guardianPhone: g.phoneNumber || g.phone || null,
      guardianAddress: g.address ?? null,
      guardianRelationship: g.relationship || prev.guardianRelationship || null,
    }));
  };

  const clearSelectedGuardian = () => {
    setSelectedGuardian(null);
    createStudentEntity.set((prev) => ({
      ...prev,
      guardianId: null,
      guardianName: null,
      guardianEmail: null,
      guardianPhone: null,
      guardianAddress: null,
      guardianRelationship: null,
    }));
  };

  return (
    <div>
      <div className="mb-12 mt-6">
        <h2
          className={cn(
            'text-xl text-center text-gray1 mb-1',
            poppins_500.className
          )}
        >
          Input the details of the <br/>student&apos;s guardian want to upload
        </h2>
      </div>

      <div className="mb-4">
        {selectedGuardian && (
          <div className="mt-3 p-4 border rounded-lg bg-gray-50 relative">
            <button
              type="button"
              onClick={clearSelectedGuardian}
              className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-800"
              aria-label="Remove guardian"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="font-semibold text-lg">{selectedGuardian.firstName || selectedGuardian.name} {selectedGuardian.lastName || ''}</div>
            <div className="text-sm text-gray-600">{selectedGuardian.relationship || ''}</div>
            <div className="text-sm">{selectedGuardian.email || ''}</div>
            <div className="text-sm">{selectedGuardian.phoneNumber || selectedGuardian.phone || ''}</div>
            {selectedGuardian.wards && selectedGuardian.wards.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                Wards: {selectedGuardian.wards.map((w) => `${w.firstName} ${w.lastName}`).join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

      {!selectedGuardian ? (
        <form action="" method="post" className="flex flex-col gap-4">
          <div className="flex gap-6 items-center">
            <div className="flex-1">
              <GuardianSearchSelect
                value={selectedGuardian ?? null}
                showSelectedInInput={false}
                onChange={(g) => {
                  if (!g) {
                    clearSelectedGuardian();
                  } else if (typeof g === 'string') {
                    // typed name used as manual input
                    setSelectedGuardian(null);
                    setCreateStudentField('guardianId', null);
                    setCreateStudentField('guardianName', g);
                  } else {
                    handleSelectGuardian(g);
                  }
                }}
                label="Full name"
                labelClassName="label text-gray2 mb-0"
                placeholder="Input guardian's full name"
              />
            </div>
            <div className="flex-1">
              <RelationshipDropdownList
                value={student.guardianRelationship ?? null}
                onChange={(v) => setCreateStudentField('guardianRelationship', v)}
              />
            </div>
          </div>

          <div className="flex gap-6">
            <Input
              id="guardianEmail"
              label="Guardian email"
              type="email"
              labelClassName="label"
              className=" h-11 rounded-lg"
              name="guardianEmail"
              placeholder="Input email "
              value={student.guardianEmail ?? ''}
              handleChange={(e) => setCreateStudentField('guardianEmail', e.target.value)}
            />

            <Input
              id="guardianPhone"
              label="Guardian phone number"
              type="text"
              labelClassName="label"
              className=" h-11 rounded-lg"
              name="guardianPhone"
              placeholder="Input phone number "
              value={student.guardianPhone ?? ''}
              handleChange={(e) => setCreateStudentField('guardianPhone', e.target.value)}
            />
          </div>

          {/**
          <div className="flex gap-6">
            <Input
              id="secondaryGuardian"
              label="Secondary guardian"
              type="text"
              labelClassName="label"
              className=" h-11 rounded-lg"
              name="secondaryGuardianName"
              placeholder="Input name"
              value={student.secondaryGuardianName ?? ''}
              handleChange={(e) => setCreateStudentField('secondaryGuardianName', e.target.value)}
            />

            <Input
              id="secondaryGuardianPhone"
              label="Secondary guardian phone"
              type="text"
              labelClassName="label"
              className=" h-11 rounded-lg"
              name="secondaryGuardianPhone"
              placeholder="Input phone number "
              value={student.secondaryGuardianPhone ?? ''}
              handleChange={(e) => setCreateStudentField('secondaryGuardianPhone', e.target.value)}
            />
          </div>
          */}

          <Input
            id="guardianAddress"
            label="Guardian address"
            type="text"
            labelClassName="label"
            className=" h-11 rounded-lg"
            name="guardianAddress"
            placeholder="Input address"
            value={student.guardianAddress ?? ''}
            handleChange={(e) => setCreateStudentField('guardianAddress', e.target.value)}
          />
        </form>
      ) : null}
    </div>
  );
}
