import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import button from '../styles/buttons.module.scss';
import footer from '../styles/footer.module.scss';
import header from '../styles/header.module.scss';
import main from '../styles/main.module.scss';

export function DefaultPageWrap({
	activeMenuItem = 'none',
	children,
}: {
	activeMenuItem: 'about' | 'none';
	children: any;
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const ref = useRef(null);

	function checkClickInsideNav(e: Event) {
		setIsMenuOpen((isMenuOpen) => {
			if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
				return false;
			}
			return isMenuOpen;
		});
	}

	useEffect(() => {
		document.addEventListener('click', checkClickInsideNav);
		return () => {
			document.removeEventListener('click', checkClickInsideNav);
		};
	}, []);

	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com"></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Roboto+Condensed:wght@700&family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
					rel="stylesheet"
				></link>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				></meta>
			</Head>
			<nav className={header.wrapper} ref={ref}>
				<Link href="/">
					<a className={header.logo} href="#">
						<img src="/img/play-marin-logo@2x.png" width={76} height={76} />
					</a>
				</Link>
				<a
					className={header['mobile-menu-toggle']}
					onClick={() => setIsMenuOpen(() => !isMenuOpen)}
				></a>
				<ul
					className={header['menu-list']}
					style={isMenuOpen ? { display: 'flex' } : {}}
				>
					<div className={header['sport-focus']}>
						<li
							className={
								activeMenuItem === 'about' && header['menu-list-item-current']
							}
						>
							<Link href="/about">
								<a>About</a>
							</Link>
						</li>
						<li>
							<a href="#">Programs</a>
						</li>
						<li>
							<a href="#">Gallery</a>
						</li>
						<li>
							<a href="#">News</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
						<li>
							<a href="#">Shop</a>
						</li>
					</div>
					<div className="activism-focus">
						<li>
							<a href="#">Marin City Matters</a>
						</li>
					</div>
				</ul>
				<button className={[header['donate-button'], button.primary].join(' ')}>
					Donate
				</button>
			</nav>
			<main className={main['content']}>{children}</main>
			<footer className={footer.wrapper}>
				<div className={footer.content}>
					<div>
						<a className={footer.logo} href="#">
							<img
								src="/img/play-marin-logo-white@2x.png"
								width={214}
								height={122}
								alt="Play Marin logo"
							/>
						</a>
						<ul className={footer['social-media-links']}>
							<li>
								<a href="#">
									<img
										src="/img/twitter@2x.png"
										width={58}
										height={58}
										alt="Twitter logo"
									/>
								</a>
							</li>
							<li>
								<a href="#">
									<img
										src="/img/instagram@2x.png"
										width={58}
										height={58}
										alt="Instagram logo"
									/>
								</a>
							</li>
							<li>
								<a href="#">
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
							Copyright &copy; 2020 Play Marin, a California benefit
							corporation. All rights reserved.
						</p>
					</div>
					<div className={footer['right-side']}>
						<button className={button['primary-on-dark-background']}>
							Donate
						</button>
						<p className={footer['support-explainer']}>
							Your support helps PLAY MARIN close the activity gap in Marin City
							and provides a more diverse peer group for over 300 kids annually
							throughout Southern Marin.
						</p>
					</div>
				</div>
			</footer>
		</>
	);
}
