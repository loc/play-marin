import Link from 'next/link';

import { DefaultPageWrap } from '../components/default-page-wrap';

import { fetchApi } from '../utils/api';
import { Awaited } from '../utils/utils';

import donateStyles from '../styles/donate.module.scss';
import buttons from '../styles/buttons.module.scss';


function externalLinkAddress(shopLinkAddress: string) {
    // add protocol to link address so Next.js correctly links to external URL
    let containsProtocol = /^(http|https):\/\//.test(shopLinkAddress);
    return containsProtocol ? shopLinkAddress : `http://${shopLinkAddress}`;
}

export default function Donate({
    donateHeaderImage,
    upperHeaderTextImage,
    donationCTA,
    shopLinkTextFirst,
    lowerDonateImage,
    lowerPageHeaderText,
    lowerPageContent,
    lowerPageSubHeaderText,
    shopTextLinkSecond,
    partnerLinkText,
    shopLinkAddress,
	buttom_block_description,
	buttom_block_heading,
	buttom_block_link,
	buttom_block_time,
	bottom_image
   
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
                        
                        <button className={buttons['primary']}>
                            <Link href='/donate-form'>
                                Donate to Play Marin
                            </Link>
                        </button>

                        {shopLinkAddress && <a  href={externalLinkAddress(shopLinkAddress)} 
                            className={donateStyles['shop-link']} >
                            {shopLinkTextFirst}
                        </a>}
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
                        {shopLinkAddress && <a  href={externalLinkAddress(shopLinkAddress)}>
                            {shopTextLinkSecond}
                        </a>}
                        <Link href='/contact'>
                            <a>{partnerLinkText}</a>
                        </Link>
                    </div>
                </div>
                <div    className={donateStyles['lower-img']}
                        style={{ backgroundImage: `url(${lowerDonateImage.url})` }} >
                </div>
            </div>

            <div className={donateStyles['list-wrap']}>

					<div className={donateStyles['list-wrap-humb']}>
                      <img src={bottom_image.url}/>
					</div>
					<div className={donateStyles['list-wrap-content']}>

						<div className={donateStyles['list-header-name']}>
							<h3>{buttom_block_heading}</h3>
							<span>{buttom_block_time}</span>
						</div>

						<p>{buttom_block_description}</p>
						<div className={buttom_block_link}>
							<a href={buttom_block_link} target="_blank">Read More</a>
						</div>

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
            shopLinkTextFirst: donatePage.shopLinkTextFirst as string,
            lowerDonateImage: donatePage.lowerDonateImage,
            lowerPageHeaderText: donatePage.lowerPageHeaderText as string,
            lowerPageContent: donatePage.lowerPageContent as string,
            lowerPageSubHeaderText: donatePage.lowerPageSubHeaderText as string,
            shopTextLinkSecond: donatePage.shopTextLinkSecond as string,
            partnerLinkText: donatePage.partnerLinkText as string,
            shopLinkAddress: donatePage.shopLinkAddress as string,
            buttom_block_description: donatePage.buttom_block_description as string,
			buttom_block_heading: donatePage.buttom_block_heading as string,
			buttom_block_link: donatePage.buttom_block_link as string,
			buttom_block_time: donatePage.buttom_block_time as string,
			bottom_image: donatePage.bottom_image,
        },
    };
}


