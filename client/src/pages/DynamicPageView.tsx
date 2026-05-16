import { useRoute } from "wouter";
import { useAdmin } from "@/contexts/AdminContext";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function DynamicPageView() {
  const [, params] = useRoute("/pages/:slug");
  const { dynamicPages } = useAdmin();
  
  const page = dynamicPages.find(p => p.slug === params?.slug && p.published);

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground">The page you're looking for doesn't exist or is not published yet.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const renderIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Box;
    return <Icon className="w-6 h-6 text-primary" />;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        {page.heroImage && (
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 flex items-center justify-center min-h-[50vh]">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={page.heroImage} 
                alt={page.title} 
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-background"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
              >
                {page.title}
              </motion.h1>
            </div>
          </section>
        )}

        {/* Content Section */}
        {page.content && (
          <section className="py-16 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br/>') }} />
            </div>
          </section>
        )}

        {/* Dynamic Sections based on layout */}
        {page.sections?.map((section, index) => {
          
          if (section.type === 'text') {
            return (
              <section key={section.id} className={`py-16 ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  {section.title && <h2 className="font-display text-3xl font-bold mb-6">{section.title}</h2>}
                  {section.content && <p className="text-muted-foreground text-lg">{section.content}</p>}
                </div>
              </section>
            );
          }

          if (section.type === 'image') {
            const isReversed = index % 2 !== 0;
            return (
              <section key={section.id} className="py-20 bg-background overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      {section.title && <h2 className="font-display text-3xl font-bold mb-6">{section.title}</h2>}
                      {section.content && <p className="text-muted-foreground text-lg whitespace-pre-line">{section.content}</p>}
                    </div>
                    {section.image && (
                      <div className={`relative ${isReversed ? 'lg:order-1' : ''}`}>
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                          <img src={section.image} alt={section.title || "Section image"} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          if (section.type === 'icon-list') {
            return (
              <section key={section.id} className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    {section.title && <h2 className="font-display text-3xl font-bold mb-6">{section.title}</h2>}
                    {section.content && <p className="text-muted-foreground text-lg">{section.content}</p>}
                  </div>
                  
                  {section.items && section.items.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {section.items.map((item, i) => (
                        <div key={item.id} className="bg-card border border-border p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                            {renderIcon(item.icon)}
                          </div>
                          <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                          <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          }

          return null;
        })}
      </main>
      <Footer />
    </div>
  );
}