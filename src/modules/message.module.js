import { Module } from "../core/module";
import { random } from "../utils";

// by Александр Пушкин
 
export class RandomMessage extends Module {

    async trigger() {
        const container = document.querySelector('#message')
            ? document.querySelector('#message')
            : document.createElement('div');
        container.id = 'message';
        container.className = 'message-container';

        document.body.append(container);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${random(1, 100)}`);
            const message = await response.json();
            const messageContainer = document.createElement('span');
            messageContainer.textContent = message.body;
            messageContainer.className = 'info-window';
            messageContainer.style.display = 'block';
            messageContainer.style.marginBottom = '15px';
            container.prepend(messageContainer);

            setTimeout(() => {
                messageContainer.style.opacity = '0';
                setTimeout(() => {
                    messageContainer.remove();
                }, 500);
            }, 2000);
        } catch (e) {
            alert('Что-то сломалось((((');
        }
    }
}