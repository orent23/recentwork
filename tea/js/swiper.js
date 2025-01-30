"use strict"

//======================================unique__slider

const swiperSale = new Swiper('.unique__slider', {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 24,
  speed: 1000, // Швидкість переходу між слайдами в мілісекундах
  autoplay: {
    delay: 3000, // Затримка між автоматичними прокрутками в мілісекундах
    disableOnInteraction: false, // Продовження автопрокрутки після взаємодії
  },
  loopAdditionalSlides: 1, // Додаткові слайди для коректного циклу
  navigation: {
    nextEl: '.block-header__arrow--unique-right',
    prevEl: '.block-header__arrow--unique-left',
  },
  breakpoints: {
		320: {
      slidesPerView: 1.1,
      spaceBetween: 20
    },
    470: {
      slidesPerView: 1.6,
      spaceBetween: 20
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  },
});
//==================================================================third
const swiperThird = new Swiper('.third-photos__slider', {
	// Optional parameters
	loop: true,
	slidesPerView: 10,
	spaceBetween: 0,
	// Navigation arrows
	// navigation: {
	// 	nextEl: '.block-header__arrow--unique-right',
	// 	prevEl: '.block-header__arrow--unique-left',
	// },
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 2,
			spaceBetween: 10
		},
		// when window width is >= 480px
		470: {
			slidesPerView: 3,
			spaceBetween: 20
		},
		// when window width is >= 640px
		800: {
			slidesPerView: 4,
			spaceBetween: 10
		},
		1000: {
			slidesPerView: 6,
			spaceBetween: 10
		},
	}
});