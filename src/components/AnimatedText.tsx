interface AnimatedTextProps {
  text: string;
  delay?: number;
  type?: "fluid" | "simple";
  highlightWords?: string[];
}

export const AnimatedText = ({
  text,
  delay = 0,
  type = "simple",
  highlightWords,
}: AnimatedTextProps) => {
  const words = text.split(" ");

  // Special case for "Make fitness..." to match AppScreenshots container animation
  if (text === "Make fitness the foundation of your social life.") {
    return (
      <span
        style={{
          display: "inline-block", // Ensures it behaves as a block for animation
          opacity: 0,
          animation: `fadeInSimple 1.5s cubic-bezier(0.42, 0, 0.58, 1) ${delay * 1000}ms forwards`,
        }}
      >
        {text}
      </span>
    );
  }

  // Special case for the question/statement
  if (text === "What if fitness was the foundation of your social life?") {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const wordGroups = isMobile
      ? [
          ["Make", "fitness", "the"],
          ["foundation", "of", "your", "social", "life."],
        ]
      : [
          ["What", "if", "fitness", "was"],
          ["the", "foundation", "of", "your", "social", "life?"],
        ];

    let totalWordIndex = 0;

    return (
      <span className="inline-flex flex-wrap justify-center lg:justify-start w-full overflow-hidden">
        {wordGroups.map((group) => (
          <span
            key={totalWordIndex}
            className="flex lg:inline-flex w-full lg:w-auto justify-center lg:justify-start whitespace-nowrap"
          >
            {group.map((word) => {
              const currentWordIndex = totalWordIndex++;
              return (
                <span
                  key={currentWordIndex}
                  className="inline-flex mr-[0.25em] whitespace-nowrap"
                  style={{
                    wordBreak: "keep-all",
                  }}
                >
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={letterIndex}
                      className="inline-block"
                      style={{
                        opacity: 0,
                        animation: `fadeInSimple 3s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay * 1000 + currentWordIndex * 80}ms forwards`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    );
  }

  // Special case for the app description and tagline
  if (
    text ===
      "the kineship app shares your workout calendar with your circles." ||
    text === " while building bonds 💪✨"
  ) {
    return (
      <>
        {words.map((word, wordIndex) => {
          if (word.includes("💪") || word.includes("✨")) {
            return (
              <span
                key={wordIndex}
                className="inline-block mr-[0.25em]"
                style={{
                  opacity: 0,
                  animation:
                    type === "fluid"
                      ? `fadeInFluid 2.5s cubic-bezier(0.42, 0, 0.58, 1) ${delay * 1000 + wordIndex * 100}ms forwards`
                      : `fadeInSimple 1.2s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay * 1000 + wordIndex * 60}ms forwards`,
                }}
              >
                {word}
              </span>
            );
          }
          return (
            <span
              key={wordIndex}
              className="inline-block mr-[0.25em]"
              style={{ wordBreak: "keep-all" }}
            >
              {word.split("").map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className="inline-block"
                  style={{
                    opacity: 0,
                    animation:
                      type === "fluid"
                        ? `fadeInFluid 2.5s cubic-bezier(0.42, 0, 0.58, 1) ${delay * 1000 + wordIndex * 100 + letterIndex * 20}ms forwards`
                        : `fadeInSimple 1.2s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay * 1000 + wordIndex * 60 + letterIndex * 12}ms forwards`,
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
            animation: `fadeInSimple 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay * 1000}ms forwards`,
            color: highlightWords?.includes(word) ? "white" : "inherit",
          }}
        >
          {word}
          {wordIndex !== words.length - 1 && " "}
        </span>
      ))}
    </>
  );
};
