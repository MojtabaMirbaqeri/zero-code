import { useState } from 'react';
import { Calendar, Clock, User, Target, TrendingUp, MessageSquare, Download, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../App';

const MeetingOptimizer = () => {
  const { language } = useLanguage();
  const [meetingSetup, setMeetingSetup] = useState({
    employeeName: '',
    managerName: '',
    meetingDate: '',
    duration: '30',
    lastMeetingDate: '',
    employeeRole: '',
    department: ''
  });
  const [performanceData, setPerformanceData] = useState({
    recentProjects: '',
    achievements: '',
    challenges: '',
    goals: '',
    feedback: ''
  });
  const [customTopics, setCustomTopics] = useState(['']);
  const [generatedAgenda, setGeneratedAgenda] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const addCustomTopic = () => {
    setCustomTopics([...customTopics, '']);
  };

  const updateCustomTopic = (index, value) => {
    const updated = [...customTopics];
    updated[index] = value;
    setCustomTopics(updated);
  };

  const removeCustomTopic = (index) => {
    setCustomTopics(customTopics.filter((_, i) => i !== index));
  };

  const generateAgenda = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockAgenda = {
        meetingInfo: {
          title: `1:1 Meeting: ${meetingSetup.managerName} & ${meetingSetup.employeeName}`,
          date: meetingSetup.meetingDate,
          duration: `${meetingSetup.duration} minutes`,
          objective: language === 'en' 
            ? 'Foster open communication, provide feedback, align on goals, and support professional development'
            : 'تقویت ارتباط باز، ارائه بازخورد، هماهنگی اهداف و پشتیبانی از توسعه حرفه‌ای'
        },
        agenda: [
          {
            section: language === 'en' ? 'Opening & Check-in' : 'شروع و بررسی وضعیت',
            duration: 5,
            topics: [
              language === 'en' ? 'How are you feeling overall?' : 'به طور کلی چطور احساس می‌کنید؟',
              language === 'en' ? 'Any immediate concerns or wins to share?' : 'آیا نگرانی فوری یا موفقیتی برای اشتراک‌گذاری دارید؟',
              language === 'en' ? 'Work-life balance check' : 'بررسی تعادل کار و زندگی'
            ],
            tips: [
              language === 'en' ? 'Create a safe, open environment' : 'محیط امن و باز ایجاد کنید',
              language === 'en' ? 'Listen actively and show genuine interest' : 'فعالانه گوش دهید و علاقه واقعی نشان دهید'
            ]
          },
          {
            section: language === 'en' ? 'Recent Work & Projects' : 'کار اخیر و پروژه‌ها',
            duration: 10,
            topics: [
              language === 'en' ? 'Progress on current projects and assignments' : 'پیشرفت در پروژه‌ها و تکالیف فعلی',
              language === 'en' ? 'Challenges faced and how they were addressed' : 'چالش‌های مواجه شده و نحوه رسیدگی به آنها',
              language === 'en' ? 'Wins and achievements since last meeting' : 'موفقیت‌ها و دستاوردها از آخرین جلسه',
              language === 'en' ? 'Resource needs and blockers' : 'نیازهای منابع و موانع'
            ],
            tips: [
              language === 'en' ? 'Acknowledge achievements and progress' : 'دستاوردها و پیشرفت را تصدیق کنید',
              language === 'en' ? 'Offer specific help for challenges' : 'کمک مشخص برای چالش‌ها ارائه دهید'
            ]
          },
          {
            section: language === 'en' ? 'Feedback & Performance' : 'بازخورد و عملکرد',
            duration: 8,
            topics: [
              language === 'en' ? 'Specific feedback on recent work quality' : 'بازخورد مشخص درباره کیفیت کار اخیر',
              language === 'en' ? 'Areas of strength to continue leveraging' : 'نقاط قوت برای ادامه استفاده',
              language === 'en' ? 'Growth opportunities and improvement areas' : 'فرصت‌های رشد و نواحی بهبود',
              language === 'en' ? 'Employee feedback on management and support' : 'بازخورد کارمند درباره مدیریت و پشتیبانی'
            ],
            tips: [
              language === 'en' ? 'Use specific examples and be constructive' : 'از مثال‌های مشخص استفاده کنید و سازنده باشید',
              language === 'en' ? 'Ask for feedback on your management style' : 'درباره سبک مدیریت‌تان بازخورد بخواهید'
            ]
          },
          {
            section: language === 'en' ? 'Goals & Development' : 'اهداف و توسعه',
            duration: 5,
            topics: [
              language === 'en' ? 'Progress on quarterly/annual goals' : 'پیشرفت در اهداف فصلی/سالانه',
              language === 'en' ? 'Career development aspirations' : 'آرزوهای توسعه شغلی',
              language === 'en' ? 'Learning opportunities and skill development' : 'فرصت‌های یادگیری و توسعه مهارت',
              language === 'en' ? 'Setting new objectives for next period' : 'تعیین اهداف جدید برای دوره بعد'
            ],
            tips: [
              language === 'en' ? 'Connect daily work to bigger picture goals' : 'کار روزانه را به اهداف بزرگ‌تر متصل کنید',
              language === 'en' ? 'Identify concrete next steps' : 'گام‌های بعدی مشخص را شناسایی کنید'
            ]
          },
          {
            section: language === 'en' ? 'Team & Collaboration' : 'تیم و همکاری',
            duration: 2,
            topics: [
              language === 'en' ? 'Team dynamics and relationships' : 'پویایی‌ها و روابط تیم',
              language === 'en' ? 'Cross-functional collaboration experiences' : 'تجربیات همکاری بین‌بخشی',
              language === 'en' ? 'Communication effectiveness' : 'اثربخشی ارتباطات'
            ],
            tips: [
              language === 'en' ? 'Address any team conflicts early' : 'تعارضات تیمی را زود رسیدگی کنید',
              language === 'en' ? 'Celebrate good collaboration examples' : 'نمونه‌های همکاری خوب را جشن بگیرید'
            ]
          }
        ],
        customTopics: customTopics.filter(topic => topic.trim()),
        actionItems: [
          {
            item: language === 'en' ? 'Schedule follow-up on project X by [date]' : 'برنامه‌ریزی پیگیری پروژه X تا [تاریخ]',
            owner: 'Manager',
            priority: 'high'
          },
          {
            item: language === 'en' ? 'Research training opportunities for skill Y' : 'تحقیق فرصت‌های آموزشی برای مهارت Y',
            owner: 'Employee',
            priority: 'medium'
          },
          {
            item: language === 'en' ? 'Set up meeting with team lead about collaboration' : 'تنظیم جلسه با رهبر تیم درباره همکاری',
            owner: 'Manager',
            priority: 'low'
          }
        ],
        talkingPoints: [
          {
            category: language === 'en' ? 'Recognition' : 'تقدیر',
            points: [
              language === 'en' ? 'Acknowledge the excellent work on the recent client presentation' : 'تصدیق کار عالی در ارائه اخیر مشتری',
              language === 'en' ? 'Highlight the proactive approach to problem-solving' : 'تأکید بر رویکرد پیشگیرانه در حل مسئله'
            ]
          },
          {
            category: language === 'en' ? 'Development' : 'توسعه',
            points: [
              language === 'en' ? 'Discuss interest in leadership opportunities' : 'بحث درباره علاقه به فرصت‌های رهبری',
              language === 'en' ? 'Explore technical skill gaps and training needs' : 'بررسی شکاف‌های مهارت فنی و نیازهای آموزشی'
            ]
          },
          {
            category: language === 'en' ? 'Support' : 'پشتیبانی',
            points: [
              language === 'en' ? 'Ask about workload and stress levels' : 'سوال درباره حجم کار و سطح استرس',
              language === 'en' ? 'Offer additional resources if needed' : 'ارائه منابع اضافی در صورت نیاز'
            ]
          }
        ],
        followUpSuggestions: [
          language === 'en' ? 'Send meeting summary within 24 hours' : 'ارسال خلاصه جلسه ظرف ۲۴ ساعت',
          language === 'en' ? 'Schedule next 1:1 meeting before this one ends' : 'برنامه‌ریزی جلسه ۱:۱ بعدی قبل از پایان این جلسه',
          language === 'en' ? 'Check in on action items within one week' : 'پیگیری اقدامات ظرف یک هفته',
          language === 'en' ? 'Share relevant resources or articles discussed' : 'اشتراک منابع یا مقالات مرتبط بحث شده'
        ]
      };
      
      setGeneratedAgenda(mockAgenda);
      setIsGenerating(false);
    }, 2000);
  };

  const downloadAgenda = () => {
    if (!generatedAgenda) return;
    
    const agenda = `
1:1 MEETING AGENDA
==================

Meeting: ${generatedAgenda.meetingInfo.title}
Date: ${generatedAgenda.meetingInfo.date}
Duration: ${generatedAgenda.meetingInfo.duration}
Objective: ${generatedAgenda.meetingInfo.objective}

AGENDA:
${generatedAgenda.agenda.map((section, index) => `
${index + 1}. ${section.section} (${section.duration} minutes)
   Topics:
   ${section.topics.map(topic => `   • ${topic}`).join('\n')}
   
   Tips:
   ${section.tips.map(tip => `   • ${tip}`).join('\n')}
`).join('\n')}

${generatedAgenda.customTopics.length > 0 ? `
CUSTOM TOPICS:
${generatedAgenda.customTopics.map(topic => `• ${topic}`).join('\n')}
` : ''}

TALKING POINTS:
${generatedAgenda.talkingPoints.map(category => `
${category.category}:
${category.points.map(point => `• ${point}`).join('\n')}
`).join('\n')}

ACTION ITEMS:
${generatedAgenda.actionItems.map(item => `• ${item.item} (Owner: ${item.owner}, Priority: ${item.priority})`).join('\n')}

FOLLOW-UP:
${generatedAgenda.followUpSuggestions.map(suggestion => `• ${suggestion}`).join('\n')}
    `;
    
    const blob = new Blob([agenda], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `1on1-agenda-${meetingSetup.employeeName.replace(' ', '-')}-${meetingSetup.meetingDate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? '1:1 Meeting Optimizer' : 'بهینه‌ساز جلسات یک‌به‌یک'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Generate personalized agendas and talking points for effective one-on-one meetings based on performance data and goals'
              : 'تولید دستور کار شخصی‌سازی شده و نکات گفتگو برای جلسات مؤثر یک‌به‌یک بر اساس داده‌های عملکرد و اهداف'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Meeting Setup */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Meeting Setup' : 'تنظیمات جلسه'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Employee Name' : 'نام کارمند'}
                  </label>
                  <input
                    type="text"
                    value={meetingSetup.employeeName}
                    onChange={(e) => setMeetingSetup({...meetingSetup, employeeName: e.target.value})}
                    placeholder={language === 'en' ? 'Enter employee name' : 'نام کارمند را وارد کنید'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Manager Name' : 'نام مدیر'}
                  </label>
                  <input
                    type="text"
                    value={meetingSetup.managerName}
                    onChange={(e) => setMeetingSetup({...meetingSetup, managerName: e.target.value})}
                    placeholder={language === 'en' ? 'Enter manager name' : 'نام مدیر را وارد کنید'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Meeting Date' : 'تاریخ جلسه'}
                    </label>
                    <input
                      type="date"
                      value={meetingSetup.meetingDate}
                      onChange={(e) => setMeetingSetup({...meetingSetup, meetingDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Duration (min)' : 'مدت (دقیقه)'}
                    </label>
                    <select
                      value={meetingSetup.duration}
                      onChange={(e) => setMeetingSetup({...meetingSetup, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="60">60</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Employee Role' : 'نقش کارمند'}
                  </label>
                  <input
                    type="text"
                    value={meetingSetup.employeeRole}
                    onChange={(e) => setMeetingSetup({...meetingSetup, employeeRole: e.target.value})}
                    placeholder={language === 'en' ? 'e.g., Software Engineer' : 'مثال: مهندس نرم‌افزار'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Performance Context */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Performance Context' : 'زمینه عملکرد'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Recent Projects' : 'پروژه‌های اخیر'}
                  </label>
                  <textarea
                    value={performanceData.recentProjects}
                    onChange={(e) => setPerformanceData({...performanceData, recentProjects: e.target.value})}
                    placeholder={language === 'en' ? 'List recent projects and their status...' : 'پروژه‌های اخیر و وضعیت آنها را فهرست کنید...'}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Key Achievements' : 'دستاوردهای کلیدی'}
                  </label>
                  <textarea
                    value={performanceData.achievements}
                    onChange={(e) => setPerformanceData({...performanceData, achievements: e.target.value})}
                    placeholder={language === 'en' ? 'Notable wins and accomplishments...' : 'موفقیت‌ها و دستاوردهای قابل توجه...'}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Current Challenges' : 'چالش‌های فعلی'}
                  </label>
                  <textarea
                    value={performanceData.challenges}
                    onChange={(e) => setPerformanceData({...performanceData, challenges: e.target.value})}
                    placeholder={language === 'en' ? 'Obstacles and difficulties faced...' : 'موانع و مشکلات مواجه شده...'}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Custom Topics */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Custom Topics' : 'موضوعات سفارشی'}
              </h3>
              
              <div className="space-y-3">
                {customTopics.map((topic, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => updateCustomTopic(index, e.target.value)}
                      placeholder={language === 'en' ? 'Add a custom topic...' : 'موضوع سفارشی اضافه کنید...'}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {customTopics.length > 1 && (
                      <button
                        onClick={() => removeCustomTopic(index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addCustomTopic}
                  className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  {language === 'en' ? 'Add Topic' : 'افزودن موضوع'}
                </button>
              </div>
            </div>

            <button
              onClick={generateAgenda}
              disabled={!meetingSetup.employeeName || !meetingSetup.managerName || isGenerating}
              className="w-full px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  {language === 'en' ? 'Generating...' : 'در حال تولید...'}
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  {language === 'en' ? 'Generate Agenda' : 'تولید دستور کار'}
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {generatedAgenda ? (
              <div className="space-y-6">
                {/* Meeting Info */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Meeting Agenda' : 'دستور کار جلسه'}
                    </h2>
                    <button
                      onClick={downloadAgenda}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {language === 'en' ? 'Download' : 'دانلود'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Meeting' : 'جلسه'}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{generatedAgenda.meetingInfo.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Date & Duration' : 'تاریخ و مدت'}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {generatedAgenda.meetingInfo.date} • {generatedAgenda.meetingInfo.duration}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {language === 'en' ? 'Meeting Objective' : 'هدف جلسه'}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">{generatedAgenda.meetingInfo.objective}</p>
                  </div>
                </div>

                {/* Agenda Items */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Agenda Items' : 'موارد دستور کار'}
                  </h3>
                  <div className="space-y-4">
                    {generatedAgenda.agenda.map((section, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {index + 1}. {section.section}
                          </h4>
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {section.duration} {language === 'en' ? 'min' : 'دقیقه'}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'en' ? 'Topics to Cover:' : 'موضوعات پوشش داده شده:'}
                          </h5>
                          <ul className="space-y-1">
                            {section.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'en' ? 'Tips:' : 'نکات:'}
                          </h5>
                          <ul className="space-y-1">
                            {section.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Talking Points */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Key Talking Points' : 'نکات کلیدی گفتگو'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {generatedAgenda.talkingPoints.map((category, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          {category.category}
                        </h4>
                        <ul className="space-y-2">
                          {category.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Suggested Action Items' : 'اقدامات پیشنهادی'}
                  </h3>
                  <div className="space-y-3">
                    {generatedAgenda.actionItems.map((item, index) => (
                      <div key={index} className="flex items-start justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white">{item.item}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'en' ? 'Owner:' : 'مسئول:'} {item.owner}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Follow-up */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Follow-up Suggestions' : 'پیشنهادات پیگیری'}
                  </h3>
                  <ul className="space-y-2">
                    {generatedAgenda.followUpSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Ready to Optimize Your 1:1?' : 'آماده بهینه‌سازی جلسه ۱:۱ خود هستید؟'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Fill in the meeting details and performance context to generate a personalized agenda with talking points and action items'
                    : 'جزئیات جلسه و زمینه عملکرد را پر کنید تا دستور کار شخصی‌سازی شده با نکات گفتگو و اقدامات تولید شود'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingOptimizer;

