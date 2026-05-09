import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';

export function About() {
  const { adminData } = useAdmin();
  const { about } = adminData;

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              {about.subtitle}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              {about.title.split(' ').map((word, i, arr) => {
                if (i === arr.length - 1) return <span key={i} className="text-gradient">{word}</span>;
                if (i === arr.length - 2) return <span key={i} className="text-gradient">{word} </span>;
                return word + ' ';
              })}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {about.description}
            </p>
            
            <div className="bg-muted/50 p-6 rounded-2xl mb-6">
              <h3 className="font-display font-bold text-lg mb-4">Our Vision</h3>
              <p className="text-muted-foreground mb-4">
                {about.vision}
              </p>
              <h3 className="font-display font-bold text-lg mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                {about.mission}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Key Strengths:</h4>
              {about.strengths.map((strength) => (
                <div key={strength.id} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{strength.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {about.stats.map((stat, index) => {
              const IconComponent = (Icons as any)[stat.iconName] || Icons.Award;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-display text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
