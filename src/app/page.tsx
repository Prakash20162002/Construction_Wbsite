import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ExecutionFlow from '@/components/ExecutionFlow';
import StatsStrip from '@/components/StatsStrip';
import FeaturedProjects from '@/components/FeaturedProjects';
import WhyChooseUs from '@/components/WhyChooseUs';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bhandari Enterprise — Industrial Engineering, Steel Fabrication & Construction',
  description: "North India's premier industrial engineering company delivering steel fabrication, structural erection, manufacturing and civil construction for industrial infrastructure projects since 1998.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ExecutionFlow />
      <StatsStrip />
      <FeaturedProjects />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </>
  );
}
