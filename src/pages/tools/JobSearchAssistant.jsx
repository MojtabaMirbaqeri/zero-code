import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../App';

const JobSearchAssistant = () => {
  const { language } = useLanguage();
  
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Job Search Assistant' : 'دستیار جستجوی شغل'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Coming Soon - Global job search across multiple platforms'
              : 'به زودی - جستجوی شغل جهانی در چندین پلتفرم'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobSearchAssistant;

