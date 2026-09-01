import "./globals.css";

export const metadata = {
  metadataBase: new URL("http://localhost:3000"), // 👈 ganti setelah deploy
  title: "Perseus OS",
  description: "Portofolio interaktif bergaya desktop OS retro-anime milik Perseus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
