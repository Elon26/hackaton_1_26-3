import { Module } from '../core/module'
import { blockContext, random, unblockContext } from '../utils'

// by Вадим Юнусов

export class Coin extends Module {

	trigger() {
		blockContext();

		const coinContainer = document.createElement('div');
		coinContainer.className = 'coin-container';
		const coinText = document.createElement('div');
		coinText.className = 'coin-text';

		const gifCoin = document.createElement('img');
		gifCoin.src = 'https://i.yapx.ru/SkcyR.gif';
		gifCoin.className = 'gif-coin'

		coinContainer.append(gifCoin);
		document.body.append(coinContainer);

		setTimeout(() => {
			coinContainer.firstChild.remove();
			coinContainer.append(coinText);
			let count = random(0, 1);
			if (count === 0) {
				coinText.textContent = 'Орёл';
			} else {
				coinText.textContent = 'Решка';
			}
		}, 3300);

		setTimeout(() => {
			unblockContext();
			coinContainer.remove();
		}, 5000);

	}
}