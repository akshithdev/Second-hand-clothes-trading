'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800 font-playfair">
                Marketplace
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition-colors">
                Shop
              </Link>
              <Link href="/sell" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition-colors">
                Sell
              </Link>
              <Link href="/admin" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition-colors">
                Admin
              </Link>
              <Link href="/retailer" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition-colors">
                Retailer
              </Link>
              <Link href="/about" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/login')}
              className="text-gray-900 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push('/signup')}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="text-gray-900 block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50">
              Home
            </Link>
            <Link href="/shop" className="text-gray-900 block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50">
              Shop
            </Link>
            <Link href="/sell" className="text-gray-900 block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50">
              Sell
            </Link>
            <Link href="/admin" className="text-gray-900 block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50">
              Admin
            </Link>
            <Link href="/retailer" className="text-gray-900 block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50">
              Retailer
            </Link>
            <Link href="/about" className="text-gray-900 block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50">
              About
            </Link>
            <Link href="/contact" className="text-gray-900 block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50">
              Contact
            </Link>
            {/* Mobile auth buttons */}
            <div className="mt-4 space-y-2 px-3">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
                className="w-full justify-center text-gray-900 hover:text-blue-600 hover:bg-blue-50"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push('/signup')}
                className="w-full justify-center bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
