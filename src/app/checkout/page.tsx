'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import { ChevronLeft, CreditCard, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DemoModal from '@/components/demo/DemoModal';
import { IS_DEMO_MODE } from '@/config/demo';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login?callbackUrl=/checkout');
    }
  }, [session, status, router]);

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      router.push('/cart');
    }
  }, [items, router, isLoading]);

  const handleCheckout = async () => {
    setShowDemoModal(true);
  };

  if (status === 'loading' || (!session && status !== 'unauthenticated')) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to cart
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md bg-neutral-100">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-neutral-600">
                      {item.variantName || 'Default'} × {item.quantity}
                    </p>
                    <p className="mt-1 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${(shipping as number).toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Payment Details</h2>
            
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="mb-6">
              <p className="mb-2 text-sm text-neutral-600">
                You will be redirected to Stripe to complete your payment securely.
              </p>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <CreditCard className="h-4 w-4" />
                <span>Cards accepted: Visa, Mastercard, Amex, and more</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading || items.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 py-3 text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Proceed to Payment
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-neutral-600">
              Your payment information is secure and encrypted.
            </p>
          </div>
        </div>
      </div>

      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </div>
  );
}