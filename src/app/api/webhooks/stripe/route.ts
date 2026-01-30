import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@/generated/prisma';
import { IS_DEMO_MODE } from '@/config/demo';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  // Demo mode - disable webhooks
  if (IS_DEMO_MODE) {
    return NextResponse.json({ received: true, demo: true });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Order should already be created by the /api/orders endpoint
        // This is just a backup or for additional processing
        
        // You can add additional logic here like:
        // - Send confirmation email
        // - Update inventory
        // - Trigger fulfillment process
        
        console.log('Checkout session completed:', session.id);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        
        // Update order status if needed
        const order = await prisma.order.findFirst({
          where: {
            stripeSessionId: paymentIntent.metadata?.sessionId,
          },
        });

        if (order && order.status === OrderStatus.PENDING) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: OrderStatus.PROCESSING },
          });
        }
        
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        
        // Handle failed payment
        const order = await prisma.order.findFirst({
          where: {
            stripeSessionId: paymentIntent.metadata?.sessionId,
          },
        });

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: OrderStatus.CANCELLED },
          });
        }
        
        console.error('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Stripe webhooks require raw body, so we need to disable body parsing
export const runtime = 'nodejs';