import Paginator from '../paginator.js';
import { MinPhoneWidth } from '../thisispete.js';

export default class FlashGallery {

  constructor(target) {
    this._target = target;
    this._list = target.find('.swf-stack:first-child li');
    if($(window).width() >= MinPhoneWidth){
      this._paginator = new Paginator(target, this._list, this._update.bind(this), true);
      this._update(1);
    }else{
      this._paginator = new Paginator(target, this._list, null, false, true);
    }
  }

  _update(count) {
    let embed = $(this._list[count - 1]).find('.flash-container');
    if (swfobject.hasFlashPlayerVersion('9.0.0')) {
      swfobject.embedSWF(embed.data('src'), embed.attr('id'), embed.data('width'), embed.data('height'), '9.0.0', './js/libs/expressInstall.swf', {}, {
        wmode : 'opaque'
      });
    }
    this._target.find('.swf-stack:first-child li').hide();
    $(this._list[count - 1]).show();
  }
}
