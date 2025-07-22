import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useLanguage } from '../App';

// Translation data
const translations = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    form: {
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.'
    },
    info: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address'
    },
    contactInfo: {
      email: 'contact@hr-tech-ai-hub.com',
      phone: '+1 (555) 123-4567',
      address: '123 Innovation Street, Tech City, TC 12345'
    },
    description: 'Have questions about our AI tools or need support? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
  },
  fa: {
    title: 'تماس با ما',
    subtitle: 'با تیم ما در ارتباط باشید',
    form: {
      name: 'نام کامل',
      email: 'آدرس ایمیل',
      subject: 'موضوع',
      message: 'پیام',
      send: 'ارسال پیام',
      sending: 'در حال ارسال...',
      success: 'پیام با موفقیت ارسال شد!',
      error: 'ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید.'
    },
    info: {
      email: 'ایمیل',
      phone: 'تلفن',
      address: 'آدرس'
    },
    contactInfo: {
      email: 'contact@hr-tech-ai-hub.com',
      phone: '+1 (555) 123-4567',
      address: '۱۲۳ خیابان نوآوری، شهر فناوری، TC 12345'
    },
    description: 'سوالی درباره ابزارهای هوش مصنوعی ما دارید یا به پشتیبانی نیاز دارید؟ دوست داریم از شما بشنویم. پیامی برای ما ارسال کنید و ما در اسرع وقت پاسخ خواهیم داد.'
  }
};

const ContactPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t.info.email,
      value: t.contactInfo.email,
      href: `mailto:${t.contactInfo.email}`,
      gradient: 'gradient-primary'
    },
    {
      icon: Phone,
      label: t.info.phone,
      value: t.contactInfo.phone,
      href: `tel:${t.contactInfo.phone}`,
      gradient: 'gradient-secondary'
    },
    {
      icon: MapPin,
      label: t.info.address,
      value: t.contactInfo.address,
      href: '#',
      gradient: 'gradient-accent'
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            {t.subtitle}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.name}
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="glass"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.email}
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="glass"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.subject}
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="glass"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.message}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="glass"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full glass hover:bg-white/20 group"
                size="lg"
              >
                {isSubmitting ? (
                  t.form.sending
                ) : (
                  <>
                    {t.form.send}
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-300 text-sm">
                    {t.form.success}
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-300 text-sm">
                    {t.form.error}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  className="glass rounded-xl p-6 flex items-center space-x-4 hover:bg-white/20 transition-all duration-300 group block"
                >
                  <div className={`w-12 h-12 ${info.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {info.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.value}
                    </p>
                  </div>
                </a>
              );
            })}

            {/* Additional Info */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Office Hours' : 'ساعات کاری'}
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p>{language === 'en' ? 'Monday - Friday: 9:00 AM - 6:00 PM' : 'دوشنبه - جمعه: ۹:۰۰ - ۱۸:۰۰'}</p>
                <p>{language === 'en' ? 'Saturday: 10:00 AM - 4:00 PM' : 'شنبه: ۱۰:۰۰ - ۱۶:۰۰'}</p>
                <p>{language === 'en' ? 'Sunday: Closed' : 'یکشنبه: تعطیل'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default ContactPage;

