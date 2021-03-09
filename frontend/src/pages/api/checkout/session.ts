import { NextApiRequest, NextApiResponse } from 'next';
import { STRIPE_API_VERSION } from '../../../config';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION
})

function formatAmountForStripe(amount: number): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: 'usd',
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const amount: number = req.body.amount
    try {
      // Create Checkout Sessions from body params.
      // TODO - manage product in stripe instead of product_data hard-coded here?
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: formatAmountForStripe(amount),
              product_data: {
                name: 'Custom donation to Play Marin',
                description: 'Thank you for your support',
                images: ['http://playmarin.org/uploads/9_B1_A5690_1_1f991a6310.jpg']
              }
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate`,
      }
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      )

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}