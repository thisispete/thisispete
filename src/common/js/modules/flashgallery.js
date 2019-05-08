import Paginator from '../paginator.js';

export default class FlashGallery {

  constructor(target) {
    this._target = target;
    this._stack = target.find('.swf-stack:first-child li');
    this._paginator = new Paginator(target, this._stack, this._update.bind(this));
    this._update(1);
  }

  _update(count) {
    let embed = $(this._stack[count - 1]).find('.flash-container');
    if (swfobject.hasFlashPlayerVersion('9.0.0')) {
      swfobject.embedSWF(embed.data('src'), embed.attr('id'), embed.data('width'), embed.data('height'), '9.0.0', './js/libs/expressInstall.swf', {}, {
        wmode : 'opaque'
      });
    }
    this._target.find('.swf-stack:first-child li').hide();
    $(this._stack[count - 1]).show();
  }
}
