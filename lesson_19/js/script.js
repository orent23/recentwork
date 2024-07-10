
"use strict";

const iconMenu = document.querySelector('.icon-menu');

iconMenu.addEventListener('click', () => {
	document.documentElement.classList.toggle('menu-open');
	document.documentElement.classList.toggle('lock');
	document.addEventListener('click', closeMenu);
	if (document.documentElement.classList.contains('menu-open')) {
		document.documentElement.classList.remove('_show-form');
	}
});

function closeMenu(e) {
	const target = e.target;
	if (!target.closest('.header') && (!target.closest('.icon-menu'))) {
		document.documentElement.classList.remove('menu-open');
		document.documentElement.classList.remove('lock');
		document.removeEventListener('click', closeMenu);
	}
}

// search ======================================================================
const searchInput = document.querySelector('.form-header__input');
searchInput.addEventListener('click', checkAvailabilityForm);
searchInput.addEventListener('focusin', checkAvailabilityForm);


function checkAvailabilityForm(e) {
	if (window.innerWidth <= 520.98) return;
	const target = e.target;
	const form = target.closest('form') ? target.closest('form') : null;
	toggleSearchForm(form, true);
}

const buttonSearch = document.querySelector('.top-header__icon-search');
buttonSearch.addEventListener('click', () => {
	const form = document.querySelector('.top-header__form');
	if (form) {
		toggleSearchForm(form);
		buttonSearch.classList.toggle('active');
	}
});

function toggleSearchForm(form, onlyShow = false) {
	if (!form) return;
	if (onlyShow) {
		form.classList.add('_show');
		// document.documentElement.classList.add('_show-form');
		document.addEventListener('click', closeInputSearch);
	} else {
		// form.classList.toggle('_show');
		document.documentElement.classList.toggle('_show-form');
		if (document.documentElement.classList.contains('_show-form')) {
			document.addEventListener('click', closeInputSearch);
			document.documentElement.classList.remove('menu-open', 'lock');
		} else {
			document.removeEventListener('click', closeInputSearch);
		}
	}
}

function closeInputSearch(e) {
	const target = e.target;
	console.log(e.type);
	if (!target.closest('.header') && target !== buttonSearch || e.type === 'focusout') {
		document.documentElement.classList.remove('_show-form');
		searchInput.closest('form').classList.remove('_show');
	}
}

// filter =============================================================

const productsBlock = document.querySelectorAll('.block-products');
productsBlock.forEach(block => initFilter(block));

function initFilter(block) {
	let selectFilters = ['all'];
	const buttonFilter = block.querySelectorAll('.nav-block__button');

	buttonFilter.forEach(button => {
		button.addEventListener('click', () => {
			const category = button.dataset.filter;
			if (category === 'all') {
				selectFilters = ['all'];
				setActiveButton(selectFilters, block);
			} else {
				const index = selectFilters.indexOf(category);
				index > -1 ? selectFilters.splice(index, 1) : selectFilters.push(category);
				if (selectFilters.length > 0) {
					const index = selectFilters.indexOf('all');
					index > -1 ? selectFilters.splice(index, 1) : null;
				} else {
					selectFilters = ['all']
				}
				setActiveButton(selectFilters, block);
			}
			renderItems(selectFilters, block);
		});
		renderItems(selectFilters, block);
	});
}

function setActiveButton(categories, parent) {
	const buttonFilter = parent.querySelectorAll('.nav-block__button');
	buttonFilter.forEach(button => {
		const category = button.dataset.filter;
		if (categories.includes(category)) {
			button.classList.add('active');
		} else {
			button.classList.remove('active');
		}
	});
}

function renderItems(categories, parent) {
	const items = parent.querySelectorAll('.item-product');
	items.forEach(item => {
		const category = item.dataset.category;
		if (categories.includes('all') || categories.some(item => item === category)) {
			item.classList.add('show');
		} else {
			item.classList.remove('show');
		}
	});
}

// goto
const goto = document.querySelectorAll('[data-goto]');
goto.forEach(link => {
	link.addEventListener('click', scrollToItem);
});

function scrollToItem(e) {
	e.preventDefault();
	const link = e.target.dataset.goto;
	if (!link || !document.querySelector(link)) return;
	const element = document.querySelector(link);
	const heightToTop = element.getBoundingClientRect().top;
	window.scrollBy({
		top: heightToTop,
		behavior: 'smooth'
	})

}

