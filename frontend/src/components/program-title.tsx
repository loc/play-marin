import styles from '../styles/program-title.module.scss'

export default function ProgramTitle(
    {
        name,
        offer_schedule,
        schedule_start,
        schedule_end,
    }: {
        name: string,
        offer_schedule: string,
        schedule_start: string,
        schedule_end: string,
    }
) {
    function schedule() {
        switch (offer_schedule) {
            case 'month_to_month':
                return `${schedule_start} ● ${schedule_end}`
            case 'all_year':
                return 'all year'
            default:
                return 'unavailable'
        }
    }
    
    return (
        <div className={styles['container']}>
            <div className={styles['title']}>{name}</div>
            <div className={styles['schedule']}>
                {schedule()}
            </div>
        </div>
    )
}