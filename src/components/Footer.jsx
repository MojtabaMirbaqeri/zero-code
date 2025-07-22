import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../App';

// Translation data
const translations = {
  en: {
    description: 'Revolutionizing HR with AI-powered solutions and expert insights.',
    quickLinks: 'Quick Links',
    tools: 'AI Tools',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© 2024 HR-Tech AI Hub. All rights reserved.',
    home: 'Home',
    about: 'About Us',
    articles: 'Articles',
    contact: 'Contact',
    jobTitleOptimizer: 'Job Title Optimizer',
    jobDescriptionMaker: 'Job Description Maker',
    jobMatchingEngine: 'Job Matching Engine',
    aiChatAssistant: 'AI Chat Assistant'
  },
  fa: {
    description: 'انقلاب در منابع انسانی با راه‌حل‌های مبتنی بر هوش مصنوعی و بینش‌های متخصصان.',
    quickLinks: 'لینک‌های سریع',
    tools: 'ابزارهای هوش مصنوعی',
    legal: 'قانونی',
    privacy: 'سیاست حفظ حریم خصوصی',
    terms: 'شرایط خدمات',
    copyright: '© ۲۰۲۴ مرکز ابزارهای هوش مصنوعی منابع انسانی. تمام حقوق محفوظ است.',
    home: 'خانه',
    about: 'درباره ما',
    articles: 'مقالات',
    contact: 'تماس با ما',
    jobTitleOptimizer: 'بهینه‌ساز عنوان شغل',
    jobDescriptionMaker: 'سازنده شرح شغل',
    jobMatchingEngine: 'موتور تطبیق شغل',
    aiChatAssistant: 'دستیار چت هوش مصنوعی'
  }
};

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const quickLinks = [
    { name: t.home, href: '/' },
    { name: t.about, href: '/about' },
    { name: t.articles, href: '/articles' },
    { name: t.contact, href: '/contact' },
  ];

  const toolLinks = [
    { name: t.jobTitleOptimizer, href: '/tools/job-title-optimizer' },
    { name: t.jobDescriptionMaker, href: '/tools/job-description-maker' },
    { name: t.jobMatchingEngine, href: '/tools/job-matching-engine' },
    { name: t.aiChatAssistant, href: '/tools/ai-chat-assistant' },
  ];

  const legalLinks = [
    { name: t.privacy, href: '/privacy' },
    { name: t.terms, href: '/terms' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@hr-tech-ai-hub.com' },
  ];

  return (
    <footer className="glass backdrop-blur-md bg-white/5 border-t border-white/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HR</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                HR-Tech AI
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              {t.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200 group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.tools}
            </h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.legal}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.copyright}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Built with React & Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

