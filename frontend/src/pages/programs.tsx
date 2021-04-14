import Link from 'next/link';
import { DefaultPageWrap } from '../components/default-page-wrap';
import FeaturePhoto from '../components/feature-photo';

import styles from '../styles/programs.module.scss';
import buttons from '../styles/buttons.module.scss';

import { fetchApi } from '../utils/api';
import { Awaited } from '../utils/utils'

const programs = [
    {
        title: 'Basketball',
        duration_type: 'month-to-month',
        duration_start: 'November',
        duration_end: 'March',
        location_type: 'single',
        location_title: 'Middle School Gym',
        location_street_address: '123 Main Street',
        location_city: 'Marin City',
        location_state: 'CA',
        location_zip: '94965',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        detail_page: 'false',
    },
    {
        title: 'Golf',
        duration_type: 'month-to-month',
        duration_start: 'September',
        duration_end: 'November',
        location_type: 'multiple',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        detail_page: 'true',
    },
    {
        title: 'field trips',
        duration_type: 'year',
        duration_start: '',
        duration_end: '',
        location_type: 'multiple',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        detail_page: 'true',
    }
]  

export default function Programs({
    headerText,
    headerDescription,
    headerImage,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
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
                    programs.map((program, i) => 
                        <div key={i} className={styles['program-row']}>
                            
                            <div    className={styles['program-photo']}
                                    style={{ backgroundImage: `url(${headerImage?.url})` }}>
                            </div>
                            
                            <div className={styles['program-container']}>                                
                                <div className={styles['program-logo']}>
                                    <span>{program.title[0].toUpperCase()}</span>
                                </div>

                                <div className={styles['program-details']}>
                                    
                                    <div className={styles['program-title-container']}>
                                        <div className={styles['program-title-block']}>
                                            <div className={styles['program-title']}>{program.title}</div>
                                            <div className={styles['program-duration']}>
                                                {program.duration_type === 'month-to-month' ? 
                                                    `${program.duration_start} ● ${program.duration_end}` : 
                                                        program.duration_type === 'year' ? 
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
                                                        <div>{program.location_title}</div>
                                                        <div>{program.location_street_address}</div>
                                                        <div>{program.location_city}, {program.location_state} {program.location_zip}</div>
                                                    </div>
                                                }
                                            </div>
                                        
                                            <div className={styles['short-description']}>
                                                {program.blurb}
                                            </div>

                                            {program.detail_page === 'true' ? 
                                                <Link href={`/programs/${program.title}`}>
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
    const programsPage = await fetchApi('programs-page');
  
    return {
      revalidate: 60,
      props: {
        headerImage: programsPage.headerImage,
        headerText: programsPage.headerText as string,
        headerDescription: programsPage.headerDescription as string,
      },
    }
  }