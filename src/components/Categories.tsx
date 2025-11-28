import { useLanguage } from '../context/LanguageContext';
import { Category } from '../types';
import { GlowCard } from './GlowCard';
import { Monitor, Keyboard, Armchair, Cpu, Headphones } from 'lucide-react';
import categoriesData from '../data/categories.json';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  monitor: Monitor,
  keyboard: Keyboard,
  armchair: Armchair,
  cpu: Cpu,
  headphones: Headphones,
};

export function Categories() {
  const { language } = useLanguage();
  const categories = categoriesData as Category[];

  const title = language === 'fr' ? 'CATÉGORIES' : 'الفئات';

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-dark-bg to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gradient">
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Monitor;
            const name = language === 'fr' ? category.name_fr : category.name_ar;

            return (
              <GlowCard
                key={category.id}
                className="p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center gap-3 md:gap-4 cursor-pointer group"
              >
                <Icon className="text-neon-blue group-hover:text-neon-purple transition-colors duration-300" size={40} />
                <h3 className="font-orbitron text-xs sm:text-sm md:text-base text-center leading-tight">{name}</h3>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
