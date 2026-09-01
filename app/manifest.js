export default function manifest() {
  return {
    name: "Perseus — Portfolio OS",
    short_name: "Perseus OS",
    description: "Portofolio interaktif bergaya desktop OS retro-anime milik Perseus.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1230",
    theme_color: "#0a1230",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
