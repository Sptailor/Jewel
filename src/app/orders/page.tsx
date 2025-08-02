'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Loader2, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  total: number;
  product: {
    id: string;
    name: string;
    images: string[];
  };
  variant: {
    id: string;
    name: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login?callbackUrl=/orders');
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) return;

      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (status === 'loading' || (!session && status !== 'unauthenticated')) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-lg border bg-white p-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
          <h2 className="mb-2 text-lg font-semibold">No orders yet</h2>
          <p className="mb-6 text-neutral-600">
            Start shopping to see your orders here!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-6 py-3 text-white hover:bg-neutral-800"
          >
            Browse Products
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border bg-white p-6">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{order.orderNumber}</h2>
                  <p className="text-sm text-neutral-600">
                    Placed on {format(new Date(order.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-neutral-100">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-neutral-600">
                        {item.variant.name} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">${item.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  href={`/orders/${order.id}`}
                  className="text-sm font-medium text-neutral-900 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}