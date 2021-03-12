import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import PageHead from './page-head';
import DonateButton from './donate-button';
import Footer from './footer';

import button from '../styles/buttons.module.scss';
import header from '../styles/header.module.scss';
import main from '../styles/main.module.scss';

export function DefaultPageWrap({
	activeMenuItem = 'none',
	children,
}: {
	activeMenuItem: 'about' | 'contact' | 'none';
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
			<PageHead />
			<nav className={header.wrapper} ref={ref}>
				<Link href="/">
					<a className={header.logo}>
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
								activeMenuItem === 'about'
									? header['menu-list-item-current']
									: undefined
							}
						>
							<Link href="/about">
								<a>About</a>
							</Link>
						</li>
						{/* <li>
							<a href="#">Programs</a>
						</li>
						<li>
							<a href="#">Gallery</a>
						</li>
						<li>
							<a href="#">News</a>
						</li> */}
						<li
							className={
								activeMenuItem === 'contact'
									? header['menu-list-item-current']
									: undefined
							}
						>
							<Link href="/contact">
								<a>Contact</a>
							</Link>
						</li>
						{/* <li>
							<a href="#">Shop</a>
						</li> */}
					</div>
					{/* <div className="activism-focus">
						<li>
							<a href="#">Marin City Matters</a>
						</li>
					</div> */}
				</ul>
				<DonateButton
					className={[header['donate-button'], button['primary']].join(' ')}
				/>
			</nav>
			<main className={main['content']}>{children}</main>
			<Footer />
		</>
	);
}
