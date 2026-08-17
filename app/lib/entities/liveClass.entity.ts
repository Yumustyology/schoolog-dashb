import { entity } from 'simpler-state';

// Create Live Class Modal
export const isCreateLiveClassOpen = entity(false);

export const openCreateLiveClassModal = () => {
  isCreateLiveClassOpen.set(true);
};

export const closeCreateLiveClassModal = () => {
  isCreateLiveClassOpen.set(false);
};

// Active Live Class Room (the ID of the class currently being joined, or null)
export const activeLiveClassId = entity<string | null>(null);

export const openLiveClassRoom = (id: string) => {
  activeLiveClassId.set(id);
};

export const closeLiveClassRoom = () => {
  activeLiveClassId.set(null);
};
