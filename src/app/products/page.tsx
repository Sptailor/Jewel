'use client';

import { useEffect, useState, Suspense } from 'react';

export const dynamic = 'force-dynamic';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { ChevronDown } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: { url: string; alt?: string | null }[];
  category: { name: string };
  _count: { reviews: number };
  avgRating: number;
}

const sortOptions = [
  { value: 'createdAt-desc', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState('createdAt-desc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const [sort, order] = selectedSort.split('-');
        const params = new URLSearchParams({
          ...(category && { category }),
          ...(featured && { featured }),
          sort,
          order,
        });

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        
        if (response.ok && Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API error:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, featured, selectedSort]);


  const handleSort = (value: string) => {
    setSelectedSort(value);
    setShowSortMenu(false);
  };

  const getPageTitle = () => {
    if (featured === 'true') return 'Featured Products';
    if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return 'All Products';
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">{getPageTitle()}</h1>
        
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Sort by: {sortOptions.find(opt => opt.value === selectedSort)?.label}
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showSortMenu && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSort(option.value)}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 ${
                      selectedSort === option.value
                        ? 'bg-neutral-50 font-medium text-neutral-900'
                        : 'text-neutral-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-lg bg-neutral-200"></div>
              <div className="mt-3 space-y-2">
                <div className="h-4 w-20 rounded bg-neutral-200"></div>
                <div className="h-5 w-full rounded bg-neutral-200"></div>
                <div className="h-4 w-24 rounded bg-neutral-200"></div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-lg text-neutral-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div>
        <div className="mb-8 flex items-center justify-between">
          <div className="h-9 w-48 animate-pulse rounded bg-neutral-200"></div>
          <div className="h-10 w-40 animate-pulse rounded bg-neutral-200"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-lg bg-neutral-200"></div>
              <div className="mt-3 space-y-2">
                <div className="h-4 w-20 rounded bg-neutral-200"></div>
                <div className="h-5 w-full rounded bg-neutral-200"></div>
                <div className="h-4 w-24 rounded bg-neutral-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}