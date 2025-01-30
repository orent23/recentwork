"use strict"
//================= darl-light

window.addEventListener("load", windowLoad);

function windowLoad() {
	// HTML
	const htmlBlock = document.documentElement;

	// Отримуємо збережену тему
	const saveUserTheme = localStorage.getItem('user-theme');

	// Робота з системними налаштуваннями
	let userTheme;
	if (window.matchMedia) {
		userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
		!saveUserTheme ? changeTheme() : null;
	});




	// Зміна теми по кліку
	const themeButton = document.querySelector('.page__theme');
	const resetButton = document.querySelector('.page__reset');
	if (themeButton) {
		themeButton.addEventListener("click", function (e) {
			resetButton.classList.add('active');
			changeTheme(true);
		});
	}
	if (resetButton) {
		resetButton.addEventListener("click", function (e) {
			resetButton.classList.remove('active');
			localStorage.setItem('user-theme', '');
		});
	}




	// Функція додавання класу теми
	function setThemeClass() {
		if (saveUserTheme) {
			htmlBlock.classList.add(saveUserTheme)
			resetButton.classList.add('active');
		} else {
			htmlBlock.classList.add(userTheme);
		}
	}
	// Додаємо клас теми
	setThemeClass();

	// Функція зміни теми
	function changeTheme(saveTheme = false) {
		let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
		let newTheme;

		if (currentTheme === 'light') {
			newTheme = 'dark';
		} else if (currentTheme === 'dark') {
			newTheme = 'light';
		}
		htmlBlock.classList.remove(currentTheme);
		htmlBlock.classList.add(newTheme);
		saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
	}


}

//=============scroll +додавання бекграуду на шапку сайту
document.addEventListener("scroll", () => {
  const wrapper = document.querySelector(".main-header__wrapper"); // знайти елемент .wrapper
  if (window.scrollY > 0) {
    wrapper.classList.add("_wrapper-scroll"); // додає клас при скролі вниз
  } else {
    wrapper.classList.remove("_wrapper-scroll"); // видаляє клас, якщо повернулись на початок
  }
});
//=============s
window.addEventListener("load",() =>{
	document.documentElement.classList.add('loaded');
})

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
//====youtube
document.querySelector('.actions__play').addEventListener('click', () => {
  const videoUrl = 'https://www.youtube.com/watch?v=dj7ob63pYGE&t=6s&ab_channel=CodeOnly'; // Replace with your video link
  const videoWindow = window.open(videoUrl, '_blank', 'width=800,height=600');
  
  // Optional: Auto-play the video if the browser allows it
  videoWindow.focus();
});

// ======goto
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

// поява панелі в картці

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
//=============scroll text
// function textOpacityScroll() {
//   const items = document.querySelectorAll('.text-section');
//   if (items.length) {
//     window.addEventListener("scroll", onScroll);

//     items.forEach(item => {
//       const itemValue = item.querySelector('.text-section__value');
//       const itemMask = item.querySelector('.text-section__mask');
//       if (!itemValue || !itemMask) return;

//       const itemSpeed = +itemValue.dataset.textSpeed || 500;
//       const itemOpacity = +itemValue.dataset.textOpacity || 0.2;

//       // Заменяем текст с учетом опций анимации
//       itemValue.innerHTML = itemValue.innerText.replace(/([A-Za-z0-9'-,.&!?+<>/]+)/g,
//         `<span style="transition: opacity ${itemSpeed}ms; opacity: ${itemOpacity};">$1</span>`);

//       function addOpacity(itemWords, currentWord) {
//         itemWords.forEach((itemWord, index) => {
//           itemWord.style.opacity = index <= currentWord ? "1" : itemOpacity;
//         });
//       }

//       function onScroll() {
//         // Получаем текущие слова и позицию маски относительно окна
//         const maskPosition = itemMask.getBoundingClientRect().top - window.innerHeight;
//         const itemWay = Math.abs(maskPosition) / (window.innerHeight + itemMask.offsetHeight) * 100;
//         const itemWords = itemValue.querySelectorAll('span');

//         // Рассчитываем текущий видимый индекс слова
//         const currentWord = maskPosition <= 0 ? Math.floor(itemWords.length / 100 * itemWay) : -1;
        
//         // Обновляем видимость слов
//         addOpacity(itemWords, currentWord);
//       }
      
//       // Первый вызов onScroll для отображения правильного состояния при загрузке страницы
//       onScroll();
//     });
//   }
// }
// textOpacityScroll();
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