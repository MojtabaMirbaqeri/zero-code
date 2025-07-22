import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage } from '../App';

// Translation data
const translations = {
  en: {
    home: 'Home',
    about: 'About Us',
    articles: 'Articles',
    tools: 'AI Tools',
    contact: 'Contact',
    language: 'Language'
  },
  fa: {
    home: 'خانه',
    about: 'درباره ما',
    articles: 'مقالات',
    tools: 'ابزارهای هوش مصنوعی',
    contact: 'تماس با ما',
    language: 'زبان'
  }
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const t = translations[language];

  const navigation = [
    { name: t.home, href: '/' },
    { name: t.about, href: '/about' },
    { name: t.articles, href: '/articles' },
    { name: t.tools, href: '/tools' },
    { name: t.contact, href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HR</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HR-Tech AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/20 hover:backdrop-blur-sm ${
                  location.pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-white/20'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/20 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              {language.toUpperCase()}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="glass"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass rounded-lg mt-2 mb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400 bg-white/20'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/20'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

