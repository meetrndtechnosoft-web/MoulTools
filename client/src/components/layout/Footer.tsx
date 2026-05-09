import { Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';
import logoImage from '@assets/image_1768022703284.png';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Our Team', href: '/#about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/#contact' },
    { label: 'Quality', href: '/#quality' },
  ],
  services: [
    { label: 'Mould Design', href: '/#services' },
    { label: 'Precision Machining', href: '/#services' },
    { label: 'Maintenance', href: '/#services' },
    { label: 'Prototyping', href: '/#services' },
  ],
  industries: [
    { label: 'Medical', href: '/#products' },
    { label: 'Healthcare & Pharma', href: '/#products' },
    { label: 'Consumer Goods', href: '/#products' },
    { label: 'Electronics', href: '/#products' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-industrial text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <a href="/#home" className="flex items-center gap-3 mb-6">
              <img src={logoImage} alt="Moul Tool Systems" className="h-14 w-auto bg-white rounded-lg p-1" />
            </a>
            <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
              Precision engineering company specializing in mould and die design, 
              manufacturing, and component machining. Delivering world-class tooling 
              solutions since establishment.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2024 Moul Tool Systems. All rights reserved.
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
