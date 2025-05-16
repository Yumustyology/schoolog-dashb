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
import { AdditionIcon, SubtractionIcon } from '@/components/atoms/icons/Icons';

export function TermAccordion() {
  const terms = useMemo(
    () => [
      { id: 'first-term', label: 'First Term', content: <Term /> },
      { id: 'second-term', label: 'Second Term', content: 's' },
      { id: 'third-term', label: 'Third Term', content: 's' },
    ],
    []
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full mt-5">
      {terms.map((item, index) => (
        <div key={item.id} className="bg-white mb-3">
          <button
            onClick={() => toggleAccordion(index)}
            className={`w-full text-xl py-4 px-6 font-medium transition flex justify-between items-center bg-gray4 text-gray  `}
          >
            <span>{item.label}</span>
            {activeIndex === index ? (
              <SubtractionIcon color=" #1d4241" />
            ) : (
              <AdditionIcon color=" #1d4241" />
            )}
          </button>

          <div
            className={`overflow-hidden transition-all duration-500  ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
              activeIndex === index ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <div className="">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
