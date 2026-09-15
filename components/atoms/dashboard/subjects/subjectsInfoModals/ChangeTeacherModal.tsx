import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import {
  changeAssignedTeacherModal,
  closeChangeTeacherModal,
} from '@/app/lib/entities/subject.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import DropdownSearch from '@/components/atoms/form/DropdownSearch';
import ImageOptionBox from '@/components/atoms/form/ImageOptionBox';
import Modal from '@/components/molecules/Modal';
import React from 'react';
import { useEntity } from 'simpler-state';
import useSWR from 'swr';
import staffActions from '@/app/lib/actions/staff.action';
import subjectsActions from '@/app/lib/actions/subjects.action';
import showToast from '@/app/lib/utils/toast';

interface ChangeTeacherModalProps {
  subjectId?: string;
  classGradeId?: string;
  departmentId?: string;
  onSuccess?: () => void;
}

function ChangeTeacherModal({
  subjectId,
  classGradeId,
  departmentId,
  onSuccess,
}: ChangeTeacherModalProps) {
  const isOpen = useEntity(changeAssignedTeacherModal);
  const [selectedTeacherId, setSelectedTeacherId] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { data: staffResp } = useSWR(isOpen ? '/staff' : null, () =>
    staffActions.fetchSchoolStaff()
  );

  const options = React.useMemo(() => {
    const staffList = staffResp?.data || [];
    const teachingStaff = staffList.filter((s) => s.isTeachingStaff !== false);

    if (teachingStaff.length === 0) {
      return [
        {
          value: '',
          label: 'No teaching staff found',
        },
      ];
    }

    return teachingStaff.map((s) => {
      const name = `${s.firstName || ''} ${s.lastName || ''}`.trim() || s.email;
      return {
        value: s._id,
        label: <ImageOptionBox name={name} role={s.email || 'Teacher'} />,
      };
    });
  }, [staffResp]);

  const handleSubmit = async () => {
    if (!selectedTeacherId) {
      showToast('Please select a teacher', 'teacher-required', { type: 'error' });
      return;
    }

    if (!subjectId || !classGradeId) {
      showToast(
        'Subject and Class Grade must be specified',
        'context-required',
        { type: 'error' }
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await subjectsActions.assignTutorToSubjectClass(subjectId, {
        classGradeId,
        teacherId: selectedTeacherId,
        departmentId,
      });

      if (res?.status === 'success' || res?.data) {
        showToast(
          res.message || 'Tutor assigned successfully',
          'assign-tutor-success',
          { type: 'success' }
        );
        onSuccess?.();
        closeChangeTeacherModal();
      } else {
        showToast('Failed to assign tutor', 'assign-tutor-fail', { type: 'error' });
      }
    } catch {
      showToast(
        'An error occurred while assigning the tutor',
        'assign-tutor-err',
        { type: 'error' }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeChangeTeacherModal}
      title="Assign Tutor to Subject"
    >
      <div>
        <div>
          <p
            className={cn(
              'text-base text-gray1 text-center w-2/3 mx-auto',
              Inter_500.className
            )}
          >
            Select the teacher you want to assign to this class subject
          </p>
        </div>

        <div>
          <div className="mt-10">
            <div className="max-w-sm mx-auto">
              <p
                className={cn(
                  'text-base text-gray1 mb-2',
                  poppins_400.className
                )}
              >
                Teacher name
              </p>
              <DropdownSearch
                options={options}
                value={selectedTeacherId}
                onChange={setSelectedTeacherId}
                placeholder="Select teacher"
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        wide
        round
        disabled={isSubmitting}
        className="h-12 mt-7"
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Assigning…' : 'Submit'}
      </Button>
    </Modal>
  );
}

export default ChangeTeacherModal;
