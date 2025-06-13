import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamSection from "@/components/ui/TeamSection";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-skin-pink-light to-white dark:from-skin-dark dark:to-skin-dark-charcoal">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair">
            {t("about.title")}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 md:px-6 bg-white dark:bg-skin-dark">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-playfair">
                {t("about.techTitle")}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t("about.techDesc1")}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {t("about.techDesc2")}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1644794472051-36d154dfe487?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("about.techImageAlt")}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-6 bg-skin-pink-light/50 dark:bg-skin-dark-gray">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center font-playfair">
            {t("about.benefitsTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">
                {t("about.benefit1.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("about.benefit1.desc")}
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">
                {t("about.benefit2.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("about.benefit2.desc")}
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">
                {t("about.benefit3.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("about.benefit3.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <TeamSection />

      {/* Research Section */}
      <section className="py-20 px-4 md:px-6 bg-white dark:bg-skin-dark">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-playfair">
              {t("about.researchTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t("about.researchDesc1")}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t("about.researchDesc2")}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {t("about.researchDesc3")}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
