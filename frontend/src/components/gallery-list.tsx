import GalleryListStyle from '../styles/gallery-list.module.scss';
import Link from 'next/link';

export default function GalleryList({
        programs
    }) {
	return (
		<>
		{programs.map((program, i) => 
			<div className={GalleryListStyle['list-wrap']}>

            <div className={GalleryListStyle['list-wrap-thumb']}>
                <img src={program.Image.url}/>
                </div>
                <div className={GalleryListStyle['list-wrap-content']}>
                <h3>
                    <a href='#'>{program.Title}</a>
                </h3>
                <a href={program.view_all_ink} className={GalleryListStyle['view-all']} target="_blank">VIEW ALL PHOTOS</a>
                </div>

            </div>
		)}
		</>
	);
}
