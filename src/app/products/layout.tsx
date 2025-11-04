'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const categories = [
  { name: 'All Products', slug: null },
  { name: 'Rings', slug: 'rings' },
  { name: 'Necklaces', slug: 'necklaces' },
  { name: 'Earrings', slug: 'earrings' },
  { name: 'Bracelets', slug: 'bracelets' },
];

function Sidebar() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <aside className="hidden w-64 lg:block">
      <div className="sticky top-20">
        <h2 className="mb-4 text-lg font-semibold">Categories</h2>
        <nav className="space-y-2">
          {categories.map((category) => {
            const isActive = category.slug === currentCategory || (!category.slug && !currentCategory);
            const href = category.slug ? `/products?category=${category.slug}` : '/products';

            return (
              <Link
                key={category.slug || 'all'}
                href={href}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
          <nav className="space-y-2">
            <Link
              href="/products?featured=true"
              className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            >
              Featured Products
            </Link>
            <Link
              href="/products"
              className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            >
              New Arrivals
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <Suspense fallback={
          <aside className="hidden w-64 lg:block">
            <div className="sticky top-20">
              <div className="h-6 w-32 animate-pulse rounded bg-neutral-200 mb-4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-9 w-full animate-pulse rounded bg-neutral-200"></div>
                ))}
              </div>
            </div>
          </aside>
        }>
          <Sidebar />
        </Suspense>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}