import { entity } from 'simpler-state';

export const isCreateAcademicYearOpen = entity(false);

export function openCreateAcademicYearModal() {
  isCreateAcademicYearOpen.set(true);
}

export function closeCreateAcademicYearModal() {
  isCreateAcademicYearOpen.set(false);
}
