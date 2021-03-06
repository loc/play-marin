import Link from 'next/link'

import PageHead from '../components/page-head'
import Footer from '../components/footer'
import { fetchApi } from '../utils/api'
import { Awaited } from '../utils/utils'

import thanks from '../styles/thank-you-page.module.scss'
import buttons from '../styles/buttons.module.scss'

export default function ThankYou({
  image,
  imageOverlayText,
  headerText,
  bodyText,
  homeButtonText,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
  
  return (
    <>
      <PageHead />
      <main className={thanks['content']}>
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
                    <div>
                      <p>{bodyText}</p>
                    </div>
                  </div>
                </div>
                <button className={buttons['primary']}>
                  <Link href='/'>
                    {homeButtonText}
                  </Link>
                </button>
              </div>
            </div>
          </>
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