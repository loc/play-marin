import { DefaultPageWrap } from '../components/default-page-wrap';
import programs from '../styles/programs.module.scss';

export default function Programs() {
    return (
        <DefaultPageWrap activeMenuItem='programs'>
            <h1 className={programs['page-header']}>
                Welcome to the Programs Page!
            </h1>
        </DefaultPageWrap>
    )
}