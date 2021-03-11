import { NextApiRequest, NextApiResponse } from 'next';
import { STRIPE_API_VERSION } from '../../../config';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await stripe.checkout.sessions.retrieve(id as string, { expand: ['payment_intent'] });
  res.status(200).json({ session });
}