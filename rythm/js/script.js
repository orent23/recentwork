
// Строгий режим
"use strict"
// Touch Screen?
// Ініціалізація "показати більше"
const showMoreItems = document.querySelectorAll('[data-show-more]');
if (showMoreItems.length) {
    showMoreItems.forEach(showMoreItem => {
        const showMoreHeight = +showMoreItem.dataset.showMore || 380;
        const showMoreText = showMoreItem.querySelector('[data-show-more-text]');
        const showMoreButton = showMoreItem.querySelector('[data-show-more-button]');
        if (showMoreText && showMoreText.offsetHeight > showMoreHeight) {
            showMoreItem.classList.add('active');
            showMoreItem.classList.add('hide');
            showMoreText.style.height = `${showMoreHeight}px`;

            // Додаємо обробник подій для кнопки
            if (showMoreButton) {
                showMoreButton.addEventListener('click', () => {
                    const isHidden = showMoreItem.classList.toggle('hide');
                    showMoreText.style.height = isHidden ? `${showMoreHeight}px` : 'auto';
           
                });
            }
        }
    });
		class ScrollWatcher {
			constructor(options) {
				this.config = Object.assign(
					{
						logging: true,
					},
					options
				);
				this.observer = null;
		
				if (!("IntersectionObserver" in window)) {
					this.log("Ваш браузер не підтримує IntersectionObserver. Спостереження не працюватиме.");
					return;
				}
		
				!document.documentElement.classList.contains("watcher") && this.init();
			}
		
			init() {
				document.documentElement.classList.add("watcher");
				const elements = document.querySelectorAll("[data-watch]");
				this.observeElements(elements);
			}
		
			observeElements(elements) {
				if (elements.length) {
					this.log(`Стежу за об'єктами (${elements.length})...`);
					elements.forEach((element) => this.createObserver(element));
				} else {
					this.log("Немає об'єктів для стеження.");
				}
			}
		
			createObserver(element) {
				const rootMargin = element.dataset.watchMargin || "0px";
		
				if (rootMargin.indexOf("px") === -1 && rootMargin.indexOf("%") === -1) {
					this.log(`Невірний формат data-watch-margin на елементі ${element.classList}`);
					return;
				}
		
				const observerOptions = {
					root: null,
					rootMargin: rootMargin,
					threshold: parseFloat(element.dataset.watchThreshold) || 0.1,
				};
		
				this.observer = new IntersectionObserver((entries, observer) => {
					entries.forEach((entry) => this.handleIntersection(entry, observer));
				}, observerOptions);
		
				this.observer.observe(element);
			}
		
			handleIntersection(entry, observer) {
				const target = entry.target;
				if (entry.isIntersecting) {
					target.classList.add("_watcher-view");
					this.log(`Я бачу ${target.classList}, додав клас _watcher-view`);
				} else {
					target.classList.remove("_watcher-view");
					this.log(`Я не бачу ${target.classList}, прибрав клас _watcher-view`);
				}
		
				if (target.hasAttribute("data-watch-once") && entry.isIntersecting) {
					observer.unobserve(target);
					this.log(`Припинив спостереження за ${target.classList}`);
				}
			}
		
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
		
}


