import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Download, RefreshCw, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../App';
import api from '../../lib/api';

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
  const [error, setError] = useState(null);
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

  const buildPrompt = (messageContent, type) => {
    // This is a simplified version based on the user's Python example.
    // In a real scenario, this would be more complex and specific to each tool.
    if (type === 'chat') {
      return `HR Assistant Query:\n${messageContent}\n\nProvide a helpful and concise response.`;
    }
    return messageContent;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      const promptContent = buildPrompt(currentMessage, 'chat');

      const response = await api.post('/', {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: language === 'en' 
              ? 'You are an expert HR assistant. Help users with job search, career advice, interview preparation, resume building, and HR-related questions. Provide practical, actionable advice.'
              : 'شما یک دستیار متخصص منابع انسانی هستید. به کاربران در جستجوی شغل، مشاوره شغلی، آماده‌سازی مصاحبه، ساخت رزومه و سوالات مرتبط با منابع انسانی کمک کنید. مشاوره‌های عملی و قابل اجرا ارائه دهید.'
          },
          {
            role: 'user',
            content: promptContent
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      const botResponse = response.data.choices[0].message.content;
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error sending message to AI chat assistant:', err);
      setError(language === 'en' ? 'Failed to get a response from the AI assistant. Please try again.' : 'خطا در دریافت پاسخ از دستیار هوش مصنوعی. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsTyping(false);
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
    setError(null);
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
                {error && (
                  <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
                    {error}
                  </div>
                )}
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
                    disabled={!inputMessage.trim() || isTyping}
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


