import { Module } from '../core/module';
import { getRandomColor } from '../../src/utils';

// by Ольга Чернецкая

export class Background extends Module {

    trigger() {
        const mainPage = document.querySelector('.main-page');
        mainPage.style.background = getRandomColor(0, 15);;
    }
}
