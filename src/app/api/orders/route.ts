import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@/generated/prisma';

function generateOrderNumber(): string {
  const prefix = 'ORD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    // Check if payment was successful
    if (checkoutSession.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Check if order already exists for this session
    const existingOrder = await prisma.order.findFirst({
      where: {
        stripeSessionId: sessionId,
      },
    });

    if (existingOrder) {
      return NextResponse.json({
        orderNumber: existingOrder.orderNumber,
        orderId: existingOrder.id,
      });
    }

    // Parse items from metadata
    const items = JSON.parse(checkoutSession.metadata?.items || '[]');

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        status: OrderStatus.PROCESSING,
        subtotal: checkoutSession.amount_subtotal ? checkoutSession.amount_subtotal / 100 : 0,
        tax: 0, // You can calculate this based on your tax rules
        shipping: 0, // Free shipping for now
        total: checkoutSession.amount_total ? checkoutSession.amount_total / 100 : 0,
        stripeSessionId: sessionId,
        items: {
          create: await Promise.all(
            items.map(async (item: { productId: string; variantId: string; quantity: number }) => {
              const variant = await prisma.productVariant.findUnique({
                where: { id: item.variantId },
                include: { product: true },
              });

              if (!variant) {
                throw new Error('Product variant not found');
              }

              // Update stock
              await prisma.productVariant.update({
                where: { id: item.variantId },
                data: {
                  stock: {
                    decrement: item.quantity,
                  },
                },
              });

              return {
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                price: Number(variant.price),
                total: Number(variant.price) * item.quantity,
              };
            })
          ),
        },
      },
    });

    // Create shipping address
    const customerDetails = checkoutSession.customer_details;
    if (customerDetails?.address) {
      await prisma.shippingAddress.create({
        data: {
          orderId: order.id,
          name: customerDetails.name || '',
          phone: customerDetails.phone || '',
          street: customerDetails.address.line1 || '',
          apartment: customerDetails.address.line2,
          city: customerDetails.address.city || '',
          state: customerDetails.address.state || '',
          country: customerDetails.address.country || '',
          zipCode: customerDetails.address.postal_code || '',
        },
      });
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}