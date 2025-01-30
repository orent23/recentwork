"use strict";

const reviewsSwiper = document.querySelector('.swiper-reviews');

if (reviewsSwiper) {
  const swiper = new Swiper('.swiper-reviews', {
    // Опціональні параметри
    autoHeight: true,
    loop: true,
    // Пагінація
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      
      950: {
        slidesPerView: 1.0,
        spaceBetween: 20,
      },
      1050: {
        slidesPerView: 1.1, // Значення має бути числовим, без лапок
        spaceBetween: 30,
      },
    },
  });
}
