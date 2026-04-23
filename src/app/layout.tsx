import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";



import NavigationBar from "./components/layout/NavigationBar";
import Footer from "./components/layout/Footer";
import SmoothScrollHandler from "./components/layout/SmoothScrollHandler";

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
        <SmoothScrollHandler />
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
