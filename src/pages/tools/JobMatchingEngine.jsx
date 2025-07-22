import { useState } from 'react';
import { Upload, FileText, Star, TrendingUp, Download, Share2, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../App';
import api from '../../lib/api';

const JobMatchingEngine = () => {
  const { language } = useLanguage();
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState({
    location: '',
    salaryRange: '',
    jobType: '',
    industry: '',
    experience: ''
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setResumeText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const analyzeResume = async () => {
    if (!resumeFile) {
      setError(language === 'en' ? 'Please upload a resume file.' : 'لطفاً یک فایل رزومه آپلود کنید.');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const response = await api.post('/job-matching-engine', {
        resumeText: resumeText,
        preferences: preferences,
        language: language,
      });
      setResults(response.data); // Assuming API returns { matches: [...], profile: {...} }
    } catch (err) {
      console.error('Error analyzing resume:', err);
      setError(language === 'en' ? 'Failed to analyze resume. Please try again.' : 'خطا در تحلیل رزومه. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Job Matching Engine' : 'موتور تطبیق شغل'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Upload your resume and get AI-powered job recommendations with detailed match analysis'
              : 'رزومه خود را آپلود کنید و توصیه‌های شغلی مبتنی بر هوش مصنوعی با تحلیل تطبیق دقیق دریافت کنید'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Upload Resume' : 'آپلود رزومه'}
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'en' 
                    ? 'Drop your resume here or click to browse' 
                    : 'رزومه خود را اینجا بکشید یا کلیک کنید'
                  }
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-block px-6 py-3 bg-gradient-primary text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                >
                  {language === 'en' ? 'Choose File' : 'انتخاب فایل'}
                </label>
                {resumeFile && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                    <FileText className="w-5 h-5" />
                    <span>{resumeFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Preferences */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Job Preferences' : 'ترجیحات شغلی'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Preferred Location' : 'مکان مورد نظر'}
                  </label>
                  <input
                    type="text"
                    value={preferences.location}
                    onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                    placeholder={language === 'en' ? 'e.g., San Francisco, Remote' : 'مثال: تهران، از راه دور'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Salary Range' : 'محدوده حقوق'}
                  </label>
                  <select
                    value={preferences.salaryRange}
                    onChange={(e) => setPreferences({...preferences, salaryRange: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? 'Select range' : 'انتخاب محدوده'}</option>
                    <option value="50k-80k">$50,000 - $80,000</option>
                    <option value="80k-120k">$80,000 - $120,000</option>
                    <option value="120k-160k">$120,000 - $160,000</option>
                    <option value="160k+">$160,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Job Type' : 'نوع شغل'}
                  </label>
                  <select
                    value={preferences.jobType}
                    onChange={(e) => setPreferences({...preferences, jobType: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? 'Select type' : 'انتخاب نوع'}</option>
                    <option value="full-time">{language === 'en' ? 'Full-time' : 'تمام وقت'}</option>
                    <option value="part-time">{language === 'en' ? 'Part-time' : 'پاره وقت'}</option>
                    <option value="contract">{language === 'en' ? 'Contract' : 'قراردادی'}</option>
                    <option value="freelance">{language === 'en' ? 'Freelance' : 'آزاد'}</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={analyzeResume}
                disabled={!resumeFile || isAnalyzing}
                className="w-full mt-6 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {language === 'en' ? 'Analyzing...' : 'در حال تحلیل...'}
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    {language === 'en' ? 'Find Matches' : 'یافتن تطبیق‌ها'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6">
                {/* Profile Summary */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === 'en' ? 'Profile Analysis' : 'تحلیل پروفایل'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {language === 'en' ? 'Key Skills' : 'مهارت‌های کلیدی'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {results.profile.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {language === 'en' ? 'Recommendations' : 'توصیه‌ها'}
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {results.profile.recommendations.map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Job Matches */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Job Matches' : 'تطبیق‌های شغلی'}
                    </h3>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {results.matches.map(job => (
                    <div key={job.id} className="glass rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {job.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {job.company} • {job.location}
                          </p>
                          <p className="text-green-600 font-semibold">{job.salary}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full font-bold ${getScoreColor(job.matchScore)}`}>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {job.matchScore}%
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {language === 'en' ? 'Required Skills' : 'مهارت‌های مورد نیاز'}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                              <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {language === 'en' ? 'Benefits' : 'مزایا'}
                          </h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400">
                            {job.benefits.map((benefit, index) => (
                              <li key={index}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {language === 'en' ? 'Why this matches' : 'چرا این مناسب است'}
                        </h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {job.reasons.map((reason, index) => (
                            <li key={index}>• {reason}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button className="flex-1 px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                          {language === 'en' ? 'Apply Now' : 'اکنون درخواست دهید'}
                        </button>
                        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          {language === 'en' ? 'Save Job' : 'ذخیره شغل'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Ready to Find Your Perfect Job?' : 'آماده پیدا کردن شغل ایده‌آل خود هستید؟'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Upload your resume to get personalized job recommendations with detailed match analysis'
                    : 'رزومه خود را آپلود کنید تا توصیه‌های شغلی شخصی‌سازی شده با تحلیل تطبیق دقیق دریافت کنید'
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

export default JobMatchingEngine;

