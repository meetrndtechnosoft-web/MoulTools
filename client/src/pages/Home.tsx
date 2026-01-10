import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Products } from '@/components/sections/Products';
import { Industries } from '@/components/sections/Industries';
import { Manufacturing } from '@/components/sections/Manufacturing';
import { Quality } from '@/components/sections/Quality';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Products />
        <Industries />
        <Manufacturing />
        <Quality />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
