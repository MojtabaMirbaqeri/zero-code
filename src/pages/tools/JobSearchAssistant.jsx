import { useState } from 'react';
import { Search, Sparkles, RefreshCw, Copy, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { useLanguage } from '../../App';
import api from '../../lib/api';

const JobSearchAssistant = () => {
  const { language } = useLanguage();

  const [resumeText, setResumeText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsSearching(true);
    setError(null);
    setResults('');

    try {
      // This API call will simulate finding jobs based on resume text.
      // A real implementation would require a backend service to crawl job sites.
      const response = await api.post('/job-search-assistant', {
        resume: resumeText,
        language: language,
      });
      setResults(response.data.matchingJobs); // Assuming API returns { matchingJobs: "..." }
    } catch (err) {
      console.error('Error finding matching jobs:', err);
      setError(language === 'en' ? 'Failed to find matching jobs. Please try again.' : 'خطا در یافتن مشاغل مطابق. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSearching(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadResults = () => {
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'matching-jobs.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Job Search Assistant' : 'دستیار جستجوی شغل'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Find matching jobs based on your resume' 
              : 'یافتن مشاغل مطابق با رزومه شما'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="glass rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Paste your Resume Text' : 'متن رزومه خود را اینجا وارد کنید'}
                </label>
                <Textarea
                  placeholder={language === 'en' ? 'e.g., John Doe, Software Engineer with 5 years of experience...' : 'مثال: جان دو، مهندس نرم‌افزار با ۵ سال تجربه...'}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="glass"
                  rows={10}
                />
              </div>

              <Button
                onClick={handleSearch}
                disabled={!resumeText || isSearching}
                className="w-full glass hover:bg-white/20 group"
                size="lg"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    {language === 'en' ? 'Searching...' : 'در حال جستجو...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    {language === 'en' ? 'Find Matching Jobs' : 'یافتن مشاغل مطابق'}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="glass rounded-2xl p-8">
            {error && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                {error}
              </div>
            )}
            {results ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Matching Jobs' : 'مشاغل مطابق'}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => copyToClipboard(results)} className="glass">
                      <Copy className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Copy' : 'کپی'}
                    </Button>
                    <Button variant="outline" onClick={downloadResults} className="glass">
                      <Download className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Download' : 'دانلود'}
                    </Button>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {results}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Enter your resume text to find matching jobs' 
                    : 'متن رزومه خود را وارد کنید تا مشاغل مطابق را پیدا کنید'
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

export default JobSearchAssistant;

