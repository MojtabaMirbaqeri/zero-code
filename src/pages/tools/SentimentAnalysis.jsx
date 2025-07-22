import { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp, TrendingDown, AlertTriangle, Download, RefreshCw, Smile, Frown, Meh } from 'lucide-react';
import { useLanguage } from '../../App';

const SentimentAnalysis = () => {
  const { language } = useLanguage();
  const [inputMethod, setInputMethod] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const analyzeSentiment = async () => {
    if (!textInput && !uploadedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        overallSentiment: {
          score: 0.65,
          label: 'Positive',
          confidence: 0.82
        },
        sentimentBreakdown: {
          positive: 45,
          neutral: 35,
          negative: 20
        },
        emotions: {
          joy: 25,
          trust: 20,
          anticipation: 15,
          surprise: 10,
          fear: 8,
          sadness: 12,
          anger: 6,
          disgust: 4
        },
        keyInsights: [
          {
            category: 'Team Morale',
            sentiment: 'positive',
            score: 0.72,
            highlights: [
              'Team collaboration is highly appreciated',
              'Positive feedback about leadership support',
              'Strong sense of belonging and purpose'
            ]
          },
          {
            category: 'Work Environment',
            sentiment: 'neutral',
            score: 0.55,
            highlights: [
              'Mixed feelings about remote work setup',
              'Office facilities receive moderate ratings',
              'Work-life balance concerns mentioned'
            ]
          },
          {
            category: 'Career Development',
            sentiment: 'negative',
            score: 0.35,
            highlights: [
              'Limited growth opportunities expressed',
              'Training programs need improvement',
              'Unclear career progression paths'
            ]
          },
          {
            category: 'Compensation',
            sentiment: 'positive',
            score: 0.68,
            highlights: [
              'Salary satisfaction is generally high',
              'Benefits package well-received',
              'Performance bonuses appreciated'
            ]
          }
        ],
        trends: {
          timeframe: 'Last 6 months',
          data: [
            { month: 'Jan', positive: 40, neutral: 35, negative: 25 },
            { month: 'Feb', positive: 42, neutral: 33, negative: 25 },
            { month: 'Mar', positive: 38, neutral: 37, negative: 25 },
            { month: 'Apr', positive: 45, neutral: 30, negative: 25 },
            { month: 'May', positive: 47, neutral: 28, negative: 25 },
            { month: 'Jun', positive: 45, neutral: 35, negative: 20 }
          ]
        },
        recommendations: [
          {
            priority: 'high',
            category: 'Career Development',
            action: 'Implement structured career development programs',
            impact: 'Address the most significant concern affecting employee satisfaction'
          },
          {
            priority: 'medium',
            category: 'Work Environment',
            action: 'Conduct detailed survey on remote work preferences',
            impact: 'Optimize work arrangements for better employee experience'
          },
          {
            priority: 'low',
            category: 'Team Morale',
            action: 'Continue current leadership practices',
            impact: 'Maintain the positive team dynamics already in place'
          }
        ],
        riskAreas: [
          'Career development dissatisfaction may lead to increased turnover',
          'Work environment concerns could affect productivity',
          'Need to monitor compensation satisfaction trends'
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-5 h-5" />;
      case 'negative': return <Frown className="w-5 h-5" />;
      case 'neutral': return <Meh className="w-5 h-5" />;
      default: return <Meh className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const downloadReport = () => {
    if (!analysisResults) return;
    
    const report = `
SENTIMENT ANALYSIS REPORT
========================

Overall Sentiment: ${analysisResults.overallSentiment.label} (${(analysisResults.overallSentiment.score * 100).toFixed(1)}%)
Confidence: ${(analysisResults.overallSentiment.confidence * 100).toFixed(1)}%

Sentiment Breakdown:
- Positive: ${analysisResults.sentimentBreakdown.positive}%
- Neutral: ${analysisResults.sentimentBreakdown.neutral}%
- Negative: ${analysisResults.sentimentBreakdown.negative}%

Key Insights:
${analysisResults.keyInsights.map(insight => `
${insight.category} (${insight.sentiment.toUpperCase()}):
${insight.highlights.map(highlight => `  • ${highlight}`).join('\n')}
`).join('\n')}

Recommendations:
${analysisResults.recommendations.map(rec => `
${rec.priority.toUpperCase()} PRIORITY - ${rec.category}:
Action: ${rec.action}
Impact: ${rec.impact}
`).join('\n')}

Risk Areas:
${analysisResults.riskAreas.map(risk => `• ${risk}`).join('\n')}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment-analysis-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Sentiment Analysis for Feedback' : 'تحلیل احساسات برای بازخورد'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Analyze employee feedback, surveys, and reviews to detect team morale, satisfaction levels, and areas of concern'
              : 'بازخورد کارکنان، نظرسنجی‌ها و بررسی‌ها را تحلیل کنید تا روحیه تیم، سطح رضایت و نواحی نگرانی را شناسایی کنید'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Input Method' : 'روش ورودی'}
              </h2>
              
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setInputMethod('text')}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    inputMethod === 'text' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {language === 'en' ? 'Text Input' : 'ورودی متن'}
                </button>
                <button
                  onClick={() => setInputMethod('file')}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    inputMethod === 'file' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {language === 'en' ? 'File Upload' : 'آپلود فایل'}
                </button>
              </div>

              {inputMethod === 'text' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Feedback Text' : 'متن بازخورد'}
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={language === 'en' 
                      ? 'Paste employee feedback, survey responses, or reviews here...'
                      : 'بازخورد کارکنان، پاسخ‌های نظرسنجی یا بررسی‌ها را اینجا قرار دهید...'
                    }
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Upload File' : 'آپلود فایل'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {language === 'en' 
                        ? 'Drop feedback file here or click to browse'
                        : 'فایل بازخورد را اینجا بکشید یا کلیک کنید'
                      }
                    </p>
                    <input
                      type="file"
                      accept=".txt,.csv,.xlsx,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="feedback-upload"
                    />
                    <label
                      htmlFor="feedback-upload"
                      className="inline-block px-6 py-3 bg-gradient-primary text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      {language === 'en' ? 'Choose File' : 'انتخاب فایل'}
                    </label>
                    {uploadedFile && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                        <FileText className="w-5 h-5" />
                        <span>{uploadedFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={analyzeSentiment}
                disabled={(inputMethod === 'text' && !textInput.trim()) || (inputMethod === 'file' && !uploadedFile) || isAnalyzing}
                className="w-full mt-6 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {language === 'en' ? 'Analyzing...' : 'در حال تحلیل...'}
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    {language === 'en' ? 'Analyze Sentiment' : 'تحلیل احساسات'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {analysisResults ? (
              <div className="space-y-6">
                {/* Overall Sentiment */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Sentiment Analysis Results' : 'نتایج تحلیل احساسات'}
                    </h2>
                    <button
                      onClick={downloadReport}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {language === 'en' ? 'Download Report' : 'دانلود گزارش'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${getSentimentColor(analysisResults.overallSentiment.label.toLowerCase())}`}>
                        {getSentimentIcon(analysisResults.overallSentiment.label.toLowerCase())}
                        <span className="font-bold text-lg">{analysisResults.overallSentiment.label}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {language === 'en' ? 'Overall Sentiment' : 'احساسات کلی'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {(analysisResults.overallSentiment.score * 100).toFixed(1)}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Sentiment Score' : 'امتیاز احساسات'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {(analysisResults.overallSentiment.confidence * 100).toFixed(1)}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Confidence' : 'اطمینان'}
                      </p>
                    </div>
                  </div>

                  {/* Sentiment Breakdown */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {analysisResults.sentimentBreakdown.positive}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Positive' : 'مثبت'}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {analysisResults.sentimentBreakdown.neutral}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Neutral' : 'خنثی'}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {analysisResults.sentimentBreakdown.negative}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Negative' : 'منفی'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Key Insights by Category' : 'بینش‌های کلیدی بر اساس دسته‌بندی'}
                  </h3>
                  <div className="space-y-4">
                    {analysisResults.keyInsights.map((insight, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {insight.category}
                          </h4>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getSentimentColor(insight.sentiment)}`}>
                            {getSentimentIcon(insight.sentiment)}
                            <span className="text-sm font-medium">
                              {(insight.score * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <ul className="space-y-1">
                          {insight.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Action Recommendations' : 'توصیه‌های اقدام'}
                  </h3>
                  <div className="space-y-4">
                    {analysisResults.recommendations.map((rec, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                                {rec.priority.toUpperCase()} {language === 'en' ? 'PRIORITY' : 'اولویت'}
                              </span>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {rec.category}
                              </h4>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              <strong>{language === 'en' ? 'Action:' : 'اقدام:'}</strong> {rec.action}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>{language === 'en' ? 'Impact:' : 'تأثیر:'}</strong> {rec.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Areas */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    {language === 'en' ? 'Risk Areas' : 'نواحی خطر'}
                  </h3>
                  <div className="space-y-3">
                    {analysisResults.riskAreas.map((risk, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotion Analysis */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Emotion Breakdown' : 'تجزیه احساسات'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(analysisResults.emotions).map(([emotion, percentage]) => (
                      <div key={emotion} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {percentage}%
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {emotion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Ready to Analyze Feedback?' : 'آماده تحلیل بازخورد هستید؟'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Input employee feedback, survey responses, or reviews to get detailed sentiment analysis and actionable insights'
                    : 'بازخورد کارکنان، پاسخ‌های نظرسنجی یا بررسی‌ها را وارد کنید تا تحلیل احساسات تفصیلی و بینش‌های قابل اجرا دریافت کنید'
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

export default SentimentAnalysis;

