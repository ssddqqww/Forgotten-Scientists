import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";



import NavigationBar from "./components/layout/NavigationBar";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "Forgotten Scientists",
  description: "Discover overlooked scientists, discoveries, and stories from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative overflow-x-hidden bg-white text-black antialiased"
      >
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
