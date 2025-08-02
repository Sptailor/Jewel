'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import ProductCard from '@/components/products/ProductCard';

interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

interface Review {
  id: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  createdAt: string;
  user: {
    firstName?: string | null;
    lastName?: string | null;
  };
}

interface RelatedProduct {
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

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  comparePrice?: number | null;
  category: { name: string };
  images: ProductImage[];
  variants: ProductVariant[];
  reviews: Review[];
  avgRating: number;
  _count: { reviews: number };
  relatedProducts: RelatedProduct[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.slug}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        if (data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);


  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (selectedVariant?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', {
      productId: product?.id,
      variantId: selectedVariant?.id,
      quantity,
    });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square animate-pulse rounded-lg bg-neutral-200"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-md bg-neutral-200"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-neutral-200"></div>
            <div className="h-6 w-1/2 animate-pulse rounded bg-neutral-200"></div>
            <div className="h-10 w-1/3 animate-pulse rounded bg-neutral-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - currentPrice) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
            {product.images.length > 0 ? (
              <>
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-neutral-400">No image available</span>
              </div>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-md ${
                    selectedImage === index ? 'ring-2 ring-neutral-900' : ''
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-neutral-500">{product.category.name}</p>
            <h1 className="mt-1 text-3xl font-bold text-neutral-900">{product.name}</h1>
            
            {product.avgRating > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.avgRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-neutral-200 text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600">
                  {product.avgRating} ({product._count.reviews} reviews)
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-neutral-900">
              {formatCurrency(currentPrice)}
            </span>
            {product.comparePrice && (
              <>
                <span className="text-xl text-neutral-500 line-through">
                  {formatCurrency(product.comparePrice)}
                </span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          {/* Variant Selection */}
          {product.variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-700">
                Select {Object.keys(product.variants[0].attributes)[0] || 'Option'}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stock === 0}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                      selectedVariant?.id === variant.id
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : variant.stock === 0
                        ? 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {variant.name}
                    {variant.stock === 0 && ' (Out of stock)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-neutral-700">Quantity</label>
              <div className="flex items-center rounded-md border border-neutral-300">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-neutral-100 disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (selectedVariant?.stock || 10)}
                  className="p-2 hover:bg-neutral-100 disabled:opacity-50"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {selectedVariant && (
                <span className="text-sm text-neutral-500">
                  {selectedVariant.stock} available
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={selectedVariant?.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-neutral-900 px-6 py-3 text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button className="rounded-md border border-neutral-300 p-3 hover:bg-neutral-50">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="border-t pt-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-neutral-900 text-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-neutral-900 text-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Reviews ({product._count.reviews})
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'description' ? (
                <p className="text-neutral-600">
                  {product.description || 'No description available.'}
                </p>
              ) : (
                <div className="space-y-6">
                  {product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'fill-neutral-200 text-neutral-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">
                              {review.user.firstName} {review.user.lastName?.[0]}.
                            </span>
                          </div>
                          <span className="text-sm text-neutral-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.title && (
                          <h4 className="mb-1 font-medium">{review.title}</h4>
                        )}
                        {review.comment && (
                          <p className="text-sm text-neutral-600">{review.comment}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-500">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}