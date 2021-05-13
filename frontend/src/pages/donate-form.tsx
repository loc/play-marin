import React from 'react'

import PageHead from '../components/page-head'
import Footer from '../components/footer'

import formStyles from '../styles/donate-form.module.scss';

export default function DonateForm() {
    return (
        <main className={formStyles['content']}>
            <PageHead />
            <div className={formStyles['iframe-container']}>
                <iframe
                    className={formStyles['iframe']}
                    src="https://secure.lglforms.com/form_engine/s/DyJ9AqAOL3OOLxrGV7s-mg"    
                >
                </iframe>
            </div>
            <Footer />
        </main>
    )
}