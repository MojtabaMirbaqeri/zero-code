import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Bookmark, ThumbsUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '../App';
import { articles } from '../data/articles';
import { useState } from 'react';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Article Not Found' : 'مقاله یافت نشد'}
          </h1>
          <button 
            onClick={() => navigate('/articles')}
            className="text-blue-600 hover:text-blue-700"
          >
            {language === 'en' ? 'Back to Articles' : 'بازگشت به مقالات'}
          </button>
        </div>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="pt-16 min-h-screen">
      {/* Article Header */}
      <div className="bg-gradient-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/articles')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {language === 'en' ? 'Back to Articles' : 'بازگشت به مقالات'}
          </button>
          
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title[language]}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {article.excerpt[language]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(article.publishDate).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{article.readTime} {language === 'en' ? 'min read' : 'دقیقه مطالعه'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Actions */}
        <div className="flex items-center justify-between mb-8 p-4 glass rounded-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>{language === 'en' ? 'Like' : 'پسند'}</span>
            </button>
            <button 
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                bookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span>{language === 'en' ? 'Save' : 'ذخیره'}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>{language === 'en' ? 'Share' : 'اشتراک'}</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ 
              __html: article.content[language].replace(/\n/g, '<br>').replace(/#{1,6}\s/g, match => {
                const level = match.trim().length;
                return `<h${level} class="text-${4-level}xl font-bold mt-8 mb-4">`;
              }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} 
          />
        </div>

        {/* Comments Section */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'en' ? 'Comments' : 'نظرات'}
            </h3>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{language === 'en' ? 'Add Comment' : 'افزودن نظر'}</span>
            </button>
          </div>

          {showComments && (
            <div className="glass rounded-xl p-6 mb-6">
              <textarea
                placeholder={language === 'en' ? 'Share your thoughts...' : 'نظر خود را بنویسید...'}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
              <div className="flex justify-end mt-4">
                <button className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  {language === 'en' ? 'Post Comment' : 'ارسال نظر'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="glass rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Ahmad Rezaei</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'en' 
                      ? 'Great article! The insights about AI in HR are very valuable and practical.'
                      : 'مقاله عالی! بینش‌های مربوط به هوش مصنوعی در منابع انسانی بسیار ارزشمند و کاربردی هستند.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {language === 'en' ? 'Related Articles' : 'مقالات مرتبط'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(relatedArticle => (
                <div key={relatedArticle.id} className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300">
                  <div className="aspect-video bg-gradient-accent relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                        {relatedArticle.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {relatedArticle.title[language]}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {relatedArticle.excerpt[language]}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{relatedArticle.readTime} {language === 'en' ? 'min' : 'دقیقه'}</span>
                      <span>{new Date(relatedArticle.publishDate).toLocaleDateString(language === 'en' ? 'en-US' : 'fa-IR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;

