import { useState } from 'react';
import { Send, User, Building, Target, Copy, Download, RefreshCw, Sparkles } from 'lucide-react';
import { useLanguage } from '../../App';

const OutreachGenerator = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateRole: '',
    candidateCompany: '',
    candidateLinkedIn: '',
    targetRole: '',
    companyName: '',
    companyIndustry: '',
    personalNote: '',
    outreachType: 'linkedin',
    tone: 'professional'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMessages, setGeneratedMessages] = useState([]);

  const outreachTypes = [
    { value: 'linkedin', label: language === 'en' ? 'LinkedIn Message' : 'پیام لینکدین' },
    { value: 'email', label: language === 'en' ? 'Email' : 'ایمیل' },
    { value: 'inmail', label: language === 'en' ? 'LinkedIn InMail' : 'اینمیل لینکدین' },
    { value: 'cold_call', label: language === 'en' ? 'Cold Call Script' : 'اسکریپت تماس سرد' }
  ];

  const toneOptions = [
    { value: 'professional', label: language === 'en' ? 'Professional' : 'حرفه‌ای' },
    { value: 'friendly', label: language === 'en' ? 'Friendly' : 'دوستانه' },
    { value: 'casual', label: language === 'en' ? 'Casual' : 'غیررسمی' },
    { value: 'enthusiastic', label: language === 'en' ? 'Enthusiastic' : 'پرشور' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateOutreach = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const messages = generateMessages();
      setGeneratedMessages(messages);
      setIsGenerating(false);
    }, 2000);
  };

  const generateMessages = () => {
    const { candidateName, candidateRole, candidateCompany, targetRole, companyName, personalNote, outreachType, tone } = formData;
    
    const templates = {
      linkedin: {
        professional: language === 'en' ? 
          `Hi ${candidateName},

I hope this message finds you well. I came across your profile and was impressed by your experience as a ${candidateRole} at ${candidateCompany}.

We have an exciting ${targetRole} opportunity at ${companyName} that I believe would be a great fit for your background and expertise. ${personalNote ? `I particularly noticed ${personalNote}, which aligns perfectly with what we're looking for.` : ''}

Would you be open to a brief conversation about this opportunity? I'd love to share more details about the role and learn about your career goals.

Best regards,
[Your Name]` :
          `سلام ${candidateName}،

امیدوارم حالتان خوب باشد. پروفایل شما را دیدم و از تجربه‌تان به عنوان ${candidateRole} در ${candidateCompany} تحت تأثیر قرار گرفتم.

ما فرصت شغلی هیجان‌انگیز ${targetRole} در ${companyName} داریم که فکر می‌کنم برای پیشینه و تخصص شما مناسب باشد. ${personalNote ? `به خصوص ${personalNote} را متوجه شدم که کاملاً با آنچه ما دنبالش هستیم همخوانی دارد.` : ''}

آیا مایل به گفتگوی کوتاهی درباره این فرصت هستید؟ دوست دارم جزئیات بیشتری از نقش به اشتراک بگذارم و درباره اهداف شغلی‌تان بدانم.

با احترام،
[نام شما]`,
        
        friendly: language === 'en' ?
          `Hey ${candidateName}!

I hope you're having a great day! I stumbled upon your LinkedIn profile and was really impressed by your work as a ${candidateRole} at ${candidateCompany}.

I'm reaching out because we have an amazing ${targetRole} position at ${companyName} that I think you'd be perfect for! ${personalNote ? `Your experience with ${personalNote} really caught my attention.` : ''}

Would you be interested in chatting about it? No pressure at all - just thought it might be worth exploring!

Cheers,
[Your Name]` :
          `سلام ${candidateName}!

امیدوارم روز خوبی داشته باشید! پروفایل لینکدین شما را دیدم و واقعاً از کارتان به عنوان ${candidateRole} در ${candidateCompany} تحت تأثیر قرار گرفتم.

با شما تماس می‌گیرم چون موقعیت فوق‌العاده ${targetRole} در ${companyName} داریم که فکر می‌کنم برایتان عالی باشد! ${personalNote ? `تجربه‌تان با ${personalNote} واقعاً توجه من را جلب کرد.` : ''}

آیا علاقه‌مند به صحبت درباره‌اش هستید؟ هیچ فشاری نیست - فقط فکر کردم ارزش بررسی داشته باشد!

با آرزوی بهترین‌ها،
[نام شما]`
      },
      
      email: {
        professional: language === 'en' ?
          `Subject: ${targetRole} Opportunity at ${companyName}

Dear ${candidateName},

I hope this email finds you well. My name is [Your Name], and I'm a recruiter at ${companyName}.

I came across your profile and was impressed by your experience as a ${candidateRole} at ${candidateCompany}. Your background aligns perfectly with a ${targetRole} position we're currently looking to fill.

${personalNote ? `I was particularly interested in your work with ${personalNote}, which is directly relevant to this role.` : ''}

Key highlights of this opportunity:
• Competitive compensation package
• Opportunity to work with cutting-edge technology
• Collaborative and innovative team environment
• Strong career growth potential

Would you be available for a brief call this week to discuss this opportunity in more detail? I'd be happy to share more information about the role and answer any questions you might have.

Looking forward to hearing from you.

Best regards,
[Your Name]
[Your Title]
${companyName}
[Your Contact Information]` :
          `موضوع: فرصت شغلی ${targetRole} در ${companyName}

${candidateName} عزیز،

امیدوارم این ایمیل شما را در بهترین حال بیابد. نام من [نام شما] است و در ${companyName} به عنوان استخدام‌کننده کار می‌کنم.

پروفایل شما را دیدم و از تجربه‌تان به عنوان ${candidateRole} در ${candidateCompany} تحت تأثیر قرار گرفتم. پیشینه شما کاملاً با موقعیت ${targetRole} که در حال حاضر به دنبال پر کردنش هستیم، همخوانی دارد.

${personalNote ? `به خصوص از کارتان با ${personalNote} علاقه‌مند شدم که مستقیماً با این نقش مرتبط است.` : ''}

نکات کلیدی این فرصت:
• بسته جبران خدمات رقابتی
• فرصت کار با فناوری پیشرفته
• محیط تیمی مشارکتی و نوآورانه
• پتانسیل رشد شغلی قوی

آیا این هفته برای تماس کوتاهی جهت بحث تفصیلی درباره این فرصت در دسترس هستید؟ خوشحال می‌شوم اطلاعات بیشتری درباره نقش به اشتراک بگذارم و به سوالاتتان پاسخ دهم.

منتظر شنیدن صدایتان هستم.

با احترام،
[نام شما]
[عنوان شما]
${companyName}
[اطلاعات تماس شما]`
      }
    };

    const selectedTemplate = templates[outreachType]?.[tone] || templates.linkedin.professional;
    
    return [
      {
        id: 1,
        type: outreachType,
        tone: tone,
        content: selectedTemplate,
        subject: outreachType === 'email' ? 
          (language === 'en' ? `${targetRole} Opportunity at ${companyName}` : `فرصت شغلی ${targetRole} در ${companyName}`) : 
          null
      }
    ];
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const downloadMessage = (message) => {
    const content = message.subject ? `Subject: ${message.subject}\n\n${message.content}` : message.content;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `outreach-message-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Personalized Outreach Generator' : 'تولیدکننده پیام‌های شخصی‌سازی شده'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Create compelling, personalized outreach messages for recruiting and networking based on candidate profiles'
              : 'پیام‌های جذاب و شخصی‌سازی شده برای استخدام و شبکه‌سازی بر اساس پروفایل کاندیداها ایجاد کنید'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Candidate Information' : 'اطلاعات کاندیدا'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Candidate Name' : 'نام کاندیدا'}
                  </label>
                  <input
                    type="text"
                    value={formData.candidateName}
                    onChange={(e) => handleInputChange('candidateName', e.target.value)}
                    placeholder={language === 'en' ? 'e.g., Sarah Johnson' : 'مثال: سارا جانسون'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Current Role' : 'نقش فعلی'}
                    </label>
                    <input
                      type="text"
                      value={formData.candidateRole}
                      onChange={(e) => handleInputChange('candidateRole', e.target.value)}
                      placeholder={language === 'en' ? 'e.g., Senior Developer' : 'مثال: توسعه‌دهنده ارشد'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Current Company' : 'شرکت فعلی'}
                    </label>
                    <input
                      type="text"
                      value={formData.candidateCompany}
                      onChange={(e) => handleInputChange('candidateCompany', e.target.value)}
                      placeholder={language === 'en' ? 'e.g., TechCorp' : 'مثال: تک‌کورپ'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Personal Note / Connection Point' : 'یادداشت شخصی / نقطه اتصال'}
                  </label>
                  <textarea
                    value={formData.personalNote}
                    onChange={(e) => handleInputChange('personalNote', e.target.value)}
                    placeholder={language === 'en' ? 'e.g., their recent project on AI, mutual connection, shared interest' : 'مثال: پروژه اخیرشان روی هوش مصنوعی، آشنای مشترک، علاقه مشترک'}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Opportunity Details' : 'جزئیات فرصت'}
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Target Role' : 'نقش هدف'}
                    </label>
                    <input
                      type="text"
                      value={formData.targetRole}
                      onChange={(e) => handleInputChange('targetRole', e.target.value)}
                      placeholder={language === 'en' ? 'e.g., Lead Developer' : 'مثال: توسعه‌دهنده ارشد'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Company Name' : 'نام شرکت'}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder={language === 'en' ? 'e.g., InnovateTech' : 'مثال: اینوویت‌تک'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Outreach Type' : 'نوع پیام'}
                    </label>
                    <select
                      value={formData.outreachType}
                      onChange={(e) => handleInputChange('outreachType', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {outreachTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Tone' : 'لحن'}
                    </label>
                    <select
                      value={formData.tone}
                      onChange={(e) => handleInputChange('tone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {toneOptions.map(tone => (
                        <option key={tone.value} value={tone.value}>{tone.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={generateOutreach}
                disabled={!formData.candidateName || !formData.targetRole || !formData.companyName || isGenerating}
                className="w-full mt-6 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {language === 'en' ? 'Generating...' : 'در حال تولید...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {language === 'en' ? 'Generate Outreach' : 'تولید پیام'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Messages */}
          <div>
            {generatedMessages.length > 0 ? (
              <div className="space-y-6">
                {generatedMessages.map(message => (
                  <div key={message.id} className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Generated Message' : 'پیام تولید شده'}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          title={language === 'en' ? 'Copy to clipboard' : 'کپی در کلیپ‌بورد'}
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => downloadMessage(message)}
                          className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          title={language === 'en' ? 'Download' : 'دانلود'}
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {outreachTypes.find(t => t.value === message.type)?.label}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {toneOptions.find(t => t.value === message.tone)?.label}
                        </span>
                      </div>
                    </div>

                    {message.subject && (
                      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {language === 'en' ? 'Subject:' : 'موضوع:'}
                        </p>
                        <p className="text-gray-900 dark:text-white">{message.subject}</p>
                      </div>
                    )}

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <pre className="whitespace-pre-wrap text-gray-900 dark:text-white font-sans">
                        {message.content}
                      </pre>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                        {language === 'en' ? 'Use This Message' : 'استفاده از این پیام'}
                      </button>
                      <button 
                        onClick={generateOutreach}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        {language === 'en' ? 'Generate Another' : 'تولید دیگری'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <Send className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Ready to Create Personalized Outreach?' : 'آماده ایجاد پیام شخصی‌سازی شده هستید؟'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Fill in the candidate and opportunity details to generate compelling, personalized outreach messages'
                    : 'جزئیات کاندیدا و فرصت را پر کنید تا پیام‌های جذاب و شخصی‌سازی شده تولید کنید'
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

export default OutreachGenerator;

