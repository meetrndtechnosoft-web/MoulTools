import { Target, Award, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { value: '25+', label: 'Years Experience', icon: Award },
  { value: '500+', label: 'Projects Delivered', icon: Target },
  { value: '50+', label: 'Global Clients', icon: Globe },
  { value: '200+', label: 'Team Members', icon: Users },
];

export function About() {
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
              About Us
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              We Are <span className="text-gradient">Moul Tools</span>
              <br />Three Decades of Excellence
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              With a global presence and a commitment to excellence, we are dedicated to being 
              your trusted partner every step of the way. From start to finish, we offer 
              end-to-end solutions tailored to your needs.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our reach extends across all continents, ensuring that we can deliver advanced 
              and customized solutions that cater to your unique requirements. As a single-source 
              supplier for multiple industries, including healthcare, packaging and industrial 
              applications, our diverse portfolio and extensive experience make us the reliable choice.
            </p>
            
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              data-testid="link-read-more"
            >
              Learn more about our vision
              <span className="w-6 h-0.5 bg-primary" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
