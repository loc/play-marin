import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import { ReactElement } from 'react'

import styles from '../styles/markdown-to-react.module.scss'

export default function MarkdownToReact({markdown}) {
    const content = unified()
                        .use(parse)
                        .use(remark2react)
                        .processSync(markdown).result as ReactElement

    return (
        <div className={styles['container']}>
            {content}
        </div>
    )
}