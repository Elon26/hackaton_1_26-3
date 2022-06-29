import { Menu } from './core/menu';
import { getMenuPosition } from './utils';

export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector);
		document.body.addEventListener('contextmenu', event => {
			event.preventDefault();
			this.open(event);
		});
	};

	open(event) {
		this.el.classList.add('open');
		if (navigator.appVersion.indexOf("Win") != -1) {
			this.el.style.top = event.clientY + 'px';
			this.el.style.left = event.clientX + 'px';
		} else {
			// Вычисление позиции меню без заваливания за экран. Не работает на Windows, работает на Mac
			getMenuPosition(this.el, event);
		}
	};

	close() {
		this.el.classList.remove('open');
	};

	add(newModule) {
		this.el.insertAdjacentHTML(
			"beforeend",
			newModule.toHTML()
		)
		const moduleButton = this.el.querySelector(`[data-type="${newModule.type}"]`);
		moduleButton.addEventListener('click', () => {
			newModule.trigger()
			this.close()
		}
		);
	};
}
