'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, Package } from 'lucide-react';
import Link from 'next/link';

interface SearchParams {
  session_id?: string;
}

export default function CheckoutSuccessPage({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams> 
}) {
  const params = use(searchParams);
  const router = useRouter();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(true);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    const createOrder = async () => {
      if (!params.session_id) {
        router.push('/');
        return;
      }

      try {
        // Create order in database
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: params.session_id,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrderNumber(data.orderNumber);
          clearCart(); // Clear the cart after successful order
        }
      } catch (error) {
        console.error('Failed to create order:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    createOrder();
  }, [params.session_id, clearCart, router]);

  if (isProcessing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <Package className="h-8 w-8 text-neutral-400" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Processing your order...</h1>
          <p className="text-neutral-600">Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mb-8">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-lg text-neutral-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {orderNumber && (
        <div className="mb-8 rounded-lg border bg-neutral-50 p-6">
          <p className="mb-2 text-sm text-neutral-600">Order Number</p>
          <p className="text-2xl font-bold">{orderNumber}</p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">What happens next?</h2>
        <ul className="space-y-2 text-left text-neutral-600">
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✓</span>
            You&apos;ll receive an order confirmation email shortly
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✓</span>
            We&apos;ll send tracking information once your order ships
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✓</span>
            Your order will be delivered within 3-5 business days
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/orders"
          className="rounded-md bg-neutral-900 px-6 py-3 text-white hover:bg-neutral-800"
        >
          View Orders
        </Link>
        <Link
          href="/products"
          className="rounded-md border border-neutral-300 px-6 py-3 hover:bg-neutral-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}