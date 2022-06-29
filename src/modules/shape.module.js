import { Module } from '../core/module';
import { random } from '../utils';

// by Дмитрий Капран

export class Shape extends Module {

  trigger() {
    const shapeHTML = document.createElement('div');

    shapeHTML.style.position = 'absolute';
    shapeHTML.style.zIndex = '-1';
    shapeHTML.style.width = `${random(5, 30)}%`;
    shapeHTML.style.height = `${random(5, 30)}%`;

    shapeHTML.style.background = `rgb(${[0, 0, 0].map(c => String(random(0, 254))).join(',')})`;

    const borderRad = [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius'
    ];

    borderRad.forEach(br => shapeHTML.style[br] = `${random(0, 200)}%`);

    shapeHTML.style.top = `${random(0, 70)}%`;
    shapeHTML.style.left = `${random(0, 70)}%`;

    document.body.append(shapeHTML);

    let shapeOpacity = 1;
    const disappearance = setInterval(() => {
      shapeOpacity -= 0.01;
      shapeHTML.style.opacity = `${shapeOpacity}`;
      if (shapeOpacity < 0) {
        clearInterval(disappearance);
        shapeHTML.remove();
      }
    }, 100);
  }
}