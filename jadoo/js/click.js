


// Строгий режим
"use strict"

window.addEventListener('load', windowLoaded)

function windowLoaded() {
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

	}
	document.addEventListener("click", documentActions)
	document.addEventListener("keydown", keypressActions)
}


