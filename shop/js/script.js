


// Строгий режим
"use strict"


//функція закритття header__top по іконці хрестик
function headerSignUp() {
	const headerTopUser = document.querySelector('.top-header__exit');
	const headerTopExit = document.querySelector('.top-header__wrapper');
	const headerMenu = document.querySelector('.main-header__wrapper');
	
	headerTopUser.addEventListener('click', function (e) {
			headerTopExit.style.display = 'none';
			headerMenu.style.top = "0rem"
	});
}
headerSignUp();

// Touch Screen?
const isTouchScreen = window.matchMedia("(any-hover:none)").matches

window.addEventListener("load",() =>{
	document.documentElement.classList.add('loaded');
})


window.addEventListener('load', windowLoaded)

function windowLoaded() {



	 //==============

	



	 //футер

	const maxWidth = +document.querySelector('.menu-footer').dataset.spollersInit || 600
	const menuFooter = document.querySelector('.menu-footer')

		 //=відкриття кошику по кліку на іконку кошика
	let keypressActions = (e) => {
		if (e.key === "Escape") {
			document.documentElement.classList.remove('catalog-open')
			// ....
		}
	}

	//=відкриття під меню кліком на іконку (пташки)
	let documentActions = (e) => {
		const targetElement = e.target
		const typeEvent = e.type
		const targetTag = targetElement.tagName

		if (targetElement.closest('.list-header')) {
			if (targetTag !== "A") {
				const contactsHeader = targetElement.closest('.list-header')
				contactsHeader.classList.toggle('--active')
			}
		} else {
			document.querySelector('.list-header').classList.remove('--active')
		}

		//=відкриття бургеру
		if (targetElement.closest('.icon-menu')) {
			document.documentElement.classList.toggle('menu-open')
		}

		//=відкриття футеру (акардеон)
		if (targetElement.closest('.menu-footer__title')) {
			if (window.innerWidth <= maxWidth) {
				if (!menuFooter.querySelectorAll('._slide').length) {
					const footerActiveSpoller = document.querySelector('.menu-footer__item[open]')
					const footerSpollerTitle = targetElement.closest('.menu-footer__title')
					if (footerActiveSpoller && footerActiveSpoller !== targetElement.closest('.menu-footer__item')) {
						spollersAnim(footerActiveSpoller.querySelector('.menu-footer__title'), false)
					}
					spollersAnim(footerSpollerTitle)
				}
			}
			e.preventDefault()
		}
	
	// Відкриття пошуку по кліку на іконку
		document.addEventListener('click', (event) => {
			const targetElement = event.target;
			if (targetElement.closest('.search-main-header__open')) {
					document.documentElement.classList.toggle('search-open');
			} else if (!targetElement.closest('.search-main-header')) {
					document.documentElement.classList.remove('search-open');
			}
	
			// Відкриття кошика по кліку на іконку
			if (targetElement.closest('.action-main__link._icon-teleshka')) {
					document.documentElement.classList.toggle('cart-open');
			}
	

			// Закриття кошика по кліку на кнопку закриття
			if (targetElement.closest('.cart-main__close')) {
					document.documentElement.classList.remove('cart-open');
			}
	});
	
		// функціонал додавання і мінусування товару
	if (targetElement.closest('.quantity__button._icon-inus')) {
		const currentInput = targetElement.closest('.quantity__button._icon-inus').nextElementSibling
		currentInput.value = currentInput.value - 1 > 0 ? currentInput.value - 1 : 1
		e.preventDefault()
	} else if (targetElement.closest('.quantity__button._icon-plus')) {
		const currentInput = targetElement.closest('.quantity__button._icon-plus').previousElementSibling
		currentInput.value = ++currentInput.value
		e.preventDefault()
	}

	
	// функція показу решти контейнеру
		if (targetElement.closest('[data-show-more-button]')) {
			const showMore = targetElement.closest('[data-show-more]')
			const showMoreText = showMore.querySelector('[data-show-more-text]')
			showMore.classList.toggle('hide')
			const showMoreHeight = +showMore.dataset.showMore || 280
			showMoreText.style.height = showMore.classList.contains('hide') ? `${showMoreHeight}px` : ``
		}


	}

		// Відкриття акардеону футера
	let spollersInit = (footerSpollers, isOpen) => {
		footerSpollers.forEach(footerSpoller => {
			const footerSpollerTitle = footerSpoller.querySelector('.menu-footer__title')
			footerSpoller.classList.toggle('_init', !isOpen)
			isOpen ? footerSpollerTitle.setAttribute("tabindex", "-1") : footerSpollerTitle.removeAttribute("tabindex")
			footerSpoller.open = isOpen
		})
	}
	document.addEventListener("click", documentActions)
	document.addEventListener("keydown", keypressActions)

	let spollersAnim = (footerSpollerTitle, action) => {
		const footerSpoller = footerSpollerTitle.closest('.menu-footer__item')
		const footerSpollerBody = footerSpollerTitle.nextElementSibling

		let spollersAnimClose = () => {
			if (!footerSpollerTitle.classList.contains('_slide')) {
				footerSpollerTitle.classList.add('_slide')
				const footerSpollerBodyHeight = footerSpollerBody.offsetHeight
				footerSpollerBody.style.height = `${footerSpollerBodyHeight}px`
				footerSpollerBody.style.overflow = "hidden"
				footerSpollerBody.style.transitionDuration = "0.8s"
				footerSpollerBody.style.paddingTop = "0"
				footerSpollerBody.style.paddingBottom = "0"
				footerSpollerBody.style.paddingLeft = "0"
				footerSpollerBody.style.paddingRight = "0"
				footerSpollerBody.offsetHeight
				footerSpollerBody.style.height = `0px`
				setTimeout(() => {
					footerSpoller.open = false
					footerSpollerBody.style.removeProperty('height')
					footerSpollerBody.style.removeProperty('overflow')
					footerSpollerBody.style.removeProperty('transition-duration')

					footerSpollerBody.style.removeProperty('padding-top')
					footerSpollerBody.style.removeProperty('padding-bottom')
					footerSpollerBody.style.removeProperty('padding-left')
					footerSpollerBody.style.removeProperty('padding-right')

					footerSpollerTitle.classList.remove('_slide')
				}, 800)
			}
		}
		let spollersAnimOpen = () => {
			if (!footerSpollerTitle.classList.contains('_slide')) {
				footerSpollerTitle.classList.add('_slide')
				footerSpoller.open = true
				const footerSpollerBodyHeight = footerSpollerBody.offsetHeight
				footerSpollerBody.style.height = "0px"
				footerSpollerBody.style.overflow = "hidden"
				footerSpollerBody.style.paddingTop = 0
				footerSpollerBody.style.paddingBottom = 0
				footerSpollerBody.style.paddingLeft = 0
				footerSpollerBody.style.paddingRight = 0
				footerSpollerBody.style.transitionDuration = "0.8s"
				footerSpollerBody.offsetHeight
				footerSpollerBody.style.height = `${footerSpollerBodyHeight}px`

				footerSpollerBody.style.removeProperty('padding-top')
				footerSpollerBody.style.removeProperty('padding-bottom')
				footerSpollerBody.style.removeProperty('padding-left')
				footerSpollerBody.style.removeProperty('padding-right')

				setTimeout(() => {
					footerSpollerBody.style.removeProperty('height')
					footerSpollerBody.style.removeProperty('overflow')
					footerSpollerBody.style.removeProperty('transition-duration')


					footerSpollerTitle.classList.remove('_slide')
				}, 800)
			}
		}

		if (action !== undefined) {
			action ? spollersAnimOpen() : spollersAnimClose()
		}
		footerSpoller.open ? spollersAnimClose() : spollersAnimOpen()

	}

	// Footer Spollers
	const footerSpollers = document.querySelectorAll('.menu-footer__item')
	if (footerSpollers.length) {
		const matchMedia = window.matchMedia(`(max-width: ${maxWidth / 16}em)`)
		spollersInit(footerSpollers, !matchMedia.matches)
		matchMedia.addEventListener('change', () => {
			spollersInit(footerSpollers, !matchMedia.matches)
		})
	}

// Ініціалізація "показати більше"
const showMoreItems = document.querySelectorAll('[data-show-more]');
if (showMoreItems.length) {
    showMoreItems.forEach(showMoreItem => {
        const showMoreHeight = +showMoreItem.dataset.showMore || 380;
        const showMoreText = showMoreItem.querySelector('[data-show-more-text]');
        if (showMoreText && showMoreText.offsetHeight > showMoreHeight) {
            showMoreItem.classList.add('active');
            showMoreItem.classList.add('hide');
            showMoreText.style.height = `${showMoreHeight}px`;
        }
    });
}



			
// arrivals Slider
const swiperАrrivals = new Swiper('.arrivals__slider', {
	// Optional parameters
	// loop: true,
	slidesPerView: "auto",
	spaceBetween: 30,
	// freeMode: true,
	scrollbar: {
		el: ".arrivals__scroll",
		dragClass: "arrivals__drag-scroll",
		hide: false,
		dragSize: 50,
		draggable: true
	},
	// Navigation arrows
	/*
	navigation: {
		nextEl: '.block-header__arrow--sale-right',
		prevEl: '.block-header__arrow--sale-left',
	},
	*/
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1.2,
			spaceBetween: 15
		},
		460: {
			slidesPerView: 1.5,
			spaceBetween: 30
		},
		560: {
			slidesPerView: 2.2,
			spaceBetween: 30
		},
		950: {
			slidesPerView: 3.2,
			spaceBetween: 20
		},
		1050: {
			slidesPerView: "4",
			spaceBetween: 30,
		}
	}
});
	// NewcustumersSlider
	const swiperNewArticles = new Swiper('.custumers__slider', {
		// Optional parameters
		loop: true,
		slidesPerView: 3,
		spaceBetween: 30,
		// Navigation arrows
		navigation: {
			nextEl: '.block-header__arrow--custumers-right',
			prevEl: '.block-header__arrow--custumers-left',
		},
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.1,
				spaceBetween: 10
			},
			// when window width is >= 480px
			650: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 640px
			992: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		}
	});


	
// Product Sliders
const swiperProductPreviews = new Swiper('.previews-slider-product', {

	// Optional parameters
	// loop: true,
	freeMode: true,
	watchSlidesProgress: true,
	slidesPerView: 3,
	spaceBetween: 30
});
const swiperProductMain = new Swiper('.main-slider-product', {
	// Optional parameters
	// loop: true,
	thumbs: {
		swiper: swiperProductPreviews,
	},
	// Navigation arrows
	navigation: {
		nextEl: '.main-slider-product__arrow--next',
		prevEl: '.main-slider-product__arrow--prev',
	}
});
	

}


