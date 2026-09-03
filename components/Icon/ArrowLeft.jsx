export default function ArrowLeft() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 15,
        height: 15,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/arrow-left.svg)`,
        maskImage: `url(/icons/arrow-left.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
