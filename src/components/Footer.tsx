import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-skin-pink-light dark:bg-skin-dark-charcoal pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              to="/"
              className="text-2xl font-playfair font-bold gradient-text"
            >
              PureSkin
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs">
              {t("footer.description") ||
                "Advanced AI-powered skin analysis for personalized skincare recommendations."}
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-skin-purple dark:text-gray-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-skin-purple dark:text-gray-300 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-skin-purple dark:text-gray-300 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-skin-purple dark:text-gray-300 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.links") || "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-skin-purple dark:text-gray-300 transition-colors"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-skin-purple dark:text-gray-300 transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>

              <li>
                <Link
                  to="/analysis"
                  className="text-gray-600 hover:text-skin-purple dark:text-gray-300 transition-colors"
                >
                  {t("nav.analysis")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.contact") || "Contact Us"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              contact@PureSkin.ai
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            {t("footer.rights") || "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
