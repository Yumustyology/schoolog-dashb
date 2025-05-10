import { entity } from "simpler-state";
export const totalNumberSteps = 2;

// initialize state
export const createActivityProgessState = entity(0);

// update state we use the initialization of the state.set(value)
export const createActivityNextStep = () => {
  createActivityProgessState.set((prevStep) =>
    Math.min(prevStep + 1, totalNumberSteps)
  );
};

export const createActivityPreviousStep = () => {
  createActivityProgessState.set((prevStep) => Math.max(prevStep - 1, 0));
};

export const createActivitySetStep = (arg: number) => {
  if (arg > 3 || arg < 0) return;
  createActivityProgessState.set(arg);
};



export const selectedActivityPreference = entity<string>('all');
export const setSelectedActivityPreference = (value: string) => {
  selectedActivityPreference.set(value);
};
