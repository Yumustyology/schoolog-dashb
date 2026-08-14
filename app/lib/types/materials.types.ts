export type MaterialType = {
  id?: string;
  type: 'folder' | 'material';
  icon: React.ReactNode;
  name: string;
  size: string;
  date: string;
  folderId?: string;
};

export type FolderType = {
  id: string;
  name: string;
  parentId?: string;
  createdAt: string;
};
