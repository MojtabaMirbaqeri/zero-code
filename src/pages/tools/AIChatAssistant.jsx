import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Download, RefreshCw, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../App';

const AIChatAssistant = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: language === 'en' 
        ? 'Hello! I\'m your AI HR Assistant. I can help you with job search, career advice, interview preparation, and HR-related questions. How can I assist you today?'
        : 'سلام! من دستیار هوش مصنوعی منابع انسانی شما هستم. می‌توانم در جستجوی شغل، مشاوره شغلی، آماده‌سازی مصاحبه و سوالات مرتبط با منابع انسانی به شما کمک کنم. امروز چگونه می‌توانم کمکتان کنم؟',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = language === 'en' ? [
    'How do I prepare for a technical interview?',
    'What should I include in my resume?',
    'How to negotiate salary?',
    'Tips for remote work interviews',
    'How to answer "Tell me about yourself"?',
    'What questions should I ask the interviewer?'
  ] : [
    'چگونه برای مصاحبه فنی آماده شوم؟',
    'چه چیزهایی را در رزومه‌ام بگنجانم؟',
    'چگونه حقوق را مذاکره کنم؟',
    'نکاتی برای مصاحبه‌های کار از راه دور',
    'چگونه به "درباره خودتان بگویید" پاسخ دهم؟',
    'چه سوالاتی از مصاحبه‌کننده بپرسم؟'
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (language === 'en') {
      if (input.includes('interview') || input.includes('prepare')) {
        return `Great question about interview preparation! Here are some key tips:

1. **Research the company**: Learn about their mission, values, and recent news
2. **Practice common questions**: Prepare answers for behavioral and technical questions
3. **Prepare your own questions**: Show interest by asking about the role and company culture
4. **Review your resume**: Be ready to discuss any experience or skill mentioned
5. **Plan your setup**: For virtual interviews, test your tech and choose a quiet space

Would you like me to elaborate on any of these points or help you practice specific interview questions?`;
      }
      
      if (input.includes('resume') || input.includes('cv')) {
        return `Here's what makes a strong resume:

**Essential Sections:**
• Contact information and professional summary
• Work experience with quantifiable achievements
• Skills relevant to the target role
• Education and certifications

**Pro Tips:**
• Use action verbs and specific metrics
• Tailor your resume for each application
• Keep it concise (1-2 pages max)
• Use a clean, professional format
• Include keywords from the job description

Would you like help with any specific section of your resume?`;
      }
      
      if (input.includes('salary') || input.includes('negotiate')) {
        return `Salary negotiation tips:

**Before Negotiating:**
• Research market rates for your role and location
• Document your achievements and value-add
• Consider the full compensation package

**During Negotiation:**
• Express enthusiasm for the role first
• Present your research professionally
• Be flexible and open to alternatives
• Consider benefits, not just base salary

**Sample Script:**
"Based on my research and experience, I was expecting a range of $X-Y. Would there be flexibility in the compensation package?"

Need help with specific negotiation scenarios?`;
      }
      
      return `I understand you're asking about "${userInput}". While I'd love to provide a detailed response, I can help you with:

• **Job Search**: Finding opportunities, application strategies
• **Interview Prep**: Common questions, best practices
• **Resume Building**: Content, formatting, optimization
• **Career Development**: Skills, networking, growth paths
• **Workplace Issues**: Communication, performance, culture

Could you be more specific about what aspect you'd like help with?`;
    } else {
      if (input.includes('مصاحبه') || input.includes('آماده')) {
        return `سوال عالی درباره آماده‌سازی مصاحبه! در اینجا چند نکته کلیدی آورده‌ام:

۱. **تحقیق درباره شرکت**: درباره ماموریت، ارزش‌ها و اخبار اخیر آن‌ها بیاموزید
۲. **تمرین سوالات رایج**: پاسخ‌هایی برای سوالات رفتاری و فنی آماده کنید
۳. **سوالات خود را آماده کنید**: با پرسیدن درباره نقش و فرهنگ شرکت علاقه نشان دهید
۴. **رزومه خود را مرور کنید**: آماده باشید تا درباره هر تجربه یا مهارت ذکر شده صحبت کنید
۵. **تنظیمات خود را برنامه‌ریزی کنید**: برای مصاحبه‌های مجازی، فناوری خود را تست کنید

آیا می‌خواهید من هر یک از این نکات را تشریح کنم یا به شما در تمرین سوالات خاص کمک کنم؟`;
      }
      
      if (input.includes('رزومه') || input.includes('سی‌وی')) {
        return `آنچه که یک رزومه قوی می‌سازد:

**بخش‌های ضروری:**
• اطلاعات تماس و خلاصه حرفه‌ای
• تجربه کاری با دستاوردهای قابل اندازه‌گیری
• مهارت‌های مرتبط با نقش هدف
• تحصیلات و گواهینامه‌ها

**نکات حرفه‌ای:**
• از افعال عمل و معیارهای خاص استفاده کنید
• رزومه خود را برای هر درخواست تطبیق دهید
• آن را مختصر نگه دارید (حداکثر ۱-۲ صفحه)
• از قالب تمیز و حرفه‌ای استفاده کنید
• کلمات کلیدی از شرح شغل را شامل کنید

آیا می‌خواهید در بخش خاصی از رزومه‌تان کمک کنم؟`;
      }
      
      return `متوجه شدم که درباره "${userInput}" سوال می‌پرسید. در حالی که دوست دارم پاسخ تفصیلی ارائه دهم، می‌توانم در موارد زیر به شما کمک کنم:

• **جستجوی شغل**: یافتن فرصت‌ها، استراتژی‌های درخواست
• **آماده‌سازی مصاحبه**: سوالات رایج، بهترین شیوه‌ها
• **ساخت رزومه**: محتوا، قالب‌بندی، بهینه‌سازی
• **توسعه شغلی**: مهارت‌ها، شبکه‌سازی، مسیرهای رشد
• **مسائل محیط کار**: ارتباطات، عملکرد، فرهنگ

می‌توانید دقیق‌تر بگویید که در کدام جنبه می‌خواهید کمک کنم؟`;
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type === 'user' ? 'You' : 'AI Assistant'}: ${msg.content}\n`
    ).join('\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hr-chat-session.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      content: language === 'en' 
        ? 'Hello! I\'m your AI HR Assistant. How can I help you today?'
        : 'سلام! من دستیار هوش مصنوعی منابع انسانی شما هستم. امروز چگونه می‌توانم کمکتان کنم؟',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'AI Chat Assistant' : 'دستیار چت هوش مصنوعی'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Get instant answers to your HR questions, career advice, and job search guidance from our AI assistant'
              : 'پاسخ فوری به سوالات منابع انسانی، مشاوره شغلی و راهنمایی جستجوی شغل از دستیار هوش مصنوعی ما دریافت کنید'
            }
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Quick Questions' : 'سوالات سریع'}
              </h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 text-sm bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Chat Actions' : 'عملیات چت'}
              </h3>
              <div className="space-y-3">
                <button
                  onClick={exportChat}
                  className="w-full flex items-center gap-2 p-3 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {language === 'en' ? 'Export Chat' : 'خروجی چت'}
                </button>
                <button
                  onClick={clearChat}
                  className="w-full flex items-center gap-2 p-3 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  {language === 'en' ? 'Clear Chat' : 'پاک کردن چت'}
                </button>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-primary p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {language === 'en' ? 'HR AI Assistant' : 'دستیار هوش مصنوعی منابع انسانی'}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {language === 'en' ? 'Online • Ready to help' : 'آنلاین • آماده کمک'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={language === 'en' ? 'Type your message...' : 'پیام خود را تایپ کنید...'}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={toggleListening}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;

