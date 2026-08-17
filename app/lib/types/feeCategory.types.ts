export type FeeCategory = {
  _id: string;
  name: string;
  amount: number;
  currency: string;
  classGradeIds: { _id: string; name: string; level?: number }[] | string[];
};
