import { Target, Award, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Moulds Delivered', icon: Award },
  { value: '98%', label: 'On-Time Delivery', icon: Clock },
  { value: 'OEM', label: 'Tier-1 Partners', icon: Target },
  { value: '25+', label: 'Years Experience', icon: Users },
];

const strengths = [
  'Advanced CAD/CAM design expertise',
  'Experienced technical team',
  'In-house Wirecut, VMC, and EDM setup',
  'Proven process control and documentation',
  'Quick turnaround and reliable after-sales support',
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
              We Are <span className="text-gradient">Moul Tool Systems</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founded with a vision to bring precision and reliability to the tooling industry, 
              Moul Tool Systems has steadily grown into a trusted name in mould manufacturing. 
              From humble beginnings, we have expanded our infrastructure, team, and technology 
              to serve clients across multiple sectors.
            </p>
            
            <div className="bg-muted/50 p-6 rounded-2xl mb-6">
              <h3 className="font-display font-bold text-lg mb-4">Our Vision</h3>
              <p className="text-muted-foreground mb-4">
                To be a globally recognized partner for precision tooling and mould solutions.
              </p>
              <h3 className="font-display font-bold text-lg mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To deliver innovative, high-quality tools that empower our clients to manufacture with excellence.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Key Strengths:</h4>
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{strength}</span>
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
