import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { IS_DEMO_MODE } from '@/config/demo';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  // Demo mode - disable checkout
  if (IS_DEMO_MODE) {
    return NextResponse.json(
      { error: 'Checkout disabled - demo mode' },
      { status: 403 }
    );
  }

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Fetch product and variant details
    const lineItems = await Promise.all(
      items.map(async (item: { variantId: string; quantity: number }) => {
        const variant = await prisma.productVariant.findUnique({
          where: { id: item.variantId },
          include: { 
            product: {
              include: {
                images: {
                  orderBy: { order: 'asc' },
                  take: 1
                }
              }
            }
          },
        });

        if (!variant || variant.stock < item.quantity) {
          throw new Error(`Product ${variant?.product.name || 'Unknown'} is out of stock`);
        }

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${variant.product.name} - ${variant.name}`,
              images: variant.product.images?.length > 0 ? [variant.product.images[0].url] : [],
            },
            unit_amount: Math.round(Number(variant.price) * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      })
    );

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      customer_email: session.user.email!,
      metadata: {
        userId: session.user.id,
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}