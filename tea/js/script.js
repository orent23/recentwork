"use strict"


//==========анімація картинки (крапельок) при русі мишки
window.onload = function () {
  function initParallax(containerSelector, elements) {
    const parallax = document.querySelector(containerSelector);
    if (parallax) {
      const elementStyles = elements.map(({ selector, factor }) => ({
        element: document.querySelector(selector),
        factor,
      }));

      // Коэффициенты и скорость
      const speed = 0.05;

      // Объявление переменных
      let positionX = 0,
        positionY = 0;
      let coordXprocent = 0,
        coordYprocent = 0;

      function setMouseParallaxStyle() {
        const distX = coordXprocent - positionX;
        const distY = coordYprocent - positionY;

        positionX = positionX + distX * speed;
        positionY = positionY + distY * speed;

        // Применение трансформаций для каждого элемента
        elementStyles.forEach(({ element, factor }) => {
          if (element) {
            element.style.transform = `translate(${positionX / factor}%, ${positionY / factor}%)`;
          }
        });

        requestAnimationFrame(setMouseParallaxStyle);
      }
      setMouseParallaxStyle();

      parallax.addEventListener("mousemove", function (e) {
        // Получение ширины и высоты блока
        const parallaxWidth = parallax.offsetWidth;
        const parallaxHeight = parallax.offsetHeight;

        // Ноль по середине
        const coordX = e.pageX - parallaxWidth / 2;
        const coordY = e.pageY - parallaxHeight / 2;

        // Получаем проценты
        coordXprocent = (coordX / parallaxWidth) * 100;
        coordYprocent = (coordY / parallaxHeight) * 100;
      });
    }
  }

  // Инициализация параллакса для advantages
  initParallax('.advantages', [
    { selector: '.advantages__animation', factor: 20 },
    { selector: '.advantages__image', factor: 0 },
  ]);

  // Инициализация параллакса для best
  initParallax('.best', [
    { selector: '.best__animation img', factor: 70 },
    { selector: '.best__background img', factor: 0 },
  ]);
	 // Инициализация параллакса для best
	 initParallax('.sometimes', [
    { selector: '.sometimes__animation img', factor: 70 },
    { selector: '.sometimes__background img', factor: 0 },
  ]);
	initParallax('.galerry', [
    { selector: '.galerry__animation img', factor: 70 },
    { selector: '.galerry__background img', factor: 0 },
  ]);
};

//=============scroll +додавання бекграуду на шапку сайту
document.addEventListener("scroll", () => {
  const header = document.querySelector(".header"); // знайти елемент .wrapper
  if (window.scrollY > 0) {
    header.classList.add("header-scroll"); // додає клас при скролі вниз
  } else {
    header.classList.remove("header-scroll"); // видаляє клас, якщо повернулись на початок
  }
});


//=================функція відкриття бургеру
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


window.addEventListener("load",() =>{
	document.documentElement.classList.add('loaded');
})

//===watcher-поява елементів при скролі мишки
// Створюємо новий клас для спостереження за елементами
class ScrollWatcher {
  constructor(options) {
    this.config = Object.assign({
      logging: true
    }, options);
    this.observer;
    !document.documentElement.classList.contains("watcher") && this.init();
  }

  // Ініціалізація спостереження
  init() {
    document.documentElement.classList.add("watcher");
    this.observeElements(document.querySelectorAll("[data-watch]"));
  }

  // Спостерігаємо за елементами
  observeElements(elements) {
    if (elements.length) {
      this.log(`Прокинувся, стежу за об'єктами (${elements.length})...`);
      elements.forEach((element) => {
        this.createObserver(element);
      });
    } else {
      this.log("Немає об'єктів для стеження.");
    }
  }

  // Створення спостерігача для кожного елемента
  createObserver(element) {
    const observerOptions = {
      root: null, // Відносно viewport
      rootMargin: element.dataset.watchMargin || "0px",
      threshold: 0.1 // 10% елемента повинно бути видимим
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => this.handleIntersection(entry, observer));
    }, observerOptions);

    this.observer.observe(element);
  }

  // Обробка перетину елементів з viewport
  handleIntersection(entry, observer) {
    const target = entry.target;
    if (entry.isIntersecting) {
      target.classList.add("_watcher-view");
      this.log(`Я бачу ${target.classList}, додав клас _watcher-view`);
    } else {
      target.classList.remove("_watcher-view");
      this.log(`Я не бачу ${target.classList}, прибрав клас _watcher-view`);
    }

    // Якщо елемент має атрибут data-watch-once, припиняємо спостереження після першого перетину
    if (target.hasAttribute("data-watch-once") && entry.isIntersecting) {
      observer.unobserve(target);
    }
  }

  // Логування (за бажанням)
  log(message) {
    if (this.config.logging) {
      console.log(`[Спостерігач]: ${message}`);
    }
  }
}

// Ініціалізація
document.addEventListener("DOMContentLoaded", () => {
  new ScrollWatcher({ logging: true });
});



//=====анімація блоку при скролі 
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".advantages__container"); // Контейнер для класу loaded

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        container.classList.add("loaded"); // Додаємо клас loaded
        observer.unobserve(entry.target); // Зупиняємо спостереження
      }
    });
  }, {
    threshold: 0.1, // Елемент спрацьовує, коли 10% його площі видимі
  });

  // Спостерігаємо за картинкою та контентом
  const targets = document.querySelectorAll(".advantages__picture, .advantages__content");
  targets.forEach((target) => observer.observe(target));
});


function textOpacityScroll() {
  const items = document.querySelectorAll('.text-section');
  if (items.length) {
    items.forEach(item => {
      const itemValue = item.querySelector('.text-section__value');
      const itemMask = item.querySelector('.text-section__mask');
      if (!itemValue || !itemMask) return;

      const itemSpeed = +itemValue.dataset.textSpeed || 500;
      const itemOpacity = +itemValue.dataset.textOpacity || 0.2;

      // Исправляем тег <span> и добавляем HTML для каждой части текста
      itemValue.innerHTML = itemValue.innerText.replace(
        /([A-Za-z0-9'-,.&!?+<>/]+)/g,
        `<span style="transition: opacity ${itemSpeed}ms; opacity: ${itemOpacity};">$1</span>`
      );

      // Обработчик прокрутки
      window.addEventListener("scroll", function () {
        const maskPosition = itemMask.getBoundingClientRect().top - window.innerHeight;
        const itemWay = Math.abs(maskPosition) / (window.innerHeight + itemMask.offsetHeight) * 100;
        const itemWords = itemValue.querySelectorAll('span');
        const currentWord = maskPosition <= 0 ? Math.floor(itemWords.length / 100 * itemWay) : -1;

        addOpacity(itemWords, currentWord);
      });

      // Функция для обновления видимости слов
      function addOpacity(itemWords, currentWord) {
        itemWords.forEach((itemWord, index) => {
          itemWord.style.opacity = index <= currentWord ? "1" : itemOpacity;
        });
      }
    });
  }
}
textOpacityScroll();