import React from 'react'
import { BookInfoPage } from './BookInfoPage';

export async function generateStaticParams() {
    const books = ['math', 'science', 'history', 'english'];
  
    return books.map((book) => ({
      book, // Must match the dynamic segment `[student]`
    }));
  }
const page = ({params}: {params :{book: string}}) => {
  return (
    <BookInfoPage book={params.book}/>
  )
}
export default page
