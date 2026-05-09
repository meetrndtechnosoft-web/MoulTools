import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';

export function Products() {
  const { adminData } = useAdmin();
  const { products } = adminData;

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
            {products.subtitle}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            {products.title.split(' ').map((word, i, arr) => {
              if (i === arr.length - 1 || i === arr.length - 2) return <span key={i} className="text-gradient">{word} </span>;
              return word + ' ';
            })}
          </h2>
          <p className="text-muted-foreground text-lg">
            {products.description}
          </p>
        </motion.div>

        <div className="space-y-8">
          {products.categories.map((category, categoryIndex) => {
            const IconComponent = (Icons as any)[category.iconName] || Icons.Box;
            return (
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
                  <IconComponent className={`w-6 h-6 ${category.color}`} />
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
          )})}
        </div>
      </div>
    </section>
  );
}
