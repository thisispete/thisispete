import SVGLib from './svglib.js';

export default class Paginator {

  constructor(target, list, updateCallback, clickEnabled = false, passiveUpdate = false) {
    this.count = 1;
    this.total = list.length;


    this._pagination = target.find('.pagination');
    this._target = target;
    this._list = list;
    this._updateCallback = updateCallback;
    this._clickEnabled = clickEnabled;
    this._currentDisp = this._pagination.find('#current');
    this._totalDisp = this._pagination.find('#total');
    this._totalDisp.html(this.total);

    if(passiveUpdate){
      this._initPassive();
    }else{
      this._init()
    }
  }

  _initPassive(){
    this._pagination.find('.prev').first().hide();
    this._pagination.find('.next').first().hide();
    this._stack = this._target.find('.img-stack').first() || this._target.find('.swf-stack').first();

    const throttle = (method, scope, time) => {
        clearTimeout(method._tId);
        method._tId= setTimeout(() => {
            method.call(scope);
        }, 100);
    }

    const t = this;
    this._stack.on('scroll', e => {
      throttle(() => {
        let lastCount = t.count;
        let p = t._stack.scrollLeft() / t._stack[0].scrollWidth;
        let nextCount = Math.round(p * t.total) + 1;
        if(lastCount != nextCount){
          t.count = nextCount;
          t._currentDisp.html(nextCount);
          t._updateCallback(t.count);
        }
      }, this, 100);
    });

  }

  _init() {
    if (this.total === 1) {
      this._pagination.hide();
    } else {
      this._prev = this._pagination.find('.prev').first();
      this._next = this._pagination.find('.next').first();

      this._prev.html("");
      this._next.html("");
      this._lpath = SVGLib.getArrowL(this._prev[0]);
      this._rpath = SVGLib.getArrowR(this._next[0]);

      const t = this;

      // click
      this._pagination.on('click', '.prev', e => {
        e.preventDefault();
        if (t.count > 1) {
          t.count--;
          t._update();
          t._updateCallback(t.count);
        }
        return false;
      });
      this._pagination.on('click', '.next', e => {
        e.preventDefault();
        if (t.count < t.total) {
          t.count++;
          t._update();
          t._updateCallback(t.count);
        }
        return false;
      });

      if(this._clickEnabled){
        this._list.on('click', e => {
          e.preventDefault();
          if (t.count < t.total) {
            t.count++;
          } else {
            t.count = 1;
          }
          t._update();
          t._updateCallback(t.count);
          return false;
        });
      }

      //hover
      this._pagination.on('mouseenter', '.prev', () => {
        if (!t._prev.hasClass('disabled')) {
          t._lpath.animate({
            "fill" : "#FFF"
          }, 200);
        }
      });
      this._pagination.on('mouseleave', '.prev', () => {
        if (!t._prev.hasClass('disabled')) {
          t._lpath.animate({
            "fill" : "#CCC"
          }, 200);
        }
      });
      this._pagination.on('mouseenter', '.next', () => {
        if (!t._next.hasClass('disabled')) {
          t._rpath.animate({
            "fill" : "#FFF"
          }, 200);
        }
      });
      this._pagination.on('mouseleave', '.next', () => {
        if (!t._next.hasClass('disabled')) {
          t._rpath.animate({
            "fill" : "#CCC"
          }, 200);
        }
      });
      this._update();
    }
  }


  _update() {
    this._currentDisp.html(this.count);
    if (this.count === 1) {
      this._prev.addClass('disabled');
      this._lpath.animate({
        "fill" : "#666"
      }, 200);
    } else {
      this._prev.removeClass('disabled');
      this._lpath.animate({
        "fill" : "#CCC"
      }, 200);
    }
    if (this.count === this.total) {
      this._next.addClass('disabled');
      this._rpath.animate({
        "fill" : "#666"
      }, 200);
    } else {
      this._next.removeClass('disabled');
      this._rpath.animate({
        "fill" : "#CCC"
      }, 200);
    }
  }

}
