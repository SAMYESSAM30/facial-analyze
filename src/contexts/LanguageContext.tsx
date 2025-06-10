import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Simple translations object
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.products": "Products",
    "nav.analysis": "Skin Analysis",
    "hero.title": "AI-Powered Skin Analysis",
    "hero.subtitle":
      "Discover personalized skincare recommendations based on your unique skin profile",
    "hero.cta": "Start Analysis",
    "steps.title": "How It Works",
    "steps.upload.title": "Upload Photo",
    "steps.upload.desc": "Take a clear selfie or upload a photo of your face",
    "steps.analyze.title": "AI Analysis",
    "steps.analyze.desc":
      "Our advanced AI technology scans and identifies your skin concerns",
    "steps.recommend.title": "Get Recommendations",
    "steps.recommend.desc":
      "Receive personalized product recommendations for your skin",
    "about.preview.title": "About Our Technology",
    "about.preview.desc":
      "Our AI-powered skin analysis tool uses computer vision to identify skin concerns and recommend personalized skincare products.",
    "about.preview.cta": "Learn More",
    "about.title": "Advanced Skin Analysis",
    "about.subtitle": "How Our Technology Works",
    "products.title": "Recommended Products",
    "products.subtitle": "Tailored to your skin needs",
    "analysis.title": "Skin Analysis",
    "analysis.subtitle": "Upload a photo to analyze your skin",
    "analysis.upload": "Upload Photo",
    "analysis.or": "or",
    "analysis.camera": "Take Photo",
    "analysis.guidelines":
      "For best results, ensure good lighting and a clear view of your face",
    "analysis.results.title": "Your Skin Analysis Results",
    "analysis.recommendations": "Product Recommendations",
    "analysis.analyzing": "Analyzing Your Skin...",
    "analysis.review": "Review Your Photo",
    "analysis.complete": "complete",
    "analysis.skin_type": "Skin Type: ",
    "analysis.confidence": "Confidence: ",
    "analysis.concerns": "Identified Concerns",
    "analysis.oily": "Oily",
    "analysis.dry": "Dry",
    "analysis.normal": "Normal",
    "camera.title": "Take a Photo",
    "camera.capture": "Capture",
    "camera.cancel": "Cancel",
    "skin_descriptions.oily":
      "Your skin tends to produce excess sebum, typical of oily skin type.",
    "skin_descriptions.dry":
      "Your skin lacks sufficient moisture, typical of dry skin type.",
    "skin_descriptions.normal":
      "Your skin is well-balanced, typical of normal skin type.",
    "analysis.upload.click": "Click to upload",
    "analysis.upload.drag": "or drag and drop",
    "analysis.upload.formats": "JPEG, PNG or JPG (MAX. 5MB)",
    "analysis.uploaded_alt": "Uploaded face",
    "analysis.analyzed_alt": "Analyzed face",
    "analysis.change_photo": "Change Photo",
    "analysis.recommended_for": "Recommended for your",
    "analysis.view_product": "View Product",
    "analysis.view_all_products": "View All Products",
    "analysis.upload.title": "Upload Photo",
    "analysis.analyze": "Analyze",
    "analysis.try_another": "Try another photo",
    "about.techTitle": "Computer Vision Technology",
    "about.techDesc1":
      "Our advanced AI technology scans and identifies skin concerns, enabling personalized skincare recommendations for your skin.",
    "about.techDesc2":
      "We use cutting-edge computer vision technology to analyze your skin, identifying skin concerns and recommending personalized skincare products.",
    "about.techImageAlt": "AI technology visualization",
    "about.benefitsTitle": "Benefits of AI-Powered Skin Analysis",
    "about.benefit1.title": "Personalized Recommendations",
    "about.benefit1.desc":
      "Tailored skincare products based on your unique skin profile, ensuring personalized care for your skin.",
    "about.benefit2.title": "Efficient Analysis",
    "about.benefit2.desc":
      "Quick and accurate analysis of your skin, saving you time and effort.",
    "about.benefit3.title": "Cost Savings",
    "about.benefit3.desc":
      "Reducing the need for expensive skincare products, saving you money.",
    "about.researchTitle": "Our Research",
    "about.researchDesc1":
      "We have conducted extensive research to develop our AI-powered skin analysis tool, ensuring it provides accurate and effective recommendations for skincare.",
    "about.researchDesc2":
      "Our team of experts has worked tirelessly to create a cutting-edge technology that accurately identifies skin concerns and recommends personalized skincare products.",
    "about.researchDesc3":
      "The system continually improves through machine learning, becoming more accurate with each analysis performed. Your privacy is our priority - all images are processed securely and not stored beyond the analysis period.",
    "footer.description":
      "Advanced AI-powered skin analysis for personalized skincare recommendations.",
    "footer.links": "Quick Links",
    "footer.contact": "Contact Us",
    "footer.rights": "All rights reserved.",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "عن التطبيق",
    "nav.products": "المنتجات",
    "nav.analysis": "تحليل البشرة",
    "hero.title": "تحليل البشرة بالذكاء الاصطناعي",
    "hero.subtitle":
      "اكتشف توصيات العناية بالبشرة المخصصة بناءً على ملف بشرتك الفريد",
    "hero.cta": "ابدأ التحليل",
    "steps.title": "كيف يعمل",
    "steps.upload.title": "تحميل الصورة",
    "steps.upload.desc": "التقط صورة سيلفي واضحة أو قم بتحميل صورة لوجهك",
    "steps.analyze.title": "تحليل الذكاء الاصطناعي",
    "steps.analyze.desc":
      "تقوم تقنية الذكاء الاصطناعي المتقدمة لدينا بفحص وتحديد مشاكل بشرتك",
    "steps.recommend.title": "الحصول على التوصيات",
    "steps.recommend.desc": "احصل على توصيات المنتجات المخصصة لبشرتك",
    "about.preview.title": "عن تقنيتنا",
    "about.preview.desc":
      "تستخدم أداة تحليل البشرة المدعومة بالذكاء الاصطناعي رؤية الكمبيوتر لتحديد مشاكل البشرة والتوصية بمنتجات العناية بالبشرة المخصصة.",
    "about.preview.cta": "معرفة المزيد",
    "about.title": "تحليل البشرة المتقدم",
    "about.subtitle": "كيف تعمل تقنيتنا",
    "products.title": "المنتجات الموصى بها",
    "products.subtitle": "مصممة خصيصًا لاحتياجات بشرتك",
    "analysis.title": "تحليل البشرة",
    "analysis.subtitle": "قم بتحميل صورة لتحليل بشرتك",
    "analysis.upload": "تحميل صورة",
    "analysis.or": "أو",
    "analysis.camera": "التقط صورة",
    "analysis.guidelines":
      "للحصول على أفضل النتائج، تأكد من وجود إضاءة جيدة ورؤية واضحة لوجهك",
    "analysis.results.title": "نتائج تحليل بشرتك",
    "analysis.recommendations": "توصيات المنتجات",
    "analysis.analyzing": "جاري تحليل بشرتك...",
    "analysis.review": "راجع صورتك",
    "analysis.complete": "اكتمال",
    "analysis.skin_type": "نوع البشرة: ",
    "analysis.confidence": "الثقة: ",
    "analysis.concerns": "المشكلات المحددة",
    "analysis.oily": "دهنية",
    "analysis.dry": "جافة",
    "analysis.normal": "عادية",
    "camera.title": "التقاط صورة",
    "camera.capture": "التقاط",
    "camera.cancel": "إلغاء",
    "skin_descriptions.oily":
      "بشرتك تميل إلى إفراز الزيوت الزائدة، وهو ما يميز البشرة الدهنية.",
    "skin_descriptions.dry":
      "بشرتك تفتقر إلى الترطيب الكافي، وهو ما يميز البشرة الجافة.",
    "skin_descriptions.normal": "بشرتك متوازنة، وهو ما يميز البشرة العادية.",
    "analysis.upload.click": "انقر للرفع",
    "analysis.upload.drag": "أو اسحب وأفلت",
    "analysis.upload.formats": "JPEG, PNG أو JPG (الحد الأقصى 5MB)",
    "analysis.uploaded_alt": "الصورة المرفوعة",
    "analysis.analyzed_alt": "الصورة المحللة",
    "analysis.change_photo": "تغيير الصورة",
    "analysis.recommended_for": "موصى به ل",
    "analysis.view_product": "عرض المنتج",
    "analysis.view_all_products": "عرض جميع المنتجات",
    "analysis.upload.title": "رفع صورة",
    "analysis.analyze": "تحليل",
    "analysis.try_another": "حاول تحليل صورة اخرى",

    "about.techTitle": "تقنية الرؤية الحاسوبية",
    "about.techDesc1":
      "تقوم تقنيتنا المتقدمة في الذكاء الاصطناعي بفحص البشرة وتحديد مشكلاتها، مما يتيح تقديم توصيات مخصصة للعناية بالبشرة وفقًا لحالة بشرتك.",
    "about.techDesc2":
      "نستخدم أحدث تقنيات الرؤية الحاسوبية لتحليل بشرتك، والتعرف على مشكلاتها، وتقديم توصيات مخصصة بمنتجات العناية بالبشرة.",
    "about.techImageAlt": "رؤية لتقنية الذكاء الاصطناعي",
    "about.benefitsTitle": "فوائد تحليل البشرة بالذكاء الاصطناعي",
    "about.benefit1.title": "توصيات مخصصة",
    "about.benefit1.desc":
      "منتجات عناية بالبشرة مخصصة بناءً على خصائص بشرتك الفريدة، لضمان رعاية شخصية فعّالة.",
    "about.benefit2.title": "تحليل سريع ودقيق",
    "about.benefit2.desc":
      "تحليل سريع ودقيق لبشرتك، مما يوفر عليك الوقت والجهد.",
    "about.benefit3.title": "توفير في التكاليف",
    "about.benefit3.desc":
      "تقليل الحاجة لاستخدام منتجات عناية بالبشرة باهظة الثمن، مما يوفر لك المال.",
    "about.researchTitle": "أبحاثنا",
    "about.researchDesc1":
      "أجرينا أبحاثًا مكثفة لتطوير أداة تحليل البشرة المدعومة بالذكاء الاصطناعي، لضمان تقديم توصيات دقيقة وفعّالة للعناية بالبشرة.",
    "about.researchDesc2":
      "عمل فريق خبرائنا بجهد كبير لتطوير تقنية متقدمة تحدد مشكلات البشرة بدقة وتوصي بمنتجات عناية مخصصة.",
    "about.researchDesc3":
      "يواصل النظام التحسن من خلال التعلم الآلي، ليصبح أكثر دقة مع كل تحليل يتم إجراؤه. خصوصيتك هي أولويتنا - تتم معالجة الصور بأمان ولا يتم تخزينها بعد انتهاء التحليل.",
    "footer.description":
      "تحليل متقدم للبشرة مدعوم بالذكاء الاصطناعي لتقديم توصيات مخصصة للعناية بالبشرة.",
    "footer.links": "روابط سريعة",
    "footer.contact": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Check if user has a preferred language stored
    const storedLanguage = localStorage.getItem("language") as Language | null;

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update document direction when language changes
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // Store language preference
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  // Translation function
  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
