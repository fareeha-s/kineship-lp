interface FastAnimatedTextProps {
  text: string;
  delay?: number;
}

export const FastAnimatedText = ({
  text,
  delay = 6,
}: FastAnimatedTextProps) => {
  return (
    <>
      {text.split("").map((letter, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: 0,
            animation: `fadeInSimple 2s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay * 1000 + i * 15}ms forwards`,
          }}
        >
          {letter === "/" ? "\u00A0" : letter}
        </span>
      ))}
    </>
  );
};
