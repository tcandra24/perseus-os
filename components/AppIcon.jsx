const ICON_MAP = {
  projects: "rocket",
  about: "human",
  skills: "sliders",
  contact: "message-text",
  terminal: "terminal",
};

export default function AppIcon({ appId, size = 20 }) {
  const iconName = ICON_MAP[appId];
  if (!iconName) return null;

  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/icons/${iconName}.svg)`,
        maskImage: `url(/icons/${iconName}.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
