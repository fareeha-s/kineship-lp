import React from 'react';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  type?: 'fluid' | 'simple';
  highlightWords?: string[];
}

export const AnimatedText = ({ text, delay = 0, type = 'simple', highlightWords }: AnimatedTextProps) => {
  const words = text.split(' ');
  
  // Special case for the question - now gets letter by letter style
  if (text === "What if fitness was the foundation of your social life?") {
    return (
      <span className="inline-flex flex-wrap justify-center lg:justify-start w-full">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex mr-[0.25em] whitespace-nowrap" style={{ wordBreak: 'keep-all' }}>
            {word.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="inline-block"
                style={{
                  opacity: 0,
                  letterSpacing: '0.01em',
                  animation: type === 'fluid' 
                    ? `fadeInFluid 6s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 120) + (letterIndex * 25)}ms forwards`
                    : `fadeInSimple 6s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 120) + (letterIndex * 25)}ms forwards`
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    );
  }
  
  // Special case for the app description and tagline
  if (text === "the kineship app shares your workout calendar with your circles." || 
      text === "build muscle while building bonds 💪✨") {
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
                    ? `fadeInFluid 4s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 120)}ms forwards`
                    : `fadeInSimple 4s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 100)}ms forwards`
                }}
              >
                {word}
              </span>
            );
          }
          
          // Regular words get letter by letter
          return (
            <span key={wordIndex} className="inline-block mr-[0.25em]" style={{ wordBreak: 'keep-all' }}>
              {word.split('').map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className="inline-block"
                  style={{
                    opacity: 0,
                    animation: type === 'fluid' 
                      ? `fadeInFluid 2.4s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 120) + (letterIndex * 25)}ms forwards`
                      : `fadeInSimple 2.2s cubic-bezier(0.2, 0.6, 0.2, 1) ${(delay * 1000) + (wordIndex * 100) + (letterIndex * 20)}ms forwards`
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
  }
  
  // Regular content - now gets the simple fade
  return (
    <>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{
            opacity: 0,
            animation: `fadeInSimple 3s cubic-bezier(0.4, 0, 0.2, 1) ${delay * 1000}ms forwards`,
            color: highlightWords?.includes(word) ? 'white' : 'inherit'
          }}
        >
          {word}
          {wordIndex !== words.length - 1 && ' '}
        </span>
      ))}
    </>
  );
};
