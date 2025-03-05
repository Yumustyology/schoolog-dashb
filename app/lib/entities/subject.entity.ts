import { entity } from 'simpler-state';

export const TOTAL_STEPS = 3;

// initialize state
export const createSubjectProgressState = entity(0);

// update state we use the initialization of the state.set(value)
export const createSubjectNextStep = () => {
  createSubjectProgressState.set((prevStep) =>
    Math.min(prevStep + 1, TOTAL_STEPS)
  );
};

export const createSubjectPreviousStep = () => {
  createSubjectProgressState.set((prevStep) => Math.max(prevStep - 1, 0));
};

export const createSubjectSetStep = (arg: number) => {
  if (arg > 3 || arg < 0) return;
  createSubjectProgressState.set(arg);
};
