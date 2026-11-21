import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedJobs from '../components/home/FeaturedJobs';
import TopCompanies from '../components/home/TopCompanies';
import StatsSection from '../components/home/StatsSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaBanner from '../components/home/CtaBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturedJobs />
      <TopCompanies />
      <StatsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaBanner />
    </div>
  );
}
