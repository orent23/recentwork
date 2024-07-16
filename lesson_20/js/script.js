"use strict"



function headerPopap () {
    const shopPopap = document.querySelector('.nav-main-header__item--shop-popap');
    const menuPopap = document.querySelector('.nav-main-header__shop');
   
    shopPopap.addEventListener('click', function (e) {
        menuPopap.classList.toggle('active-header-shop-popap');

    })
    document.addEventListener('click', function (e) {
        if (!menuPopap.contains(e.target) && !shopPopap.contains(e.target)) {
            menuPopap.classList.remove('active-header-shop-popap');
        }
        if (menuPopap.classList.contains('active-header-shop-popap')) {
            shopPopap.style.transform ='inherit'
            console.log('cccccccc');
        } 
    });
};
headerPopap ();



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



function burger() {
    const burgerIcon = document.querySelector('.burger-main-header__wrapper');
    const burgerMenu = document.querySelector('.menu-burger');
    const body = document.body
    burgerIcon.addEventListener('click', function (e) {
        burgerIcon.classList.toggle('burger-menu');
        burgerMenu.classList.toggle('active-menu-burger')
        if (burgerMenu.classList.contains('active-menu-burger')) {
            body.style.cssText =
            'position: fixed;left: 0;top: 0;'
            console.log(body);
        } else {
            body.style.position = 'static'
        }
    });

   
}

burger();

function search() {
    const searchIcon = document.querySelector('.buttons-main-header__icon-search');
    const searchPopap = document.querySelector('.main-header__search');


    searchIcon.addEventListener('click', function (e) {
        searchPopap.classList.toggle('active-main-header-search')
    });

    document.addEventListener('click', function (e) {
        if (!searchIcon.contains(e.target) && !searchPopap.contains(e.target)) {
            searchPopap.classList.remove('active-main-header-search');
        }
    });
}

search();