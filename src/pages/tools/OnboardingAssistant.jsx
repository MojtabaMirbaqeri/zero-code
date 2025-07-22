import { useState } from 'react';
import { User, CheckCircle, Clock, BookOpen, Users, MessageSquare, Calendar, Download, Play, Pause } from 'lucide-react';
import { useLanguage } from '../../App';

const OnboardingAssistant = () => {
  const { language } = useLanguage();
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: '',
    startDate: '',
    manager: '',
    buddy: ''
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [onboardingStarted, setOnboardingStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const onboardingSteps = [
    {
      id: 1,
      title: language === 'en' ? 'Welcome & Introduction' : 'خوشامدگویی و معرفی',
      description: language === 'en' ? 'Company overview, mission, values, and culture introduction' : 'مرور کلی شرکت، ماموریت، ارزش‌ها و معرفی فرهنگ',
      duration: 60,
      type: 'presentation',
      tasks: [
        language === 'en' ? 'Watch company introduction video' : 'تماشای ویدیو معرفی شرکت',
        language === 'en' ? 'Read employee handbook' : 'مطالعه کتابچه راهنمای کارکنان',
        language === 'en' ? 'Complete company culture quiz' : 'تکمیل آزمون فرهنگ شرکت'
      ]
    },
    {
      id: 2,
      title: language === 'en' ? 'Administrative Setup' : 'تنظیمات اداری',
      description: language === 'en' ? 'Complete all necessary paperwork and account setups' : 'تکمیل تمام مدارک ضروری و راه‌اندازی حساب‌ها',
      duration: 90,
      type: 'administrative',
      tasks: [
        language === 'en' ? 'Fill out HR forms and tax documents' : 'پر کردن فرم‌های منابع انسانی و اسناد مالیاتی',
        language === 'en' ? 'Set up IT accounts and access permissions' : 'راه‌اندازی حساب‌های IT و مجوزهای دسترسی',
        language === 'en' ? 'Get ID badge and office keys' : 'دریافت کارت شناسایی و کلیدهای دفتر'
      ]
    },
    {
      id: 3,
      title: language === 'en' ? 'Role-Specific Training' : 'آموزش مخصوص نقش',
      description: language === 'en' ? 'Learn about your specific role, responsibilities, and expectations' : 'آشنایی با نقش، مسئولیت‌ها و انتظارات خاص شما',
      duration: 120,
      type: 'training',
      tasks: [
        language === 'en' ? 'Review job description and KPIs' : 'بررسی شرح شغل و شاخص‌های عملکرد',
        language === 'en' ? 'Complete role-specific training modules' : 'تکمیل ماژول‌های آموزشی مخصوص نقش',
        language === 'en' ? 'Shadow experienced team members' : 'همراهی با اعضای باتجربه تیم'
      ]
    },
    {
      id: 4,
      title: language === 'en' ? 'Team Integration' : 'ادغام با تیم',
      description: language === 'en' ? 'Meet your team, understand dynamics, and build relationships' : 'آشنایی با تیم، درک پویایی‌ها و ایجاد روابط',
      duration: 45,
      type: 'social',
      tasks: [
        language === 'en' ? 'Meet with direct manager and team members' : 'ملاقات با مدیر مستقیم و اعضای تیم',
        language === 'en' ? 'Attend team lunch or coffee session' : 'شرکت در ناهار تیمی یا جلسه قهوه',
        language === 'en' ? 'Join relevant Slack channels and groups' : 'پیوستن به کانال‌ها و گروه‌های مرتبط در Slack'
      ]
    },
    {
      id: 5,
      title: language === 'en' ? 'Tools & Systems Training' : 'آموزش ابزارها و سیستم‌ها',
      description: language === 'en' ? 'Learn to use company tools, software, and systems effectively' : 'یادگیری استفاده مؤثر از ابزارها، نرم‌افزارها و سیستم‌های شرکت',
      duration: 90,
      type: 'technical',
      tasks: [
        language === 'en' ? 'Complete software training sessions' : 'تکمیل جلسات آموزش نرم‌افزار',
        language === 'en' ? 'Set up development environment' : 'راه‌اندازی محیط توسعه',
        language === 'en' ? 'Practice with project management tools' : 'تمرین با ابزارهای مدیریت پروژه'
      ]
    },
    {
      id: 6,
      title: language === 'en' ? 'First Project Assignment' : 'تکلیف اولین پروژه',
      description: language === 'en' ? 'Start working on your first project with guidance and support' : 'شروع کار روی اولین پروژه با راهنمایی و پشتیبانی',
      duration: 180,
      type: 'project',
      tasks: [
        language === 'en' ? 'Receive project briefing and requirements' : 'دریافت توضیحات پروژه و الزامات',
        language === 'en' ? 'Set up project timeline and milestones' : 'تنظیم جدول زمانی پروژه و نقاط عطف',
        language === 'en' ? 'Begin work with mentor support' : 'شروع کار با پشتیبانی مربی'
      ]
    }
  ];

  const startOnboarding = () => {
    if (!newEmployee.name || !newEmployee.role) return;
    
    setOnboardingStarted(true);
    setCurrentStep(0);
    setChatMessages([
      {
        id: 1,
        type: 'bot',
        content: language === 'en' 
          ? `Welcome to the team, ${newEmployee.name}! I'm your AI Onboarding Assistant. I'll guide you through your first days and help you get settled in. Let's start with the first step of your onboarding journey.`
          : `به تیم خوش آمدید، ${newEmployee.name}! من دستیار هوش مصنوعی آموزش شما هستم. شما را در روزهای اول راهنمایی می‌کنم و کمک می‌کنم تا جا بیفتید. بیایید با اولین قدم سفر آموزشی‌تان شروع کنیم.`,
        timestamp: new Date()
      }
    ]);
  };

  const completeStep = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      
      // Add congratulatory message
      const newMessage = {
        id: Date.now(),
        type: 'bot',
        content: language === 'en' 
          ? `Great job completing "${onboardingSteps[stepId - 1].title}"! You're making excellent progress. ${stepId < onboardingSteps.length ? "Let's move on to the next step." : "Congratulations on completing your onboarding!"}`
          : `کار عالی در تکمیل "${onboardingSteps[stepId - 1].title}"! پیشرفت فوق‌العاده‌ای داشتید. ${stepId < onboardingSteps.length ? "بیایید به مرحله بعد برویم." : "تبریک برای تکمیل دوره آموزشی‌تان!"}`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, newMessage]);
      
      // Move to next step
      if (stepId < onboardingSteps.length) {
        setCurrentStep(stepId);
      }
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(chatInput),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (language === 'en') {
      if (input.includes('help') || input.includes('stuck')) {
        return "I'm here to help! You can ask me about any step in your onboarding process, company policies, or if you need assistance with specific tasks. What would you like help with?";
      }
      if (input.includes('schedule') || input.includes('time')) {
        return "Your onboarding is designed to be flexible. Each step has an estimated duration, but you can take your time. Would you like me to help you create a personalized schedule?";
      }
      if (input.includes('manager') || input.includes('team')) {
        return "Your manager and team are excited to work with you! I can help you prepare for your first team meetings or answer questions about team dynamics.";
      }
      return "That's a great question! I'm here to support you throughout your onboarding journey. Feel free to ask me about any aspect of your new role, company processes, or if you need clarification on any tasks.";
    } else {
      if (input.includes('کمک') || input.includes('گیر')) {
        return "من اینجا هستم تا کمک کنم! می‌توانید از من درباره هر مرحله از فرآیند آموزشی‌تان، سیاست‌های شرکت، یا اگر به کمک در کارهای خاص نیاز دارید، سوال بپرسید. در چه موردی می‌خواهید کمک کنم؟";
      }
      if (input.includes('برنامه') || input.includes('زمان')) {
        return "آموزش شما طوری طراحی شده که انعطاف‌پذیر باشد. هر مرحله زمان تخمینی دارد، اما می‌توانید وقت خودتان را بگیرید. می‌خواهید کمکتان کنم برنامه شخصی‌سازی شده‌ای ایجاد کنید؟";
      }
      if (input.includes('مدیر') || input.includes('تیم')) {
        return "مدیر و تیم شما برای کار با شما هیجان‌زده هستند! می‌توانم کمکتان کنم برای اولین جلسات تیمی آماده شوید یا به سوالاتتان درباره پویایی‌های تیم پاسخ دهم.";
      }
      return "سوال عالی! من اینجا هستم تا در طول سفر آموزشی‌تان از شما پشتیبانی کنم. راحت باشید و از من درباره هر جنبه‌ای از نقش جدیدتان، فرآیندهای شرکت، یا اگر نیاز به توضیح کارها دارید، سوال بپرسید.";
    }
  };

  const getStepIcon = (type) => {
    switch (type) {
      case 'presentation': return <BookOpen className="w-6 h-6" />;
      case 'administrative': return <User className="w-6 h-6" />;
      case 'training': return <BookOpen className="w-6 h-6" />;
      case 'social': return <Users className="w-6 h-6" />;
      case 'technical': return <BookOpen className="w-6 h-6" />;
      case 'project': return <Calendar className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.length / onboardingSteps.length) * 100);
  };

  const downloadOnboardingPlan = () => {
    const plan = `
ONBOARDING PLAN
===============

Employee: ${newEmployee.name}
Role: ${newEmployee.role}
Department: ${newEmployee.department}
Start Date: ${newEmployee.startDate}
Manager: ${newEmployee.manager}

Onboarding Steps:
${onboardingSteps.map((step, index) => `
${index + 1}. ${step.title} (${step.duration} minutes)
   ${step.description}
   
   Tasks:
   ${step.tasks.map(task => `   • ${task}`).join('\n')}
   
   Status: ${completedSteps.includes(step.id) ? 'COMPLETED' : 'PENDING'}
`).join('\n')}

Progress: ${getProgressPercentage()}% Complete
    `;
    
    const blob = new Blob([plan], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `onboarding-plan-${newEmployee.name.replace(' ', '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Onboarding Assistant' : 'دستیار آموزش کارکنان جدید'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Interactive AI-powered guide for new employee onboarding with personalized tasks, progress tracking, and support'
              : 'راهنمای تعاملی مبتنی بر هوش مصنوعی برای آموزش کارکنان جدید با کارهای شخصی‌سازی شده، پیگیری پیشرفت و پشتیبانی'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!onboardingStarted ? (
          /* Setup Phase */
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {language === 'en' ? 'New Employee Setup' : 'تنظیمات کارمند جدید'}
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Full Name' : 'نام کامل'}
                    </label>
                    <input
                      type="text"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      placeholder={language === 'en' ? 'Enter full name' : 'نام کامل را وارد کنید'}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Job Role' : 'نقش شغلی'}
                    </label>
                    <input
                      type="text"
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                      placeholder={language === 'en' ? 'e.g., Software Engineer' : 'مثال: مهندس نرم‌افزار'}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Department' : 'بخش'}
                    </label>
                    <select
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{language === 'en' ? 'Select Department' : 'انتخاب بخش'}</option>
                      <option value="engineering">{language === 'en' ? 'Engineering' : 'مهندسی'}</option>
                      <option value="product">{language === 'en' ? 'Product' : 'محصول'}</option>
                      <option value="design">{language === 'en' ? 'Design' : 'طراحی'}</option>
                      <option value="marketing">{language === 'en' ? 'Marketing' : 'بازاریابی'}</option>
                      <option value="sales">{language === 'en' ? 'Sales' : 'فروش'}</option>
                      <option value="hr">{language === 'en' ? 'Human Resources' : 'منابع انسانی'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Start Date' : 'تاریخ شروع'}
                    </label>
                    <input
                      type="date"
                      value={newEmployee.startDate}
                      onChange={(e) => setNewEmployee({...newEmployee, startDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Direct Manager' : 'مدیر مستقیم'}
                    </label>
                    <input
                      type="text"
                      value={newEmployee.manager}
                      onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                      placeholder={language === 'en' ? 'Manager name' : 'نام مدیر'}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Onboarding Buddy' : 'همراه آموزشی'}
                    </label>
                    <input
                      type="text"
                      value={newEmployee.buddy}
                      onChange={(e) => setNewEmployee({...newEmployee, buddy: e.target.value})}
                      placeholder={language === 'en' ? 'Buddy name (optional)' : 'نام همراه (اختیاری)'}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={startOnboarding}
                  disabled={!newEmployee.name || !newEmployee.role}
                  className="w-full px-6 py-4 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold"
                >
                  <Play className="w-6 h-6" />
                  {language === 'en' ? 'Start Onboarding' : 'شروع آموزش'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Onboarding Phase */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress and Steps */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Overview */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Onboarding Progress' : 'پیشرفت آموزش'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'en' ? `Welcome, ${newEmployee.name}!` : `خوش آمدید، ${newEmployee.name}!`}
                    </p>
                  </div>
                  <button
                    onClick={downloadOnboardingPlan}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {language === 'en' ? 'Download Plan' : 'دانلود برنامه'}
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === 'en' ? 'Overall Progress' : 'پیشرفت کلی'}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {getProgressPercentage()}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {completedSteps.length}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Completed' : 'تکمیل شده'}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {onboardingSteps.length - completedSteps.length}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Remaining' : 'باقی‌مانده'}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {onboardingSteps.reduce((total, step) => total + step.duration, 0)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Total Minutes' : 'کل دقیقه'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Onboarding Steps */}
              <div className="space-y-4">
                {onboardingSteps.map((step, index) => (
                  <div key={step.id} className={`glass rounded-2xl p-6 ${completedSteps.includes(step.id) ? 'bg-green-50 dark:bg-green-900/10' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${completedSteps.includes(step.id) ? 'bg-green-100 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                          {completedSteps.includes(step.id) ? <CheckCircle className="w-6 h-6" /> : getStepIcon(step.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {step.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {step.duration} {language === 'en' ? 'minutes' : 'دقیقه'}
                            </span>
                            <span className="capitalize">{step.type}</span>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {language === 'en' ? 'Tasks:' : 'کارها:'}
                            </h4>
                            <ul className="space-y-1">
                              {step.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {completedSteps.includes(step.id) ? (
                          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                            {language === 'en' ? 'Completed' : 'تکمیل شده'}
                          </span>
                        ) : (
                          <button
                            onClick={() => completeStep(step.id)}
                            className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                          >
                            {language === 'en' ? 'Mark Complete' : 'علامت‌گذاری تکمیل'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Chat */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl overflow-hidden">
                <div className="bg-gradient-primary p-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {language === 'en' ? 'AI Assistant' : 'دستیار هوش مصنوعی'}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {language === 'en' ? 'Ask me anything about your onboarding' : 'هر سوالی درباره آموزش‌تان از من بپرسید'}
                  </p>
                </div>

                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-primary text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder={language === 'en' ? 'Ask a question...' : 'سوال بپرسید...'}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!chatInput.trim()}
                      className="px-3 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingAssistant;

