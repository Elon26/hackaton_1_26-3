import { ContextMenu } from "../menu";
import { Background } from "./background.module";
import { Clicks } from "./clicks.module";
import { Coin } from "./coin.module";
import { DoubleGame } from "./double.module";
import { RandomMessage } from "./message.module";
import { Shape } from "./shape.module";
import { RandomSound } from "./sound.module";
import { Stage } from "./stage.module";
import { Timer } from "./timer.module";

// by Евгений Сологуб

export class App {
	#mainpage;

	constructor() {
		this.#mainpage = document.createElement('div');
		this.#mainpage.className = 'main-page';
		document.body.append(this.#mainpage);
		this.#mainpage.innerHTML = 'Насладился фоном?<br> Тогда жамкай на правую кнопку мыши!<br> Там тебя ждут сюрпризы!!!'
		document.body.addEventListener('contextmenu', () => {
			this.#mainpage.textContent = '';
		}, {
			once: true
		})
	}

	start() {
		const contextMenu = new ContextMenu('.menu');
		contextMenu.add(new Clicks('clicks', 'Скоростной клик'));
		contextMenu.add(new RandomSound('sound', 'Случайный звук'));
		contextMenu.add(new Coin('coin', 'Орёл или Решка'));
		contextMenu.add(new Shape('shape', 'Создать фигуру'));
		contextMenu.add(new Stage('stage', 'Время поиграть'));
		contextMenu.add(new Background('background', 'Изменить цвет'));
		contextMenu.add(new RandomMessage('message', 'Вам сообщение'));
		contextMenu.add(new DoubleGame('doublegame', 'Найди пару'));
		contextMenu.add(new Timer('timer', 'Таймер'));
	}
}