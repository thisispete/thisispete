import Paginator from '../paginator.js'
import { MinPhoneWidth } from '../thisispete.js';

export default class ComboGallery {

  constructor(target) {
    this._stack = target.find('.img-stack').first();
    this._list = this._stack.find('li');
    this._last = 1;
    if($(window).width() >= MinPhoneWidth){
      this._paginator = new Paginator(target, this._list, this._update.bind(this), true);
      $(this._list[0]).delay(1).fadeIn(200);
      this._stack.find('li:gt(0)').hide();
    }else{
      this._paginator = new Paginator(target, this._list, this._pauseLastVideo.bind(this), false, true);
    }
    $(window).resize(this._resize);
    this._resize();
  }

  _resize() {
    this._stack.css('height', $('.fixedRatioWrapper').css('padding-top') === '0px' ? 'auto' : $('.fixedRatioWrapper').css('padding-top'));
  };

  _pauseLastVideo(count) {
    const lastItem = this._list[this._last - 1];
    //pause last video
    if($(lastItem).data('disp') == 'vid'){
      const iframe = $(lastItem).find('iframe').first();
      const player = new Vimeo.Player(iframe);
      player.pause();
    }
    this._last = count;
  }

  _update(count) {
    const t = this;
    const lastItem = this._list[this._last - 1];

    this._pauseLastVideo(count);
    $(lastItem).fadeOut(200, () => {
      t._list.hide();
      $(t._list[count - 1]).fadeIn(200);
      t._resize();
    });
    this._last = count;
  };

}