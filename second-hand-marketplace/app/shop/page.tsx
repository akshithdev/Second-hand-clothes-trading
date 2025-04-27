'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  condition: string;
  category: string;
  description: string;
  status: string;
  seller: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Shop() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('/api/products?userType=retailer');
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-gray-800 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredProducts = activeCategory === 'ALL' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.h1 
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Retailer Products
          </motion.h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeCategory === 'ALL' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('ALL')}
          >
            All Items
          </Button>
          <Button 
            variant={activeCategory === 'FURNITURE' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('FURNITURE')}
          >
            Furniture
          </Button>
          <Button 
            variant={activeCategory === 'ELECTRONICS' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('ELECTRONICS')}
          >
            Electronics
          </Button>
          <Button 
            variant={activeCategory === 'BOOKS' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('BOOKS')}
          >
            Books
          </Button>
        </div>

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found from retailers.</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">By {product.seller.name}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold">₹{product.price}</span>
                    <span className="text-sm text-green-600">
                      {product.condition}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      // You can implement contact seller functionality here
                      alert(`Contact ${product.seller.name} at ${product.seller.email}`);
                    }}
                  >
                    Contact Seller
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
