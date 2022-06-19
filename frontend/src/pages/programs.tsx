import Link from 'next/link';
import { DefaultPageWrap } from '../components/default-page-wrap';
import ProgramPhoto from '../components/program-photo';
import ProgramList from '../components/program-photo-list';
import ProgramLocation from '../components/program-location';
import ProgramLogo, { logoSizeType } from '../components/program-logo';
import ProgramTitle from '../components/program-title';

import styles from '../styles/programs-page.module.scss';
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
                    <ProgramLogo letter={program.name[0]} size={logoSizeType.Large} />
                </div>
            )
        }
    }

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

                <div className={styles['programs-container']}>
                    {
                        programs.map((program, i: number) => 
                            <div key={i} className={styles['program-row']}>
                                
                                {programPhoto(program)}
                                
                                <div className={styles['program-container']}>                                
                                    <ProgramLogo letter={program.name[0]} size={logoSizeType.Small} />

                                    <div className={styles['program-details']}>
                                        
                                        <div className={styles['program-title-container']}>
                                            <ProgramTitle name={program.name} 
                                                offer_schedule={program.offer_schedule}
                                                schedule_start={program.schedule_start}
                                                schedule_end={program.schedule_end} />
                                        </div>

                                        <ProgramLocation 
                                            location_type={program.location_type}
                                            location_name={program.location_name}
                                            location_street_address={program.location_street_address}
                                            location_city={program.location_city}
                                            location_state={program.location_state}
                                            location_zip={program.location_zip} />

                                        <div className={styles['program-inner-block']}>
                                            <div className={styles['program-inner-content']}>
                                                <div className={styles['short-description']}>
                                                    {program.blurb}
                                                </div>

                                                { program.has_detail_page ? 
                                                    <Link href={`/programs/${program.name}`}>
                                                        <a className={[buttons['secondary'], styles['detail-link']].join(' ')}>Learn More</a>
                                                    </Link> 
                                                    : null }
                                            </div>
                                        </div>                           
                                    </div>
                                </div>

                                <div className={styles['short-description--mobile']}>
                                    {program.blurb}
                                </div>
                            </div>
                        )
                    }
                </div>
            </DefaultPageWrap>
        )
    }

            
            
    function programpage() {
        return (
             <div>

                <ProgramPhoto headerImage={headerImage} headerText={headerText} headerDescription={headerDescription}/> 
                
             {/* filter section html start */}

            <div className={styles['program-filter']}>
                <Link href="/">
						<button className={styles['buttonsprimary']}>SIGN UP ON TEAM SNAP</button>
					</Link>
                <ul>
                <li className={styles['active']}>
                   <Link href='/'>ACTIVITIES A-Z</Link>
                    </li>      
                    <li>
                    <Link href='/'>CALENDAR VIEW</Link>
                    </li>      
                 </ul>
            </div>

            {/* filter section html End*/}


            <ProgramList programs={programs}/>


            <div className={styles['program-footer-text-block']}>
                <p>Check our calendar and follow our social channels for more partnership sports and activities such as Flag Football, Rowing, and more!</p>
            </div>

            </div>
        )
    }

    return (
        <DefaultPageWrap activeMenuItem={'programs'}>
            {true ? programpage() : pageContent()}
        </DefaultPageWrap>
    )
}

export async function getStaticProps() {
    const programsPage = await fetchApi('programs-page');
	const programs = await fetchApi('programs');
	console.log("programsPage",programsPage);

    return {
      revalidate: 60,
      props: {
        headerImage: programsPage.headerImage,
        headerText: programsPage.headerText as string,
        headerDescription: programsPage.headerDescription as string,
        programs: programsPage.programs as [{ 
            name: string, 
            photo: { url: string },
            offer_schedule: string,
            schedule_start: string,
            schedule_end: string,
            location_type: string,
            location_name: string,
            location_street_address: string,
            location_city: string,
            location_state: string,
            location_zip: string,
            blurb: string,
            has_detail_page: boolean,
            detail_content: string,
			Btn_url: string,
			title_shortcode: string,
			learn_more_link: string,
        }],
      },
    }
  }