import Link from 'next/link';

import { DefaultPageWrap } from '../components/default-page-wrap';

export default function Contact() {
    return (
        <DefaultPageWrap activeMenuItem='contact'>
            <h1>Coming Soon!</h1> 
            <Link href='/'>
                <a>Back to Play Marin home page</a>
            </Link>
        </DefaultPageWrap>
    )
}