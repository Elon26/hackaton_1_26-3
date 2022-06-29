import { Module } from "../core/module";
import { blockContext, getRandomSound, unblockContext } from "../utils";
import speakerImg from '../assets/sounds/speaker.png';

// by Александр Пушкин

export class RandomSound extends Module {

    trigger() {
        blockContext();

        const speakerLeft = document.createElement('img');
        speakerLeft.src = speakerImg;
        speakerLeft.classList.add('speaker', 'speaker-left');

        const speakerRight = document.createElement('img');
        speakerRight.src = speakerImg;
        speakerRight.classList.add('speaker', 'speaker-right');

        document.body.append(speakerLeft, speakerRight);
        setTimeout(() => {
            const sound = new Audio(getRandomSound());
            sound.play();
            speakerLeft.style.left = '0%';
            speakerRight.style.right = '0%';
            sound.onended = () => {
                speakerLeft.style.left = '-100%';
                speakerRight.style.right = '-100%';
                unblockContext();
            }
        })

    }
}