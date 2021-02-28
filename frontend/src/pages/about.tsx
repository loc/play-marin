import { DefaultPageWrap } from '../components/default-page-wrap';
import FeaturePhoto from '../components/feature-photo';
import aboutPage from '../styles/about-page.module.scss';

export default function About() {
	return (
		<DefaultPageWrap activeMenuItem="about">
			<FeaturePhoto url="http://playmarin.org/uploads/9_B1_A5690_1_1f991a6310.jpg"></FeaturePhoto>
			<div className={aboutPage['header-desc-image-block']}>
				<div className={aboutPage['block-text-wrapper']}>
					<h2 className={aboutPage['block-header']}>Our Challenge</h2>
					<p className={aboutPage['block-desc']}>
						We operate in one of the wealthiest counties in the country, which
						is also the most racially disparate county in California. Our work
						addresses two fundamental challenges Marin youth face: Adequate
						access to extracurricular and athletic opportunity in Marin City.
						Lack of racial, ethnic, and socioeconomic diversity in the broader
						Marin community.
					</p>
				</div>
				<div
					className={aboutPage['block-image']}
					style={{
						backgroundImage:
							'url(http://playmarin.org/uploads/Screen_Shot_2020_09_01_at_12_23_de80d44837.jpg)',
					}}
				></div>
			</div>
			<div
				className={[
					aboutPage['header-desc-image-block'],
					aboutPage.flipped,
				].join(' ')}
			>
				<div className={aboutPage['block-text-wrapper']}>
					<h2 className={aboutPage['block-header']}>Our Mission</h2>
					<p className={aboutPage['block-desc']}>
						Play Marin intentionally provides opportunities for children of
						diverse ethnic and socioeconomic backgrounds in Southern Marin to
						learn and grow together through play. We recognize the need for
						stronger diversity and inclusion in Marin County, and we believe
						that bringing together the unique experiences of different cultures
						and socioeconomic backgrounds among us serves to enhance our larger
						community.
						<br />
						Being able to understand and appreciate people from all walks of
						life is vital to the advancement of our society, and we see play as
						the vehicle to achieve this goal. In just eight years, we have grown
						from one basketball team of nine players to reaching over 300 kids
						annually through several team sports and many other uplifting and
						enriching activities. Our work teaches valuable skills, creates
						friendships, develops grit, brings families together, and enhances
						well being and solidarity among young people of Marin from all
						backgrounds, improving their prospects for a successful future and
						benefiting the overall health of our broader Marin community. Come
						play with us.
					</p>
				</div>
				<div
					className={aboutPage['block-image']}
					style={{
						backgroundImage:
							'url(http://playmarin.org/uploads/Screen_Shot_2020_09_01_at_12_23_de80d44837.jpg)',
					}}
				></div>
			</div>
			<div>
				<h2 className={aboutPage['team-block']}>Our Team</h2>
				<div className={aboutPage['team-members']}>
					{[...Array(4)].map(() => (
						<div className={aboutPage['team-member']}>
							<div
								className={aboutPage['circle-image']}
								style={{
									backgroundImage:
										'url(http://playmarin.org/uploads/9_B1_A4040_1_35643539f6.jpg)',
								}}
							></div>
							<h3 className={aboutPage['team-member-name']}>Paul Austin</h3>
							<h4 className={aboutPage['team-member-title']}>Founder & CEO</h4>
							<p className={aboutPage['team-member-bio']}>
								Paul Austin is a longtime Marin City resident who has been a
								youth advocate for the majority of his professional life. After
								serving for several years as Director of Recreation for Marin
								City Community Center, Tamalpais High graduate Mr. Austin, who
								studied Early Childhood Education at Texas Southern University
								and holds a Bachelor’s in Psychology from Dominican University
								in San Rafael, saw a need to create opportunities for Marin City
								youth to engage in organized athletics and other extracurricular
								activities. He founded Play Marin to meet that need, and to
								intentionally give kids of diverse ethnic and socioeconomic
								backgrounds from the broader Marin community the opportunity to
								play, learn, and grow together. Starting in 2012 with just one
								basketball team of nine players, Mr. Austin’s dedicated
								stewardship of Play Marin brought steady and expansive growth.
								The organization currently serves approximately 300 kids
								annually.
							</p>
						</div>
					))}
				</div>
			</div>
			<hr />
		</DefaultPageWrap>
	);
}
