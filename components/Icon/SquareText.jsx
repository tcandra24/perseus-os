export default function SquareText() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 15,
        height: 15,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/square-text.svg)`,
        maskImage: `url(/icons/square-text.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
