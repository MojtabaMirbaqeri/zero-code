import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import './App.css';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ToolsPage from './pages/ToolsPage';
import ContactPage from './pages/ContactPage';

// Admin
import AdminPanel from './pages/admin/AdminPanel';

// AI Tools Pages
import JobTitleOptimizer from './pages/tools/JobTitleOptimizer';
import JobDescriptionMaker from './pages/tools/JobDescriptionMaker';
import JobSearchAssistant from './pages/tools/JobSearchAssistant';
import JobMatchingEngine from './pages/tools/JobMatchingEngine';
import AIChatAssistant from './pages/tools/AIChatAssistant';
import OutreachGenerator from './pages/tools/OutreachGenerator';
import SourcingAutomation from './pages/tools/SourcingAutomation';
import ResumeScreening from './pages/tools/ResumeScreening';
import InterviewSimulator from './pages/tools/InterviewSimulator';
import SentimentAnalysis from './pages/tools/SentimentAnalysis';
import OnboardingAssistant from './pages/tools/OnboardingAssistant';
import MeetingOptimizer from './pages/tools/MeetingOptimizer';
import BiasDetector from './pages/tools/BiasDetector';

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

function App() {
  const [language, setLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fa' : 'en';
    const newDir = newLang === 'fa' ? 'rtl' : 'ltr';
    setLanguage(newLang);
    setDirection(newDir);
    document.documentElement.setAttribute('dir', newDir);
    document.documentElement.setAttribute('lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage }}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900" dir={direction}>
          <Routes>
            {/* Admin Panel Route (no navigation/footer) */}
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* Regular Routes (with navigation/footer) */}
            <Route path="/*" element={
              <>
                <Navigation />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/articles" element={<ArticlesPage />} />
                    <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                    <Route path="/tools" element={<ToolsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    
                    {/* AI Tools Routes */}
                    <Route path="/tools/job-title-optimizer" element={<JobTitleOptimizer />} />
                    <Route path="/tools/job-description-maker" element={<JobDescriptionMaker />} />
                    <Route path="/tools/job-search-assistant" element={<JobSearchAssistant />} />
                    <Route path="/tools/job-matching-engine" element={<JobMatchingEngine />} />
                    <Route path="/tools/ai-chat-assistant" element={<AIChatAssistant />} />
                    <Route path="/tools/outreach-generator" element={<OutreachGenerator />} />
                    <Route path="/tools/sourcing-automation" element={<SourcingAutomation />} />
                    <Route path="/tools/resume-screening" element={<ResumeScreening />} />
                    <Route path="/tools/interview-simulator" element={<InterviewSimulator />} />
                    <Route path="/tools/sentiment-analysis" element={<SentimentAnalysis />} />
                    <Route path="/tools/onboarding-assistant" element={<OnboardingAssistant />} />
                    <Route path="/tools/meeting-optimizer" element={<MeetingOptimizer />} />
                    <Route path="/tools/bias-detector" element={<BiasDetector />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;

