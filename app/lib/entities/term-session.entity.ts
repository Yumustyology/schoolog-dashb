import { entity } from 'simpler-state';
import type { TermSessionType } from '../types/academicYear.types';

// Term Session List Entity
export const termSessionsEntity = entity<TermSessionType[]>([]);

export const setTermSessions = (terms: TermSessionType[]) => {
  termSessionsEntity.set(terms);
};

export const addTermSession = (term: TermSessionType) => {
  termSessionsEntity.set((prev) => [term, ...prev]);
};

export const updateTermSessionInList = (id: string, updatedTerm: Partial<TermSessionType>) => {
  termSessionsEntity.set((prev) =>
    prev.map((term) => (term._id === id ? { ...term, ...updatedTerm } : term))
  );
};

export const removeTermSession = (id: string) => {
  termSessionsEntity.set((prev) => prev.filter((term) => term._id !== id));
};

export const resetTermSessions = () => {
  termSessionsEntity.set([]);
};

// Create Term Modal State
export const createTermModalEntity = entity(false);

export const openCreateTermModal = () => {
  createTermModalEntity.set(true);
};

export const closeCreateTermModal = () => {
  createTermModalEntity.set(false);
};

// Edit Term Modal State
export const editTermModalEntity = entity<{ open: boolean; term: TermSessionType | null }>({
  open: false,
  term: null,
});

export const openEditTermModal = (term: TermSessionType) => {
  editTermModalEntity.set({ open: true, term });
};

export const closeEditTermModal = () => {
  editTermModalEntity.set({ open: false, term: null });
};

// Selected Term (for filtering/context)
export const selectedTermEntity = entity<TermSessionType | null>(null);

export const setSelectedTerm = (term: TermSessionType | null) => {
  selectedTermEntity.set(term);
};
