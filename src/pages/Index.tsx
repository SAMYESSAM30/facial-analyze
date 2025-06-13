import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, Beaker, ListChecks, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeamSection from "@/components/ui/TeamSection";

const Index: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Camera size={40} className="text-skin-purple" />,
      title: t("steps.upload.title"),
      description: t("steps.upload.desc"),
    },
    {
      icon: <Beaker size={40} className="text-skin-purple" />,
      title: t("steps.analyze.title"),
      description: t("steps.analyze.desc"),
    },
    {
      icon: <ListChecks size={40} className="text-skin-purple" />,
      title: t("steps.recommend.title"),
      description: t("steps.recommend.desc"),
    },
  ];

  const testimonials = [
    {
      name: "Sarah J.",
      text: "After using the recommended products for just 2 weeks, my skin feels completely transformed!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Michael P.",
      text: "The analysis accurately identified my skin concerns and the product recommendations were spot on.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Emma L.",
      text: "I've been struggling with my skincare routine for years. This platform helped me find exactly what my skin needed.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "David K.",
      text: "The personalized recommendations have made a noticeable difference in my skin's appearance and texture.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const featuredProducts = [
    {
      name: "Hydrating Serum",
      description: "Intense hydration for dry skin with hyaluronic acid",
      image:
        "https://images.unsplash.com/photo-1605204359736-9a08b7175fc7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Serum",
    },
    {
      name: "Brightening Moisturizer",
      description: "Lighten dark spots and even skin tone",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Moisturizer",
    },
    {
      name: "Gentle Cleanser",
      description: "Removes impurities without stripping natural oils",
      image:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Cleanser",
    },
    {
      name: "Anti-Aging Night Cream",
      description: "Reduces fine lines and wrinkles while you sleep",
      image:
        "https://images.unsplash.com/photo-1620306805869-1bd9ea04b055?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Night Cream",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-skin-pink-light to-white dark:from-skin-dark dark:to-skin-dark-charcoal">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair">
                {t("hero.title")}
              </h1>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-md">
                {t("hero.subtitle")}
              </p>
              <Button asChild className="btn-primary animate-fade-in" size="lg">
                <Link to="/analysis">{t("hero.cta")}</Link>
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-skin-pink opacity-30 dark:bg-skin-purple-dark dark:opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-skin-purple-light opacity-40 dark:bg-skin-purple dark:opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Woman applying skincare"
                  className="rounded-lg shadow-2xl w-full object-cover h-[500px] relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 bg-white dark:bg-skin-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-playfair">
            {t("steps.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-xl animated-card"
              >
                <div className="flex justify-center mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 px-4 md:px-6 bg-skin-pink-light/50 dark:bg-skin-dark">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1644794472051-36d154dfe487?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI technology visualization"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
                {t("about.preview.title")}
              </h2>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                {t("about.preview.desc")}
              </p>
              <Button asChild variant="outline" className="animate-fade-in">
                <Link to="/about">{t("about.preview.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Index;
