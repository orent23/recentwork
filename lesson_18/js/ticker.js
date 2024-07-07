// function startMarquee() {
//   const marqueeContainer = document.getElementById("marquee-container");
//   const marqueeTexts = document.querySelectorAll(".about-section__item");
//   const containerWidth = marqueeContainer.offsetWidth;

//   // Створюємо копію текстів для безперервного руху
//   marqueeTexts.forEach((text) => {
//     const clone = text.cloneNode(true);
//     marqueeContainer.appendChild(clone);
//   });

//   function animate() {
//     let startPosition = marqueeContainer.scrollLeft;

//     function step() {
//       startPosition += 2; // Швидкість руху тексту
//       if (startPosition >= marqueeContainer.scrollWidth / 2) {
//         startPosition = 0; // Повернення на початок
//       }
//       marqueeContainer.scrollLeft = startPosition;
//       requestAnimationFrame(step);
//     }

//     step();
//   }

//   animate();
// }

// window.onload = startMarquee;

// window.onload = () => {
//   const marqueeContent = document.getElementById("marquee-content");
//   const marqueeContainer = document.getElementById("marquee-container");
//   const clone = marqueeContainer.cloneNode(true);
//   clone.id = "marquee-container-clone";
//   marqueeContent.appendChild(clone);
// };

// Біжучий рядок (код від ментора)
function debounce(delay, fn) {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}
// Подія зміни розмірів вьюпорта
const onWindowResize = (cb) => {
  if (!cb && !isFunction(cb)) return;

  const handleResize = () => {
    cb();
  };

  window.addEventListener("resize", debounce(15, handleResize));

  handleResize();
};

function marquee() {
  /*
		Інструкція:
		Структура: Можна вказувати будь які класи та теги елементам.
		<div data-marquee>
			<span>element one</span>
			<div>element two</div>
		</div>
		Додаткові налаштування (Можна не вказувати):
		data-marquee-space='30' - Відступ між елементами (За замовчанням 30px)
		data-marquee-speed='1000' - Швидкість анімації (За замовчанням 1000) Вказувати в ms 1s = 1000
		data-marquee-pause-mouse-enter - Зупиняти анімацію при наведенні миші.
		data-marquee-direction='left' - Направлення анімації "top, right, bottom, left" (За замовчанням left)
		!Важливо: При використанні data-marquee-direction 'top' або 'bottom' має бути фіксована висота + overflow: hidden;
	*/

  const $marqueeArray = document.querySelectorAll("[data-marquee]");
  const CLASS_NAMES = {
    wrapper: "marquee-wrapper",
    inner: "marquee-inner",
    item: "marquee-item",
  };

  if (!$marqueeArray.length) return;

  const { head } = document;

  const buildMarquee = (marqueeNode) => {
    if (!marqueeNode) return;

    const $marquee = marqueeNode;
    const $childElements = $marquee.children;

    if (!$childElements.length) return;
    $marquee.classList.add(CLASS_NAMES.wrapper);
    Array.from($childElements).forEach(($childItem) =>
      $childItem.classList.add(CLASS_NAMES.item)
    );

    const htmlStructure = `<div class="${CLASS_NAMES.inner}">${$marquee.innerHTML}</div>`;
    $marquee.innerHTML = htmlStructure;
  };

  const getElSize = ($el, isVertical) => {
    if (isVertical) return $el.getBoundingClientRect().height;
    return $el.getBoundingClientRect().width;
  };

  $marqueeArray.forEach(($wrapper) => {
    if (!$wrapper) return;

    buildMarquee($wrapper);

    const $marqueeInner = $wrapper.firstElementChild;
    let cacheArray = [];

    if (!$marqueeInner) return;

    const spaceBetween =
      parseFloat($wrapper.getAttribute("data-marquee-space")) || 30;
    const speed =
      parseFloat($wrapper.getAttribute("data-marquee-speed")) / 10 || 100;
    const isMousePaused = $wrapper.hasAttribute(
      "data-marquee-pause-mouse-enter"
    );
    const direction = $wrapper.getAttribute("data-marquee-direction");
    const isVertical = direction === "bottom" || direction === "top";
    const animName = `marqueeAnimation-${Math.floor(Math.random() * 10000000)}`;

    let sumSize = 0;
    let index = 0;

    const initEvents = () => {
      $marqueeInner.addEventListener("animationiteration", onAnimationEnd);

      if (!isMousePaused) return;
      $marqueeInner.addEventListener("mouseenter", onChangePaused);
      $marqueeInner.addEventListener("mouseleave", onChangePaused);
    };

    const setBaseStyles = (maxSizeEl) => {
      let baseStyle = "display: flex; flex-wrap: nowrap;";

      if (isVertical) {
        baseStyle += `
		  	flex-direction: column;
			position: relative;
			top: -${$marqueeInner.scrollHeight / 2}px`;
      } else if (direction === "right") {
        baseStyle += `
		  	position: relative;
			left: -${maxSizeEl}px;`;
      }

      $marqueeInner.style.cssText = baseStyle;
    };

    const setdirectionAnim = (totalWidth) => {
      switch (direction) {
        case "right":
        case "bottom":
          return totalWidth;
        default:
          return -totalWidth;
      }
    };

    const changeFirstToLast = () => {
      switch (direction) {
        case "right":
        case "bottom":
          $marqueeInner.insertBefore(
            $marqueeInner.lastElementChild,
            $marqueeInner.firstElementChild
          );
          return;
        default:
          $marqueeInner.appendChild($marqueeInner.firstElementChild);
      }
    };

    const animation = (repeat) => {
      if (repeat) changeFirstToLast();

      let $elSize = 0;

      switch (direction) {
        case "right":
        case "bottom":
          $elSize = getElSize($marqueeInner.lastElementChild, isVertical);
          break;
        default:
          $elSize = getElSize($marqueeInner.firstElementChild, isVertical);
      }

      const totalSize = $elSize + spaceBetween;
      const $style = document.createElement("style");
      const keyFrameCss = `@keyframes ${animName} {
					100% {
						transform: translate${isVertical ? "Y" : "X"}(${setdirectionAnim(totalSize)}px);
					}
				}`;

      $style.classList.add(animName);

      $style.innerHTML = keyFrameCss;
      head.append($style);

      $marqueeInner.style.animation = `${animName} ${
        totalSize / speed
      }s infinite linear`;
    };

    const addDublicateElements = () => {
      const $parentNodeWidth = getElSize($wrapper, isVertical);

      let $childrenEl = Array.from($marqueeInner.children);

      if (!$childrenEl.length) return;

      if (!cacheArray.length) {
        cacheArray = $childrenEl.map(($item) => $item);
      } else {
        $childrenEl = [...cacheArray];
      }

      const ArraySizeElements = $childrenEl.map(($item) => {
        if (isVertical) {
          $item.style.marginBottom = `${spaceBetween}px`;
        } else {
          $item.style.marginRight = `${spaceBetween}px`;
          $item.style.flexShrink = 0;
        }

        return getElSize($item, isVertical);
      });
      const maxSizeEl = Math.max(...ArraySizeElements) + spaceBetween;

      for (; sumSize < $parentNodeWidth; index += 1) {
        if (!$childrenEl[index]) index = 0;

        const $cloneNone = $childrenEl[index].cloneNode(true);
        const $lastElement =
          $marqueeInner.children[$marqueeInner.children.length - 1];

        $marqueeInner.append($cloneNone);

        sumSize += getElSize($lastElement, isVertical) + spaceBetween;
      }

      setBaseStyles(maxSizeEl);
    };

    const onAnimationEnd = (e) => {
      const { animationName } = e;

      head.querySelector(`.${animationName}`)?.remove();
      animation("repeat");
    };

    const init = () => {
      addDublicateElements();
      animation();
      initEvents();
    };

    const onResize = () => {
      head.querySelector(`.${animName}`)?.remove();
      init();
    };

    const onChangePaused = (e) => {
      const { type } = e;

      e.target.style.animationPlayState =
        type === "mouseenter" ? "paused" : "running";
    };

    onWindowResize(onResize);
  });
}
