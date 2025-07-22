import { useState } from 'react';
import { Search, Users, Filter, Download, RefreshCw, Star, MapPin, Building, Calendar, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../../App';

const SourcingAutomation = () => {
  const { language } = useLanguage();
  const [searchCriteria, setSearchCriteria] = useState({
    jobTitle: '',
    skills: '',
    location: '',
    experience: '',
    industry: '',
    company: '',
    education: '',
    keywords: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const experienceLevels = [
    { value: '', label: language === 'en' ? 'Any Experience' : 'هر سطح تجربه' },
    { value: 'entry', label: language === 'en' ? 'Entry Level (0-2 years)' : 'سطح مبتدی (۰-۲ سال)' },
    { value: 'mid', label: language === 'en' ? 'Mid Level (3-5 years)' : 'سطح متوسط (۳-۵ سال)' },
    { value: 'senior', label: language === 'en' ? 'Senior Level (6-10 years)' : 'سطح ارشد (۶-۱۰ سال)' },
    { value: 'lead', label: language === 'en' ? 'Lead/Principal (10+ years)' : 'رهبری/اصلی (۱۰+ سال)' }
  ];

  const handleInputChange = (field, value) => {
    setSearchCriteria(prev => ({ ...prev, [field]: value }));
  };

  const searchCandidates = async () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          name: 'Alex Chen',
          title: 'Senior Full Stack Developer',
          company: 'TechStartup Inc.',
          location: 'San Francisco, CA',
          experience: '7 years',
          skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
          education: 'MS Computer Science - Stanford',
          matchScore: 95,
          availability: 'Open to opportunities',
          lastActive: '2 days ago',
          profileImage: null,
          linkedin: 'https://linkedin.com/in/alexchen',
          github: 'https://github.com/alexchen',
          summary: 'Passionate full-stack developer with expertise in modern web technologies and cloud infrastructure.',
          achievements: [
            'Led development of microservices architecture serving 1M+ users',
            'Reduced deployment time by 60% through CI/CD optimization',
            'Mentored 5+ junior developers'
          ]
        },
        {
          id: 2,
          name: 'Sarah Rodriguez',
          title: 'Frontend Developer',
          company: 'DesignCorp',
          location: 'Remote',
          experience: '5 years',
          skills: ['React', 'TypeScript', 'CSS', 'Figma', 'Next.js'],
          education: 'BS Computer Science - UC Berkeley',
          matchScore: 88,
          availability: 'Actively looking',
          lastActive: '1 day ago',
          profileImage: null,
          linkedin: 'https://linkedin.com/in/sarahrodriguez',
          github: 'https://github.com/sarahrodriguez',
          summary: 'Creative frontend developer with strong design sensibility and expertise in modern React ecosystem.',
          achievements: [
            'Built responsive web apps used by 500K+ users',
            'Improved page load speed by 40%',
            'Led UI/UX redesign project'
          ]
        },
        {
          id: 3,
          name: 'Michael Kim',
          title: 'DevOps Engineer',
          company: 'CloudTech Solutions',
          location: 'Seattle, WA',
          experience: '6 years',
          skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python'],
          education: 'BS Engineering - MIT',
          matchScore: 82,
          availability: 'Open to opportunities',
          lastActive: '3 days ago',
          profileImage: null,
          linkedin: 'https://linkedin.com/in/michaelkim',
          github: 'https://github.com/michaelkim',
          summary: 'DevOps engineer specializing in cloud infrastructure and automation.',
          achievements: [
            'Managed infrastructure for 50+ microservices',
            'Reduced infrastructure costs by 30%',
            'Implemented zero-downtime deployment pipeline'
          ]
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 3000);
  };

  const toggleCandidateSelection = (candidateId) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const exportSelectedCandidates = () => {
    const selected = searchResults.filter(candidate => selectedCandidates.includes(candidate.id));
    const csvContent = [
      ['Name', 'Title', 'Company', 'Location', 'Experience', 'Skills', 'Match Score', 'LinkedIn', 'GitHub'],
      ...selected.map(candidate => [
        candidate.name,
        candidate.title,
        candidate.company,
        candidate.location,
        candidate.experience,
        candidate.skills.join('; '),
        candidate.matchScore,
        candidate.linkedin,
        candidate.github
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sourced-candidates.csv';
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
      <div className="bg-gradient-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'AI Sourcing Automation' : 'اتوماسیون منابع‌یابی هوش مصنوعی'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Automatically discover and analyze the best-fit candidate profiles from LinkedIn, GitHub, and other professional platforms'
              : 'به طور خودکار بهترین پروفایل‌های کاندیدا را از لینکدین، گیت‌هاب و سایر پلتفرم‌های حرفه‌ای کشف و تحلیل کنید'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search Filters */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Search Criteria' : 'معیارهای جستجو'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Job Title' : 'عنوان شغل'}
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder={language === 'en' ? 'e.g., Software Engineer' : 'مثال: مهندس نرم‌افزار'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Required Skills' : 'مهارت‌های مورد نیاز'}
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder={language === 'en' ? 'e.g., React, Node.js, Python' : 'مثال: React، Node.js، Python'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Location' : 'مکان'}
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder={language === 'en' ? 'e.g., San Francisco, Remote' : 'مثال: تهران، از راه دور'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Experience Level' : 'سطح تجربه'}
                  </label>
                  <select
                    value={searchCriteria.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    {experienceLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Industry' : 'صنعت'}
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    placeholder={language === 'en' ? 'e.g., Technology, Finance' : 'مثال: فناوری، مالی'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Target Companies' : 'شرکت‌های هدف'}
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder={language === 'en' ? 'e.g., Google, Microsoft' : 'مثال: گوگل، مایکروسافت'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <button
                onClick={searchCandidates}
                disabled={!searchCriteria.jobTitle || isSearching}
                className="w-full mt-6 px-4 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {language === 'en' ? 'Searching...' : 'در حال جستجو...'}
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    {language === 'en' ? 'Search Candidates' : 'جستجوی کاندیداها'}
                  </>
                )}
              </button>
            </div>

            {selectedCandidates.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'en' ? 'Selected Candidates' : 'کاندیداهای انتخاب شده'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {selectedCandidates.length} {language === 'en' ? 'candidates selected' : 'کاندیدا انتخاب شده'}
                </p>
                <button
                  onClick={exportSelectedCandidates}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {language === 'en' ? 'Export CSV' : 'خروجی CSV'}
                </button>
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {searchResults.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Search Results' : 'نتایج جستجو'}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {searchResults.length} {language === 'en' ? 'candidates found' : 'کاندیدا یافت شد'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {searchResults.map(candidate => (
                    <div key={candidate.id} className="glass rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <input
                            type="checkbox"
                            checked={selectedCandidates.includes(candidate.id)}
                            onChange={() => toggleCandidateSelection(candidate.id)}
                            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-semibold">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {candidate.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              {candidate.title} at {candidate.company}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {candidate.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {candidate.experience}
                              </span>
                              <span className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {candidate.availability}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                              {candidate.summary}
                            </p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full font-bold ${getScoreColor(candidate.matchScore)}`}>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {candidate.matchScore}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {language === 'en' ? 'Skills' : 'مهارت‌ها'}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map(skill => (
                              <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {language === 'en' ? 'Key Achievements' : 'دستاوردهای کلیدی'}
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {candidate.achievements.map((achievement, index) => (
                              <li key={index}>• {achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>{candidate.education}</span>
                          <span>Last active: {candidate.lastActive}</span>
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={candidate.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                          <a
                            href={candidate.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                          <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                            {language === 'en' ? 'Contact' : 'تماس'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Ready to Find Top Talent?' : 'آماده پیدا کردن استعدادهای برتر هستید؟'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Set your search criteria and let our AI find the best-fit candidates from professional platforms'
                    : 'معیارهای جستجوی خود را تنظیم کنید و اجازه دهید هوش مصنوعی ما بهترین کاندیداها را از پلتفرم‌های حرفه‌ای پیدا کند'
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

export default SourcingAutomation;

