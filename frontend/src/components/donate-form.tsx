import React from 'react'
import { Stripe, loadStripe } from '@stripe/stripe-js'

import buttons from '../styles/buttons.module.scss';
import donateStyles from '../styles/donate.module.scss';

// This is a singleton to ensure we only instantiate Stripe once.
let stripePromise: Promise<Stripe | null>
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

async function fetchPostJSON(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    })
    return await response.json()
  } catch (err) {
    throw new Error(err.message)
  }
}

export default function DonateForm(
  { amounts, }: { amounts: Array<string> }
) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement;
    const amount = target.dataset.amt
    
    // Create a Checkout Session
    const response = await fetchPostJSON('/api/checkout/session', {
      amount: amount,
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Stripe Checkout
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id,
    })

    // TODO If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to customer instead of console.warn
    console.warn(error.message)
  }

  return (
    <div className={donateStyles['amt-btns-container']}>
      { amounts.map((amt) => 
        <form onSubmit={handleSubmit} key={amt} data-amt={amt}>
          <button className={buttons['donate-amt']}>
            ${amt}
          </button>
        </form>
      )}
    </div>
  )
}