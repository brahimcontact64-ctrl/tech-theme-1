import { useLanguage } from '../context/LanguageContext';
import { Deal } from '../types';
import { GlowCard } from './GlowCard';
import { Zap, Clock } from 'lucide-react';
import dealsData from '../data/deals.json';

export function TechDeals() {
  const { language } = useLanguage();
  const deals = dealsData as Deal[];

  const title = language === 'fr' ? 'OFFRES TECH' : 'عروض التكنولوجيا';

  if (deals.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 md:mb-12">
          <Zap className="text-neon-blue animate-pulse" size={28} />
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
            {title}
          </h2>
          <Zap className="text-neon-purple animate-pulse" size={28} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {deals.map((deal) => {
            const title = language === 'fr' ? deal.title_fr : deal.title_ar;
            const description = language === 'fr' ? deal.description_fr : deal.description_ar;
            const endDate = new Date(deal.end_date);
            const now = new Date();
            const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            return (
              <GlowCard
                key={deal.id}
                className="p-4 sm:p-6 md:p-8 relative overflow-hidden group"
                glowColor="purple"
              >
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-neon-purple to-transparent opacity-20 group-hover:opacity-30 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-gradient mb-2 leading-tight">
                        {title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base">{description}</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-500 to-orange-500 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full shrink-0">
                      <span className="text-xl sm:text-2xl md:text-3xl font-black">-{deal.discount_percent}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-neon-blue">
                    <Clock size={16} className="sm:w-4.5 sm:h-4.5" />
                    <span className="font-semibold text-sm sm:text-base">
                      {language === 'fr'
                        ? `Plus que ${daysLeft} jour${daysLeft > 1 ? 's' : ''}`
                        : `${daysLeft} يوم متبقي`}
                    </span>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
