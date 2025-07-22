import { useState } from 'react';
import { Briefcase, Sparkles, Copy, Download, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useLanguage } from '../../App';
import api from '../../lib/api'; // Import the API utility

// Translation data
const translations = {
  en: {
    title: 'Job Title Optimization',
    subtitle: 'Generate SEO-friendly and compelling job titles that attract the right candidates',
    form: {
      jobTitle: 'Current Job Title',
      jobTitlePlaceholder: 'e.g., Software Developer',
      industry: 'Industry',
      industryPlaceholder: 'Select industry',
      experience: 'Experience Level',
      experiencePlaceholder: 'Select experience level',
      location: 'Location Type',
      locationPlaceholder: 'Select location type',
      keywords: 'Additional Keywords',
      keywordsPlaceholder: 'e.g., React, Node.js, Full-stack (optional)',
      generate: 'Generate Optimized Titles',
      generating: 'Generating...'
    },
    industries: {
      technology: 'Technology',
      healthcare: 'Healthcare',
      finance: 'Finance',
      education: 'Education',
      retail: 'Retail',
      manufacturing: 'Manufacturing',
      consulting: 'Consulting',
      marketing: 'Marketing',
      sales: 'Sales',
      other: 'Other'
    },
    experienceLevels: {
      entry: 'Entry Level',
      mid: 'Mid Level',
      senior: 'Senior Level',
      lead: 'Lead/Principal',
      executive: 'Executive'
    },
    locationTypes: {
      onsite: 'On-site',
      remote: 'Remote',
      hybrid: 'Hybrid',
      flexible: 'Flexible'
    },
    results: {
      title: 'Optimized Job Titles',
      subtitle: 'Here are AI-generated, SEO-optimized job titles for your position',
      copy: 'Copy',
      copyAll: 'Copy All',
      download: 'Download as Text',
      regenerate: 'Generate More',
      seoScore: 'SEO Score',
      explanation: 'Why this works'
    },
    tips: {
      title: 'Optimization Tips',
      tip1: 'Include relevant keywords that candidates search for',
      tip2: 'Be specific about the role and level',
      tip3: 'Mention location type if it\'s a key selling point',
      tip4: 'Keep titles concise but descriptive',
      tip5: 'Use industry-standard terminology'
    }
  },
  fa: {
    title: 'بهینه‌سازی عنوان شغل',
    subtitle: 'تولید عناوین شغلی سازگار با سئو و جذاب که کاندیداهای مناسب را جذب می‌کند',
    form: {
      jobTitle: 'عنوان شغل فعلی',
      jobTitlePlaceholder: 'مثال: توسعه‌دهنده نرم‌افزار',
      industry: 'صنعت',
      industryPlaceholder: 'انتخاب صنعت',
      experience: 'سطح تجربه',
      experiencePlaceholder: 'انتخاب سطح تجربه',
      location: 'نوع مکان',
      locationPlaceholder: 'انتخاب نوع مکان',
      keywords: 'کلمات کلیدی اضافی',
      keywordsPlaceholder: 'مثال: React، Node.js، Full-stack (اختیاری)',
      generate: 'تولید عناوین بهینه‌شده',
      generating: 'در حال تولید...'
    },
    industries: {
      technology: 'فناوری',
      healthcare: 'بهداشت و درمان',
      finance: 'مالی',
      education: 'آموزش',
      retail: 'خرده‌فروشی',
      manufacturing: 'تولید',
      consulting: 'مشاوره',
      marketing: 'بازاریابی',
      sales: 'فروش',
      other: 'سایر'
    },
    experienceLevels: {
      entry: 'سطح مبتدی',
      mid: 'سطح متوسط',
      senior: 'سطح ارشد',
      lead: 'رهبری/اصلی',
      executive: 'مدیریتی'
    },
    locationTypes: {
      onsite: 'حضوری',
      remote: 'از راه دور',
      hybrid: 'ترکیبی',
      flexible: 'انعطاف‌پذیر'
    },
    results: {
      title: 'عناوین شغلی بهینه‌شده',
      subtitle: 'در اینجا عناوین شغلی تولید شده توسط هوش مصنوعی و بهینه‌شده برای سئو برای موقعیت شما آمده است',
      copy: 'کپی',
      copyAll: 'کپی همه',
      download: 'دانلود به عنوان متن',
      regenerate: 'تولید بیشتر',
      seoScore: 'امتیاز سئو',
      explanation: 'چرا این کار می‌کند'
    },
    tips: {
      title: 'نکات بهینه‌سازی',
      tip1: 'کلمات کلیدی مرتبطی که کاندیداها جستجو می‌کنند را شامل کنید',
      tip2: 'در مورد نقش و سطح مشخص باشید',
      tip3: 'اگر نوع مکان نکته فروش کلیدی است، آن را ذکر کنید',
      tip4: 'عناوین را مختصر اما توصیفی نگه دارید',
      tip5: 'از اصطلاحات استاندارد صنعت استفاده کنید'
    }
  }
};

const JobTitleOptimizer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    experience: '',
    location: '',
    keywords: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateTitles = async () => {
    setIsGenerating(true);
    setError(null);
    setResults([]);

    try {
      const response = await api.post('/job-title-optimization', {
        jobTitle: formData.jobTitle,
        industry: formData.industry,
        experience: formData.experience,
        location: formData.location,
        keywords: formData.keywords,
      });
      setResults(response.data.optimizedTitles); // Assuming API returns { optimizedTitles: [...] }
    } catch (err) {
      console.error('Error generating job titles:', err);
      setError(language === 'en' ? 'Failed to generate job titles. Please try again.' : 'خطا در تولید عناوین شغلی. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllTitles = () => {
    const allTitles = results.map(result => result.title).join('\n');
    navigator.clipboard.writeText(allTitles);
  };

  const downloadResults = () => {
    const content = results.map((result, index) => 
      `${index + 1}. ${result.title}\n   SEO Score: ${result.seoScore}/100\n   ${result.explanation}\n`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-job-titles.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.jobTitle}
                  </label>
                  <Input
                    type="text"
                    placeholder={t.form.jobTitlePlaceholder}
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="glass"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.form.industry}
                    </label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger className="glass">
                        <SelectValue placeholder={t.form.industryPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.industries).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.form.experience}
                    </label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="glass">
                        <SelectValue placeholder={t.form.experiencePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.experienceLevels).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.location}
                  </label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder={t.form.locationPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.locationTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.keywords}
                  </label>
                  <Input
                    type="text"
                    placeholder={t.form.keywordsPlaceholder}
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    className="glass"
                  />
                </div>

                <Button
                  onClick={generateTitles}
                  disabled={!formData.jobTitle || isGenerating}
                  className="w-full glass hover:bg-white/20 group"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      {t.form.generating}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      {t.form.generate}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Tips Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.tips.title}
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t.tips.tip1}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t.tips.tip2}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t.tips.tip3}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t.tips.tip4}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t.tips.tip5}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-12">
            <div className="glass rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t.results.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t.results.subtitle}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={copyAllTitles} className="glass">
                    <Copy className="w-4 h-4 mr-2" />
                    {t.results.copyAll}
                  </Button>
                  <Button variant="outline" onClick={downloadResults} className="glass">
                    <Download className="w-4 h-4 mr-2" />
                    {t.results.download}
                  </Button>
                  <Button variant="outline" onClick={generateTitles} className="glass">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t.results.regenerate}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-2 ml-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t.results.seoScore}: <span className="font-semibold text-green-600">{result.seoScore}/100</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(result.title)}
                          className="glass"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{t.results.explanation}:</span> {result.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTitleOptimizer;

