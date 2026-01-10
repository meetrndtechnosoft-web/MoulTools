import { Heart, Package, Factory, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const industries = [
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Precision medical components, syringes, diagnostic devices, and pharmaceutical packaging solutions.',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
  {
    icon: Package,
    title: 'Packaging',
    description: 'Caps, closures, thin-wall containers, and sustainable packaging solutions for consumer goods.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Factory,
    title: 'Industrial',
    description: 'Automotive components, electrical housings, and industrial-grade plastic parts for demanding applications.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Wrench,
    title: 'Custom Solutions',
    description: 'Tailored tooling and manufacturing solutions designed specifically for your unique requirements.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
];

export function Industries() {
  return (
    <section id="products" className="py-24 bg-muted/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Industries We Serve
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            Serving <span className="text-gradient">Multiple</span> Industries
          </h2>
          <p className="text-muted-foreground text-lg">
            Our diverse portfolio and extensive experience make us the reliable choice 
            across various manufacturing sectors.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${industry.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <industry.icon className={`w-7 h-7 ${industry.color}`} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{industry.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
