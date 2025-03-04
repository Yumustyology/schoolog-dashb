'use client';
import React, { useEffect, useState } from 'react';

const SettingCardBg = () => {
  const [bubbles, setBubbles] = useState<any>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const bubbleArray = [];
      const count = 8;

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 30 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 4 + 5;

        bubbleArray.push({
          size,
          left,
          top,
          duration,
        });
      }

      return bubbleArray;
    };

    setBubbles(generateBubbles());
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#21B55A] to-[#0E4F27] h-[110px] w-full">
      {bubbles.map((bubble: any, index: number) => (
        <div
          key={index}
          className="absolute bg-[#E9EAEE] rounded-full opacity-20 animate-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            animationDuration: `${bubble.duration}s`,
          }}
        ></div>
      ))}
      <style jsx>{`
        @keyframes bubble {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(20px, -20px);
          }
          50% {
            transform: translate(-20px, -40px);
          }
          75% {
            transform: translate(-40px, 20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .animate-bubble {
          animation: bubble ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SettingCardBg;
