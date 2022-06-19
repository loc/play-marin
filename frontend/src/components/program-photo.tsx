import programPhoto from '../styles/program-photo.module.scss';

export default function FeaturePhoto({ headerImage, headerText, headerDescription }) {
	return (
		<>
			<div className={programPhoto['position-wrap']}>
				<img src={headerImage.url}/>
				<div className={programPhoto['tag-line']}>
				<div className={programPhoto['tag-line-content']}>
					<div className={programPhoto['tag-line-content-left']}>
							<h3>{headerText}</h3>
							<p>{headerDescription}</p>
						</div>
					</div>
                </div>
			</div>
			<div className={programPhoto['sizer']}></div>
		</>
	);
}
