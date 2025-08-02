'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OrderStatus } from '@/generated/prisma';

interface UpdateOrderStatusProps {
  orderId: string;
  currentStatus: string;
}

export default function UpdateOrderStatus({ orderId, currentStatus }: UpdateOrderStatusProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;

    try {
      setIsUpdating(true);
      
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      setStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
      setStatus(currentStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value)}
      disabled={isUpdating}
      className="rounded-md border border-neutral-300 px-3 py-1 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:opacity-50"
    >
      <option value={OrderStatus.PENDING}>Pending</option>
      <option value={OrderStatus.PROCESSING}>Processing</option>
      <option value={OrderStatus.SHIPPED}>Shipped</option>
      <option value={OrderStatus.DELIVERED}>Delivered</option>
      <option value={OrderStatus.CANCELLED}>Cancelled</option>
    </select>
  );
}