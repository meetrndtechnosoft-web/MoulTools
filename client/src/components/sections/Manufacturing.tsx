import { Factory, Cpu, Users, Leaf, Wrench, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    icon: Factory,
    title: 'Infrastructure & Facilities',
    description: 'Fully equipped tool room with CNC, VMC, Wirecut, EDM, and polishing sections.',
  },
  {
    icon: Wrench,
    title: 'Machinery & Equipment',
    description: 'High-speed VMCs, precision EDMs, wire-cut machines, grinders, and measuring instruments.',
  },
  {
    icon: Gauge,
    title: 'Production Capacity',
    description: 'Capable of producing multiple medium-to-large moulds monthly with high repeat accuracy.',
  },
  {
    icon: Cpu,
    title: 'Technology & Innovation',
    description: 'Integrated CAD/CAM workflow with continuous upgrades in software and machinery.',
  },
  {
    icon: Users,
    title: 'Skilled Workforce',
    description: 'Team of qualified tool makers, machinists, and designers with hands-on industry experience.',
  },
  {
    icon: Leaf,
    title: 'Sustainability & Safety',
    description: 'Safe work practices and sustainable manufacturing methods to reduce waste and improve efficiency.',
  },
];

export function Manufacturing() {
  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Manufacturing Capability
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            State-of-the-Art <span className="text-gradient">Facilities</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our modern infrastructure and skilled workforce enable us to deliver 
            precision tooling solutions with exceptional quality and efficiency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <capability.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{capability.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
