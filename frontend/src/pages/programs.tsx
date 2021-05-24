import Link from 'next/link';
import { DefaultPageWrap } from '../components/default-page-wrap';
import FeaturePhoto from '../components/feature-photo';

import styles from '../styles/programs.module.scss';
import buttons from '../styles/buttons.module.scss';

import { fetchApi } from '../utils/api';
import { Awaited } from '../utils/utils'

export default function Programs({
    headerText,
    headerDescription,
    headerImage,
    programs,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
    function programPhoto(program: { photo: { url: string }, name: string }) {

        if (program.photo) {
            return (
                <div className={styles['program-photo']}
                    style={{ backgroundImage: `url(${program.photo?.url})` }}>
                </div>
            )
        } else {
            return (
                <div className={styles['program-letter-container']}>
                    <div className={styles['program-letter']}>
                        <span>{program.name[0].toUpperCase()}</span>
                    </div>
                </div>
            )
        }
    }

    return (
        <DefaultPageWrap activeMenuItem='programs'>
            <FeaturePhoto url={headerImage?.url} />

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

            <div className={styles['programs-container']}>
                {
                    programs.map((program, i: number) => 
                        <div key={i} className={styles['program-row']}>
                            
                            {programPhoto(program)}
                            
                            <div className={styles['program-container']}>                                
                                <div className={styles['program-logo']}>
                                    <span>{program.name[0].toUpperCase()}</span>
                                </div>

                                <div className={styles['program-details']}>
                                    
                                    <div className={styles['program-title-container']}>
                                        <div className={styles['program-title-block']}>
                                            <div className={styles['program-title']}>{program.name}</div>
                                            <div className={styles['program-schedule']}>
                                                {program.offer_schedule === 'month_to_month' ? 
                                                    `${program.schedule_start} ● ${program.schedule_end}` : 
                                                        program.offer_schedule === 'all_year' ? 
                                                            'all year' : 
                                                                'unavailable'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles['program-inner-block']}>
                                        <img src='img/location-marker.svg' alt='map marker icon'/>

                                        <div className={styles['program-inner-content']}>
                                            <div className={styles['program-location']}>
                                                { program.location_type === 'multiple' ? 'Various Locations' : 
                                                    <div>
                                                        <div>{program.location_name}</div>
                                                        <div>{program.location_street_address}</div>
                                                        <div>{program.location_city}, {program.location_state} {program.location_zip}</div>
                                                    </div>
                                                }
                                            </div>
                                        
                                            <div className={styles['short-description']}>
                                                {program.blurb}
                                            </div>

                                            {program.has_detail_page ? 
                                                <Link href={`/programs/${program.name}`}>
                                                    <a className={[buttons['secondary'], styles['detail-link']].join(' ')}>Learn More</a>
                                                </Link> 
                                                : null }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </DefaultPageWrap>
    )
}

export async function getStaticProps() {
    const [programsPage, programsContent] = await Promise.all([
        fetchApi('programs-page'),
        fetchApi('programs',)
    ]);

    return {
      revalidate: 60,
      props: {
        headerImage: programsPage.headerImage,
        headerText: programsPage.headerText as string,
        headerDescription: programsPage.headerDescription as string,
        programs: programsContent,
      },
    }
  }