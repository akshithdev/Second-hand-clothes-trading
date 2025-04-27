'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-12">About REWEAR</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At REWEAR, we're committed to promoting sustainable fashion by giving pre-loved clothing 
                a second life. Our platform connects fashion-conscious individuals who believe in reducing 
                waste and making quality fashion accessible to everyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Why Choose REWEAR?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-blue-600">Sustainability</h3>
                  <p className="text-gray-600">
                    Every piece of clothing reused means one less piece in a landfill.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-blue-600">Quality Assurance</h3>
                  <p className="text-gray-600">
                    All items are verified for quality and authenticity.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-blue-600">Community</h3>
                  <p className="text-gray-600">
                    Join a community of conscious fashion enthusiasts.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-blue-600">Affordability</h3>
                  <p className="text-gray-600">
                    Get premium brands at fraction of their original price.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">5K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">Items Sold</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">2K+</div>
                  <div className="text-sm text-gray-600">Active Sellers</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">15T+</div>
                  <div className="text-sm text-gray-600">CO₂ Saved (kg)</div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
