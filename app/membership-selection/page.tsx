'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// Define subscription tiers with their Stripe price IDs
// Replace these price IDs with your actual ones from Stripe
const subscriptionTiers = [
  {
    name: 'Rookie',
    description: 'Basic features for beginners',
    price: '$9.99/month',
    features: ['Basic workout tracking', 'Limited community access', 'Standard support'],
    priceId: 'price_1234567890', // Replace with your actual Stripe price ID
  },
  {
    name: 'Contender',
    description: 'Advanced features for regular users',
    price: '$19.99/month',
    features: ['Advanced workout tracking', 'Full community access', 'Priority support'],
    priceId: 'price_2345678901', // Replace with your actual Stripe price ID
  },
  {
    name: 'Warrior',
    description: 'Premium features for serious athletes',
    price: '$29.99/month',
    features: ['Premium workout tracking', 'VIP community access', 'Premium support', 'Custom workout plans'],
    priceId: 'price_3456789012', // Replace with your actual Stripe price ID
  },
  {
    name: 'Legend',
    description: 'All features for professional athletes',
    price: '$49.99/month',
    features: ['All premium features', 'Personal coaching', '24/7 support', 'Custom nutrition plans'],
    priceId: 'price_4567890123', // Replace with your actual Stripe price ID
  },
];

export default function MembershipSelectionPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubscription = async (priceId: string) => {
    if (!user) {
      router.push('/login?redirect=/membership-selection');
      return;
    }

    setIsLoading(priceId);

    try {
      // Create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }
      
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Choose Your Membership Plan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionTiers.map((tier) => (
          <Card key={tier.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-2xl font-bold mb-4">{tier.price}</p>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSubscription(tier.priceId)}
                disabled={isLoading === tier.priceId}
              >
                {isLoading === tier.priceId ? 'Processing...' : `Select ${tier.name}`}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

