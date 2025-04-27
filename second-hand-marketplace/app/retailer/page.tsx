'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  description: string;
  condition: string;
  category: string;
  createdAt: string;
}

export default function RetailerDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?userType=retailer');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Retailer Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your products</p>
          </div>
          <Link href="/retailer/add" passHref>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Add New Product
            </Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Yet</h3>
            <p className="text-gray-600 mb-6">Start selling by adding your first product</p>
            <Link href="/retailer/add" passHref>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Your First Product
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {product.imageUrl && (
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">₹{product.price}</span>
                    <div className="space-x-2">
                      <Button
                        onClick={() => {
                          // Add edit functionality
                          alert('Edit functionality coming soon!');
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this product?')) {
                            try {
                              const response = await fetch(`/api/products/${product.id}`, {
                                method: 'DELETE',
                              });
                              if (response.ok) {
                                setProducts(products.filter(p => p.id !== product.id));
                              } else {
                                alert('Failed to delete product');
                              }
                            } catch (error) {
                              console.error('Error deleting product:', error);
                              alert('Failed to delete product');
                            }
                          }
                        }}
                        className="bg-red-100 hover:bg-red-200 text-red-800"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
