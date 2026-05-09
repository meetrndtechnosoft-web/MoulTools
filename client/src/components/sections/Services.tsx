import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';

export function Services() {
  const { adminData } = useAdmin();
  const { services: servicesData } = adminData;

  return (
    <section id="services" className="py-24 bg-gradient-industrial text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            {servicesData.subtitle}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            {servicesData.title.split(' ').map((word, i, arr) => {
              if (i === arr.length - 1) return <span key={i} className="text-primary">{word}</span>;
              return word + ' ';
            })}
          </h2>
          <p className="text-white/70 text-lg">
            {servicesData.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.items.map((service, index) => {
            const IconComponent = (Icons as any)[service.iconName] || Icons.Cog;
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 p-6"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <IconComponent className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-3">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature.id} className="flex items-center gap-2 text-sm text-white/50">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature.text}
                  </li>
                ))}
              </ul>
              
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link"
                data-testid={`link-service-${service.title.toLowerCase().replace(' ', '-')}`}
              >
                Learn More
                <Icons.ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
