import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
                Computer Vision Technology
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our advanced computer vision algorithms analyze your facial
                features and skin texture to identify various skin concerns with
                precision.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Using thousands of data points from your uploaded image, our AI
                can detect dark spots, wrinkles, enlarged pores, redness,
                dryness, oiliness, and uneven skin tone.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1644794472051-36d154dfe487?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI technology visualization"
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
            Benefits of AI Skin Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">
                Personalized Recommendations
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Receive product recommendations tailored specifically to your
                skin's unique needs and concerns.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Save Time and Money</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Avoid purchasing products that don't address your specific skin
                issues and focus on what truly works for you.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">
                Track Progress Over Time
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Monitor how your skin improves with recommended treatments by
                analyzing changes in your skin condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-20 px-4 md:px-6 bg-white dark:bg-skin-dark">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-playfair">
              Our Research
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our AI model has been trained on a diverse dataset of over 100,000
              facial images representing various skin types, tones, and
              conditions. This extensive training ensures accurate analysis
              across different ethnicities and age groups.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We've collaborated with dermatologists and skincare experts to
              validate our technology, ensuring that the recommendations align
              with professional skincare practices and principles.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The system continually improves through machine learning, becoming
              more accurate with each analysis performed. Your privacy is our
              priority - all images are processed securely and not stored beyond
              the analysis period.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
