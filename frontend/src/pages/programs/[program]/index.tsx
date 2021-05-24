import { useRouter } from 'next/router'
import { DefaultPageWrap } from '../../../components/default-page-wrap';

import { fetchApi } from '../../../utils/api'
import { Awaited } from '../../../utils/utils';

export default function Program({
    photo,
    content,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
    // const router = useRouter()
    // // If the page is not yet generated, this will be displayed
    // // initially until getStaticProps() finishes running
    // if (router.isFallback) {
    //     return <div>Loading...</div>
    // }

    return (
        <DefaultPageWrap activeMenuItem='programs'>
            <div>
                {content}
            </div>
        </DefaultPageWrap>
    )
}

export async function getStaticPaths() {
    const programs = await fetchApi('programs');

    const paths = programs.map((program) => ({
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
            photo: programContent[0]?.photo || null,
            content: programContent[0]?.detail_content
        }
    }
}