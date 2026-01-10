import { Shield, CheckCircle, Award, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import qualityImage from '@assets/generated_images/quality_control_inspection.png';

const qualityFeatures = [
  {
    icon: CheckCircle,
    title: 'Dimensional Inspection',
    description: 'Every component undergoes rigorous dimensional checks using precision measuring instruments.',
  },
  {
    icon: FileCheck,
    title: 'Assembly Validation',
    description: 'Complete assembly validation to ensure perfect fit and function before delivery.',
  },
  {
    icon: Award,
    title: 'Trial Runs',
    description: 'Comprehensive trial runs to verify mould performance and product quality.',
  },
  {
    icon: Shield,
    title: 'ISO Standards',
    description: 'Adherence to ISO-quality processes and client-specific quality benchmarks.',
  },
];

export function Quality() {
  return (
    <section id="quality" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Quality Assurance
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Committed to <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Quality is at the heart of everything we do. Every component undergoes 
              dimensional inspection, assembly validation, and trial runs to ensure 
              it meets the highest standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {qualityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={qualityImage}
                alt="Quality control inspection"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">ISO</div>
                  <div className="text-muted-foreground text-sm">Certified Processes</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
