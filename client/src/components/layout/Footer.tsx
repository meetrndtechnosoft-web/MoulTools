import { Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';
import logoImage from '@assets/image_1768022703284.png';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'wouter';
import * as LucideIcons from 'lucide-react';

export function Footer() {
  const { adminData } = useAdmin();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <footer className="bg-gradient-industrial text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/#home" className="flex items-center gap-3 mb-6">
              <img src={logoImage} alt="Moul Tool Systems" className="h-14 w-auto bg-white rounded-lg p-1" />
            </Link>
            <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
              {adminData.footer?.description}
            </p>
            <div className="flex gap-3">
              {adminData.footer?.socialLinks?.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  {renderIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {adminData.footer?.columns?.map((column) => (
            <div key={column.id}>
              <h4 className="font-display font-bold text-lg mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links?.map((link) => (
                  <li key={link.id}>
                    {link.isPage ? (
                      <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {adminData.footer?.copyright}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors ml-4"
              aria-label="Scroll to top"
              data-testid="button-scroll-top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
