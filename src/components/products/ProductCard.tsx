'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number | null;
    images: { url: string; alt?: string | null }[];
    category: { name: string };
    _count: { reviews: number };
    avgRating: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
    });
  };

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-neutral-400">No image</span>
            </div>
          )}
          {discount > 0 && (
            <div className="absolute right-2 top-2 rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white">
              -{discount}%
            </div>
          )}
        </div>
      </Link>
      <div className="mt-3">
        <Link href={`/products/${product.slug}`}>
          <p className="text-sm text-neutral-500">{product.category.name}</p>
          <h3 className="mt-1 font-medium text-neutral-900 group-hover:text-neutral-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          {product.avgRating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-neutral-600">{product.avgRating}</span>
              <span className="text-sm text-neutral-400">({product._count.reviews})</span>
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-900">
              {formatCurrency(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-neutral-500 line-through">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleQuickAdd}
            className="rounded-full bg-neutral-900 p-2 text-white opacity-0 transition-opacity hover:bg-neutral-800 group-hover:opacity-100"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}