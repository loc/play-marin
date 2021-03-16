import Link from 'next/link';

import DonateButton from './donate-button';

import button from '../styles/buttons.module.scss';
import footer from '../styles/footer.module.scss';

export default function Footer() {
	return (
		<footer className={footer.wrapper}>
			<div className={footer.content}>
				<div>
					<Link href="/">
						<a className={footer.logo}>
							<img
								src="/img/play-marin-logo-white@2x.png"
								width={214}
								height={122}
								alt="Play Marin logo"
							/>
						</a>
					</Link>
					<ul className={footer['social-media-links']}>
						<li>
							<a href="https://twitter.com/playmarin">
								<img
									src="/img/twitter@2x.png"
									width={58}
									height={58}
									alt="Twitter logo"
								/>
							</a>
						</li>
						<li>
							<a href="https://www.instagram.com/play.marin">
								<img
									src="/img/instagram@2x.png"
									width={58}
									height={58}
									alt="Instagram logo"
								/>
							</a>
						</li>
						<li>
							<a href="https://www.facebook.com/playmarin.org/">
								<img
									src="/img/facebook@2x.png"
									width={58}
									height={58}
									alt="Facebook logo"
								/>
							</a>
						</li>
					</ul>
					<p className={footer.copyright}>
						Copyright &copy; 2021 Play Marin, a California benefit corporation.
						All rights reserved.
					</p>
				</div>
				<div className={footer['right-side']}>
					<DonateButton className={button['primary-on-dark-background']} />
					<p className={footer['support-explainer']}>
						Your support helps PLAY MARIN close the activity gap in Marin City
						and provides a more diverse peer group for over 300 kids annually
						throughout Southern Marin.
					</p>
				</div>
			</div>
		</footer>
	);
}
