import { DefaultPageWrap } from '../components/default-page-wrap';
import { HomepageProgramCalendar } from '../components/homepage-program-calendar';
import buttons from '../styles/buttons.module.scss';
import homepage from '../styles/homepage.module.scss';
import videoBlock from '../styles/video-block.module.scss';
import { fetchApi, takeDatePairAndMakeCalendarBar } from '../utils/api';

type PhotoWithAltText = {
	url: string;
	alternativeText?: string;
};
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export default function Home({
	tagLine,
	carousel,
	missionStatementBlocks,
	missionStatementBlockTitle,
	youtubeEmbed,
	introVideoTitle,
	introVideoDescription,
	pullquoteContent,
	pullquoteAttribution,
	pullquotePhoto,
	programCalendarBars,
	programCalendarDescription,
}: Awaited<ReturnType<typeof getStaticProps>>['props']) {
	return (
		<DefaultPageWrap activeMenuItem="none">
			<div className={homepage.carousel}>
				<div className={homepage['img-wrapper']}>
					<img src={carousel[0].url} />
				</div>
			</div>
			<div className={homepage['tag-line']}>{tagLine}</div>
			<div className={[videoBlock.wrapper, homepage.video].join(' ')}>
				<div className={videoBlock['video-wrapper']}>
					<div
						className={videoBlock['video-aspect-ratio-wrapper']}
						dangerouslySetInnerHTML={{ __html: youtubeEmbed }}
					></div>
				</div>
				<div className={homepage['video-block-details']}>
					<span className={videoBlock.title}>{introVideoTitle}</span>
					<p className={videoBlock.description}>{introVideoDescription}</p>
					<button className={buttons.primary}>About</button>
				</div>
			</div>

			<div className={homepage['quote-container']}>
				<div className={homepage['quote-photo-wrapper-spacer']}>
					<div className={homepage['quote-photo-wrapper']}>
						<img
							alt={pullquotePhoto.alternativeText}
							src={pullquotePhoto.url}
						/>
					</div>
				</div>
				<div className={homepage['quote-text-block']}>
					<img
						className={homepage['quote-text-block-icon']}
						src="img/quote.svg"
					/>
					<p>{pullquoteContent}</p>
					<span className={homepage['quote-attribution']}>
						{pullquoteAttribution}
					</span>
				</div>
			</div>

			<h3 className={homepage['mission-block-group-title']}>
				{missionStatementBlockTitle}
			</h3>
			<div className={homepage['mission-block-group']}>
				{missionStatementBlocks.map(
					({ title, description, photoUrl }, index) => (
						<div className={homepage['mission-block']}>
							<div key={title} className={homepage['mission-block-img-wrap']}>
								<img
									className={homepage['mission-block-img']}
									src={photoUrl}
								></img>
							</div>
							<h4 className={homepage['mission-block-title']}>{title}</h4>
							<p className={homepage['mission-block-description']}>
								{description}
							</p>
						</div>
					)
				)}
			</div>
			<hr></hr>
			<HomepageProgramCalendar
				bars={programCalendarBars}
				description={programCalendarDescription}
			></HomepageProgramCalendar>
		</DefaultPageWrap>
	);
}

export async function getStaticProps(context) {
	const [homepage, programCalendar] = await Promise.all([
		fetchApi('homepage'),
		fetchApi('homepage-program-calendars'),
	]);

	const programCalendarBars = (programCalendar as any[]).map(
		({
			start,
			end,
			display_name: name,
		}: {
			start: string;
			end: string;
			display_name: string;
		}) => {
			return {
				...takeDatePairAndMakeCalendarBar([start, end]),
				name,
			};
		}
	);

	return {
		revalidate: 60,
		props: {
			carousel: homepage.photo_carousel,
			tagLine: homepage.tagLine as string,
			youtubeEmbed: homepage.intro_video.youtube_embed,
			introVideoTitle: homepage.intro_video.title as string,
			introVideoDescription: homepage.intro_video.description as string,
			pullquoteContent: homepage.pullquote.quote as string,
			pullquoteAttribution: homepage.pullquote.attribution as string,
			pullquotePhoto: homepage.pullquote.photo as PhotoWithAltText,
			missionStatementBlockTitle: homepage.about_photo_block.title,
			programCalendarBars,
			programCalendarDescription: homepage.program_calendar_description,
			missionStatementBlocks: homepage.about_photo_block.block.map(
				({ title, description, photo }) => ({
					title,
					description,
					photoUrl: photo.url,
				})
			),
		},
	};
}
