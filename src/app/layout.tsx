import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workout Tracker",
  description: "Own your impact, track workouts with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-start p-4">
          <header className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg text-center">
            <h1 className="text-4xl font-bold">Workout Tracker</h1>
          </header>
          <main className="w-full max-w-3xl mt-4 bg-white p-6 shadow-md rounded-lg">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
