export default function Github() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 13,
        height: 13,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/github.svg)`,
        maskImage: `url(/icons/github.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
