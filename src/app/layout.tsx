import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
/* তুমি চাইলে নিচের ফাইলকে project-global CSS এ যুক্ত করতে পারো */


import NavigationBar from "./components/layout/NavigationBar";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "Forgotten Scientists",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased relative"
      >
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
