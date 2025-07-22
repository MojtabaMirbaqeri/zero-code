import { useState } from 'react';
import { Upload, FileText, User, Award, Briefcase, GraduationCap, Download, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../App';

const ResumeScreening = () => {
  const { language } = useLanguage();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [screeningCriteria, setScreeningCriteria] = useState({
    requiredSkills: '',
    minExperience: '',
    education: '',
    keywords: '',
    location: ''
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setAnalysisResults(null);
    }
  };

  const processResume = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      const mockResults = {
        personalInfo: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          linkedin: 'linkedin.com/in/sarahjohnson',
          github: 'github.com/sarahjohnson'
        },
        summary: 'Experienced software engineer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering scalable solutions.',
        experience: [
          {
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            duration: '2021 - Present',
            location: 'San Francisco, CA',
            responsibilities: [
              'Led development of microservices architecture serving 1M+ users',
              'Mentored team of 5 junior developers',
              'Reduced deployment time by 60% through CI/CD optimization',
              'Collaborated with product team to define technical requirements'
            ]
          },
          {
            title: 'Software Engineer',
            company: 'StartupXYZ',
            duration: '2019 - 2021',
            location: 'Remote',
            responsibilities: [
              'Built responsive web applications using React and Node.js',
              'Implemented RESTful APIs and database optimization',
              'Participated in agile development processes',
              'Contributed to open-source projects'
            ]
          }
        ],
        education: [
          {
            degree: 'Master of Science in Computer Science',
            institution: 'Stanford University',
            year: '2019',
            gpa: '3.8/4.0'
          },
          {
            degree: 'Bachelor of Science in Software Engineering',
            institution: 'UC Berkeley',
            year: '2017',
            gpa: '3.6/4.0'
          }
        ],
        skills: {
          technical: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL'],
          soft: ['Leadership', 'Team Management', 'Problem Solving', 'Communication', 'Project Management']
        },
        certifications: [
          'AWS Certified Solutions Architect',
          'Certified Kubernetes Administrator',
          'Scrum Master Certification'
        ],
        languages: ['English (Native)', 'Spanish (Conversational)'],
        projects: [
          {
            name: 'E-commerce Platform',
            description: 'Built scalable e-commerce platform handling 10K+ daily transactions',
            technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
          },
          {
            name: 'Real-time Chat Application',
            description: 'Developed real-time messaging app with WebSocket integration',
            technologies: ['React', 'Socket.io', 'Express', 'Redis']
          }
        ],
        screening: {
          overallScore: 92,
          skillsMatch: 95,
          experienceMatch: 90,
          educationMatch: 88,
          keywordMatch: 85,
          recommendations: [
            'Strong technical background with relevant experience',
            'Leadership experience aligns with senior role requirements',
            'Excellent educational credentials',
            'Active in open-source community'
          ],
          concerns: [
            'No specific experience with required framework X',
            'Location might require relocation discussion'
          ]
        }
      };
      
      setAnalysisResults(mockResults);
      setIsProcessing(false);
    }, 3000);
  };

  const downloadReport = () => {
    if (!analysisResults) return;
    
    const report = `
RESUME ANALYSIS REPORT
=====================

Personal Information:
- Name: ${analysisResults.personalInfo.name}
- Email: ${analysisResults.personalInfo.email}
- Phone: ${analysisResults.personalInfo.phone}
- Location: ${analysisResults.personalInfo.location}

Summary:
${analysisResults.summary}

Experience:
${analysisResults.experience.map(exp => `
- ${exp.title} at ${exp.company} (${exp.duration})
  ${exp.responsibilities.map(resp => `  • ${resp}`).join('\n')}
`).join('\n')}

Education:
${analysisResults.education.map(edu => `
- ${edu.degree} from ${edu.institution} (${edu.year})
`).join('\n')}

Technical Skills:
${analysisResults.skills.technical.join(', ')}

Screening Score: ${analysisResults.screening.overallScore}/100

Recommendations:
${analysisResults.screening.recommendations.map(rec => `• ${rec}`).join('\n')}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-analysis-${analysisResults.personalInfo.name.replace(' ', '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
      <div className="bg-gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Resume Screening & Parsing' : 'غربالگری و تجزیه رزومه'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Automatically extract, analyze, and score resume data with AI-powered screening against your job requirements'
              : 'به طور خودکار داده‌های رزومه را استخراج، تحلیل و امتیازدهی کنید با غربالگری مبتنی بر هوش مصنوعی در برابر الزامات شغلی شما'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload and Criteria */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Upload */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Upload Resume' : 'آپلود رزومه'}
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'en' 
                    ? 'Drop resume here or click to browse'
                    : 'رزومه را اینجا بکشید یا کلیک کنید'
                  }
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
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
                {uploadedFile && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                    <FileText className="w-5 h-5" />
                    <span>{uploadedFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Screening Criteria */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Screening Criteria' : 'معیارهای غربالگری'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Required Skills' : 'مهارت‌های مورد نیاز'}
                  </label>
                  <input
                    type="text"
                    value={screeningCriteria.requiredSkills}
                    onChange={(e) => setScreeningCriteria({...screeningCriteria, requiredSkills: e.target.value})}
                    placeholder={language === 'en' ? 'e.g., React, Node.js, Python' : 'مثال: React، Node.js، Python'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Minimum Experience' : 'حداقل تجربه'}
                  </label>
                  <select
                    value={screeningCriteria.minExperience}
                    onChange={(e) => setScreeningCriteria({...screeningCriteria, minExperience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">{language === 'en' ? 'Any' : 'هر مقدار'}</option>
                    <option value="1">1+ {language === 'en' ? 'years' : 'سال'}</option>
                    <option value="3">3+ {language === 'en' ? 'years' : 'سال'}</option>
                    <option value="5">5+ {language === 'en' ? 'years' : 'سال'}</option>
                    <option value="10">10+ {language === 'en' ? 'years' : 'سال'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Education Level' : 'سطح تحصیلات'}
                  </label>
                  <select
                    value={screeningCriteria.education}
                    onChange={(e) => setScreeningCriteria({...screeningCriteria, education: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">{language === 'en' ? 'Any' : 'هر مقدار'}</option>
                    <option value="bachelor">{language === 'en' ? 'Bachelor\'s Degree' : 'کارشناسی'}</option>
                    <option value="master">{language === 'en' ? 'Master\'s Degree' : 'کارشناسی ارشد'}</option>
                    <option value="phd">{language === 'en' ? 'PhD' : 'دکتری'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Keywords' : 'کلمات کلیدی'}
                  </label>
                  <textarea
                    value={screeningCriteria.keywords}
                    onChange={(e) => setScreeningCriteria({...screeningCriteria, keywords: e.target.value})}
                    placeholder={language === 'en' ? 'Important keywords to look for...' : 'کلمات کلیدی مهم برای جستجو...'}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <button
                onClick={processResume}
                disabled={!uploadedFile || isProcessing}
                className="w-full mt-6 px-4 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {language === 'en' ? 'Processing...' : 'در حال پردازش...'}
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    {language === 'en' ? 'Analyze Resume' : 'تحلیل رزومه'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2">
            {analysisResults ? (
              <div className="space-y-6">
                {/* Screening Score */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Screening Results' : 'نتایج غربالگری'}
                    </h2>
                    <button
                      onClick={downloadReport}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {language === 'en' ? 'Download Report' : 'دانلود گزارش'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(analysisResults.screening.overallScore)}`}>
                        {analysisResults.screening.overallScore}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {language === 'en' ? 'Overall' : 'کلی'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(analysisResults.screening.skillsMatch)}`}>
                        {analysisResults.screening.skillsMatch}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {language === 'en' ? 'Skills' : 'مهارت‌ها'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(analysisResults.screening.experienceMatch)}`}>
                        {analysisResults.screening.experienceMatch}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {language === 'en' ? 'Experience' : 'تجربه'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(analysisResults.screening.educationMatch)}`}>
                        {analysisResults.screening.educationMatch}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {language === 'en' ? 'Education' : 'تحصیلات'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        {language === 'en' ? 'Strengths' : 'نقاط قوت'}
                      </h4>
                      <ul className="space-y-2">
                        {analysisResults.screening.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        {language === 'en' ? 'Areas of Concern' : 'نکات قابل توجه'}
                      </h4>
                      <ul className="space-y-2">
                        {analysisResults.screening.concerns.map((concern, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    {language === 'en' ? 'Personal Information' : 'اطلاعات شخصی'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Name' : 'نام'}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{analysisResults.personalInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Email' : 'ایمیل'}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{analysisResults.personalInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Phone' : 'تلفن'}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{analysisResults.personalInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Location' : 'مکان'}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{analysisResults.personalInfo.location}</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6" />
                    {language === 'en' ? 'Work Experience' : 'تجربه کاری'}
                  </h3>
                  <div className="space-y-4">
                    {analysisResults.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{exp.company} • {exp.duration}</p>
                        <ul className="mt-2 space-y-1">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">• {resp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6" />
                    {language === 'en' ? 'Skills' : 'مهارت‌ها'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {language === 'en' ? 'Technical Skills' : 'مهارت‌های فنی'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.skills.technical.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {language === 'en' ? 'Soft Skills' : 'مهارت‌های نرم'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.skills.soft.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" />
                    {language === 'en' ? 'Education' : 'تحصیلات'}
                  </h3>
                  <div className="space-y-3">
                    {analysisResults.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{edu.institution} • {edu.year}</p>
                        {edu.gpa && <p className="text-sm text-gray-500 dark:text-gray-400">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Ready to Screen Resumes?' : 'آماده غربالگری رزومه‌ها هستید؟'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Upload a resume to automatically extract and analyze candidate information with AI-powered screening'
                    : 'رزومه‌ای آپلود کنید تا به طور خودکار اطلاعات کاندیدا را استخراج و تحلیل کنید با غربالگری مبتنی بر هوش مصنوعی'
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

export default ResumeScreening;

