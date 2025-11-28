import { useLanguage } from '../context/LanguageContext';
import { GlowCard } from './GlowCard';

interface ProductSpecTableProps {
  specs: Record<string, string>;
}

export function ProductSpecTable({ specs }: ProductSpecTableProps) {
  const { language } = useLanguage();

  const title = language === 'fr' ? 'Spécifications Techniques' : 'المواصفات التقنية';

  return (
    <GlowCard className="p-6" glowColor="purple" hover={false}>
      <h3 className="font-orbitron text-xl mb-4 text-gradient">{title}</h3>
      <div className="space-y-3">
        {Object.entries(specs).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center pb-3 border-b border-gray-800 last:border-b-0"
          >
            <span className="text-gray-400 font-medium">{key}</span>
            <span className="text-white font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}
