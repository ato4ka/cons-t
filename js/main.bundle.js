document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded() {
	const menuBurger = document.querySelector(".mobile__burger");
	const menuCloseBtn = document.querySelector(".menu__mobile-close");
	const menu = document.querySelector(".menu__mobile");
	const footerBtn = document.querySelector(".footer__frame-button");
	const form = document.querySelector(".modal__form");
	const formCloseBtn = document.querySelector(".modal__form-close");
	const menuLinks = document.querySelectorAll(".menu__frame-link");
	const sections = document.querySelectorAll("section, footer");
	const menuLinksMob = document.querySelectorAll(".menu__mobile-link");

	let sectionPos = [];

	menuBurger.addEventListener("click", openMenu);
	menuCloseBtn.addEventListener("click", closeMenu);
	footerBtn.addEventListener("click", openForm);
	formCloseBtn.addEventListener("click", closeForm);
	window.onscroll = scrollListener;

	for (let menuItem of menuLinksMob) {
		menuItem.addEventListener("click", closeMenu);
	}

	function initMenu() {
		menuBurger.addEventListener("click", openMenu);
		menuCloseBtn.addEventListener("click", closeMenu);
	
		menuLinks.forEach(link => {
			link.addEventListener("click", () => {
				const section = document.getElementById("section-" + link.dataset.target);
				section.scrollIntoView({behavior: 'smooth'});
				makeLinkActive(link.dataset.target);
			});
		})
	}

	initMenu();
	initScroll();

	function openMenu() {
		menu.classList.add("is-active");
	}
	
	function closeMenu() {
		menu.classList.remove("is-active");
	}

	function openForm() {
		form.classList.add("is-active");
	}
	
	function closeForm() {
		form.classList.remove("is-active");
	}

	function makeLinkActive(id) {
		const link = document.querySelector(`.menu__frame-link[data-target="${id}"]`);
		const activeLink = document.querySelector(".menu__frame-link.is-active");
		activeLink.classList.remove("is-active");
		link.classList.add("is-active");
	}

	function initScroll() {
		document.body.onscroll = scrollListener;
		sections.forEach(section => {
			sectionPos.push(section.offsetTop);
		});
		sectionPos[0] = 0;
	}

	function scrollListener() {
		const pos = document.documentElement.scrollTop;
		let activeSectionIndex;
		sectionPos.forEach((secPos, index) => {
			if (pos >= secPos) {
				activeSectionIndex = index;
			}
		});
		const activeSection = sections[activeSectionIndex];
		const activeSectionId = activeSection.id.replace("section-", "");
		makeLinkActive(activeSectionId);
	}
}