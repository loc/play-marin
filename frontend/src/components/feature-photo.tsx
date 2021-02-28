import featurePhoto from '../styles/feature-photo.module.scss';

export default function FeaturePhoto({ url }: { url: string }) {
	return (
		<>
			<div className={featurePhoto['position-wrap']}>
				<img src={url}></img>
			</div>
			<div className={featurePhoto['sizer']}></div>
		</>
	);
}
