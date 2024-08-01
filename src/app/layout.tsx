import { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google"
import "./globals.css";

import Navbar from "@/components/sections/Navbar";
import Sidebar from "@/components/sections/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <html lang="en">
        <body className={`${inter.className} bg-background`}>
          <Navbar />
          <main className="flex gap-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>
            <div className="mt-4 flex-1 flex flex-col gap-10 overflow-auto h-[88vh] videos">
              {children}
            </div>
          </main>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
