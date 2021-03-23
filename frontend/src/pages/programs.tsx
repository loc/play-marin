import { DefaultPageWrap } from '../components/default-page-wrap';
import FeaturePhoto from '../components/feature-photo';

import programs from '../styles/programs.module.scss';

import { fetchApi } from '../utils/api';
import { Awaited } from '../utils/utils'

const activities = [
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
    },
    {
        title: 'Golf',
        duration_type: 'month-to-month',
        duration_start: 'September',
        duration_end: 'November',
        location_type: 'multiple',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        title: 'field trips',
        duration_type: 'year',
        duration_start: '',
        duration_end: '',
        location_type: 'multiple',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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

            <div className={programs['header-container']}>
                <div className={programs['header-content']}>
                    <h1 className={programs['page-header']}>
                        {headerText}
                    </h1>
                    <p>
                        {headerDescription}
                    </p>
                </div>
            </div>

            <div className={programs['activities-container']}>
                {
                    activities.map((activity, i) => 
                        <div key={i} className={programs['activity-row']}>
                            
                            <div    className={programs['activity-photo']}
                                    style={{ backgroundImage: `url(${headerImage?.url})` }}>
                            </div>
                            
                            <div className={programs['activity-container']}>                                
                                <div className={programs['activity-logo']}>
                                    <span>{activity.title[0].toUpperCase()}</span>
                                </div>

                                <div className={programs['activity-details']}>
                                    
                                    <div className={programs['activity-title-container']}>
                                        <div className={programs['activity-title-block']}>
                                            <div className={programs['activity-title']}>{activity.title}</div>
                                            <div className={programs['activity-duration']}>
                                                {activity.duration_type === 'month-to-month' ? 
                                                    `${activity.duration_start} ● ${activity.duration_end}` : 
                                                        activity.duration_type === 'year' ? 
                                                            'all year' : 
                                                                'unavailable'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={programs['activity-inner-block']}>
                                        <img src='img/location-marker.svg' alt='map marker icon'/>

                                        <div className={programs['activity-inner-content']}>
                                            <div className={programs['activity-location']}>
                                                { activity.location_type === 'multiple' ? 'Various Locations' : 
                                                    <div>
                                                        <div>{activity.location_title}</div>
                                                        <div>{activity.location_street_address}</div>
                                                        <div>{activity.location_city}, {activity.location_state} {activity.location_zip}</div>
                                                    </div>
                                                }
                                            </div>
                                        
                                            <div className={programs['activity-short-description']}>
                                                {activity.blurb}
                                            </div>
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