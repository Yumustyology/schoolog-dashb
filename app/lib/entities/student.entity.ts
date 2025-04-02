import { entity } from 'simpler-state';

export const studentFilterModal = entity(false);

export const OpenStudentFilterModal = () => {
  studentFilterModal.set(true);
};

export const closeStudentFilterModal = () => {
  studentFilterModal.set(false);
};

//Select Filter Type
export const selectedFilterType = entity<string>("all");
export const setSelecedFilterType = (value: string) => {
  selectedFilterType.set(value);
};


//Graduate Modal
export const graduateModal = entity(false);

export const OpenGraduateModal = () => {
  graduateModal.set(true);
};

export const closeGraduateModal = () => {
  graduateModal.set(false);
};


export const selectedGraduateType = entity<string>("wholeClass");
export const setSelectedGraduateType = (value: string) => {
  selectedGraduateType.set(value);
};


//Promte Modal
export const promoteModal = entity(false);

export const OpenPromoteModal = () => {
  promoteModal.set(true);
};

export const closePromoteModal = () => {
  promoteModal.set(false);
};


export const selectedPromoteType = entity<string>("wholeClass");
export const setSelectedPromoteType = (value: string) => {
  selectedPromoteType.set(value);
};


//Demote Modal
export const demoteModal = entity(false);

export const OpenDemoteModal = () => {
  demoteModal.set(true);
};

export const closeDemoteModal = () => {
  demoteModal.set(false);
};


export const selectedDemoteType = entity<string>("wholeClass");
export const setSelectedDemoteType = (value: string) => {
  selectedDemoteType.set(value);
};
