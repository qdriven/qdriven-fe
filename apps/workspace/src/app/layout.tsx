import { JetBrains_Mono  } from 'next/font/google'

import "./globals.css";
import {websiteMetaData} from "@/app/config/sites";
import React from "react";
import {draftMode} from "next/headers";

const inter = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});

const metadata = websiteMetaData


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const isDraftMode = draftMode()

    return (
        <html lang="en">
        <body className={inter.className} suppressHydrationWarning>

            {children}

        </body>
        </html>
    );
}
