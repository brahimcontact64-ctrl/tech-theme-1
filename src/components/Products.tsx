import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import productsData from '../data/products.json';

interface ProductsProps {
  onProductClick: (product: Product) => void;
}

export function Products({ onProductClick }: ProductsProps) {
  const { language } = useLanguage();
  const products = productsData as Product[];

  const title = language === 'fr' ? 'PRODUITS PHARES' : 'المنتجات المميزة';

  return (
    <section id="products" className="py-12 sm:py-16 md:py-20 bg-dark-bg">
      <div className="container mx-auto px-4">
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gradient">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
