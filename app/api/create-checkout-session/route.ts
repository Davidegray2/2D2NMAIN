import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase-server';
import * as Sentry from '@sentry/node';

if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error('Required environment variables are not defined');
}

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

Sentry.init({ dsn: process.env.SENTRY_DSN });

async function getAuthenticatedUser(supabase: any) {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error('Failed to fetch user session');
  }

  if (!session) {
    throw new Error('Not authenticated');
  }

  return session.user.id;
}

async function createStripeCheckoutSession(userId: string, priceId: string) {
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership-selection`,
    client_reference_id: userId,
    metadata: { userId },
  });
}

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const userId = await getAuthenticatedUser(supabase);

    const { priceId } = await request.json();
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    const checkoutSession = await createStripeCheckoutSession(userId, priceId);
    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}