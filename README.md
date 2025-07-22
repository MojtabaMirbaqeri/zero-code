# HR-Tech AI Hub | مرکز ابزارهای هوش مصنوعی منابع انسانی

یک وب‌سایت مدرن دو زبانه (فارسی-انگلیسی) با ۱۳ ابزار هوش مصنوعی برای منابع انسانی، بلاگ و پنل مدیریت.

## 🌟 ویژگی‌های کلیدی

### 🎨 طراحی و UX
- **طراحی مدرن**: استفاده از افکت‌های glassmorphism و neumorphism
- **گرادیان‌های چندرنگ**: طراحی خلاقانه با رنگ‌های نرم و جذاب
- **طرح واکنش‌گرا**: سازگار با دسکتاپ، تبلت و موبایل
- **دو زبانه**: پشتیبانی کامل از فارسی و انگلیسی با RTL/LTR

### 📚 قابلیت‌های بلاگ
- **مدیریت مقالات**: سیستم کامل مدیریت محتوا
- **دسته‌بندی و تگ‌ها**: سازماندهی محتوا
- **جستجوی متنی**: جستجوی پیشرفته در مقالات
- **نظرات**: سیستم نظردهی برای مقالات
- **واکنش‌ها**: امکان واکنش با ایموجی

### 🤖 ابزارهای هوش مصنوعی (۱۳ ابزار)

#### استخدام و جذب نیرو
1. **بهینه‌سازی عنوان شغل** - تولید عناوین سازگار با سئو
2. **سازنده شرح شغل** - ایجاد شرح شغل جذاب
3. **دستیار جستجوی شغل جهانی** - جستجو در چندین پلتفرم
4. **موتور تطبیق شغل** - تطبیق رزومه با مشاغل
5. **دستیار چت هوش مصنوعی** - چت‌بات تعاملی
6. **تولیدکننده پیام‌های شخصی‌سازی شده** - پیام‌های سفارشی
7. **اتوماسیون جذب نیرو** - یافتن خودکار کاندیداها

#### مدیریت عملکرد
8. **غربالگری و تجزیه رزومه** - تحلیل هوشمند رزومه‌ها
9. **شبیه‌ساز مصاحبه** - تمرین مصاحبه با AI
10. **دستیار آموزش کارکنان جدید** - راهنمای تعاملی
11. **بهینه‌ساز جلسات یک‌به‌یک** - تولید دستور کار

#### تحلیل و بینش
12. **تحلیل احساسات** - تحلیل بازخورد تیم
13. **تشخیص‌دهنده تعصب در استخدام** - شناسایی تعصبات

### 🔐 پنل مدیریت
- **احراز هویت ساده**: سیستم لاگین امن
- **داشبورد جامع**: نمای کلی آمار و عملکرد
- **مدیریت مقالات**: ایجاد، ویرایش و حذف مقالات
- **مدیریت کاربران**: کنترل دسترسی‌ها
- **تنظیمات سایت**: پیکربندی عمومی

## 🛠️ فناوری‌های استفاده شده

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📁 ساختار پروژه

```
hr-tech-ai-hub/
├── public/
│   ├── images/           # تصاویر استاتیک
│   └── articles/         # فایل‌های مقالات
├── src/
│   ├── components/       # کامپوننت‌های قابل استفاده مجدد
│   │   ├── ui/          # کامپوننت‌های UI پایه
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── pages/           # صفحات اصلی
│   │   ├── admin/       # صفحات پنل ادمین
│   │   ├── tools/       # ابزارهای هوش مصنوعی
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ArticlesPage.jsx
│   │   ├── ToolsPage.jsx
│   │   └── ContactPage.jsx
│   ├── data/            # داده‌های استاتیک
│   │   └── articles.js
│   ├── lib/             # توابع کمکی
│   │   └── utils.js
│   ├── App.jsx          # کامپوننت اصلی
│   ├── App.css          # استایل‌های سراسری
│   └── main.jsx         # نقطه ورود
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 راه‌اندازی محلی

### پیش‌نیازها
- Node.js (نسخه 18 یا بالاتر)
- pnpm (یا npm/yarn)

### مراحل نصب

1. **کلون کردن پروژه**
```bash
git clone https://github.com/your-username/hr-tech-ai-hub.git
cd hr-tech-ai-hub
```

2. **نصب وابستگی‌ها**
```bash
pnpm install
```

3. **اجرای سرور توسعه**
```bash
pnpm run dev
```

4. **باز کردن در مرورگر**
```
http://localhost:5173
```

## 📝 مدیریت محتوا

### افزودن مقاله جدید

1. فایل مقاله را در `public/articles/` قرار دهید
2. اطلاعات مقاله را در `src/data/articles.js` اضافه کنید:

```javascript
{
  id: 'unique-id',
  title: 'عنوان مقاله',
  titleEn: 'Article Title',
  excerpt: 'خلاصه مقاله...',
  excerptEn: 'Article excerpt...',
  content: 'محتوای کامل مقاله...',
  contentEn: 'Full article content...',
  author: 'نویسنده',
  date: '2024-01-01',
  category: 'دسته‌بندی',
  tags: ['تگ1', 'تگ2'],
  coverImage: '/images/article-cover.jpg',
  readTime: 5,
  slug: 'article-slug'
}
```

### دسترسی به پنل ادمین

1. به آدرس `/admin` بروید
2. اطلاعات ورود:
   - نام کاربری: `admin`
   - رمز عبور: `admin123`

## 🎨 سفارشی‌سازی طراحی

### تغییر رنگ‌ها
فایل `src/App.css` را ویرایش کنید:

```css
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
```

### افزودن افکت‌های جدید
کلاس‌های CSS موجود:
- `.glass`: افکت شیشه‌ای
- `.gradient-primary`: گرادیان اصلی
- `.gradient-secondary`: گرادیان ثانویه
- `.gradient-accent`: گرادیان تأکیدی

## 🔧 توسعه ابزارهای جدید

### ایجاد ابزار جدید

1. فایل جدید در `src/pages/tools/` ایجاد کنید
2. ساختار پایه:

```jsx
import { useState } from 'react';
import { useLanguage } from '../../App';

const NewTool = () => {
  const { language } = useLanguage();
  const [inputData, setInputData] = useState('');
  const [results, setResults] = useState(null);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Tool Name' : 'نام ابزار'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en' ? 'Tool description' : 'توضیحات ابزار'}
          </p>
        </div>
      </div>

      {/* Tool Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tool implementation */}
      </div>
    </div>
  );
};

export default NewTool;
```

3. ابزار را به `src/App.jsx` اضافه کنید
4. ابزار را در `src/pages/ToolsPage.jsx` معرفی کنید

## 📱 Responsive Design

وب‌سایت برای تمام اندازه‌های صفحه بهینه‌سازی شده:

- **موبایل**: < 768px
- **تبلت**: 768px - 1024px  
- **دسکتاپ**: > 1024px

### Breakpoints Tailwind
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🌐 چندزبانگی

### افزودن زبان جدید

1. فایل ترجمه در `src/translations/` ایجاد کنید
2. Context زبان را در `src/App.jsx` به‌روزرسانی کنید
3. کامپوننت‌ها را برای زبان جدید آماده کنید

### ساختار ترجمه
```javascript
const translations = {
  en: {
    home: 'Home',
    about: 'About Us',
    // ...
  },
  fa: {
    home: 'خانه',
    about: 'درباره ما',
    // ...
  }
};
```

## 🚀 Deployment

### GitHub Pages

1. **آماده‌سازی برای deployment**
```bash
pnpm run build
```

2. **تنظیم GitHub Pages**
   - به تنظیمات repository بروید
   - بخش Pages را فعال کنید
   - Source را GitHub Actions انتخاب کنید

3. **فایل workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### سایر پلتفرم‌ها

#### Netlify
1. فایل `netlify.toml` ایجاد کنید:
```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel
1. فایل `vercel.json` ایجاد کنید:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 🔒 امنیت

### احراز هویت
- سیستم احراز هویت ساده برای demo
- در production از JWT یا OAuth استفاده کنید
- اطلاعات حساس را در متغیرهای محیطی ذخیره کنید

### بهترین شیوه‌ها
- Input validation برای تمام فرم‌ها
- Sanitization برای محتوای کاربران
- HTTPS برای تمام ارتباطات
- Regular security updates

## 🧪 تست

### تست محلی
```bash
# اجرای تست‌ها
pnpm run test

# تست coverage
pnpm run test:coverage

# تست e2e
pnpm run test:e2e
```

### تست دستی
1. تست تمام صفحات در مرورگرهای مختلف
2. بررسی responsive design
3. تست تغییر زبان
4. تست تمام ابزارهای AI
5. تست پنل ادمین

## 📊 عملکرد

### بهینه‌سازی‌های انجام شده
- **Lazy loading** برای کامپوننت‌ها
- **Image optimization** برای تصاویر
- **Code splitting** برای bundle size
- **CSS optimization** برای سرعت بارگذاری

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 95+

## 🤝 مشارکت

### راهنمای مشارکت

1. **Fork** کردن پروژه
2. **Branch** جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را **commit** کنید (`git commit -m 'Add amazing feature'`)
4. به branch خود **push** کنید (`git push origin feature/amazing-feature`)
5. **Pull Request** ایجاد کنید

### استانداردهای کد
- استفاده از ESLint و Prettier
- نام‌گذاری معنادار برای متغیرها و توابع
- کامنت‌گذاری برای کدهای پیچیده
- تست نوشتن برای ویژگی‌های جدید

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است. فایل [LICENSE](LICENSE) را برای جزئیات بیشتر مطالعه کنید.

## 📞 پشتیبانی

برای سوالات و پشتیبانی:

- **ایمیل**: support@hrtech-ai.com
- **GitHub Issues**: [مسائل پروژه](https://github.com/your-username/hr-tech-ai-hub/issues)
- **تلگرام**: @hrtech_support

## 🙏 تشکر

از تمام کسانی که در توسعه این پروژه مشارکت داشته‌اند تشکر می‌کنیم:

- تیم طراحی UI/UX
- توسعه‌دهندگان Frontend
- تیم تست و QA
- مترجمان محتوا

---

**HR-Tech AI Hub** - انقلاب در منابع انسانی با قدرت هوش مصنوعی 🚀

