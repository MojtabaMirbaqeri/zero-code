import { Target, Eye, Heart, Award } from 'lucide-react';
import { useLanguage } from '../App';

// Translation data
const translations = {
  en: {
    title: 'About Us',
    subtitle: 'Pioneering the future of HR technology',
    mission: {
      title: 'Our Mission',
      description: 'We\'re dedicated to revolutionizing human resources through innovative AI-powered solutions that make hiring, onboarding, and talent management more efficient, fair, and effective.'
    },
    vision: {
      title: 'Our Vision',
      description: 'To become the leading platform where HR professionals discover cutting-edge insights and access powerful tools that transform their organizations.'
    },
    values: {
      title: 'Our Values',
      innovation: 'Innovation',
      innovationDesc: 'Continuously pushing the boundaries of what\'s possible in HR technology.',
      transparency: 'Transparency',
      transparencyDesc: 'Building trust through open communication and honest practices.',
      inclusion: 'Inclusion',
      inclusionDesc: 'Creating tools that promote diversity and eliminate bias in hiring.',
      excellence: 'Excellence',
      excellenceDesc: 'Delivering the highest quality solutions that exceed expectations.'
    },
    story: {
      title: 'Our Story',
      description: 'Founded by a team of HR professionals and AI experts, HR-Tech AI Hub was born from the recognition that traditional HR processes needed a technological revolution. We combine deep industry knowledge with cutting-edge artificial intelligence to create solutions that address real-world challenges in human resources.'
    },
    team: {
      title: 'Our Team',
      description: 'Our diverse team brings together expertise in human resources, artificial intelligence, software development, and user experience design. We\'re united by our passion for creating technology that makes work better for everyone.'
    }
  },
  fa: {
    title: 'درباره ما',
    subtitle: 'پیشگامان آینده فناوری منابع انسانی',
    mission: {
      title: 'ماموریت ما',
      description: 'ما متعهد به انقلاب در منابع انسانی از طریق راه‌حل‌های نوآورانه مبتنی بر هوش مصنوعی هستیم که استخدام، آموزش و مدیریت استعداد را کارآمدتر، عادلانه‌تر و مؤثرتر می‌کند.'
    },
    vision: {
      title: 'چشم‌انداز ما',
      description: 'تبدیل شدن به پلتفرم پیشرو که متخصصان منابع انسانی بینش‌های پیشرفته را کشف کرده و به ابزارهای قدرتمندی دسترسی پیدا می‌کنند که سازمان‌هایشان را متحول می‌کند.'
    },
    values: {
      title: 'ارزش‌های ما',
      innovation: 'نوآوری',
      innovationDesc: 'به طور مداوم مرزهای امکان در فناوری منابع انسانی را جابجا می‌کنیم.',
      transparency: 'شفافیت',
      transparencyDesc: 'ایجاد اعتماد از طریق ارتباط باز و شیوه‌های صادقانه.',
      inclusion: 'فراگیری',
      inclusionDesc: 'ایجاد ابزارهایی که تنوع را ترویج داده و تعصب در استخدام را از بین می‌برد.',
      excellence: 'تعالی',
      excellenceDesc: 'ارائه راه‌حل‌های با بالاترین کیفیت که از انتظارات فراتر می‌رود.'
    },
    story: {
      title: 'داستان ما',
      description: 'مرکز ابزارهای هوش مصنوعی منابع انسانی توسط تیمی از متخصصان منابع انسانی و کارشناسان هوش مصنوعی تأسیس شد و از تشخیص این نکته که فرآیندهای سنتی منابع انسانی نیاز به انقلاب تکنولوژیکی دارند، متولد شد. ما دانش عمیق صنعت را با هوش مصنوعی پیشرفته ترکیب می‌کنیم تا راه‌حل‌هایی ایجاد کنیم که چالش‌های دنیای واقعی در منابع انسانی را حل کند.'
    },
    team: {
      title: 'تیم ما',
      description: 'تیم متنوع ما تخصص در منابع انسانی، هوش مصنوعی، توسعه نرم‌افزار و طراحی تجربه کاربری را گرد هم می‌آورد. ما با اشتیاق خود برای ایجاد فناوری که کار را برای همه بهتر می‌کند، متحد شده‌ایم.'
    }
  }
};

const AboutPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const values = [
    {
      icon: Target,
      title: t.values.innovation,
      description: t.values.innovationDesc,
      gradient: 'gradient-primary'
    },
    {
      icon: Eye,
      title: t.values.transparency,
      description: t.values.transparencyDesc,
      gradient: 'gradient-secondary'
    },
    {
      icon: Heart,
      title: t.values.inclusion,
      description: t.values.inclusionDesc,
      gradient: 'gradient-accent'
    },
    {
      icon: Award,
      title: t.values.excellence,
      description: t.values.excellenceDesc,
      gradient: 'gradient-warm'
    }
  ];

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

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="glass rounded-2xl p-8">
            <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.mission.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.mission.description}
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="w-16 h-16 gradient-secondary rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.vision.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.vision.description}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t.values.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="glass rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
                  <div className={`w-12 h-12 ${value.gradient} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story */}
        <div className="glass rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t.story.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center max-w-4xl mx-auto">
            {t.story.description}
          </p>
        </div>

        {/* Team */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t.team.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center max-w-4xl mx-auto">
            {t.team.description}
          </p>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AboutPage;

