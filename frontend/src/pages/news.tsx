import Link from 'next/link';
import { DefaultPageWrap } from '../components/default-page-wrap';
import NewsPhoto from '../components/news-photo';
import NewsPhotoList from '../components/news-photo-list';

import styles from '../styles/news.module.scss';

import { fetchApi } from '../utils/api';
import { Awaited } from '../utils/utils'

export default function News({
    headerText,
    headerDescription,
    headerImage,
    programs,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {

    function pageContent() {
        return (
            <DefaultPageWrap activeMenuItem='programs'>
                <div className={styles['header-container']}>
                    <div className={styles['header-content']}>
                        <h1 className={styles['page-header']}>
                            {headerText}
                        </h1>
                        <p>
                            {headerDescription}
                        </p>
                    </div>
                </div>
            </DefaultPageWrap>
        )
    }

            
            
    function newspage() {
        return (
             <div>
				<NewsPhoto />
                <div className='news-page-wrapper'>
                  <NewsPhotoList programs={programs}/>
                </div>
            </div>
        )
    }

    return (
        <DefaultPageWrap activeMenuItem={'news'}>
            {true ? newspage() : pageContent()}
        </DefaultPageWrap>
    )
}

export async function getStaticProps() {
	const newsPage = await fetchApi('news-page');
    const newsPageData = await fetchApi('newsses');
	
	console.log("newsPageData",newsPageData);
    
    return {
      revalidate: 60,
      props: {
        headerImage: newsPage.image,
        headerText: newsPage.heading,
        headerDescription: newsPage.description,
        programs: newsPageData as [{ 
            title: string, 
            description: { url: string },
            createdAt: string,
			making: string,
            image: { url: string },
			read_more_link: string,
        }],
      },
    }
}