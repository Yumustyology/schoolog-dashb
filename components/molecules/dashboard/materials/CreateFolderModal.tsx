import React, { useState } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import resourcesActions from '@/app/lib/actions/resources.action';
import showToast from '@/app/lib/utils/toast';
import FolderIcon from '@/components/atoms/icons/dashboard/materials/Folder';
import type { MaterialType } from '@/app/lib/types/materials.types';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentFolderId?: string;
  classGradeId?: string;
  subjectId?: string;
  onOptimisticCreate?: (item: MaterialType) => void;
  onCreateError?: (tempId: string) => void;
  onCreateSuccess?: () => void | Promise<unknown>;
}

export const CreateFolderModal = ({
  isOpen,
  onClose,
  parentFolderId,
  classGradeId,
  subjectId,
  onOptimisticCreate,
  onCreateError,
  onCreateSuccess,
}: CreateFolderModalProps) => {
  const [folderName, setFolderName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleClose = () => {
    onClose();
    setFolderName('');
  };

  const handleCreateFolder = async () => {
    const name = folderName.trim();
    if (!name) return;

    const tempId = `temp-${Date.now()}`;
    onOptimisticCreate?.({
      id: tempId,
      type: 'folder',
      icon: <FolderIcon />,
      name,
      size: '-',
      date: new Date().toLocaleDateString(),
      folderId: parentFolderId,
    });
    setFolderName('');
    onClose();

    setIsCreating(true);
    try {
      await resourcesActions.createFolder({
        name,
        parentFolderId,
        classGradeId,
        subjectId,
      });
      await onCreateSuccess?.();
      showToast('Folder created successfully', 'folder-created', {
        theme: 'light',
        type: 'success',
      });
    } catch (error) {
      onCreateError?.(tempId);
      showToast('Failed to create folder', 'folder-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error creating folder:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-md"
      title="Create New Folder"
    >
      <div className="p-6 pt-4 pb-0 ">
        <div className="space-y-10">
          <div>
            <Input
              id="folderName"
              value={folderName}
              className="mb-4 w-full"
              handleChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateFolder();
                }
              }}
            />
          </div>
          <div className="flex gap-3 justify-end mt-10">
            <Button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateFolder}
              disabled={!folderName.trim() || isCreating}
              loading={isCreating}
            >
              Create Folder
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
