import { Link } from 'react-router-dom';
import { 
  Briefcase, FileText, Search, Users, MessageSquare, Mail, 
  UserCheck, FileCheck, Video, BarChart3, GraduationCap, 
  Calendar, Shield, ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../App';

// Translation data
const translations = {
  en: {
    title: 'AI Tools Suite',
    subtitle: 'Comprehensive HR technology solutions powered by artificial intelligence',
    categories: {
      recruitment: 'Recruitment & Hiring',
      management: 'Performance Management',
      analysis: 'Analytics & Insights'
    },
    tools: {
      jobTitleOptimization: {
        title: 'Job Title Optimization',
        description: 'Generate SEO-friendly job titles based on industry and role requirements',
        category: 'recruitment'
      },
      jobDescriptionMaker: {
        title: 'Job Description Maker',
        description: 'Create compelling job descriptions with proper tone, keywords, and formatting',
        category: 'recruitment'
      },
      jobSearchAssistant: {
        title: 'Global Job Search Assistant',
        description: 'Search across multiple job boards and platforms to find matching opportunities',
        category: 'recruitment'
      },
      jobMatchingEngine: {
        title: 'Job Matching Engine',
        description: 'Upload resumes and get scored job recommendations with detailed explanations',
        category: 'recruitment'
      },
      aiChatAssistant: {
        title: 'AI Chat Assistant',
        description: 'Interactive chatbot for candidates to ask about jobs, hiring, and companies',
        category: 'recruitment'
      },
      outreachGenerator: {
        title: 'Personalized Outreach Generator',
        description: 'Generate custom outreach messages based on candidate profiles',
        category: 'recruitment'
      },
      sourcingAutomation: {
        title: 'AI Sourcing Automation',
        description: 'Automatically find and score candidate profiles across platforms',
        category: 'recruitment'
      },
      resumeScreening: {
        title: 'Resume Screening & Parsing',
        description: 'Extract and structure data from resumes with AI-powered analysis',
        category: 'management'
      },
      interviewSimulator: {
        title: 'Interview Simulator',
        description: 'Practice interviews with AI feedback on responses and performance',
        category: 'management'
      },
      sentimentAnalysis: {
        title: 'Sentiment Analysis',
        description: 'Analyze team feedback and surveys to detect morale and engagement levels',
        category: 'analysis'
      },
      onboardingAssistant: {
        title: 'Onboarding Assistant',
        description: 'Interactive guide for new employee onboarding tasks and processes',
        category: 'management'
      },
      meetingOptimizer: {
        title: '1:1 Meeting Optimizer',
        description: 'Generate agendas and talking points based on performance data',
        category: 'management'
      },
      biasDetector: {
        title: 'Recruitment Bias Detector',
        description: 'Analyze hiring processes and content for unconscious bias',
        category: 'analysis'
      }
    },
    tryTool: 'Try Tool',
    comingSoon: 'Coming Soon'
  },
  fa: {
    title: 'مجموعه ابزارهای هوش مصنوعی',
    subtitle: 'راه‌حل‌های جامع فناوری منابع انسانی مبتنی بر هوش مصنوعی',
    categories: {
      recruitment: 'استخدام و جذب نیرو',
      management: 'مدیریت عملکرد',
      analysis: 'تحلیل و بینش'
    },
    tools: {
      jobTitleOptimization: {
        title: 'بهینه‌سازی عنوان شغل',
        description: 'تولید عناوین شغلی سازگار با سئو بر اساس صنعت و نیازهای نقش',
        category: 'recruitment'
      },
      jobDescriptionMaker: {
        title: 'سازنده شرح شغل',
        description: 'ایجاد شرح شغل جذاب با لحن، کلمات کلیدی و قالب‌بندی مناسب',
        category: 'recruitment'
      },
      jobSearchAssistant: {
        title: 'دستیار جستجوی شغل جهانی',
        description: 'جستجو در چندین سایت کاریابی و پلتفرم برای یافتن فرصت‌های مطابق',
        category: 'recruitment'
      },
      jobMatchingEngine: {
        title: 'موتور تطبیق شغل',
        description: 'آپلود رزومه و دریافت پیشنهادات شغلی امتیازدهی شده با توضیحات تفصیلی',
        category: 'recruitment'
      },
      aiChatAssistant: {
        title: 'دستیار چت هوش مصنوعی',
        description: 'چت‌بات تعاملی برای متقاضیان جهت پرسش درباره مشاغل، استخدام و شرکت‌ها',
        category: 'recruitment'
      },
      outreachGenerator: {
        title: 'تولیدکننده پیام‌های شخصی‌سازی شده',
        description: 'تولید پیام‌های سفارشی بر اساس پروفایل متقاضیان',
        category: 'recruitment'
      },
      sourcingAutomation: {
        title: 'اتوماسیون جذب نیرو با هوش مصنوعی',
        description: 'یافتن و امتیازدهی خودکار پروفایل متقاضیان در پلتفرم‌ها',
        category: 'recruitment'
      },
      resumeScreening: {
        title: 'غربالگری و تجزیه رزومه',
        description: 'استخراج و ساختاردهی داده‌ها از رزومه‌ها با تحلیل مبتنی بر هوش مصنوعی',
        category: 'management'
      },
      interviewSimulator: {
        title: 'شبیه‌ساز مصاحبه',
        description: 'تمرین مصاحبه با بازخورد هوش مصنوعی روی پاسخ‌ها و عملکرد',
        category: 'management'
      },
      sentimentAnalysis: {
        title: 'تحلیل احساسات',
        description: 'تحلیل بازخورد تیم و نظرسنجی‌ها برای تشخیص سطح روحیه و مشارکت',
        category: 'analysis'
      },
      onboardingAssistant: {
        title: 'دستیار آموزش کارکنان جدید',
        description: 'راهنمای تعاملی برای وظایف و فرآیندهای آموزش کارکنان جدید',
        category: 'management'
      },
      meetingOptimizer: {
        title: 'بهینه‌ساز جلسات یک‌به‌یک',
        description: 'تولید دستور کار و نکات گفتگو بر اساس داده‌های عملکرد',
        category: 'management'
      },
      biasDetector: {
        title: 'تشخیص‌دهنده تعصب در استخدام',
        description: 'تحلیل فرآیندها و محتوای استخدام برای تعصبات ناخودآگاه',
        category: 'analysis'
      }
    },
    tryTool: 'امتحان ابزار',
    comingSoon: 'به زودی'
  }
};

const ToolsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const toolsData = [
    {
      key: 'jobTitleOptimization',
      icon: Briefcase,
      href: '/tools/job-title-optimizer',
      gradient: 'gradient-primary',
      available: true
    },
    {
      key: 'jobDescriptionMaker',
      icon: FileText,
      href: '/tools/job-description-maker',
      gradient: 'gradient-secondary',
      available: true
    },
    {
      key: 'jobSearchAssistant',
      icon: Search,
      href: '/tools/job-search-assistant',
      gradient: 'gradient-accent',
      available: true
    },
    {
      key: 'jobMatchingEngine',
      icon: Users,
      href: '/tools/job-matching-engine',
      gradient: 'gradient-warm',
      available: true
    },
    {
      key: 'aiChatAssistant',
      icon: MessageSquare,
      href: '/tools/ai-chat-assistant',
      gradient: 'gradient-cool',
      available: true
    },
    {
      key: 'outreachGenerator',
      icon: Mail,
      href: '/tools/outreach-generator',
      gradient: 'gradient-primary',
      available: true
    },
    {
      key: 'sourcingAutomation',
      icon: UserCheck,
      href: '/tools/sourcing-automation',
      gradient: 'gradient-secondary',
      available: true
    },
    {
      key: 'resumeScreening',
      icon: FileCheck,
      href: '/tools/resume-screening',
      gradient: 'gradient-accent',
      available: true
    },
    {
      key: 'interviewSimulator',
      icon: Video,
      href: '/tools/interview-simulator',
      gradient: 'gradient-warm',
      available: true
    },
    {
      key: 'sentimentAnalysis',
      icon: BarChart3,
      href: '/tools/sentiment-analysis',
      gradient: 'gradient-cool',
      available: true
    },
    {
      key: 'onboardingAssistant',
      icon: GraduationCap,
      href: '/tools/onboarding-assistant',
      gradient: 'gradient-primary',
      available: true
    },
    {
      key: 'meetingOptimizer',
      icon: Calendar,
      href: '/tools/meeting-optimizer',
      gradient: 'gradient-secondary',
      available: true
    },
    {
      key: 'biasDetector',
      icon: Shield,
      href: '/tools/bias-detector',
      gradient: 'gradient-accent',
      available: true
    }
  ];

  const categorizedTools = {
    recruitment: toolsData.filter(tool => t.tools[tool.key].category === 'recruitment'),
    management: toolsData.filter(tool => t.tools[tool.key].category === 'management'),
    analysis: toolsData.filter(tool => t.tools[tool.key].category === 'analysis')
  };

  const ToolCard = ({ tool }) => {
    const Icon = tool.icon;
    const toolData = t.tools[tool.key];

    return (
      <div className="group relative">
        {tool.available ? (
          <Link to={tool.href} className="block">
            <div className="glass rounded-xl p-6 h-full hover:bg-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
              <div className={`w-12 h-12 ${tool.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {toolData.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {toolData.description}
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">{t.tryTool}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="glass rounded-xl p-6 h-full opacity-75">
            <div className={`w-12 h-12 ${tool.gradient} rounded-lg flex items-center justify-center mb-4 opacity-50`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {toolData.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {toolData.description}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              {t.comingSoon}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Tools by Category */}
        {Object.entries(categorizedTools).map(([category, tools]) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t.categories[category]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.key} tool={tool} />
              ))}
            </div>
          </div>
        ))}

        {/* Background Decoration */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default ToolsPage;

