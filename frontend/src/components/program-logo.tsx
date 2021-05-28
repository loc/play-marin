import styles from '../styles/program-logo.module.scss'

export enum logoSizeType {
    Small = 'small',
    Large = 'large',
}

export default function ProgramLogo(
    {
        letter,
        size  
    } : { letter: string, size: logoSizeType}
) {
    return (
        <div className={[styles['circle'], styles[`circle--${size}`]].join(' ')}>
            <span>{letter.toUpperCase()}</span>
        </div>
    )
}