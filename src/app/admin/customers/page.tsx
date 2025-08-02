import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Mail, ShoppingCart, Calendar } from 'lucide-react';

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: 'CUSTOMER' },
    include: {
      orders: {
        select: {
          id: true,
          total: true,
          status: true,
        },
      },
      addresses: {
        where: { isDefault: true },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const customersWithStats = customers.map((customer) => {
    const totalOrders = customer.orders.length;
    const totalSpent = customer.orders
      .filter((order) => order.status !== 'CANCELLED')
      .reduce((sum, order) => sum + Number(order.total), 0);

    return {
      ...customer,
      totalOrders,
      totalSpent,
    };
  });

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Customers</h1>

      <div className="rounded-lg border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Orders</th>
              <th className="p-4 font-medium">Total Spent</th>
              <th className="p-4 font-medium">Joined</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customersWithStats.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customersWithStats.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">
                        {customer.firstName} {customer.lastName}
                      </p>
                      <p className="text-sm text-neutral-600">{customer.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    {customer.addresses[0] ? (
                      <p className="text-sm">
                        {customer.addresses[0].city}, {customer.addresses[0].state}
                      </p>
                    ) : (
                      <p className="text-sm text-neutral-500">No address</p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <ShoppingCart className="h-4 w-4 text-neutral-400" />
                      <span>{customer.totalOrders}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-neutral-600">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(customer.createdAt), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="p-4">
                    <a
                      href={`mailto:${customer.email}`}
                      className="inline-flex items-center gap-1 rounded-md p-1 hover:bg-neutral-100"
                      title="Send email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
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