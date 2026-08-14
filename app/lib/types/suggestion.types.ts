export type SuggestionType = {
  id: number;
  title: string;
  content: string;
  category?: 'Parents' | 'Teachers' | 'Students';
  date?: string;
};
