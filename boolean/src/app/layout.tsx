import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./sidebar/sidebar";

export const metadata: Metadata = {
  title: "Boolean",
  description: "This a project from Ayush Shashi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar/>
        {children}
      </body>
    </html>
  );
}
