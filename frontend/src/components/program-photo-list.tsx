import programPhotoList from '../styles/program-photo-list.module.scss';
import Link from 'next/link';

export default function ProgramList({ programs }) {
	return (
		<>
			{programs.map((program, i) => 
				<div className={programPhotoList['list-wrap']}>

				   <div className={programPhotoList['list-wrap-humb']}>
					   <img src={program.photo.url}/>
					</div>


					<div className={programPhotoList['list-wrap-content']}>
						<div className={programPhotoList['list-content-header']}>
							<div className={programPhotoList['list-header-user']}>
								 {program.title_shortcode}
							</div>
							<div className={programPhotoList['list-header-name']}>
								<h3>{program.name}</h3>
								<span>{program.schedule_start} • {program.schedule_end}</span>
							</div>
							<div className={programPhotoList['list-header-sign']}>
								<a href={program.btn_url} target="_blank">
									<button className={programPhotoList['buttonscovid']}>{program.btn}</button>
								</a>
							</div>
						</div>


						{/*
						<div className={programPhotoList['list-content-body']}>
							{/*
							<h4> {program.location_street_address} , {program.location_city}, {program.location_zip}</h4>
							*/}
						<div className={programPhotoList['list-content-body']}>
							<p>{program.blurb}</p>
							<div className={programPhotoList['list-content-body-learn']}>
								<a href={program.learn_more_link} target="_blank">Learn More</a>                        
							</div>
						</div>

					</div>
				
				</div>
			)}

            
		</>
	);
}
