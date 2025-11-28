import { useState } from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { RGBButton } from './RGBButton';
import { ProductSpecTable } from './ProductSpecTable';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Flame } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [product.image_url, ...product.images];
  const name = language === 'fr' ? product.name_fr : product.name_ar;
  const description = language === 'fr' ? product.description_fr : product.description_ar;

  const hasDiscount = product.original_price_dzd && product.original_price_dzd > product.price_dzd;
  const discountPercent = hasDiscount
    ? Math.round(((product.original_price_dzd! - product.price_dzd) / product.original_price_dzd!) * 100)
    : 0;

  const content = {
    fr: {
      addToCart: 'AJOUTER AU PANIER',
      stock: 'En stock',
      outOfStock: 'Rupture de stock',
      limitedStock: `Plus que ${product.stock} en stock`,
    },
    ar: {
      addToCart: 'أضف إلى السلة',
      stock: 'متوفر',
      outOfStock: 'نفذ من المخزون',
      limitedStock: `فقط ${product.stock} متوفر`,
    },
  };

  const t = content[language];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-dark-bg neon-border-blue max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto my-auto">
        <button
          onClick={onClose}
          className="sticky top-2 sm:absolute sm:top-4 right-2 sm:right-4 z-20 p-2 bg-dark-bg neon-border-purple hover:bg-neon-purple/20 transition-colors ml-auto block"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
          <div className="relative">
            <div className="relative aspect-square overflow-hidden neon-border-blue mb-3 sm:mb-4">
              {product.is_flash_sale && (
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full flex items-center gap-1 sm:gap-2 animate-pulse">
                  <Flame size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold">OFFRE FLASH</span>
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-neon-purple px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                  <span className="text-xs sm:text-sm md:text-base font-bold">-{discountPercent}%</span>
                </div>
              )}
              <img
                src={images[currentImageIndex]}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <button
                  onClick={prevImage}
                  className="p-1.5 sm:p-2 neon-border-blue hover:neon-glow-blue transition-all"
                >
                  <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                </button>
                <div className="flex gap-1.5 sm:gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-neon-blue neon-glow-blue scale-125'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextImage}
                  className="p-1.5 sm:p-2 neon-border-blue hover:neon-glow-blue transition-all"
                >
                  <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gradient leading-tight">
                {name}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{description}</p>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              {hasDiscount && (
                <span className="text-gray-500 line-through text-base sm:text-lg md:text-xl">
                  {product.original_price_dzd?.toLocaleString()} DZD
                </span>
              )}
              <span className="text-neon-blue font-bold text-2xl sm:text-3xl md:text-4xl font-orbitron">
                {product.price_dzd.toLocaleString()} DZD
              </span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              {product.stock > 0 ? (
                <>
                  <p className="text-green-400 font-semibold text-sm sm:text-base">✓ {t.stock}</p>
                  {product.stock < 10 && (
                    <p className="text-orange-400 text-xs sm:text-sm">{t.limitedStock}</p>
                  )}
                </>
              ) : (
                <p className="text-red-400 font-semibold text-sm sm:text-base">✗ {t.outOfStock}</p>
              )}
            </div>

            <RGBButton
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
              {t.addToCart}
            </RGBButton>

            <ProductSpecTable specs={product.specs} />
          </div>
        </div>
      </div>
    </div>
  );
}
