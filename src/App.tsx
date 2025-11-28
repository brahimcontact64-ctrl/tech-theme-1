import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { Products } from './components/Products';
import { ProductDetail } from './components/ProductDetail';
import { TechDeals } from './components/TechDeals';
import { Footer } from './components/Footer';
import { Product } from './types';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <Hero />
        <Categories />
        <TechDeals />
        <Products onProductClick={setSelectedProduct} />
        <Footer />

        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
