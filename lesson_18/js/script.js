//================================
// burger-menu
document.addEventListener("click", function (e) {
  const targetElement = e.target;
  // .icon-menu це клас кнопки при кліку на яку буде спрацьовувати код додаватись до тегу html клас menu-open
  if (targetElement.closest(".icon-menu")) {
    document.documentElement.classList.toggle("menu-open");
    e.preventDefault();
  }
});
//=================================================
const menuSocial = document.querySelector(".menu__social");

// console.log(menuSocial);
const infoContacts = document.querySelector(".consult-holder__info-contacts");

const windowWidth = window.innerWidth;

if (windowWidth <= 998) {
  const cloneMenuSocial = menuSocial.cloneNode(true);
  cloneMenuSocial.removeAttribute("data-da");
  cloneMenuSocial.classList.add("menu__social-contact");
  infoContacts.insertAdjacentElement("beforeend", cloneMenuSocial);
}
