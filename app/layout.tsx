import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vijay Electronics",
  description: "Vijay Electronics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/admin/dashboard"
      afterSignUpUrl="/admin/dashboard"
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F0ECE4]`}>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  {children}
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
