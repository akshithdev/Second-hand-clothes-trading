'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const flashDeals = [
    {
      id: 1,
      name: 'Premium Denim Jacket',
      brand: "Levi's",
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      originalPrice: 7499,
      discountedPrice: 5249,
      discount: 30,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Designer Tote Bag',
      brand: 'Gucci',
      image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg',
      originalPrice: 61999,
      discountedPrice: 46499,
      discount: 25,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Classic Chronograph',
      brand: 'Omega',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
      originalPrice: 144999,
      discountedPrice: 94249,
      discount: 35,
      rating: 4.8,
    },
    {
      id: 4,
      name: 'Evening Dress',
      brand: 'Zara',
      image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg',
      originalPrice: 5299,
      discountedPrice: 3179,
      discount: 40,
      rating: 4.8,
    },
  ];

  const categories = [
    {
      id: 1,
      name: 'Luxury Collection',
      items: 245,
      image: 'https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg',
    },
    {
      id: 2,
      name: 'Trending Now',
      items: 532,
      image: 'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg',
    },
    {
      id: 3,
      name: 'New Arrivals',
      items: 321,
      image: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-32">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-3xl text-center mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Second-Hand Fashion
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover unique pre-loved fashion pieces at amazing prices
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold"
            >
              Shop Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Flash Deals
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashDeals.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg">
                    -{product.discount}%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">₹{product.discountedPrice}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <Button variant="primary" size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <ShoppingCartIcon className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Popular Categories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent z-10" />
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/90 mb-4">{category.items} items</p>
                    <Button variant="primary" size="sm" className="bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                      Shop Now →
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Fashion Community
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Get exclusive deals, style inspiration, and early access to new arrivals.
            </p>
            <div className="flex gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button variant="secondary" size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
