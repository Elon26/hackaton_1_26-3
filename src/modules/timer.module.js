import { Module } from '../core/module'
import { blockContext, unblockContext } from '../utils';

// by Вадим Юнусов

export class Timer extends Module {

    trigger() {
        blockContext();
        document.querySelector('.block-timer')?.remove();
        const container = document.createElement('div');
        container.className = 'timer-container';
        const blockTimer = document.createElement('div');
        blockTimer.className = 'block-timer';
        const formTimer = document.createElement('form');
        formTimer.className = 'form';
        const table = document.createElement('table');
        table.className = 'table';

        container.append(formTimer);
        document.body.append(container);
        formTimer.append(table);


        let userValueTimer = [];
        const inputsTimer = [
            {
                id: 'hours',
                text: 'Часы',
                maxValue: 24
            },
            {
                id: 'minutes',
                text: 'Минуты',
                maxValue: 60
            },
            {
                id: 'seconds',
                text: 'Секунды',
                maxValue: 60
            }
        ];

        function createElTimerInHtml(array) {
            const trSubmit = document.createElement('tr');
            const td = document.createElement('td');
            td.className = 'submit-row';

            const startButton = document.createElement('button');
            startButton.classList.add('doublegame-closeButton');
            startButton.setAttribute('type', 'submit');
            startButton.textContent = 'Старт';

            const cancelButton = document.createElement('button');
            cancelButton.classList.add('doublegame-closeButton');
            cancelButton.textContent = 'Отмена';
            cancelButton.addEventListener('click', () => {
                unblockContext();
                container.remove();
            }, {
                once: true
            })

            array.forEach((value) => {
                const tr = document.createElement('tr');
                tr.className = 'row';
                const tdLabel = document.createElement('td');
                const tdInput = document.createElement('td');
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.className = 'input';
                label.setAttribute('for', value.id);
                label.textContent = value.text;
                input.id = value.id;
                input.setAttribute('type', 'number');
                input.setAttribute('min', '0');
                input.setAttribute('max', value.maxValue);

                tdLabel.append(label);
                tdInput.append(input);
                tr.append(tdLabel, tdInput);
                table.append(tr);
            });

            td.append(startButton);
            td.append(cancelButton);
            trSubmit.append(td);
            table.append(trSubmit);
        };

        createElTimerInHtml(inputsTimer);

        formTimer.addEventListener('submit', event => {
            unblockContext();
            event.preventDefault();
            userValueTimer = inputsTimer.map((value) => {
                return Number(event.target[value.id].value);
            })
            document.body.lastChild.remove(formTimer);
            document.body.append(blockTimer);

            const timer = setInterval(() => {
                blockTimer.textContent = `${userValueTimer[0]} : ${userValueTimer[1]} : ${userValueTimer[2]}`;
                userValueTimer[2] -= 1;
                if (userValueTimer[0] === 0 && userValueTimer[1] === 0 && userValueTimer[2] < 0) {
                    document.body.lastChild.remove(blockTimer);
                    const textAfterTimer = document.createElement('div');
                    textAfterTimer.className = 'block-timer';
                    document.body.append(textAfterTimer);
                    clearInterval(timer);
                    textAfterTimer.textContent = 'Пора о чём-то вспомнить!!!';
                    setTimeout(() => {
                        textAfterTimer.remove();
                    }, 3000);
                }
                if (userValueTimer[2] < 0 && userValueTimer[1] > 0) {
                    userValueTimer[1] -= 1;
                    userValueTimer[2] = 59;
                }
                if (userValueTimer[2] < 0 && userValueTimer[1] <= 0 && userValueTimer[0] > 0) {
                    userValueTimer[0] -= 1;
                    userValueTimer[1] = 59;
                    userValueTimer[2] = 59;
                }
            }, 1000);
        });

    }
}