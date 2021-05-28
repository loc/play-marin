import styles from '../styles/program-location.module.scss'

export default function ProgramLocation(
    {
        location_type,
        location_name,
        location_street_address,
        location_city,
        location_state,
        location_zip,
    } : {
        location_type: string,
        location_name: string,
        location_street_address: string,
        location_city: string,
        location_state: string,
        location_zip: string,
    }
) {
    if (location_type != 'none') {
        return (
            (<div className={styles['container']}>
            <img className={styles['icon']} src='/img/location-marker.svg' alt='map marker icon'/>

            <div className={styles['address']}>
            if (location_type === 'multiple') {
                <div>Various Locations</div>
            } else {
                <div>
                    <div>{location_name}</div>
                    <div>{location_street_address}</div>
                    <div>{location_city}, {location_state} {location_zip}</div>
                </div>
            }
            </div>
        </div>)
        )
    } else {
        return null
    }
}