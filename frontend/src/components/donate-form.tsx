import React, { useState } from 'react'
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
  { 
    amounts,
    thankYouImageUrl
  }: { 
    amounts: Array<string>,
    thankYouImageUrl: string
   }
) {
  const [otherAmount, setOtherAmount] = useState(5) //$5 minimum donation
  
  const baseOtherFormClass = donateStyles['other-amt-form--hidden']
  const [otherFormClass, setOtherFormClass] = useState(baseOtherFormClass)
  
  const [otherButtonActive, setOtherButtonActive] = useState(false)

  function toggleOtherForm() {
    // show or hide other form
    const newClass = otherFormClass.includes('hidden') ? donateStyles['other-amt-form'] : baseOtherFormClass
    setOtherFormClass(newClass)

    // apply active styling to other button
    setOtherButtonActive(!otherButtonActive)
  }

  function handleOtherInputChange(event: React.FormEvent) {
    const input = event.target as HTMLInputElement
    const val = parseFloat(input.value)
    setOtherAmount(val)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement
    const amount = target.dataset.amount
    
    // Create a Checkout Session
    const response = await fetchPostJSON('/api/checkout/session', {
      amount: amount,
      thankYouImageUrl: thankYouImageUrl,
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
    
    // If `redirectToCheckout` fails due to a browser or network
    if (error) {
      alert(error.message);
    }
  }

  return (
    <div className={donateStyles['amt-btns-container']}>
      { amounts.map((amt) => 
        <form onSubmit={handleSubmit} key={amt} data-amount={amt}>
          <button className={buttons['small']}>
            ${amt}
          </button>
        </form>
      )}
      <div>
        <button className={[buttons['small'], otherButtonActive ? buttons['other-donation--active'] : buttons['other-donation']].join(' ')} onClick={toggleOtherForm}>
            Other
        </button>
            <form className={otherFormClass} onSubmit={handleSubmit} data-amount={otherAmount}>
                <input  
                    max='10000'
                    min='5'
                    onChange={handleOtherInputChange}
                    placeholder='5'
                    type='number'
                    value={otherAmount}
                ></input>
                <button className={[buttons['small'], buttons['other-donation-submit']].join(' ')} type='submit'>
                    Donate ${otherAmount}
                </button>
            </form>
        </div>
    </div>
  )
}