'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="ml-2 text-xl font-bold lg:ml-0">
              LuxJewels
            </Link>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link href="/products" className="text-sm font-medium hover:text-neutral-600">
              All Products
            </Link>
            <Link href="/products?category=rings" className="text-sm font-medium hover:text-neutral-600">
              Rings
            </Link>
            <Link href="/products?category=necklaces" className="text-sm font-medium hover:text-neutral-600">
              Necklaces
            </Link>
            <Link href="/products?category=earrings" className="text-sm font-medium hover:text-neutral-600">
              Earrings
            </Link>
            <Link href="/products?category=bracelets" className="text-sm font-medium hover:text-neutral-600">
              Bracelets
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/auth/login" className="p-2" aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/products"
              className="block px-3 py-2 text-base font-medium hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/products?category=rings"
              className="block px-3 py-2 text-base font-medium hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Rings
            </Link>
            <Link
              href="/products?category=necklaces"
              className="block px-3 py-2 text-base font-medium hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Necklaces
            </Link>
            <Link
              href="/products?category=earrings"
              className="block px-3 py-2 text-base font-medium hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Earrings
            </Link>
            <Link
              href="/products?category=bracelets"
              className="block px-3 py-2 text-base font-medium hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Bracelets
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}