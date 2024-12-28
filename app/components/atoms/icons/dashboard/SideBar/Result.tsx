import React from 'react'

function Result({
    color = '#828282',
    size = '20',
  }: {
    color?: string;
    size?: string;
  }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83333 10C2.5 10 2.5 11.4917 2.5 13.3333V14.1667C2.5 16.4667 2.5 18.3333 6.66667 18.3333H13.3333C16.6667 18.3333 17.5 16.4667 17.5 14.1667V13.3333C17.5 11.4917 17.5 10 14.1667 10C13.3333 10 13.1 10.175 12.6667 10.5L11.8167 11.4C10.8333 12.45 9.16667 12.45 8.175 11.4L7.33333 10.5C6.9 10.175 6.66667 10 5.83333 10Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.8332 9.99935V4.99935C15.8332 3.15768 15.8332 1.66602 12.4998 1.66602H7.49984C4.1665 1.66602 4.1665 3.15768 4.1665 4.99935V9.99935" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.7915 7.69141H11.5665" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.1001 5.19141H12.2668" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default Result