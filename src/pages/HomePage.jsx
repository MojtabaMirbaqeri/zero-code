import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Users, BookOpen, Globe, Briefcase, MessageSquare, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useLanguage } from '../App';

// Translation data
const translations = {
  en: {
    hero: {
      title: 'HR-Tech AI Hub',
      subtitle: 'Revolutionizing Human Resources with Artificial Intelligence',
      description: 'Discover cutting-edge HR technology insights and powerful AI tools designed to transform your hiring, onboarding, and talent management processes.',
      cta: 'Explore AI Tools',
      learnMore: 'Learn More'
    },
    features: {
      title: 'Powerful AI-Driven Solutions',
      subtitle: 'Everything you need to modernize your HR processes',
      blog: {
        title: 'Expert Insights',
        description: 'Stay updated with the latest trends, best practices, and innovations in HR technology.'
      },
      tools: {
        title: 'AI-Powered Tools',
        description: '13 comprehensive tools covering recruitment, onboarding, performance management, and more.'
      },
      multilingual: {
        title: 'Dual Language Support',
        description: 'Full support for English and Persian languages with seamless switching.'
      }
    },
    toolsPreview: {
      title: 'AI Tools Suite',
      subtitle: 'Comprehensive HR technology solutions',
      viewAll: 'View All Tools',
      tryNow: 'Try Now',
      jobTitleOptimizer: {
        title: 'Job Title Optimization',
        description: 'Generate SEO-friendly job titles based on industry and role requirements'
      },
      jobMatchingEngine: {
        title: 'Job Matching Engine',
        description: 'Upload resumes and get scored job recommendations with detailed explanations'
      },
      aiChatAssistant: {
        title: 'AI Chat Assistant',
        description: 'Interactive chatbot for candidates to ask about jobs, hiring, and companies'
      },
      biasDetector: {
        title: 'Recruitment Bias Detector',
        description: 'Analyze hiring processes and content for unconscious bias'
      }
    },
    stats: {
      tools: 'AI Tools',
      languages: 'Languages',
      possibilities: 'Possibilities'
    }
  },
  fa: {
    hero: {
      title: 'مرکز ابزارهای هوش مصنوعی منابع انسانی',
      subtitle: 'انقلاب در منابع انسانی با هوش مصنوعی',
      description: 'بینش‌های پیشرفته فناوری منابع انسانی و ابزارهای قدرتمند هوش مصنوعی را کشف کنید که برای تحول فرآیندهای استخدام، آموزش و مدیریت استعداد طراحی شده‌اند.',
      cta: 'کاوش ابزارهای هوش مصنوعی',
      learnMore: 'بیشتر بدانید'
    },
    features: {
      title: 'راه‌حل‌های قدرتمند مبتنی بر هوش مصنوعی',
      subtitle: 'همه چیزی که برای مدرن‌سازی فرآیندهای منابع انسانی نیاز دارید',
      blog: {
        title: 'بینش‌های متخصصان',
        description: 'با آخرین روندها، بهترین شیوه‌ها و نوآوری‌های فناوری منابع انسانی به‌روز بمانید.'
      },
      tools: {
        title: 'ابزارهای مبتنی بر هوش مصنوعی',
        description: '۱۳ ابزار جامع که استخدام، آموزش، مدیریت عملکرد و موارد دیگر را پوشش می‌دهد.'
      },
      multilingual: {
        title: 'پشتیبانی دو زبانه',
        description: 'پشتیبانی کامل از زبان‌های انگلیسی و فارسی با تغییر یکپارچه.'
      }
    },
    toolsPreview: {
      title: 'مجموعه ابزارهای هوش مصنوعی',
      subtitle: 'راه‌حل‌های جامع فناوری منابع انسانی',
      viewAll: 'مشاهده همه ابزارها',
      tryNow: 'امتحان کنید',
      jobTitleOptimizer: {
        title: 'بهینه‌سازی عنوان شغل',
        description: 'تولید عناوین شغلی سازگار با سئو بر اساس صنعت و نیازهای نقش'
      },
      jobMatchingEngine: {
        title: 'موتور تطبیق شغل',
        description: 'آپلود رزومه و دریافت پیشنهادات شغلی امتیازدهی شده با توضیحات تفصیلی'
      },
      aiChatAssistant: {
        title: 'دستیار چت هوش مصنوعی',
        description: 'چت‌بات تعاملی برای متقاضیان جهت پرسش درباره مشاغل، استخدام و شرکت‌ها'
      },
      biasDetector: {
        title: 'تشخیص‌دهنده تعصب در استخدام',
        description: 'تحلیل فرآیندها و محتوای استخدام برای تعصبات ناخودآگاه'
      }
    },
    stats: {
      tools: 'ابزار هوش مصنوعی',
      languages: 'زبان',
      possibilities: 'امکانات'
    }
  }
};

const HomePage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      icon: BookOpen,
      title: t.features.blog.title,
      description: t.features.blog.description,
      gradient: 'gradient-primary',
    },
    {
      icon: Zap,
      title: t.features.tools.title,
      description: t.features.tools.description,
      gradient: 'gradient-secondary',
    },
    {
      icon: Globe,
      title: t.features.multilingual.title,
      description: t.features.multilingual.description,
      gradient: 'gradient-accent',
    },
  ];

  const featuredTools = [
    {
      icon: Briefcase,
      title: t.toolsPreview.jobTitleOptimizer.title,
      description: t.toolsPreview.jobTitleOptimizer.description,
      href: '/tools/job-title-optimizer',
      gradient: 'gradient-primary',
    },
    {
      icon: Users,
      title: t.toolsPreview.jobMatchingEngine.title,
      description: t.toolsPreview.jobMatchingEngine.description,
      href: '/tools/job-matching-engine',
      gradient: 'gradient-secondary',
    },
    {
      icon: MessageSquare,
      title: t.toolsPreview.aiChatAssistant.title,
      description: t.toolsPreview.aiChatAssistant.description,
      href: '/tools/ai-chat-assistant',
      gradient: 'gradient-accent',
    },
    {
      icon: Target,
      title: t.toolsPreview.biasDetector.title,
      description: t.toolsPreview.biasDetector.description,
      href: '/tools/bias-detector',
      gradient: 'gradient-warm',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-gradient opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-500/20 rounded-full blur-xl float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="glass px-4 py-2 rounded-full flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI-Powered HR Solutions
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-soft">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.hero.title}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light">
              {t.hero.subtitle}
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools">
                <Button size="lg" className="glass hover:bg-white/20 group">
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="glass">
                  {t.hero.learnMore}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto">
              <div className="text-center">
                <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">13</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.stats.tools}</div>
              </div>
              <div className="text-center">
                <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.stats.languages}</div>
              </div>
              <div className="text-center">
                <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-8 h-8 text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.stats.possibilities}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative">
                  <div className="glass rounded-2xl p-8 h-full hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <div className={`w-16 h-16 ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.toolsPreview.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              {t.toolsPreview.subtitle}
            </p>
            <Link to="/tools">
              <Button size="lg" className="glass hover:bg-white/20 group">
                {t.toolsPreview.viewAll}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Link key={index} to={tool.href} className="group block">
                  <div className="glass rounded-xl p-6 h-full hover:bg-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    <div className={`w-12 h-12 ${tool.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">{t.toolsPreview.tryNow}</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

