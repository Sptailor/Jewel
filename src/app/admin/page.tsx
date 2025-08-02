import { prisma } from '@/lib/prisma';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

async function getStats() {
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue,
    recentOrders,
    topProducts
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'CANCELLED' } }
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        items: true,
      }
    }),
    prisma.orderItem.groupBy({
      by: ['productId'],
      _count: { productId: true },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    })
  ]);

  // Get product details for top products
  const topProductIds = topProducts.map(p => p.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: topProductIds } },
    include: { images: { take: 1 } }
  });

  const topProductsWithDetails = topProducts.map(tp => ({
    ...tp,
    product: products.find(p => p.id === tp.productId)
  }));

  return {
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue: totalRevenue._sum.total || 0,
    recentOrders,
    topProducts: topProductsWithDetails
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Products</p>
              <p className="mt-1 text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Orders</p>
              <p className="mt-1 text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Customers</p>
              <p className="mt-1 text-3xl font-bold">{stats.totalCustomers}</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Revenue</p>
              <p className="mt-1 text-3xl font-bold">
                ${Number(stats.totalRevenue).toFixed(2)}
              </p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-lg border bg-white">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Clock className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="p-6">
            {stats.recentOrders.length === 0 ? (
              <p className="text-center text-neutral-500">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-neutral-600">
                        {order.user.email} • {order.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${Number(order.total).toFixed(2)}</p>
                      <p className="text-sm text-neutral-600">
                        {format(new Date(order.createdAt), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg border bg-white">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <TrendingUp className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="p-6">
            {stats.topProducts.length === 0 ? (
              <p className="text-center text-neutral-500">No sales data yet</p>
            ) : (
              <div className="space-y-4">
                {stats.topProducts.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-neutral-100">
                        {item.product?.images[0] && (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {item.product?.name || 'Unknown Product'}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {item._sum.quantity} sold
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}