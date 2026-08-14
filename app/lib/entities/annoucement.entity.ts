import { entity } from 'simpler-state';
export const totalNumberSteps = 2;

// initialize state
export const createAnnoucementProgessState = entity(0);

// update state we use the initialization of the state.set(value)
export const createAnnoucementNextStep = () => {
  createAnnoucementProgessState.set((prevStep) =>
    Math.min(prevStep + 1, totalNumberSteps)
  );
};

export const createAnnoucementPreviousStep = () => {
  createAnnoucementProgessState.set((prevStep) => Math.max(prevStep - 1, 0));
};

export const createAnnoucementSetStep = (arg: number) => {
  if (arg > 3 || arg < 0) return;
  createAnnoucementProgessState.set(arg);
};

export const selectedAnnouncementPreference = entity<string>('all');
export const setSelectedAnnoncementPreference = (value: string) => {
  selectedAnnouncementPreference.set(value);
};

export type AnnouncementMedium = 'inApp' | 'email' | 'sms';

export type AnnouncementFormState = {
  title: string;
  message: string;
  classIds: string[];
  channel: AnnouncementMedium;
  expiresAt: string;
};

const defaultAnnouncementForm: AnnouncementFormState = {
  title: '',
  message: '',
  classIds: [],
  channel: 'inApp',
  expiresAt: '',
};

export const announcementFormState = entity<AnnouncementFormState>(
  defaultAnnouncementForm
);

export const updateAnnouncementForm = (
  patch: Partial<AnnouncementFormState>
) => {
  announcementFormState.set((prev) => ({ ...prev, ...patch }));
};

export const resetAnnouncementForm = () => {
  announcementFormState.set(defaultAnnouncementForm);
  selectedAnnouncementPreference.set('all');
  createAnnoucementProgessState.set(0);
};
