import { motion } from 'framer-motion';
import { Box, Cpu, Settings } from 'lucide-react';

const productCategories = [
  {
    icon: Box,
    title: 'Injection Moulds',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    products: [
      { name: 'Hand Injection Mould', application: 'Prototype & Sampling' },
      { name: 'Single Cavity Prototype Mould', application: 'Product Development' },
      { name: 'Multi Cavity Cold Runner Mould', application: 'General Production' },
      { name: 'Hot Runner Mould (Semi/Fully Hot)', application: 'High Volume Production' },
      { name: 'Valve Gate Type Mould', application: 'Pharma & Precision Components' },
      { name: 'Unscrewing Mould', application: 'Threaded Parts, Caps, Closures' },
      { name: 'In-Mould Closing Mould', application: 'Pharma & Consumer Closures' },
      { name: 'Overmoulding / Insert Mould', application: 'Metal + Plastic Components' },
      { name: 'Thin Wall Mould', application: 'Packaging, Disposable Containers' },
      { name: 'Micro Precision Mould', application: 'Medical, Electronics Components' },
    ],
  },
  {
    icon: Settings,
    title: 'Precision Tooling & Components',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    products: [
      { name: 'Core & Cavity Inserts', application: 'Custom Mould Parts' },
      { name: 'Electrode Manufacturing', application: 'EDM Applications' },
      { name: 'Mould Base Manufacturing', application: 'Injection & Die Mould Base' },
      { name: 'Ejector Pins / Sleeves / Lifters', application: 'Toolroom Components' },
      { name: 'Custom Fixtures', application: 'Assembly & Testing Fixtures' },
    ],
  },
  {
    icon: Cpu,
    title: 'Engineering Services',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    products: [
      { name: '3D CAD Design & Modelling', application: 'Design & Product Development' },
      { name: 'CAM Programming', application: 'Machining & Simulation' },
      { name: 'Prototype Trials & Testing', application: 'Trial & Validation' },
      { name: 'Mould Maintenance & Refurbishment', application: 'After-Sales Service' },
    ],
  },
];

export function Products() {
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
            Our Products
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            Complete <span className="text-gradient">Product Range</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From prototype moulds to high-volume production tooling, we offer comprehensive 
            solutions for all your manufacturing needs.
          </p>
        </motion.div>

        <div className="space-y-8">
          {productCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center gap-4">
                <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="font-display text-2xl font-bold">{category.title}</h3>
              </div>
              
              <div className="p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.products.map((product, productIndex) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: productIndex * 0.05 }}
                      className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                    >
                      <h4 className="font-semibold text-foreground mb-1">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.application}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
