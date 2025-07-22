import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Upload, Download, RefreshCw, Eye, Users, Scale } from 'lucide-react';
import { useLanguage } from '../../App';

const BiasDetector = () => {
  const { language } = useLanguage();
  const [analysisType, setAnalysisType] = useState('job_description');
  const [textInput, setTextInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const analysisTypes = [
    { 
      value: 'job_description', 
      label: language === 'en' ? 'Job Description' : 'شرح شغل',
      icon: <FileText className="w-5 h-5" />
    },
    { 
      value: 'interview_questions', 
      label: language === 'en' ? 'Interview Questions' : 'سوالات مصاحبه',
      icon: <Users className="w-5 h-5" />
    },
    { 
      value: 'evaluation_criteria', 
      label: language === 'en' ? 'Evaluation Criteria' : 'معیارهای ارزیابی',
      icon: <Scale className="w-5 h-5" />
    },
    { 
      value: 'company_policy', 
      label: language === 'en' ? 'Company Policy' : 'سیاست شرکت',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const analyzeBias = async () => {
    if (!textInput && !uploadedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        overallScore: 72,
        riskLevel: 'medium',
        biasCategories: {
          gender: {
            score: 65,
            risk: 'medium',
            issues: [
              'Use of gendered language: "rockstar", "ninja"',
              'Masculine-coded words: "aggressive", "competitive"',
              'Potential exclusion of caregivers with "flexible schedule" requirements'
            ],
            suggestions: [
              'Replace "rockstar" with "skilled professional"',
              'Use "collaborative" instead of "competitive"',
              'Emphasize work-life balance support'
            ]
          },
          age: {
            score: 80,
            risk: 'low',
            issues: [
              'Preference for "digital natives" may exclude older candidates',
              'Emphasis on "recent graduates" could be age-discriminatory'
            ],
            suggestions: [
              'Focus on skills rather than generational terms',
              'Include "all experience levels welcome"'
            ]
          },
          race: {
            score: 85,
            risk: 'low',
            issues: [
              'Cultural fit requirements may favor certain backgrounds'
            ],
            suggestions: [
              'Define specific behavioral competencies instead of "cultural fit"',
              'Use inclusive language about diverse perspectives'
            ]
          },
          disability: {
            score: 60,
            risk: 'high',
            issues: [
              'Physical requirements not essential to job function',
              'No mention of accommodation availability',
              'Ableist language: "stand for long periods", "perfect vision"'
            ],
            suggestions: [
              'Remove non-essential physical requirements',
              'Add accommodation statement',
              'Use inclusive language about abilities'
            ]
          },
          socioeconomic: {
            score: 70,
            risk: 'medium',
            issues: [
              'Unpaid internship requirements may exclude lower-income candidates',
              'Expensive certification requirements',
              'Location requirements without remote options'
            ],
            suggestions: [
              'Offer paid internships or alternative pathways',
              'Provide certification training or accept equivalent experience',
              'Consider remote work options'
            ]
          },
          education: {
            score: 55,
            risk: 'high',
            issues: [
              'Unnecessary degree requirements for skill-based role',
              'Preference for "prestigious universities"',
              'No consideration for alternative education paths'
            ],
            suggestions: [
              'Focus on skills and experience over degrees',
              'Remove university prestige requirements',
              'Include "or equivalent experience" language'
            ]
          }
        },
        detectedPhrases: [
          {
            phrase: 'Recent college graduate',
            category: 'age',
            severity: 'medium',
            explanation: language === 'en' 
              ? 'May discriminate against older candidates or career changers'
              : 'ممکن است علیه کاندیداهای مسن‌تر یا تغییر شغل دهندگان تبعیض قائل شود',
            suggestion: language === 'en' 
              ? 'Use "entry-level professional" or "early career"'
              : 'از "حرفه‌ای سطح ورودی" یا "اوایل حرفه" استفاده کنید'
          },
          {
            phrase: 'Must be able to lift 50 pounds',
            category: 'disability',
            severity: 'high',
            explanation: language === 'en' 
              ? 'Physical requirement may not be essential for the role'
              : 'الزام فیزیکی ممکن است برای نقش ضروری نباشد',
            suggestion: language === 'en' 
              ? 'Only include if essential to job function, offer accommodations'
              : 'فقط در صورت ضروری بودن برای عملکرد شغل اضافه کنید، تسهیلات ارائه دهید'
          },
          {
            phrase: 'Native English speaker',
            category: 'race',
            severity: 'high',
            explanation: language === 'en' 
              ? 'May discriminate against non-native speakers with excellent English skills'
              : 'ممکن است علیه غیر بومی‌هایی که مهارت انگلیسی عالی دارند تبعیض قائل شود',
            suggestion: language === 'en' 
              ? 'Use "excellent English communication skills"'
              : 'از "مهارت‌های ارتباطی عالی انگلیسی" استفاده کنید'
          }
        ],
        recommendations: [
          {
            priority: 'high',
            category: 'Language Review',
            action: 'Remove or replace biased language identified in the analysis',
            impact: 'Significantly improve inclusivity and reduce legal risk'
          },
          {
            priority: 'high',
            category: 'Requirements Audit',
            action: 'Review all requirements to ensure they are essential for job performance',
            impact: 'Expand candidate pool and reduce discrimination risk'
          },
          {
            priority: 'medium',
            category: 'Inclusive Statements',
            action: 'Add explicit diversity and inclusion statements',
            impact: 'Signal commitment to equality and attract diverse candidates'
          },
          {
            priority: 'medium',
            category: 'Alternative Pathways',
            action: 'Include "or equivalent experience" for education and certification requirements',
            impact: 'Open opportunities for non-traditional candidates'
          },
          {
            priority: 'low',
            category: 'Regular Review',
            action: 'Establish process for regular bias review of all recruitment materials',
            impact: 'Maintain long-term commitment to fair hiring practices'
          }
        ],
        improvementSuggestions: {
          before: textInput || 'Sample job description text...',
          after: `We are seeking a skilled Software Engineer to join our collaborative team. 

Key Responsibilities:
• Develop and maintain web applications
• Collaborate with cross-functional teams
• Participate in code reviews and technical discussions

Requirements:
• 3+ years of software development experience OR equivalent demonstrated skills
• Proficiency in JavaScript, React, and Node.js
• Strong problem-solving and communication abilities
• Bachelor's degree in Computer Science or equivalent experience

We welcome candidates from all backgrounds and are committed to creating an inclusive workplace. Reasonable accommodations are available for all aspects of the hiring process.

This position offers flexible work arrangements including remote options.`
        },
        complianceCheck: {
          eeoc: true,
          ada: false,
          titleVii: true,
          adea: false
        }
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <Eye className="w-5 h-5" />;
      case 'low': return <CheckCircle className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
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
RECRUITMENT BIAS ANALYSIS REPORT
===============================

Overall Bias Score: ${analysisResults.overallScore}/100
Risk Level: ${analysisResults.riskLevel.toUpperCase()}

BIAS CATEGORY ANALYSIS:
${Object.entries(analysisResults.biasCategories).map(([category, data]) => `
${category.toUpperCase()} BIAS:
Score: ${data.score}/100 (${data.risk} risk)

Issues Identified:
${data.issues.map(issue => `• ${issue}`).join('\n')}

Suggestions:
${data.suggestions.map(suggestion => `• ${suggestion}`).join('\n')}
`).join('\n')}

DETECTED PROBLEMATIC PHRASES:
${analysisResults.detectedPhrases.map(phrase => `
"${phrase.phrase}" (${phrase.category} bias - ${phrase.severity} severity)
Issue: ${phrase.explanation}
Suggestion: ${phrase.suggestion}
`).join('\n')}

RECOMMENDATIONS:
${analysisResults.recommendations.map(rec => `
${rec.priority.toUpperCase()} PRIORITY - ${rec.category}:
Action: ${rec.action}
Impact: ${rec.impact}
`).join('\n')}

COMPLIANCE CHECK:
• EEOC Guidelines: ${analysisResults.complianceCheck.eeoc ? 'COMPLIANT' : 'NON-COMPLIANT'}
• ADA Requirements: ${analysisResults.complianceCheck.ada ? 'COMPLIANT' : 'NON-COMPLIANT'}
• Title VII: ${analysisResults.complianceCheck.titleVii ? 'COMPLIANT' : 'NON-COMPLIANT'}
• ADEA: ${analysisResults.complianceCheck.adea ? 'COMPLIANT' : 'NON-COMPLIANT'}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bias-analysis-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Recruitment Bias Detector' : 'تشخیص‌دهنده تعصب در استخدام'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Analyze job descriptions, interview processes, and hiring materials to identify and eliminate unconscious bias'
              : 'شرح شغل، فرآیندهای مصاحبه و مواد استخدام را تحلیل کنید تا تعصبات ناخودآگاه را شناسایی و حذف کنید'
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
                {language === 'en' ? 'Analysis Setup' : 'تنظیمات تحلیل'}
              </h2>
              
              {/* Analysis Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {language === 'en' ? 'Content Type' : 'نوع محتوا'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {analysisTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => setAnalysisType(type.value)}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-colors text-sm ${
                        analysisType === type.value
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Method */}
              <div className="mb-6">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setUploadedFile(null)}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm ${
                      !uploadedFile 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {language === 'en' ? 'Text Input' : 'ورودی متن'}
                  </button>
                  <button
                    onClick={() => document.getElementById('file-upload').click()}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm ${
                      uploadedFile 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {language === 'en' ? 'File Upload' : 'آپلود فایل'}
                  </button>
                </div>

                {!uploadedFile ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Content to Analyze' : 'محتوا برای تحلیل'}
                    </label>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder={language === 'en' 
                        ? 'Paste your job description, interview questions, or other recruitment content here...'
                        : 'شرح شغل، سوالات مصاحبه یا سایر محتوای استخدام را اینجا قرار دهید...'
                      }
                      rows={12}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center bg-green-50 dark:bg-green-900/20">
                    <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-700 dark:text-green-300 font-medium">{uploadedFile.name}</p>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-sm text-green-600 hover:text-green-800 mt-2"
                    >
                      {language === 'en' ? 'Remove file' : 'حذف فایل'}
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  id="file-upload"
                  accept=".txt,.doc,.docx,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <button
                onClick={analyzeBias}
                disabled={(!textInput.trim() && !uploadedFile) || isAnalyzing}
                className="w-full px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {language === 'en' ? 'Analyzing...' : 'در حال تحلیل...'}
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    {language === 'en' ? 'Analyze for Bias' : 'تحلیل تعصب'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {analysisResults ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Bias Analysis Results' : 'نتایج تحلیل تعصب'}
                    </h2>
                    <button
                      onClick={downloadReport}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {language === 'en' ? 'Download Report' : 'دانلود گزارش'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${getRiskColor(analysisResults.riskLevel)}`}>
                        {getRiskIcon(analysisResults.riskLevel)}
                        <span className="font-bold text-lg capitalize">{analysisResults.riskLevel}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {language === 'en' ? 'Risk Level' : 'سطح خطر'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {analysisResults.overallScore}/100
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Bias Score' : 'امتیاز تعصب'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {analysisResults.detectedPhrases.length}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Issues Found' : 'مسائل یافت شده'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bias Categories */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Bias Category Analysis' : 'تحلیل دسته‌بندی تعصب'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(analysisResults.biasCategories).map(([category, data]) => (
                      <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                            {category} {language === 'en' ? 'Bias' : 'تعصب'}
                          </h4>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded ${getRiskColor(data.risk)}`}>
                            {getRiskIcon(data.risk)}
                            <span className="text-sm font-medium">{data.score}/100</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              {language === 'en' ? 'Issues:' : 'مسائل:'}
                            </h5>
                            <ul className="space-y-1">
                              {data.issues.slice(0, 2).map((issue, index) => (
                                <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                                  <span className="w-1 h-1 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              {language === 'en' ? 'Suggestions:' : 'پیشنهادات:'}
                            </h5>
                            <ul className="space-y-1">
                              {data.suggestions.slice(0, 2).map((suggestion, index) => (
                                <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                                  <span className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detected Phrases */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Problematic Phrases Detected' : 'عبارات مشکل‌ساز شناسایی شده'}
                  </h3>
                  <div className="space-y-4">
                    {analysisResults.detectedPhrases.map((phrase, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                "{phrase.phrase}"
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(phrase.severity)}`}>
                                {phrase.severity.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                              <strong>{language === 'en' ? 'Issue:' : 'مسئله:'}</strong> {phrase.explanation}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>{language === 'en' ? 'Suggestion:' : 'پیشنهاد:'}</strong> {phrase.suggestion}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {phrase.category} {language === 'en' ? 'bias' : 'تعصب'}
                          </span>
                        </div>
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
                          <div className="flex-1">
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

                {/* Before/After Comparison */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Improved Version' : 'نسخه بهبود یافته'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">
                        {language === 'en' ? 'Original (Problematic)' : 'اصلی (مشکل‌دار)'}
                      </h4>
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {analysisResults.improvementSuggestions.before.substring(0, 200)}...
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">
                        {language === 'en' ? 'Improved (Inclusive)' : 'بهبود یافته (فراگیر)'}
                      </h4>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {analysisResults.improvementSuggestions.after.substring(0, 200)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance Check */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Legal Compliance Check' : 'بررسی انطباق قانونی'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(analysisResults.complianceCheck).map(([law, compliant]) => (
                      <div key={law} className={`p-4 rounded-lg border ${compliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {compliant ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="font-semibold text-gray-900 uppercase">{law}</span>
                        </div>
                        <p className={`text-sm ${compliant ? 'text-green-700' : 'text-red-700'}`}>
                          {compliant 
                            ? (language === 'en' ? 'Compliant' : 'منطبق') 
                            : (language === 'en' ? 'Non-Compliant' : 'غیر منطبق')
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Ready to Detect Bias?' : 'آماده تشخیص تعصب هستید؟'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Upload or paste your recruitment content to identify potential bias and get suggestions for more inclusive language'
                    : 'محتوای استخدام خود را آپلود یا قرار دهید تا تعصبات احتمالی را شناسایی کنید و پیشنهادات زبان فراگیرتر دریافت کنید'
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

export default BiasDetector;

