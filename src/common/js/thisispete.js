import SVGLib from './svglib.js';
import Nav from './nav.js';
import Background from './background.js';

export const MinPhoneWidth = 900;

export default class ThisIsPETE {
  constructor(){
    this.nav = new Nav();
    this.bg = new Background();

    SVGLib.getLogo('PETElogo');
  }
}
