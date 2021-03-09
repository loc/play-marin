import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { DefaultPageWrap } from '../components/default-page-wrap'

async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

const ThankYou: NextPage = () => {
  const router = useRouter()

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout/${router.query.session_id}`
      : null,
    fetchGetJSON
  )

  if (error) return <div>failed to load</div>

  const status = data?.session?.payment_intent?.status

  return (
    <DefaultPageWrap activeMenuItem={'none'}>
      <div>
        <h1>Donation Result</h1>
        <h2>Status: {status ? status : 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <pre>{data ? JSON.stringify(data, null, 2) : 'loading...'}</pre>
      </div>
    </DefaultPageWrap>
  )
}

export default ThankYou