import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import PageHead from '../components/page-head'
import Footer from '../components/footer'
import { fetchApi } from '../utils/api'
import { Awaited } from '../utils/utils'

import thanks from '../styles/thank-you-page.module.scss'
import buttons from '../styles/buttons.module.scss'

async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

const PageBody = function({checkoutSession, bodyText}: {checkoutSession: any, bodyText: string}) {
  const status = checkoutSession?.payment_intent?.status
  
  // payment errors are handled by Stripe Checkout before redirecting to this success page
  
  if (status == 'succeeded') {
    return (
      <div>
        <p>Your donation was successful</p>
        <p>{bodyText}</p>
      </div>
    )
  } else {
    return (
      <div className={thanks['processing-container']}>
        <p>Your donation is processing... please wait or check back later</p>

        <div className={thanks['loader-container']}>
          <div className={thanks['loader-background']}>
            <div className={thanks['loader-spinner']}>
              <div className={thanks['loader-inner']} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default function ThankYou({
  image,
  imageOverlayText,
  headerText,
  bodyText,
  homeButtonText,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
  function handleHomeButtonClick() {
    router.push('/')
  }
  
  const router = useRouter()

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout/${router.query.session_id}`
      : null,
    fetchGetJSON
  )

  const checkoutSession = data?.session

  return (
    <>
      <PageHead />
      <main className={thanks['content']}>
        { error ? 
            <p className={thanks['error']}>
              We're sorry there's been an error loading this page but your donation is likely processing. Please refresh this page.
            </p>
          :
          <>
            <div className={thanks['left-container']}>
              <div  className={thanks['img']}
                    style={{ backgroundImage: `url(${image.url})` }} >
              </div>

              <div className={thanks['left-content']}>
                <div className={thanks['home-logo-container']}>  
                  <Link href='/'>
                    <a>
                      <div className={thanks['home-logo']}>
                        <img className={thanks['home-logo-img']}src='/img/play-marin-logo-white.png' alt='Play Marin logo'/>
                      </div>
                    </a>
                  </Link>
                </div>
                
                <img className={thanks['img-overlay']} src={imageOverlayText.url} alt={imageOverlayText.alternativeText} />
              </div>
              
            </div>

            <div className={thanks['right-container']}>
              <div className={thanks['right-content']}>
                <div>
                  <h1 className={thanks['header']}>{headerText}</h1>
                  <div className={thanks['body']}>
                    <PageBody checkoutSession={checkoutSession} bodyText={bodyText} />
                  </div>
                </div>
                <button className={buttons['primary']} onClick={handleHomeButtonClick}>
                  {homeButtonText}
                </button>
              </div>
            </div>
          </>
        }
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const thankYouPage = await fetchApi('thank-you-page');

  return {
    revalidate: 60,
    props: {
      image: thankYouPage.image,
      imageOverlayText: thankYouPage.imageOverlayText,
      headerText: thankYouPage.headerText as string,
      bodyText: thankYouPage.bodyText as string,
      homeButtonText: thankYouPage.homeButtonText as string,
    },
  }
}