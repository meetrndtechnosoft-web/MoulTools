import { Zap, Shield, Clock, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Zap,
    title: 'Speed & Efficiency',
    description: 'Fast turnaround times without compromising quality. We deliver on time, every time.',
  },
  {
    icon: Shield,
    title: 'World-Class Quality',
    description: 'ISO certified processes and rigorous quality control ensure excellence in every product.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Reliable project management and production scheduling to meet your deadlines.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team available around the clock to address your needs.',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              The <span className="text-gradient">Moul Tools</span> Promise
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We offer the ideal combination of speed, cost efficiency, and world-class 
              quality. Our commitment to excellence drives everything we do.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-primary rounded-full" />
                ISO 9001 Certified
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-primary rounded-full" />
                ISO 13485 Certified
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Global Presence
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
