
"use client";

import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import HeroSection from "@/components/frontend/HomePages/HeroSection";
import HeroProducts from "@/components/frontend/HomePages/HeroProducts";
import HeroRecommendedProducts from "@/components/frontend/HomePages/HeroRecommendedProducts";
import HeroParticularProducts from "@/components/frontend/HomePages/HeroParticularProducts";
import ContactUS from "@/components/frontend/ContactUS";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="">
        {/* Hero Section */}
        <HeroSection />

        {/* Dynamic Products Highlights (Fetched from DB) */}
        <HeroProducts />

        {/* Featured / Particular Category Section */}
        <HeroParticularProducts />
        {/* Recommended Section */}
        <HeroRecommendedProducts />

        <ContactUS />
      </main>

      <Footer />
    </div>
  );
}

