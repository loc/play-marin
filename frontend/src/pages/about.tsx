import { DefaultPageWrap } from '../components/default-page-wrap';
import FeaturePhoto from '../components/feature-photo';
import aboutPage from '../styles/about-page.module.scss';
import { fetchApi } from '../utils/api';

export default function About({ teamTitle, teamMembers, blocks, partners }) {
	return (
		<DefaultPageWrap activeMenuItem="about">
			<FeaturePhoto url="http://playmarin.org/uploads/9_B1_A5690_1_1f991a6310.jpg"></FeaturePhoto>

			{blocks.map(({ header, description, url }, index) => (
				<div
					className={[
						aboutPage['header-desc-image-block'],
						...(index % 2 ? [aboutPage.flipped] : []),
					].join(' ')}
				>
					<div className={aboutPage['block-text-wrapper']}>
						<h2 className={aboutPage['block-header']}>{header}</h2>
						<p className={aboutPage['block-desc']}>{description}</p>
					</div>
					<div
						className={aboutPage['block-image']}
						style={{
							backgroundImage: `url(${url})`,
						}}
					></div>
				</div>
			))}
			<div>
				<h2 className={aboutPage['team-block']}>{teamTitle}</h2>
				<div className={aboutPage['team-members']}>
					{teamMembers.map(({ name, biography, title, url }) => (
						<div key={name} className={aboutPage['team-member']}>
							<div
								className={aboutPage['circle-image']}
								style={{
									backgroundImage: `url(${url})`,
								}}
							></div>
							<h3 className={aboutPage['team-member-name']}>{name}</h3>
							<h4 className={aboutPage['team-member-title']}>{title}</h4>
							<p className={aboutPage['team-member-bio']}>{biography}</p>
						</div>
					))}
				</div>
			</div>
			<hr />
			<div>
				<h2 className={aboutPage['heading']}>Our Partners</h2>
				<ul className={aboutPage.partners}>
					{partners.map((partner) => (
						<li key={partner}>{partner}</li>
					))}
				</ul>
			</div>
			<hr />
		</DefaultPageWrap>
	);
}

export async function getStaticProps(context) {
	const [aboutPage, partners] = await Promise.all([
		fetchApi('about-page'),
		fetchApi('partners'),
	]);

	const teamMembers = aboutPage.our_team.team_members.map(
		({ name, description, role, photo }) => ({
			name,
			biography: description,
			title: role,
			url: photo.formats.small.url,
		})
	);

	const blocks = aboutPage.about_block.map(({ title, description, photo }) => ({
		header: title,
		description,
		url: photo.url,
	}));

	return {
		revalidate: 60,
		props: {
			teamTitle: aboutPage.our_team.title,
			teamMembers,
			blocks,
			partners: partners.map(({ name }) => name),
		},
	};
}
