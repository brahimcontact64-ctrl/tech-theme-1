import { useLanguage } from '../context/LanguageContext';
import { Zap, Languages } from 'lucide-react';

export function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm border-b neon-border-blue">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Zap className="text-neon-blue neon-pulse" size={24} />
            <h1 className="font-orbitron text-base sm:text-xl md:text-2xl font-bold">
              <span className="text-gradient">HIZOU</span>
              <span className="text-white hidden sm:inline"> TechStore</span>
            </h1>
          </div>

          <button
            onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 neon-border-purple hover:bg-neon-purple/10 transition-all duration-300"
          >
            <Languages size={16} className="sm:w-5 sm:h-5" />
            <span className="font-orbitron text-xs sm:text-sm">{language === 'fr' ? 'AR' : 'FR'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
