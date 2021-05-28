import { DefaultPageWrap } from '../../../components/default-page-wrap'
import FeaturePhoto from '../../../components/feature-photo'
import MarkdownToReact from '../../../components/markdown-to-react'

import styles from '../../../styles/program.module.scss'

import { fetchApi } from '../../../utils/api'
import { Awaited } from '../../../utils/utils'

export default function Program({
    content,
    name,
    photo,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
    const displayFeaturePhoto = photo?.url

    return (
        <DefaultPageWrap activeMenuItem='programs'>
            <div className={styles[`page-container--${displayFeaturePhoto ? 'column' : 'row'}`]}>
                { displayFeaturePhoto ? 
                    <FeaturePhoto url={photo.url} /> : 
                    <div className={styles['logo-container']}>
                        <div className={styles['logo']}>
                            <span>{name[0].toUpperCase()}</span>
                        </div>
                    </div>
                }
                
                <div className={styles['page-content']}>
                    <MarkdownToReact markdown={content} />
                </div>
            </div>
        </DefaultPageWrap>
    )
}

export async function getStaticPaths() {
    const programs = await fetchApi('programs');

    // // We'll pre-render only these paths at build time.
    const paths = programs.map((program: { name: string }) => ({
      params: { program: program.name },
    }))
  
    // // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const program = params.program

    const programContent = await fetchApi(`programs?name=${program}`);

    return {
        revalidate: 60,
        props: {
            content: programContent[0]?.detail_content as string || null,
            name: programContent[0]?.name as string || null,
            photo: programContent[0]?.photo ||  null,
        }
    }
}