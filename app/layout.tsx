import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sorting Algorithm Visualizer",
  description: "Visualize sorting and Learn Faster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <Toaster></Toaster>
        <main className="flex flex-col lg:flex-row">
          <Topbar></Topbar>
          <div className="lg:block hidden">
            <Sidebar></Sidebar>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
