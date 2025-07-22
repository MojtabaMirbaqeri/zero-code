import { useState } from 'react';
import { FileText, Sparkles, Copy, Download, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useLanguage } from '../../App';

const JobDescriptionMaker = () => {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    jobType: '',
    experience: '',
    skills: '',
    responsibilities: '',
    benefits: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDescription = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult = `
# ${formData.jobTitle}

## About the Role
We are seeking a talented ${formData.jobTitle} to join our dynamic team at ${formData.company}. This is an exciting opportunity to work in a ${formData.jobType} capacity from our ${formData.location} location.

## Key Responsibilities
- Lead and manage complex projects from conception to completion
- Collaborate with cross-functional teams to deliver high-quality solutions
- Mentor junior team members and contribute to team growth
- Stay updated with industry trends and best practices
- ${formData.responsibilities}

## Required Skills & Experience
- ${formData.experience} years of relevant experience
- Strong expertise in ${formData.skills}
- Excellent communication and leadership skills
- Problem-solving mindset with attention to detail
- Bachelor's degree in relevant field or equivalent experience

## What We Offer
- Competitive salary and performance bonuses
- Comprehensive health and dental coverage
- Flexible working arrangements
- Professional development opportunities
- ${formData.benefits}

## How to Apply
Send your resume and cover letter to our HR team. We look forward to hearing from you!
    `;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Job Description Maker' : 'سازنده شرح شغل'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Create compelling job descriptions with proper tone, keywords, and formatting'
              : 'ایجاد شرح شغل جذاب با لحن، کلمات کلیدی و قالب‌بندی مناسب'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="glass rounded-2xl p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Job Title' : 'عنوان شغل'}
                  </label>
                  <Input
                    type="text"
                    placeholder={language === 'en' ? 'e.g., Senior Software Engineer' : 'مثال: مهندس نرم‌افزار ارشد'}
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="glass"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Company Name' : 'نام شرکت'}
                  </label>
                  <Input
                    type="text"
                    placeholder={language === 'en' ? 'e.g., Tech Innovations Inc.' : 'مثال: شرکت نوآوری‌های فناوری'}
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="glass"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Location' : 'مکان'}
                  </label>
                  <Input
                    type="text"
                    placeholder={language === 'en' ? 'e.g., San Francisco, CA' : 'مثال: تهران، ایران'}
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="glass"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Job Type' : 'نوع شغل'}
                  </label>
                  <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder={language === 'en' ? 'Select job type' : 'انتخاب نوع شغل'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">{language === 'en' ? 'Full-time' : 'تمام وقت'}</SelectItem>
                      <SelectItem value="part-time">{language === 'en' ? 'Part-time' : 'پاره وقت'}</SelectItem>
                      <SelectItem value="contract">{language === 'en' ? 'Contract' : 'قراردادی'}</SelectItem>
                      <SelectItem value="remote">{language === 'en' ? 'Remote' : 'از راه دور'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Required Experience' : 'تجربه مورد نیاز'}
                </label>
                <Input
                  type="text"
                  placeholder={language === 'en' ? 'e.g., 3-5 years' : 'مثال: ۳-۵ سال'}
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="glass"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Key Skills' : 'مهارت‌های کلیدی'}
                </label>
                <Textarea
                  placeholder={language === 'en' ? 'e.g., React, Node.js, Python, AWS...' : 'مثال: React، Node.js، Python، AWS...'}
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="glass"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Additional Responsibilities' : 'مسئولیت‌های اضافی'}
                </label>
                <Textarea
                  placeholder={language === 'en' ? 'Any specific responsibilities...' : 'مسئولیت‌های خاص...'}
                  value={formData.responsibilities}
                  onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                  className="glass"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Benefits & Perks' : 'مزایا و امتیازات'}
                </label>
                <Textarea
                  placeholder={language === 'en' ? 'e.g., Stock options, gym membership...' : 'مثال: سهام شرکت، عضویت باشگاه...'}
                  value={formData.benefits}
                  onChange={(e) => handleInputChange('benefits', e.target.value)}
                  className="glass"
                  rows={3}
                />
              </div>

              <Button
                onClick={generateDescription}
                disabled={!formData.jobTitle || !formData.company || isGenerating}
                className="w-full glass hover:bg-white/20 group"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    {language === 'en' ? 'Generating...' : 'در حال تولید...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    {language === 'en' ? 'Generate Job Description' : 'تولید شرح شغل'}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Result */}
          <div className="glass rounded-2xl p-8">
            {result ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Generated Job Description' : 'شرح شغل تولید شده'}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(result)} className="glass">
                      <Copy className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Copy' : 'کپی'}
                    </Button>
                    <Button variant="outline" className="glass">
                      <Download className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Download' : 'دانلود'}
                    </Button>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {result}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Fill out the form to generate a professional job description'
                    : 'فرم را پر کنید تا شرح شغل حرفه‌ای تولید شود'
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

export default JobDescriptionMaker;

