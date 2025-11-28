import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { GlowCard } from './GlowCard';
import { Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { language } = useLanguage();
  const name = language === 'fr' ? product.name_fr : product.name_ar;
  const hasDiscount = product.original_price_dzd && product.original_price_dzd > product.price_dzd;
  const discountPercent = hasDiscount
    ? Math.round(((product.original_price_dzd! - product.price_dzd) / product.original_price_dzd!) * 100)
    : 0;

  return (
    <GlowCard className="p-3 sm:p-4 cursor-pointer group" onClick={onClick}>
      <div className="relative overflow-hidden mb-3 sm:mb-4">
        {product.is_flash_sale && (
          <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
            <Flame size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="text-[10px] sm:text-xs font-bold">OFFRE</span>
          </div>
        )}
        {hasDiscount && (
          <div className="absolute top-2 right-2 z-10 bg-neon-purple px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <span className="text-[10px] sm:text-xs font-bold">-{discountPercent}%</span>
          </div>
        )}
        <img
          src={product.image_url}
          alt={name}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="font-orbitron text-sm sm:text-base lg:text-lg mb-2 text-gradient line-clamp-2">{name}</h3>
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        {hasDiscount && (
          <span className="text-gray-500 line-through text-xs sm:text-sm">
            {product.original_price_dzd?.toLocaleString()} DZD
          </span>
        )}
        <span className="text-neon-blue font-bold text-base sm:text-lg lg:text-xl">
          {product.price_dzd.toLocaleString()} DZD
        </span>
      </div>
      {product.stock < 10 && product.stock > 0 && (
        <p className="text-orange-400 text-[10px] sm:text-xs mt-2">
          {language === 'fr' ? `Plus que ${product.stock} en stock` : `فقط ${product.stock} متوفر`}
        </p>
      )}
    </GlowCard>
  );
}
