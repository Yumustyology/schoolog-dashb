'use client';
import React, { useState } from 'react';
import { cn } from '@/app/lib/utils';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { DeleteModalIcon, EditIcon } from '@/components/atoms/icons/Icons';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import termSessionActions, { type TermSession, toggleTermSessionActive } from '@/app/lib/actions/term-session.actions';
import { removeTermSession, updateTermSessionInList } from '@/app/lib/entities/term-session.entity';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { formatDateRange } from '@/app/lib/utils/dateUtils';
import { Loader2 } from 'lucide-react';

interface TermCardProps {
  term: TermSession;
  onEdit?: (term: TermSession) => void;
}

const TermCard: React.FC<TermCardProps> = ({ term, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [optimisticActive, setOptimisticActive] = useState(term.is_currently_active || false);

  // Update optimistic state when term prop changes
  React.useEffect(() => {
    setOptimisticActive(term.is_currently_active || false);
  }, [term.is_currently_active]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await termSessionActions.deleteTermSession(term._id);

      if (response?.data?.status === 'success') {
        toast.success(response.data.message || 'Term session deleted successfully');
        removeTermSession(term._id);
        setShowDeleteModal(false);
        mutate('/term-sessions');
      } else {
        toast.error(response?.data?.message || 'Failed to delete term session');
      }
    } catch (error) {
      console.error('Error deleting term session:', error);
      toast.error('An error occurred while deleting the term session');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = async () => {
    setIsToggling(true);
    
    // Optimistic update - toggle the local state immediately
    const newActiveState = !optimisticActive;
    setOptimisticActive(newActiveState);

    try {
      const response = await toggleTermSessionActive(term._id);

      if (response?.data?.status === 'success') {
        toast.success(response.data.message || `Term session ${optimisticActive ? 'deactivated' : 'activated'} successfully`);
        // Update the global state with server response
        if (response.data.data) {
          updateTermSessionInList(term._id, response.data.data);
        }
        mutate('/term-sessions');
      } else {
        // Revert optimistic update on failure
        setOptimisticActive(optimisticActive);
        toast.error(response?.data?.message || 'Failed to update term session status');
      }
    } catch (error) {
      console.error('Error toggling term session status:', error);
      // Revert optimistic update on error
      setOptimisticActive(optimisticActive);
      toast.error('An error occurred while updating the term session status');
    } finally {
      setIsToggling(false);
    }
  };

  const dateRange = term.start_date && term.end_date 
    ? formatDateRange(term.start_date, term.end_date) 
    : null;

  return (
    <>
      <TooltipProvider>
        <div className="w-full flex flex-col gap-3 justify-between bg-white min-h-[125px] border border-gray-100 rounded-xl p-4 shadow-sm">
          {/* Top row: Checkbox + Title */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    {isToggling && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-sm">
                        <Loader2 className="h-3 w-3 animate-spin text-primary" />
                      </div>
                    )}
                    <Checkbox
                      checked={optimisticActive}
                      onCheckedChange={(checked) => {
                        if (checked === true || checked === false) {
                          handleToggleActive();
                        }
                      }}
                      disabled={isToggling}
                      className={cn(
                        'h-5 w-5 rounded-sm border-2 transition-colors',
                        'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white',
                        'border-neutral-300 hover:border-primary/70',
                        'focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                      // title={term.is_currently_active ? 'Currently Active - Click to deactivate' : 'Currently Inactive - Click to activate'}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className={cn('text-sm', poppins_400.className)}>
                    {optimisticActive ? 'Currently Active - Click to deactivate' : 'Currently Inactive - Click to activate'}
                  </p>
                </TooltipContent>
              </Tooltip>
              <h3 className={cn('text-base text-[#071E3B] font-medium', Inter_500.className)}>
                {term.name}
              </h3>
            </div>
          </div>

          {/* Bottom row: Duration + Edit/Delete actions */}
          <div className="flex items-center justify-between">
            <div className={cn('text-sm text-gray-500', poppins_400.className)}>
              {dateRange && (
                <span>Duration: {dateRange}</span>
              )}
            </div>
            
            <div className="flex flex-row gap-2 items-center">
              {onEdit && (
                <button
                  onClick={() => onEdit(term)}
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full transition-colors flex-shrink-0',
                    'bg-neutral-100 text-primary hover:bg-primary hover:text-primary-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                  )}
                  aria-label="Edit term session"
                  // title="Edit term session"
                >
                  <EditIcon size={16} className="flex-shrink-0" />
                </button>
              )}
              <button
                onClick={() => setShowDeleteModal(true)}
                className={cn(
                  'flex items-center justify-center p-2 rounded-full transition-colors flex-shrink-0',
                  'text-destructive hover:bg-destructive/10',
                  'focus:outline-none focus:ring-2 focus:ring-destructive/20 focus:ring-offset-2'
                )}
                aria-label="Delete term session"
                // title="Delete term session"
              >
                <div className="flex-shrink-0">
                  <DeleteModalIcon />
                </div>
              </button>
            </div>
          </div>
        </div>
      </TooltipProvider>

      <ConfirmModal
        open={showDeleteModal}
        close={() => setShowDeleteModal(false)}
        title="Delete Term Session"
        body={`Are you sure you want to delete "${term.name}"? This action cannot be undone.`}
        icon={<DeleteModalIcon />}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        confirmClassName="bg-r text-white"
        isLoading={isDeleting}
      />
    </>
  );
};

export default TermCard;
