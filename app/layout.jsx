import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata = {
  metadataBase: new URL("https://perseus-os.vercel.app"),
  title: "Perseus OS",
  description: "Portofolio interaktif bergaya desktop OS retro-anime milik Perseus.",
};

export const viewport = {
  themeColor: "#0a1230",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}
