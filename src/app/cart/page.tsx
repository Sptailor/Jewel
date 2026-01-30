'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/utils/format';
import DemoModal from '@/components/demo/DemoModal';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const [showDemoModal, setShowDemoModal] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-neutral-400" />
          <h1 className="mb-2 text-3xl font-bold">Your Cart is Empty</h1>
          <p className="mb-8 text-neutral-600">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-block rounded-md bg-neutral-900 px-8 py-3 text-white hover:bg-neutral-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="mb-4 rounded-lg border p-6"
            >
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                      No image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      {item.variantName && (
                        <p className="text-sm text-neutral-500">{item.variantName}</p>
                      )}
                    </div>
                    <p className="text-lg font-medium">{formatCurrency(item.price)}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-md border">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.variantId, item.quantity - 1)
                        }
                        className="p-2 hover:bg-neutral-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.variantId, item.quantity + 1)
                        }
                        className="p-2 hover:bg-neutral-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Remove item"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between">
            <Link
              href="/products"
              className="text-neutral-600 hover:text-neutral-900"
            >
              ← Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8 lg:col-span-4 lg:mt-0">
          <div className="rounded-lg border bg-neutral-50 p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="my-4 border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(getTotalPrice())}</span>
              </div>
            </div>

            <button
              onClick={() => setShowDemoModal(true)}
              className="block w-full rounded-md bg-neutral-900 py-3 text-center text-white hover:bg-neutral-800"
            >
              Proceed to Checkout
            </button>

            <p className="mt-4 text-center text-sm text-neutral-500">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>

      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </div>
  );
}