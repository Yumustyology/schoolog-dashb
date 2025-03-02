// import React from 'react
// function CurriculumDetails() {
//   return (
//     <div>CurriculumDetails</div>
//   )
// }

// export default CurriculumDetails

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import Term from './Term';

// const terms = [
//   { id: "first-term", label: "First Term", content: <Term/> },
//   { id: "second-term", label: "Second Term", content: 's' },
//   { id: "third-term", label: "Third Term", content: 's' },
// ];

// export function TermAccordion() {
//   return (
//     <Accordion type="single" collapsible className="w-full mt-5">
//       {terms.map((term) => (
//         <AccordionItem key={term.id} value={term.id} >
//           <AccordionTrigger className='bg-light p-2 hover:no-underline text-xl text-primary'>{term.label}</AccordionTrigger>
//           <AccordionContent>{term.content}</AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
//   );
// }

import React, { useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Term from './Term';

export function TermAccordion() {
  const terms = useMemo(
    () => [
      { id: 'first-term', label: 'First Term', content: <Term /> },
      { id: 'second-term', label: 'Second Term', content: 's' },
      { id: 'third-term', label: 'Third Term', content: 's' },
    ],
    []
  );

  return (
    <Accordion type="single" collapsible className="w-full mt-5">
      {terms.map((term) => (
        <AccordionItem key={term.id} value={term.id}>
          <AccordionTrigger className="bg-light p-2 hover:no-underline text-xl text-primary">
            {term.label}
          </AccordionTrigger>
          <AccordionContent>{term.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
