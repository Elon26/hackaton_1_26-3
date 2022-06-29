import {Module} from '../core/module'
import { blockContext, unblockContext } from '../utils';

// by Вадим Юнусов

export class Clicks extends Module {

    trigger() {
        blockContext();

        const viewTimer = document.createElement('div');
        viewTimer.classList.add('timer', 'non-selectable');

        const messageTimer = document.createElement('h1');
        const timerInHtml = document.createElement('p');
        timerInHtml.style.fontSize = '40px';

        const clicksBlock = document.createElement('div');
        clicksBlock.classList.add('info-window', 'clicks-block', 'non-selectable');

        viewTimer.append(messageTimer);
        viewTimer.append(timerInHtml);
        document.body.append(viewTimer, clicksBlock);

        let timer;
        let startTimerCounter = 3;
        let count = 0;

        countdown();

        function clickCounter() {
            clicksBlock.style.fontSize = '80px';
            clicksBlock.textContent = count += 1;
        }

        function countdown() {
            timerInHtml.innerHTML = startTimerCounter;
            startTimerCounter -= 1;
            if (startTimerCounter < 0) {
                clearTimeout(timer);
                messageTimer.textContent = 'Жми на мышь!';
                timerInHtml.textContent = '';

                document.body.addEventListener('click', clickCounter);

                setTimeout(() => {
                    document.body.removeEventListener('click', clickCounter);
                    messageTimer.textContent = '';
                    clicksBlock.style.fontSize = '18px';
                    clicksBlock.textContent = `Вы кликнули ${count} раз`;
                }, 3000);
            } else {
                messageTimer.textContent = 'Приготовьтесь кликать!';
                timer = setTimeout(countdown, 1000);
            }
        }


        setTimeout(() => {
			clicksBlock.remove();
            viewTimer.remove();
            unblockContext();
		}, 8000);
    }
}