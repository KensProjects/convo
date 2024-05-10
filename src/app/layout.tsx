import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast"
import Navbar from "./_components/Layout/Navbar/Navbar";

import { TRPCReactProvider } from "@/trpc/react";
import NextAuthProvider from "./_components/Layout/NextAuthProvider";
import NewPostButton from "./_components/Post/NewPostButton";
import Banner from "./_components/Layout/Banner";
import PageContent from "./_components/Layout/PageContent";
import Suggestions from "./_components/Layout/Suggestions";
import { getServerAuthSession } from "@/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Convo",
  description: "A new way to interact with friends and family!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

const session = await getServerAuthSession()

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NextAuthProvider session={session}>
          <Toaster />
          <TRPCReactProvider>
            <Navbar />
            <div id="app-body" className="flex max-h-max">
              <Banner />
              <PageContent>
                
                {children}
              </PageContent>
              <Suggestions />
            </div>
            <NewPostButton />
          </TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
