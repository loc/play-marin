import galleryPhoto from '../styles/gallery-photo.module.scss';

export default function GalleryPhoto({ url }: { url: string }) {
	return (
		<>
			<div className={galleryPhoto['position-wrap']}>
				<img src="http://24livehosts.com/play-marin/frontend/public/img/gallery-photo-banner.png" />
				<div className={galleryPhoto['tag-line']}>
				<div className={galleryPhoto['tag-line-content']}>
					<div className={galleryPhoto['tag-line-content-left']}>
							<h3>PHOTO GALLERY</h3>
							<p>Check out photos fro all of our activities and events hosted on whatever platform. </p>
						</div>
					</div>
                </div>
			</div>
			<div className={galleryPhoto['sizer']}></div>
		</>
	);
}
