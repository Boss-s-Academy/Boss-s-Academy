import type { Metadata } from "next";
import { Inter, Roboto_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-pacifico',
});

const geistSans = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Roboto_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Boss's Academy",
    description: "Boss's Academy Website",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                {/* Fallback favicon for full compatibility */}
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}

