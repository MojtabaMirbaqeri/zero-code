import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../App';
import { articles, categories, tags } from '../data/articles';

const ArticlesPage = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles.filter(article => {
      const matchesSearch = article.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'oldest':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'readTime':
          return a.readTime - b.readTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, searchTerm, selectedCategory, selectedTag, sortBy, language]);

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'HR Insights & Articles' : 'بینش‌ها و مقالات منابع انسانی'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Stay updated with the latest trends, insights, and best practices in human resources and AI technology'
              : 'با آخرین روندها، بینش‌ها و بهترین شیوه‌های منابع انسانی و فناوری هوش مصنوعی به‌روز باشید'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {language === 'en' ? 'Featured Articles' : 'مقالات ویژه'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <div key={article.id} className="glass rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
                  <div className="aspect-video bg-gradient-secondary relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {article.title[language]}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {article.excerpt[language]}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.publishDate).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime} {language === 'en' ? 'min read' : 'دقیقه مطالعه'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-600 dark:text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group">
                      {language === 'en' ? 'Read More' : 'ادامه مطالعه'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search articles...' : 'جستجو مقالات...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'All' ? (language === 'en' ? 'All Categories' : 'همه دسته‌ها') : category}
                </option>
              ))}
            </select>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{language === 'en' ? 'All Tags' : 'همه برچسب‌ها'}</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">{language === 'en' ? 'Newest First' : 'جدیدترین'}</option>
              <option value="oldest">{language === 'en' ? 'Oldest First' : 'قدیمی‌ترین'}</option>
              <option value="readTime">{language === 'en' ? 'Quick Read' : 'مطالعه سریع'}</option>
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedArticles.map(article => (
            <div key={article.id} className="glass rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="aspect-video bg-gradient-accent relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {article.title[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {article.excerpt[language]}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime} {language === 'en' ? 'min' : 'دقیقه'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-600 dark:text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group">
                  {language === 'en' ? 'Read Article' : 'مطالعه مقاله'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'No articles found' : 'مقاله‌ای یافت نشد'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'en' 
                ? 'Try adjusting your search criteria or browse all articles'
                : 'معیارهای جستجوی خود را تنظیم کنید یا همه مقالات را مرور کنید'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;

