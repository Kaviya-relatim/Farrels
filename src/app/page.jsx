// @ts-nocheck
import Hero from "@/components/home/Hero";
import FeaturedCars from "@/components/home/FeaturedCars";
import Welcome from "@/components/home/Welcome";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900">
      <Hero />
      
      <FeaturedCars />
      
      <Welcome />
      
      <Services />
      
      <Testimonials />
    </main>
  );
}
