import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import UpdateOrderStatus from '@/components/admin/UpdateOrderStatus';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

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

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Orders</h1>

      <div className="rounded-lg border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-neutral-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-4">
                    <p className="font-medium">{order.orderNumber}</p>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">
                        {order.user.firstName} {order.user.lastName}
                      </p>
                      <p className="text-sm text-neutral-600">{order.user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    {format(new Date(order.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="p-4">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </td>
                  <td className="p-4 font-medium">
                    ${Number(order.total).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <UpdateOrderStatus
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}