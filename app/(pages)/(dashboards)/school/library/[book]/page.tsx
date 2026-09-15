import React from 'react';
import { BookInfoPage } from './BookInfoPage';

const page = ({ params }: { params: { book: string } }) => {
  return <BookInfoPage bookId={params.book} />;
};
export default page;
