// import React, { useState } from 'react';
// import Button from '../../atoms/form/Button';
// import { Inter_400 } from '@/app/lib/config/font.config';
// import { cn } from '@/lib/utils';

// function YesNoQuestion() {
//     const [answer, setAnswer] = useState<string | null>(null);

//     const handleAnswer = (response: string) => {
//         setAnswer(response);
//     };

//     return (
//         <div>
//             <h2 className={cn('text-[16px] text-gray1 my-4', Inter_400.className)}>Do you like coding?</h2>

//             <div className="flex gap-4">

//                 <Button
//                     round
//                     onClick={() => handleAnswer('No')}
//                     className="px-6 py-2 bg-[#f4f4f4] text-gray flex justify-center items-center gap-1"
//                 >
//                     <div>
//                         <OptionBox />
//                     </div>
//                     <p>
//                         No
//                     </p>
//                 </Button>

//                 <Button
//                     round
//                     onClick={() => handleAnswer('No')}
//                     className="px-6 py-2 bg-primary text-white flex justify-center items-center gap-1"
//                 >
//                     <div>
//                         <ChoosedOptionBox />
//                     </div>
//                     <p>
//                         Yes
//                     </p>
//                 </Button>

//             </div>

//         </div>
//     );
// }

// export default YesNoQuestion;



// function OptionBox() {
//     return (
//         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#828282" />
//         </svg>

//     )
// }


// function ChoosedOptionBox() {
//     return (
//         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="white" />
//             <circle cx="9" cy="9" r="5" fill="white" />
//         </svg>

//     )
// }



import React, { useState } from 'react';
import Button from '../../atoms/form/Button';
import { Inter_400 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';

function YesNoQuestion() {
    const [answer, setAnswer] = useState<string | null>(null);

    const handleAnswer = (response: string) => {
        setAnswer(response);
    };

    return (
        <div>
            <h2 className={cn('text-[16px] text-gray1 my-4', Inter_400.className)}>Do you like coding?</h2>

            <div className="flex gap-4">
                {/* No Button */}
                <Button
                    round
                    onClick={() => handleAnswer('No')}
                    className={cn(
                        'px-6 py-2 text-gray flex justify-center items-center gap-1',
                        answer === 'No' ? 'bg-green-500 text-white' : 'bg-[#f4f4f4]'
                    )}
                >
                    <div>
                        <OptionBox />
                    </div>
                    <p>No</p>
                </Button>

                {/* Yes Button */}
                <Button
                    round
                    onClick={() => handleAnswer('Yes')}
                    className={cn(
                        'px-6 py-2 flex justify-center items-center gap-1',
                        answer === 'Yes' ? 'bg-green-500 text-white' : 'bg-primary text-white'
                    )}
                >
                    <div>
                        <ChoosedOptionBox />
                    </div>
                    <p>Yes</p>
                </Button>
            </div>

            {/* Display the selected answer */}
            {answer && (
                <div className="mt-4 text-gray-600">
                    <p>Your answer: <span className="font-bold">{answer}</span></p>
                </div>
            )}
        </div>
    );
}

export default YesNoQuestion;

function OptionBox() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#828282" />
        </svg>
    );
}

function ChoosedOptionBox() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="white" />
            <circle cx="9" cy="9" r="5" fill="white" />
        </svg>
    );
}
