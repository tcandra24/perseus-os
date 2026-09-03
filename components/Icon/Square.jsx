export default function Square() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 13,
        height: 13,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/square.svg)`,
        maskImage: `url(/icons/square.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
