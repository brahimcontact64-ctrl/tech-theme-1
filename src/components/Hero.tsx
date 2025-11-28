import { useLanguage } from '../context/LanguageContext';
import { RGBButton } from './RGBButton';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: 'TECH GAMING',
      subtitle: 'ÉDITION BLACK NEON',
      description: 'Équipez-vous avec les dernières technologies gaming. PC, périphériques RGB, et plus encore.',
      cta: 'SHOP NOW',
      scroll: 'Défiler',
    },
    ar: {
      title: 'تقنيات الألعاب',
      subtitle: 'إصدار بلاك نيون',
      description: 'جهز نفسك بأحدث تقنيات الألعاب. أجهزة كمبيوتر، ملحقات RGB، والمزيد.',
      cta: 'ابدأ التسوق',
      scroll: 'تمرير',
    },
  };

  const t = content[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/7172877/pexels-photo-7172877.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/60 to-dark-bg"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-4 text-gradient leading-tight">
            {t.title}
          </h2>
          <p className="text-neon-blue text-lg sm:text-xl md:text-2xl lg:text-3xl font-orbitron mb-6 tracking-wider neon-pulse">
            {t.subtitle}
          </p>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto px-4">
            {t.description}
          </p>
          <RGBButton onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.cta}
          </RGBButton>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-400 text-sm">{t.scroll}</span>
          <ChevronDown className="text-neon-blue" size={24} />
        </div>
      </div>
    </section>
  );
}
