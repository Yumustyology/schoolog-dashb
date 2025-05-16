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
