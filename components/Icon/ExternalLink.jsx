export default function ExternalLink() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 15,
        height: 15,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/external-link.svg)`,
        maskImage: `url(/icons/external-link.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
