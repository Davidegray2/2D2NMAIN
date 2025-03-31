import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase-server';
import * as Sentry from '@sentry/node';
import tierMap from '@/utils/tierMap';

Sentry.init({ dsn: process.env.SENTRY_DSN });

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripe environment variables are not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// This is your Stripe webhook secret for testing your endpoint locally
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handleCheckoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
  const userId = session.client_reference_id;
  if (!userId) return;

  const subscriptionId = session.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0].price.id;

  const tier = tierMap[priceId] || 'rookie';

  const supabase = createClient();
  await supabase
    .from('user_subscriptions')
    .update({ is_active: false, end_date: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('is_active', true);

  await supabase.from('user_subscriptions').insert({
    user_id: userId,
    tier,
    start_date: new Date().toISOString(),
    end_date: null,
    is_active: true,
    stripe_subscription_id: subscriptionId,
  });
};

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0].price.id;
        
        // Map price ID to subscription tier
        const tier = tierMap[priceId] || 'rookie';
        
        // Find the user with this subscription ID
        const supabase = createClient();
        const { data } = await supabase
          .from('user_subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single();
        
        if (data) {
          // Update the subscription
          await supabase
            .from('user_subscriptions')
            .update({ 
              tier,
              is_active: subscription.status === 'active',
            })
            .eq('stripe_subscription_id', subscription.id);
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Find the user with this subscription ID
        const supabase = createClient();
        const { data } = await supabase
          .from('user_subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single();
        
        if (data) {
          // Update the subscription to inactive
          await supabase
            .from('user_subscriptions')
            .update({ 
              is_active: false, 
              end_date: new Date().toISOString() 
            })
            .eq('stripe_subscription_id', subscription.id);
        }
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
        return NextResponse.json({ received: true });
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// This is needed to properly handle the raw body
export const config = {
  api: {
    bodyParser: false,
  },
};