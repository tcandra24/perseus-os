export default function ChevronRight() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 15,
        height: 15,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/chevron-right.svg)`,
        maskImage: `url(/icons/chevron-right.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
