import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '@assets/image_1768022703284.png';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'wouter';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { adminData } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md shadow-lg border-b border-border'
          : ''
      }`}
      style={{
        backgroundColor: scrolled ? adminData.headerStyle?.stickyBgColor : adminData.headerStyle?.normalBgColor,
        '--nav-text-color': scrolled ? (adminData.headerStyle?.stickyTextColor || adminData.headerStyle?.textColor) : adminData.headerStyle?.textColor,
        '--nav-hover-color': scrolled ? (adminData.headerStyle?.stickyHoverTextColor || adminData.headerStyle?.hoverTextColor) : adminData.headerStyle?.hoverTextColor,
      } as React.CSSProperties}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/#home" className="flex items-center gap-3" data-testid="link-home">
            <img src={logoImage} alt="Moul Tool Systems" className="h-14 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {adminData.navigation?.map((link) => (
              link.isPage ? (
                <Link key={link.id} href={link.href} className="text-sm font-medium transition-colors relative group text-[var(--nav-text-color)] hover:text-[var(--nav-hover-color)]" data-testid={`link-nav-${link.label.toLowerCase()}`}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-sm font-medium transition-colors relative group text-[var(--nav-text-color)] hover:text-[var(--nav-hover-color)]"
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              )
            ))}
            <a
              href="/#contact"
              className="bg-gradient-accent text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity shadow-md"
              data-testid="button-get-quote"
            >
              Get a Quote
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--nav-text-color)] hover:text-[var(--nav-hover-color)]"
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-card border-t border-border"
            >
              <div className="py-4 space-y-2">
                {adminData.navigation?.map((link) => (
                  link.isPage ? (
                    <Link key={link.id} href={link.href} onClick={() => setIsOpen(false)} className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors" data-testid={`link-mobile-${link.label.toLowerCase()}`}>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </a>
                  )
                ))}
                <div className="px-4 pt-2">
                  <a
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="block text-center bg-gradient-accent text-white px-5 py-3 rounded-lg font-medium"
                    data-testid="button-mobile-quote"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
