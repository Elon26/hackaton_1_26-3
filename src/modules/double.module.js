import { Module } from '../core/module';
import { createArea, closeGame, createCover, congratulation, blockContext } from "../utils";

// by Евгений Сологуб

export class DoubleGame extends Module {

	trigger() {
		blockContext();

		let gameSwitch = true;
		let savedCardNumber = 0;
		let savedCard = '';
		let doubleCounter = 0;

		const outer = createArea();
		document.body.append(outer);

		outer.addEventListener('click', event => {
			if (event.target.closest('.doublegame-closeButton')) {
				closeGame();
			}

			if (gameSwitch) {
				savedCardNumber = 0;
				savedCard = '';
			}

			if (event.target.closest('.doublegame-item') && !event.target.closest('.open')) {
				const card = event.target.closest('.doublegame-item');
				const cardNumber = card.dataset.number;
				card.classList.add('open');

				if (cardNumber === savedCardNumber) {
					doubleCounter++
				}

				if (savedCardNumber && cardNumber !== savedCardNumber) {
					const cover = createCover();
					document.body.append(cover);
					setTimeout(() => {
						card.classList.remove('open');
						savedCard.classList.remove('open');
						cover.remove();
					}, 1500);
				} else {
					savedCard = card;
					savedCardNumber = cardNumber;
				}

				gameSwitch = !gameSwitch;

				if (doubleCounter === 8) {
					setTimeout(() => {
						congratulation(outer);
					}, 3000)
				}
			}
		})
	}
}
