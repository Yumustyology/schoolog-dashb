import { entity } from 'simpler-state';
import type { TermSession } from '../actions/term-session.actions';

// Term Session List Entity
export const termSessionsEntity = entity<TermSession[]>([]);

export const setTermSessions = (terms: TermSession[]) => {
  termSessionsEntity.set(terms);
};

export const addTermSession = (term: TermSession) => {
  termSessionsEntity.set((prev) => [term, ...prev]);
};

export const updateTermSessionInList = (id: string, updatedTerm: Partial<TermSession>) => {
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
export const editTermModalEntity = entity<{ open: boolean; term: TermSession | null }>({
  open: false,
  term: null,
});

export const openEditTermModal = (term: TermSession) => {
  editTermModalEntity.set({ open: true, term });
};

export const closeEditTermModal = () => {
  editTermModalEntity.set({ open: false, term: null });
};

// Selected Term (for filtering/context)
export const selectedTermEntity = entity<TermSession | null>(null);

export const setSelectedTerm = (term: TermSession | null) => {
  selectedTermEntity.set(term);
};
