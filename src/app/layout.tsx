import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CookFlow AI – Smart Cooking To-Do Assistant",
  description: "AI-powered meal planning, automated grocery lists, budget feasibility analysis, and interactive cooking checklists tailored to your busy schedule.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
