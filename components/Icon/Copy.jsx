export default function Copy() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 13,
        height: 13,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/copy.svg)`,
        maskImage: `url(/icons/copy.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
