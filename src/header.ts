let isMenuOpen = false;

document
	.querySelector('.mobile-menu-toggle')
	.addEventListener('click', (e) => {
		if (isMenuOpen) {
			closeMenu(e, { force: true });
		} else {
			document.querySelector('nav').classList.add('toggled');
			e.stopPropagation();
			document.addEventListener('click', closeMenu, true);
			isMenuOpen = true;
		}
	});

function closeMenu(e, { force } = {}) {
	if (force || !e.target.closest('nav')) {
		document.querySelector('nav').classList.remove('toggled');
		document.removeEventListener('click', closeMenu);
		isMenuOpen = false;
		e.preventDefault();
	}
}
