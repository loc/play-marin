import React from 'react'

import PageHead from '../components/page-head'
import Footer from '../components/footer'

import { fetchApi } from '../utils/api'
import { Awaited } from '../utils/utils'

import formStyles from '../styles/donate-form.module.scss';

export default function DonateForm({
    donationFormIframeLink,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
    return (
        <main className={formStyles['content']}>
            <PageHead />
            <div className={formStyles['iframe-container']}>
                <iframe
                    className={formStyles['iframe']}
                    src={donationFormIframeLink}    
                >
                </iframe>
            </div>
            <Footer />
        </main>
    )
}

export async function getStaticProps() {
    const donatePage = await fetchApi('donate-page');

    return {
        revalidate: 60,
        props: {
            donationFormIframeLink: donatePage.donationFormIframeLink as string,
        },
    };
}