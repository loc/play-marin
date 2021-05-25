import { DefaultPageWrap } from '../../../components/default-page-wrap'
import FeaturePhoto from '../../../components/feature-photo'

import styles from '../../../styles/program-detail.module.scss'

import { fetchApi } from '../../../utils/api'
import { Awaited } from '../../../utils/utils'

export default function Program({
    content,
    name,
    photo,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {

    function logo(name: string) {
        return (
            <div className={styles['logo-container']}>
                <div className={styles['logo']}>
                    <span>{name[0].toUpperCase()}</span>
                </div>
            </div>
        )
    }

    return (
        <DefaultPageWrap activeMenuItem='programs'>
            <div className={photo?.url ? styles['page-container--column'] : styles['page-container--row']}>
                { photo?.url ? <FeaturePhoto url={photo?.url} /> : logo(name) }
                
                <div className={styles['page-content']}>
                    {content}
                </div>
            </div>
        </DefaultPageWrap>
    )
}

export async function getStaticPaths() {
    const programs = await fetchApi('programs');

    const paths = programs.map((program: { name: string }) => ({
      params: { program: program.name },
    }))
  
    // // We'll pre-render only these paths at build time.
    // // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const program = params.program

    const programContent = await fetchApi(`programs?name=${program}`);

    return {
        revalidate: 60,
        props: {
            content: programContent[0]?.detail_content,
            name: programContent[0].name as string,
            photo: programContent[0]?.photo || null,
        }
    }
}