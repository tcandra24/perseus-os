export default function Close() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 15,
        height: 15,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/close.svg)`,
        maskImage: `url(/icons/close.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
