import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Mic, MicOff, Video, VideoOff, RotateCcw, Download, Clock, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../App';

const InterviewSimulator = () => {
  const { language } = useLanguage();
  const [interviewConfig, setInterviewConfig] = useState({
    jobRole: '',
    interviewType: 'behavioral',
    difficulty: 'medium',
    duration: '30'
  });
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const interviewTypes = [
    { value: 'behavioral', label: language === 'en' ? 'Behavioral' : 'رفتاری' },
    { value: 'technical', label: language === 'en' ? 'Technical' : 'فنی' },
    { value: 'case_study', label: language === 'en' ? 'Case Study' : 'مطالعه موردی' },
    { value: 'situational', label: language === 'en' ? 'Situational' : 'موقعیتی' }
  ];

  const difficultyLevels = [
    { value: 'easy', label: language === 'en' ? 'Easy' : 'آسان' },
    { value: 'medium', label: language === 'en' ? 'Medium' : 'متوسط' },
    { value: 'hard', label: language === 'en' ? 'Hard' : 'سخت' }
  ];

  const sampleQuestions = {
    behavioral: [
      {
        en: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
        fa: "درباره زمانی بگویید که مجبور بودید با عضو تیمی سخت کار کنید. چگونه با این موقعیت برخورد کردید؟",
        timeLimit: 180
      },
      {
        en: "Describe a situation where you had to meet a tight deadline. What steps did you take?",
        fa: "موقعیتی را توصیف کنید که مجبور بودید ضرب‌الاجل سختی را رعایت کنید. چه اقداماتی انجام دادید؟",
        timeLimit: 180
      },
      {
        en: "Give me an example of a time when you had to learn something new quickly. How did you approach it?",
        fa: "مثالی از زمانی بدهید که مجبور بودید چیز جدیدی را سریع یاد بگیرید. چگونه به آن نزدیک شدید؟",
        timeLimit: 180
      }
    ],
    technical: [
      {
        en: "Explain the difference between synchronous and asynchronous programming. When would you use each?",
        fa: "تفاوت بین برنامه‌نویسی همزمان و ناهمزمان را توضیح دهید. کی از هر کدام استفاده می‌کنید؟",
        timeLimit: 240
      },
      {
        en: "How would you optimize a slow-performing database query? Walk me through your process.",
        fa: "چگونه یک کوئری پایگاه داده با عملکرد کند را بهینه می‌کنید؟ فرآیند خود را شرح دهید.",
        timeLimit: 300
      },
      {
        en: "Design a system that can handle 1 million concurrent users. What are the key considerations?",
        fa: "سیستمی طراحی کنید که بتواند ۱ میلیون کاربر همزمان را مدیریت کند. ملاحظات کلیدی چیست؟",
        timeLimit: 360
      }
    ]
  };

  useEffect(() => {
    if (timeRemaining > 0 && isRecording) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRecording) {
      stopRecording();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeRemaining, isRecording]);

  const startInterview = () => {
    const questions = sampleQuestions[interviewConfig.interviewType] || sampleQuestions.behavioral;
    setCurrentQuestion(questions[0]);
    setQuestionIndex(0);
    setIsInterviewActive(true);
    setResponses([]);
    setFeedback(null);
  };

  const startRecording = () => {
    if (!currentQuestion) return;
    
    setIsRecording(true);
    setTimeRemaining(currentQuestion.timeLimit);
    
    // Simulate starting recording
    if (isVideoEnabled && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error('Error accessing media devices:', err));
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setTimeRemaining(0);
    
    // Simulate stopping recording and analyzing response
    const response = {
      questionIndex: questionIndex,
      question: currentQuestion[language],
      duration: currentQuestion.timeLimit - timeRemaining,
      analysis: {
        clarity: Math.floor(Math.random() * 30) + 70,
        confidence: Math.floor(Math.random() * 25) + 75,
        relevance: Math.floor(Math.random() * 20) + 80,
        structure: Math.floor(Math.random() * 25) + 70
      }
    };
    
    setResponses(prev => [...prev, response]);
    
    // Move to next question or end interview
    const questions = sampleQuestions[interviewConfig.interviewType] || sampleQuestions.behavioral;
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(questions[questionIndex + 1]);
    } else {
      endInterview();
    }
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setCurrentQuestion(null);
    setIsRecording(false);
    
    // Generate overall feedback
    const overallScore = responses.reduce((acc, response) => {
      const avgScore = (response.analysis.clarity + response.analysis.confidence + response.analysis.relevance + response.analysis.structure) / 4;
      return acc + avgScore;
    }, 0) / responses.length;
    
    setFeedback({
      overallScore: Math.round(overallScore),
      strengths: [
        'Good eye contact and confident body language',
        'Clear articulation and appropriate pace',
        'Relevant examples and structured responses'
      ],
      improvements: [
        'Could provide more specific metrics in examples',
        'Consider using the STAR method more consistently',
        'Practice reducing filler words'
      ],
      recommendations: [
        'Practice common behavioral questions',
        'Prepare specific examples with quantifiable results',
        'Work on maintaining consistent energy throughout'
      ]
    });
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const downloadReport = () => {
    if (!feedback || responses.length === 0) return;
    
    const report = `
INTERVIEW SIMULATION REPORT
==========================

Interview Configuration:
- Job Role: ${interviewConfig.jobRole}
- Interview Type: ${interviewTypes.find(t => t.value === interviewConfig.interviewType)?.label}
- Difficulty: ${difficultyLevels.find(d => d.value === interviewConfig.difficulty)?.label}

Overall Score: ${feedback.overallScore}/100

Question Analysis:
${responses.map((response, index) => `
Question ${index + 1}: ${response.question}
- Duration: ${Math.floor(response.duration / 60)}:${(response.duration % 60).toString().padStart(2, '0')}
- Clarity: ${response.analysis.clarity}/100
- Confidence: ${response.analysis.confidence}/100
- Relevance: ${response.analysis.relevance}/100
- Structure: ${response.analysis.structure}/100
`).join('\n')}

Strengths:
${feedback.strengths.map(strength => `• ${strength}`).join('\n')}

Areas for Improvement:
${feedback.improvements.map(improvement => `• ${improvement}`).join('\n')}

Recommendations:
${feedback.recommendations.map(rec => `• ${rec}`).join('\n')}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-simulation-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Interview Simulator' : 'شبیه‌ساز مصاحبه'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Practice interviews with AI-powered feedback on your responses, body language, and communication skills'
              : 'مصاحبه را با بازخورد مبتنی بر هوش مصنوعی روی پاسخ‌ها، زبان بدن و مهارت‌های ارتباطی خود تمرین کنید'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isInterviewActive && !feedback ? (
          /* Setup Phase */
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {language === 'en' ? 'Interview Setup' : 'تنظیمات مصاحبه'}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Job Role' : 'نقش شغلی'}
                  </label>
                  <input
                    type="text"
                    value={interviewConfig.jobRole}
                    onChange={(e) => setInterviewConfig({...interviewConfig, jobRole: e.target.value})}
                    placeholder={language === 'en' ? 'e.g., Software Engineer, Product Manager' : 'مثال: مهندس نرم‌افزار، مدیر محصول'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Interview Type' : 'نوع مصاحبه'}
                    </label>
                    <select
                      value={interviewConfig.interviewType}
                      onChange={(e) => setInterviewConfig({...interviewConfig, interviewType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {interviewTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'en' ? 'Difficulty' : 'سطح دشواری'}
                    </label>
                    <select
                      value={interviewConfig.difficulty}
                      onChange={(e) => setInterviewConfig({...interviewConfig, difficulty: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {difficultyLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <button
                    onClick={toggleVideo}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isVideoEnabled 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    {language === 'en' ? 'Video' : 'ویدیو'}
                  </button>
                  <button
                    onClick={toggleAudio}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isAudioEnabled 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    {language === 'en' ? 'Audio' : 'صدا'}
                  </button>
                </div>

                <button
                  onClick={startInterview}
                  disabled={!interviewConfig.jobRole}
                  className="w-full px-6 py-4 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold"
                >
                  <Play className="w-6 h-6" />
                  {language === 'en' ? 'Start Interview' : 'شروع مصاحبه'}
                </button>
              </div>
            </div>
          </div>
        ) : isInterviewActive ? (
          /* Interview Phase */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video/Audio Section */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-6 mb-6">
                <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
                  {isVideoEnabled ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <VideoOff className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">REC</span>
                    </div>
                  )}
                  
                  {timeRemaining > 0 && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full">
                      <span className="text-sm font-mono">{formatTime(timeRemaining)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      {language === 'en' ? 'Start Recording' : 'شروع ضبط'}
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Square className="w-5 h-5" />
                      {language === 'en' ? 'Stop Recording' : 'توقف ضبط'}
                    </button>
                  )}
                  
                  <button
                    onClick={endInterview}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Square className="w-5 h-5" />
                    {language === 'en' ? 'End Interview' : 'پایان مصاحبه'}
                  </button>
                </div>
              </div>
            </div>

            {/* Question Section */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Question' : 'سوال'} {questionIndex + 1}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {currentQuestion && formatTime(currentQuestion.timeLimit)}
                  </div>
                </div>
                
                {currentQuestion && (
                  <div className="mb-6">
                    <p className="text-gray-900 dark:text-white leading-relaxed">
                      {currentQuestion[language]}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                      {language === 'en' ? 'Tips for a great answer:' : 'نکاتی برای پاسخ عالی:'}
                    </p>
                    <ul className="space-y-1">
                      <li>• {language === 'en' ? 'Use the STAR method (Situation, Task, Action, Result)' : 'از روش STAR استفاده کنید (موقعیت، وظیفه، اقدام، نتیجه)'}</li>
                      <li>• {language === 'en' ? 'Provide specific examples' : 'مثال‌های مشخص ارائه دهید'}</li>
                      <li>• {language === 'en' ? 'Speak clearly and maintain eye contact' : 'واضح صحبت کنید و تماس چشمی حفظ کنید'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="glass rounded-2xl p-6 mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? 'Progress' : 'پیشرفت'}
                </h4>
                <div className="space-y-3">
                  {responses.map((response, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Question' : 'سوال'} {index + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">
                          {Math.round((response.analysis.clarity + response.analysis.confidence + response.analysis.relevance + response.analysis.structure) / 4)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Feedback Phase */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Interview Complete!' : 'مصاحبه تمام شد!'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Here\'s your detailed performance analysis' : 'در اینجا تحلیل تفصیلی عملکرد شما آمده است'}
              </p>
            </div>

            {/* Overall Score */}
            <div className="glass rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className={`text-6xl font-bold px-8 py-4 rounded-2xl ${getScoreColor(feedback.overallScore)}`}>
                  {feedback.overallScore}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Overall Performance' : 'عملکرد کلی'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feedback.overallScore >= 85 
                  ? (language === 'en' ? 'Excellent performance!' : 'عملکرد عالی!')
                  : feedback.overallScore >= 70 
                  ? (language === 'en' ? 'Good performance with room for improvement' : 'عملکرد خوب با فضای بهبود')
                  : (language === 'en' ? 'Needs improvement' : 'نیاز به بهبود')
                }
              </p>
            </div>

            {/* Question Analysis */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Question Analysis' : 'تحلیل سوالات'}
              </h3>
              <div className="space-y-4">
                {responses.map((response, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {language === 'en' ? 'Question' : 'سوال'} {index + 1}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold px-3 py-1 rounded ${getScoreColor(response.analysis.clarity)}`}>
                          {response.analysis.clarity}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {language === 'en' ? 'Clarity' : 'وضوح'}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold px-3 py-1 rounded ${getScoreColor(response.analysis.confidence)}`}>
                          {response.analysis.confidence}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {language === 'en' ? 'Confidence' : 'اعتماد به نفس'}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold px-3 py-1 rounded ${getScoreColor(response.analysis.relevance)}`}>
                          {response.analysis.relevance}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {language === 'en' ? 'Relevance' : 'مرتبط بودن'}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold px-3 py-1 rounded ${getScoreColor(response.analysis.structure)}`}>
                          {response.analysis.structure}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {language === 'en' ? 'Structure' : 'ساختار'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  {language === 'en' ? 'Strengths' : 'نقاط قوت'}
                </h4>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-yellow-600" />
                  {language === 'en' ? 'Areas for Improvement' : 'نکات قابل بهبود'}
                </h4>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  {language === 'en' ? 'Recommendations' : 'توصیه‌ها'}
                </h4>
                <ul className="space-y-2">
                  {feedback.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadReport}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                {language === 'en' ? 'Download Report' : 'دانلود گزارش'}
              </button>
              <button
                onClick={() => {
                  setFeedback(null);
                  setResponses([]);
                  setQuestionIndex(0);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="w-5 h-5" />
                {language === 'en' ? 'Practice Again' : 'تمرین مجدد'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewSimulator;

