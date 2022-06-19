import newsPhotoList from '../styles/news-photo-list.module.scss';
import Link from 'next/link';

export default function NewsList({
        programs
    }) {
    return (
        <>
			{programs.map((program, i) => 
			
				<div className={newsPhotoList['list-wrap']}>

					<div className={newsPhotoList['list-wrap-humb']}>
						<img src={program.image.url}/>
					</div>
					<div className={newsPhotoList['list-wrap-content']}>

						<div className={newsPhotoList['list-header-name']}>
							<h3>{program.title}</h3>
							<span>{program.making}</span>
						</div>

						<p>{program.description}</p>
						<div className={newsPhotoList['list-content-body-learn']}>
							<a href={program.read_more_link} target="_blank">Read More</a>
						</div>

					</div>
				</div>
			
			)}

        </>
    );
}
