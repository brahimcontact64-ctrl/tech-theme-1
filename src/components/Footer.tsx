import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Package, Instagram, Mail, MapPin, Zap } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();

  const content = {
    fr: {
      tagline: 'Votre destination pour la technologie gaming en Algérie',
      contact: 'Contact',
      delivery: 'Livraison en Algérie',
      followUs: 'Suivez-nous',
      rights: '© 2025 Hizou TechStore DZ. Tous droits réservés.',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      email: 'Email',
      location: 'Algérie',
    },
    ar: {
      tagline: 'وجهتك لتكنولوجيا الألعاب في الجزائر',
      contact: 'اتصل بنا',
      delivery: 'التوصيل في الجزائر',
      followUs: 'تابعنا',
      rights: '© 2025 Hizou TechStore DZ. جميع الحقوق محفوظة.',
      whatsapp: 'واتساب',
      instagram: 'إنستغرام',
      email: 'البريد الإلكتروني',
      location: 'الجزائر',
    },
  };

  const t = content[language];

  return (
    <footer className="bg-gradient-to-b from-dark-bg to-black border-t neon-border-blue">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Zap className="text-neon-blue" size={24} />
              <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-bold text-gradient">HIZOU TechStore</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">{t.tagline}</p>
          </div>

          <div>
            <h4 className="font-orbitron text-base sm:text-lg mb-3 sm:mb-4 text-neon-blue">{t.contact}</h4>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="https://wa.me/213000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-neon-blue transition-colors text-sm sm:text-base"
              >
                <MessageCircle size={18} />
                <span>{t.whatsapp}</span>
              </a>
              <a
                href="mailto:contact@hizoutech.dz"
                className="flex items-center gap-2 text-gray-300 hover:text-neon-blue transition-colors text-sm sm:text-base"
              >
                <Mail size={18} />
                <span>{t.email}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <MapPin size={18} />
                <span>{t.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-orbitron text-base sm:text-lg mb-3 sm:mb-4 text-neon-purple">{t.followUs}</h4>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="https://instagram.com/hizoutech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-neon-purple transition-colors text-sm sm:text-base"
              >
                <Instagram size={18} />
                <span>{t.instagram}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <Package size={18} />
                <span>{t.delivery}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 sm:pt-6 text-center text-gray-500 text-xs sm:text-sm">
          {t.rights}
        </div>
      </div>
    </footer>
  );
}
