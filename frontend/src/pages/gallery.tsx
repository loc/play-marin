import Link from 'next/link';
import { DefaultPageWrap } from '../components/default-page-wrap';
import GalleryPhoto from '../components/gallery-photo';
import GalleryList from '../components/gallery-list';

import styles from '../styles/gallery.module.scss';
import galleryPhotoCss from '../styles/gallery-photo.module.scss';

import { fetchApi } from '../utils/api';
import { Awaited } from '../utils/utils';

export default function Programs({
	headerText,
	headerDescription,
	headerImage,
	view_all_link,
	programs,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
	function pageContent() {
		return (
			<DefaultPageWrap activeMenuItem="gallery" isPreview>
				<div className={styles['header-container']}>
					<div className={styles['header-content']}>
						<h1 className={styles['page-header']}>{headerText}</h1>
						<p>{headerDescription}</p>
					</div>
				</div>

				<div className={styles['programs-container']}></div>
			</DefaultPageWrap>
		);
	}

	function gallerypage() {
		return (
			<div>
				<div className={galleryPhotoCss['position-wrap']}>
					<img src={headerImage.url} />
					<div className={galleryPhotoCss['tag-line']}>
						<div className={galleryPhotoCss['tag-line-content']}>
							<div className={galleryPhotoCss['tag-line-content-left']}>
								<h3>{headerText}</h3>
								<p>{headerDescription}</p>
							</div>
						</div>
					</div>
				</div>
				<div className={galleryPhotoCss['sizer']}></div>

				<div className={styles['gallery-wrapper']}>
					<div className={styles['gallery-wrapper-left']}>
						<a href={view_all_link} target="_blank">
							<button className={styles['buttonsprimary']}>VIEW ALL</button>
						</a>
						<div className={styles['gallery-listing']}>
							<GalleryList programs={programs} />
						</div>
					</div>
					<div className={styles['gallery-archive']}>
						<h3>ARCHIVE</h3>
						<ul>
							<li>
								<a href="#">2020</a>
							</li>
							<li>
								<a href="#">2019</a>
							</li>
							<li>
								<a href="#">2018</a>
							</li>
							<li>
								<a href="#">2017</a>
							</li>
							<li>
								<a href="#">2016</a>
							</li>
							<li>
								<a href="#">2015</a>
							</li>
							<li>
								<a href="#">2014</a>
							</li>
							<li>
								<a href="#">2013</a>
							</li>
						</ul>
						<select>
							<option>2020</option>
							<option>2019</option>
							<option>2018</option>
							<option>2017</option>
							<option>2016</option>
							<option>2015</option>
							<option>2014</option>
							<option>2013</option>
						</select>
					</div>
				</div>
			</div>
		);
	}

	return (
		<DefaultPageWrap activeMenuItem={'gallery'}>
			{true ? gallerypage() : pageContent()}
		</DefaultPageWrap>
	);
}

export async function getStaticProps() {
	const programsPage = await fetchApi('gallery-page');
	const gallery = await fetchApi('galleries');

	return {
		revalidate: 60,
		props: {
			headerImage: programsPage.headerGalleryImage,
			headerText: programsPage.HeaderGalleryText,
			headerDescription: programsPage.headerGalleryDescription,
			view_all_link: programsPage.view_all_link,
			programs: gallery as [
				{
					Title: string;
					Image: { url: string };
					Description: string;
					view_all_ink: string;
				}
			],
		},
	};
}
