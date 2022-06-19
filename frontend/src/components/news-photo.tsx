import newsPhoto from '../styles/news-photo.module.scss';

export default function GalleryPhoto({ url }: { url?: string }) {
	return (
		<>
			<div className={newsPhoto['position-wrap']}>
				<div className={newsPhoto['tag-line']}>
					<div className={newsPhoto['tag-line-content']}>
						<div className={newsPhoto['tag-line-content-inner']}>
							<div className={newsPhoto['tag-line-content-left']}>
								<h1>
									THE
									<br /> PLAYBOOK
								</h1>
								<h3>OUR MONTHLY NEWSLETTER</h3>
							</div>
							<div className={newsPhoto['tag-line-content-right']}>
								<form>
									<input type="text" name="name" placeholder="Name" />
									<input type="email" name="email" placeholder="Email" />
									<input type="submit" name="submit" value="SIGN UP" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={newsPhoto['sizer']}></div>
		</>
	);
}
