
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Simple translations object
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.analysis': 'Skin Analysis',
    'hero.title': 'AI-Powered Skin Analysis',
    'hero.subtitle': 'Discover personalized skincare recommendations based on your unique skin profile',
    'hero.cta': 'Start Analysis',
    'steps.title': 'How It Works',
    'steps.upload.title': 'Upload Photo',
    'steps.upload.desc': 'Take a clear selfie or upload a photo of your face',
    'steps.analyze.title': 'AI Analysis',
    'steps.analyze.desc': 'Our advanced AI technology scans and identifies your skin concerns',
    'steps.recommend.title': 'Get Recommendations',
    'steps.recommend.desc': 'Receive personalized product recommendations for your skin',
    'about.preview.title': 'About Our Technology',
    'about.preview.desc': 'Our AI-powered skin analysis tool uses computer vision to identify skin concerns and recommend personalized skincare products.',
    'about.preview.cta': 'Learn More',
    'about.title': 'Advanced Skin Analysis',
    'about.subtitle': 'How Our Technology Works',
    'products.title': 'Recommended Products',
    'products.subtitle': 'Tailored to your skin needs',
    'analysis.title': 'Skin Analysis',
    'analysis.subtitle': 'Upload a photo to analyze your skin',
    'analysis.upload': 'Upload Photo',
    'analysis.or': 'or',
    'analysis.camera': 'Take Photo',
    'analysis.guidelines': 'For best results, ensure good lighting and a clear view of your face',
    'analysis.results.title': 'Your Skin Analysis Results',
    'analysis.recommendations': 'Product Recommendations',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'عن التطبيق',
    'nav.products': 'المنتجات',
    'nav.analysis': 'تحليل البشرة',
    'hero.title': 'تحليل البشرة بالذكاء الاصطناعي',
    'hero.subtitle': 'اكتشف توصيات العناية بالبشرة المخصصة بناءً على ملف بشرتك الفريد',
    'hero.cta': 'ابدأ التحليل',
    'steps.title': 'كيف يعمل',
    'steps.upload.title': 'تحميل الصورة',
    'steps.upload.desc': 'التقط صورة سيلفي واضحة أو قم بتحميل صورة لوجهك',
    'steps.analyze.title': 'تحليل الذكاء الاصطناعي',
    'steps.analyze.desc': 'تقوم تقنية الذكاء الاصطناعي المتقدمة لدينا بفحص وتحديد مشاكل بشرتك',
    'steps.recommend.title': 'الحصول على التوصيات',
    'steps.recommend.desc': 'احصل على توصيات المنتجات المخصصة لبشرتك',
    'about.preview.title': 'عن تقنيتنا',
    'about.preview.desc': 'تستخدم أداة تحليل البشرة المدعومة بالذكاء الاصطناعي رؤية الكمبيوتر لتحديد مشاكل البشرة والتوصية بمنتجات العناية بالبشرة المخصصة.',
    'about.preview.cta': 'معرفة المزيد',
    'about.title': 'تحليل البشرة المتقدم',
    'about.subtitle': 'كيف تعمل تقنيتنا',
    'products.title': 'المنتجات الموصى بها',
    'products.subtitle': 'مصممة خصيصًا لاحتياجات بشرتك',
    'analysis.title': 'تحليل البشرة',
    'analysis.subtitle': 'قم بتحميل صورة لتحليل بشرتك',
    'analysis.upload': 'تحميل صورة',
    'analysis.or': 'أو',
    'analysis.camera': 'التقط صورة',
    'analysis.guidelines': 'للحصول على أفضل النتائج، تأكد من وجود إضاءة جيدة ورؤية واضحة لوجهك',
    'analysis.results.title': 'نتائج تحليل بشرتك',
    'analysis.recommendations': 'توصيات المنتجات',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check if user has a preferred language stored
    const storedLanguage = localStorage.getItem('language') as Language | null;
    
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update document direction when language changes
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Store language preference
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
