import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const formatAmountForStripe = (amount, currency) => {
  return Math.round(amount * 100);
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  try {
    const { planType } = await req.json(); // Retrieve the planType from the request body

    // Set the amount and plan name based on the planType
    let amount;
    let planName;

    if (planType === 'pro') {
      amount = 1000; // Stripe expects amount in cents
      planName = 'Pro subscription';
    } else if (planType === 'basic') {
      amount = 500; // Stripe expects amount in cents
      planName = 'Basic subscription';
    } else {
      throw new Error('Invalid plan type');
    }

    const referer = req.headers.get('Referer');
    const origin = referer ? new URL(referer).origin : 'https://clever-cards-ai.vercel.app'; // Use default origin as fallback

    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planName,
            },
            unit_amount: amount,
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {
      status: 200,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get('session_id');

  try {
    if (!session_id) {
      throw new Error('Session ID is required');
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
