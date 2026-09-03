export default function Minus() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 13,
        height: 13,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/minus.svg)`,
        maskImage: `url(/icons/minus.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
