import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';

export function Hero() {
  const { adminData } = useAdmin();
  const { hero } = adminData;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero.backgroundImage}
          alt="Precision mould manufacturing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Precision Engineering Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {hero.title.split(' ').map((word, i, arr) => {
              if (i === arr.length - 1) return <span key={i} className="text-gradient">{word}</span>;
              return word + ' ';
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={hero.buttonLink}
              className="inline-flex items-center justify-center gap-2 bg-gradient-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/25 group"
              data-testid="button-explore-services"
            >
              {hero.buttonText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/#about"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
              data-testid="button-learn-more"
            >
              <Play className="w-5 h-5" />
              Learn More
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
