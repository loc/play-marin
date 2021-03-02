import Link from 'next/link';
import { useRouter } from 'next/router';

import { DefaultPageWrap } from '../components/default-page-wrap';
import { fetchApi } from '../utils/api';
import donateStyles from '../styles/donate.module.scss';
import buttons from '../styles/buttons.module.scss';

// move type declaration to ...? somewhere shared
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

function DonateAmountButton({text}: {text: string}) {
    const router = useRouter();
    const donationAmount = /^\$/.test(text) ? text.slice(1) : text;

    const handleClick = () => {
        router.push(`/donate-form?amount=${donationAmount}`)
    }

    return (
        <button className={buttons['donate-amt']} onClick={handleClick}>
            {text}
        </button>
    )
}

function externalLinkAddress(shopLinkAddress: string) {
    // add protocol to link address so Next.js correctly links to external URL
    let containsProtocol = /^(http|https):\/\//.test(shopLinkAddress);
    return containsProtocol ? shopLinkAddress : `http://${shopLinkAddress}`;
}

export default function Donate({
    donateHeaderImage,
    upperHeaderTextImage,
    donateAmounts,
    donationCTA,
    shopLinkTextFirst,
    lowerDonateImage,
    lowerPageHeaderText,
    lowerPageContent,
    lowerPageSubHeaderText,
    shopTextLinkSecond,
    partnerLinkText,
    shopLinkAddress,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
    // parse newline characaters from rich text
    const lowerParagraphs = lowerPageContent.split(/\n/).filter( p => p.length > 0)
    
    return (
        <DefaultPageWrap activeMenuItem='none'>
            <div className={donateStyles['upper-container']}>
                <div    className={donateStyles['upper-img']}
                        style={{ backgroundImage: `url(${donateHeaderImage.url})` }} >
                </div>
                <div className={donateStyles['cta-container']}>
                    <div className={donateStyles['cta-content']}>
                        <img    src={upperHeaderTextImage.url} 
                                alt={upperHeaderTextImage.alternativeText}
                                className={donateStyles['upper-header-text-img']} />
                        <p className={donateStyles['cta']}>{donationCTA}</p>
                        <div className={donateStyles['amt-btns-container']}>
                            {
                                donateAmounts.map(
                                    (amt, i) => <DonateAmountButton key={i} text={'$' + amt} />
                                )
                            }
                            <DonateAmountButton text={'OTHER'} />
                        </div>
                        <a  href={externalLinkAddress(shopLinkAddress)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={donateStyles['shop-link']} >
                            {shopLinkTextFirst}
                        </a>
                    </div>
                </div>
            </div>
            
            <div className={donateStyles['lower-container']}>
                <div className={donateStyles['support-content']}>
                    <h1 className={donateStyles['support-header']}>{lowerPageHeaderText}</h1>
                    <div className={donateStyles['support-text']}>
                        {lowerParagraphs.map(
                            (content, i) => <p key={i}>{content}</p>
                            )}
                    </div>
                    <h2 className={donateStyles['support-sub-header']}>{lowerPageSubHeaderText}</h2>
                    <div className={donateStyles['support-links']}>
                        <a  href={externalLinkAddress(shopLinkAddress)}>
                            {shopTextLinkSecond}
                        </a>
                        <Link href='/contact'>
                            <a>{partnerLinkText}</a>
                        </Link>
                    </div>
                </div>
                <div    className={donateStyles['lower-img']}
                        style={{ backgroundImage: `url(${lowerDonateImage.url})` }} >
                </div>
            </div>
        </DefaultPageWrap>
    )
}

export async function getStaticProps() {
    const donatePage = await fetchApi('donate-page');

    return {
        revalidate: 60,
        props: {
            upperHeaderTextImage: donatePage.upperHeaderTextImage,
            donationCTA: donatePage.donationCTA as string,
            donateHeaderImage: donatePage.donateHeaderImage,
            donateAmounts: donatePage.DonateAmountButton.map(
                ({ donationAmount }) => (donationAmount)
            ),
            shopLinkTextFirst: donatePage.shopLinkTextFirst as string,
            lowerDonateImage: donatePage.lowerDonateImage,
            lowerPageHeaderText: donatePage.lowerPageHeaderText as string,
            lowerPageContent: donatePage.lowerPageContent as string,
            lowerPageSubHeaderText: donatePage.lowerPageSubHeaderText as string,
            shopTextLinkSecond: donatePage.shopTextLinkSecond as string,
            partnerLinkText: donatePage.partnerLinkText as string,
            shopLinkAddress: donatePage.shopLinkAddress as string,
        },
    };
}


