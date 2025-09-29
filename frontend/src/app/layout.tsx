import type { Metadata } from "next";
import "./globals.css";

import NavigationBar from "./components/layout/NavigationBar";

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
      </body>
    </html>
  );
}
