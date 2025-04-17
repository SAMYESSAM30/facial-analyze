
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-20 bg-gradient-to-br from-skin-pink-light to-white dark:from-skin-dark dark:to-skin-dark-charcoal">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold font-playfair mb-4 gradient-text">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't seem to exist. Let's get you back on track.
          </p>
          <Button asChild className="btn-primary">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
