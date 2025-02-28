// components/Home.tsx or app/page.tsx
"use client";
import React from "react";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import FeaturedBanner from "./components/FeaturedBanner";
import Categories from "./components/Categories";
import TrendingShoes from "./components/TrendingShoes";
import Footer from "./components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="overflow-y-auto">
        <HeroCarousel />
        <Categories />
        <FeaturedBanner />
        <TrendingShoes />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
