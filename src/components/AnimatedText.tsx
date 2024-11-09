import React from 'react';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  type?: 'fluid' | 'simple';
}

export const AnimatedText = ({ text, delay = 0, type = 'simple' }: AnimatedTextProps) => {
  // First split into words, then handle emojis separately
  const words = text.split(' ');
  
  return (
    <>
      {words.map((word, wordIndex) => {
        // Check if the word contains emojis
        if (word.includes('💪') || word.includes('✨')) {
          return (
            <span
              key={wordIndex}
              className="inline-block mr-[0.25em]"
              style={{
                opacity: 0,
                animation: type === 'fluid' 
                  ? `fadeInFluid 3s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 150)}ms forwards`
                  : `fadeInSimple 2.8s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 120)}ms forwards`
              }}
            >
              {word}
            </span>
          );
        }
        
        // Handle regular words letter by letter
        return (
          <span key={wordIndex} className="inline-block mr-[0.25em]" style={{ wordBreak: 'keep-all' }}>
            {word.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="inline-block"
                style={{
                  opacity: 0,
                  animation: type === 'fluid' 
                    ? `fadeInFluid 3s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 150) + (letterIndex * 35)}ms forwards`
                    : `fadeInSimple 2.8s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 120) + (letterIndex * 30)}ms forwards`
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
};
