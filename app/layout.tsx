import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const cairo = Cairo({
    variable: "--font-cairo",
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "ElKhial Estate",
    description: "Find your dream property",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // قراءة اللغة من الكوكيز بأمان (متوافق مع Next.js 14 و 15)
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value || "en";
    const isRTL = locale === "ar";

    return (
        <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
            <body
                className={`min-h-screen bg-gray-50 ${geistSans.variable} ${geistMono.variable} ${cairo.variable}`}
                style={{ 
                    fontFamily: isRTL ? "var(--font-cairo), sans-serif" : "var(--font-geist-sans), sans-serif" 
                }}
            >
                <LanguageProvider>
                    <AuthProvider>
                        <Navbar />
                        {children}
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
