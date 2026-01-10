import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Solutions } from '@/components/sections/Solutions';
import { Industries } from '@/components/sections/Industries';
import { Features } from '@/components/sections/Features';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Solutions />
        <Industries />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
