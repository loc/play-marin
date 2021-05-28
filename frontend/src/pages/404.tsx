import Link from 'next/link'

import { DefaultPageWrap } from '../components/default-page-wrap'
import buttons from '../styles/buttons.module.scss'
import styles from '../styles/404.module.scss'

export default function Custom404() {
    return (
        <DefaultPageWrap activeMenuItem={'none'} >
            <div className={styles['container']}>
                <div className={styles['left']}>
                    <div className={styles['circle']}>
                        <span>Oops!</span>
                    </div>
                </div>
                <div className={styles['right']}>
                    <h1>We've encountered an error</h1>
                    <p>Sorry, we can't find the page you requested.</p>
                    <button className={buttons['primary']}>
                        <Link href='/'>
                            Back to Play Marin Home
                        </Link>
                    </button>
                </div>
            </div>
        </DefaultPageWrap>
    )
}