import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import moldImage from '@assets/generated_images/precision_injection_mold_tool.png';
import automationImage from '@assets/generated_images/industrial_automation_robotics.png';
import qualityImage from '@assets/generated_images/quality_control_inspection.png';

const solutions = [
  {
    title: 'Precision Molds',
    description: 'High-quality injection molds designed for healthcare, packaging, and industrial applications with exceptional precision and durability.',
    image: moldImage,
    features: ['High-cavity molds', 'Multi-component molds', 'Hot runner systems'],
  },
  {
    title: 'Automation Systems',
    description: 'Complete automation solutions including robotic handling, assembly lines, and smart manufacturing systems for enhanced productivity.',
    image: automationImage,
    features: ['Robotic integration', 'Assembly automation', 'Vision systems'],
  },
  {
    title: 'Quality Assurance',
    description: 'Comprehensive quality control and inspection services ensuring every product meets the highest industry standards.',
    image: qualityImage,
    features: ['CMM inspection', 'Process validation', 'Documentation'],
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-gradient-industrial text-white relative overflow-hidden">
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
            Our Solutions
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            Get to Know Our <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-white/70 text-lg">
            With the collective expertise of our team, we continuously strive to develop 
            innovative solutions for your manufacturing needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold">{solution.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-white/70 mb-4 line-clamp-3">
                  {solution.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-semibold group/link"
                  data-testid={`link-solution-${solution.title.toLowerCase().replace(' ', '-')}`}
                >
                  Learn More
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
