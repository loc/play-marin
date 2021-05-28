import { DefaultPageWrap } from '../../../components/default-page-wrap'
import FeaturePhoto from '../../../components/feature-photo'
import MarkdownToReact from '../../../components/markdown-to-react'
import ProgramLocation from '../../../components/program-location'
import ProgramLogo, { logoSizeType } from '../../../components/program-logo'
import ProgramTitle from '../../../components/program-title'

import styles from '../../../styles/program.module.scss'

import { fetchApi } from '../../../utils/api'
import { Awaited } from '../../../utils/utils'

export default function Program({
    content,
    name,
    photo,
    offer_schedule,
    schedule_start,
    schedule_end,
    location_type,
    location_name,
    location_street_address,
    location_city,
    location_state,
    location_zip,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
    return (
        <DefaultPageWrap activeMenuItem='programs'>
            <div className={styles['page-container']}>
                
                { photo?.url ? <FeaturePhoto url={photo.url} /> : null }
                
                <div className={styles['row']}>
                    <div className={styles['program-details']}>
                        <div className={styles['header']}>
                            <ProgramLogo letter={name[0]} size={logoSizeType.Small} />
                            <ProgramTitle
                                name={name}
                                offer_schedule={offer_schedule}
                                schedule_start={schedule_start}
                                schedule_end={schedule_end} />
                        </div>
                        <div className={styles['loc']}>
                            <ProgramLocation
                                location_type={location_type}
                                location_name={location_name}
                                location_street_address={location_street_address}
                                location_city={location_city}
                                location_state={location_state}
                                location_zip={location_zip} />
                        </div>
                    </div>

                    <div className={styles['page-content']}>
                        <MarkdownToReact markdown={content} />
                    </div>
                </div>
                
            </div>
        </DefaultPageWrap>
    )
}

export async function getStaticPaths() {
    // only fetch programs with actual detail pages
    const programs = await fetchApi('programs?has_detail_page=true')

    // // We'll pre-render only these paths at build time.
    const paths = programs.map((program: { name: string }) => ({
      params: { program: program.name },
    }))
  
    // // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const programContent = await fetchApi(`programs?name=${params.program}`)

    return {
        revalidate: 60,
        props: {
            content: programContent[0]?.detail_content as string || null,
            name: programContent[0]?.name as string || null,
            photo: programContent[0]?.photo ||  null,
            offer_schedule: programContent[0]?.offer_schedule as string || null,
            schedule_start: programContent[0]?.schedule_start as string || null,
            schedule_end: programContent[0]?.schedule_end as string || null,
            location_type: programContent[0]?.location_type as string || null,
            location_name: programContent[0]?.location_name as string || null,
            location_street_address: programContent[0]?.location_street_address as string || null,
            location_city: programContent[0]?.location_city as string || null,
            location_state: programContent[0]?.location_state as string || null,
            location_zip: programContent[0]?.location_zip as string || null,
        }
    }
}