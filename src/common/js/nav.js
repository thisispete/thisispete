import ContentInitializer from './contentinitializer.js';
import { MinPhoneWidth } from './thisispete.js';

export default class Nav {

  constructor() {
    this._initialLoad = true;
    this._historySupport = !!(window.history && window.history.pushState);
    if (this._historySupport) {
      this._initHistoryNav();
      this._updateNav();
      window.addEventListener('popstate', (e) => {
        this._update(location.pathname);
        this._hide(1);
        this._updateNav();
        window.scroll(0);
      });
    } else {
      this._updateNav();
    }
    ContentInitializer.init($('#content div').first());
    this._initialLoad = false;
  }

  _initHistoryNav() {
    const t = this;
    $('nav').on('click', 'li a', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const id = $(e.target).parent().attr('id');
      // l212
      const l = window.location.pathname.split('/');
      // [work, design]
      const loc = l[l.length - 2];
      //'work/'
      const up = l.join('/').substring(0, window.location.pathname.lastIndexOf(loc));
      //'/work/'
      var link = $(e.target).attr('href');
      // 'design/work/'
      const haschildren = $(this).parent().data('sub') > 0;
      const ancestor = window.location.pathname.lastIndexOf(link) > -1 && window.location.pathname !== link;

      if (ancestor) {// if opened deeper than current click in the same path, close down to this one
        link = link.substring(0, link.lastIndexOf('/'));
        link = link.substring(0, link.lastIndexOf('/') + 1);

        t._hide(id.substr(1, 1));
        //hide the expanded section
        $('nav li').removeClass('selected');

      } else if ($(this).attr('id') === loc) {// clicking a link for the current location
        if (haschildren) {// do nothing if its an end of the line link
          t._hide(id.substr(1, 1));
          //hide the expanded section
          $('nav li').removeClass('selected');
        }
        link = up;
      } else {// hide any sections at the same level as the new one,  and expand the new one
        t._hide(id.substr(1, 1));
        t._show(id);

        $('nav li').removeClass('selected');
        $(`nav #${id}`).addClass('selected');
      }
      history.pushState(null, null, link);
      _gaq.push(['trackPageview', link]);

      this._update(link);
      if($(window).width() < MinPhoneWidth){
        if(haschildren || $(this).attr('id') === loc ){
          this._collapse();
        }else{
          this._expand();
        }
      }
    });
  };

  _updateNav() {
    //dive into current address location.
    const l = window.location.pathname.split('/');
    // [work, design]
    const loc = l[l.length - 2];
    let id = '';
    const t = this;
    $.each(l, function(i, e) {
      if (e !== '') {
        id = $(`nav #${e}`).parent().attr('id');
        t._show(id);
      }
    });
    $('nav li').removeClass('selected');
    if (id !== '') {
      $(`nav #${id}`).addClass('selected');
    }
    let haschildren = id && $('#' + id).data("sub") > 0;
    if(this._initialLoad && !haschildren && $(window).width() < MinPhoneWidth){
      this._expand();
    }
  };

  _hide(level) {
    let i = 4;
    while (i > level) {
      $(`nav .l${i}`).css('height', '0').fadeOut(150);
      i--;
    }
  };

  _show(id) {
    let n = 200;
    $.each($(`nav [data-parent='${id}']`), (i, e) => {
      n = this._historySupport ? n + 20 : 0;
      var newHeight = $(e).find('a:first-child').css('line-height');
      $(e).delay(n).css('height', newHeight).fadeIn(300);
    });
  };

  _update(href) {
    href = href === '/' ? '' : href;
    $('#content').before('<div class="content-container"></div>');
    const newcontent = $('#content').prev();
    newcontent.hide();
    newcontent.next().attr('id', 'old');
    newcontent.attr('id', 'content');
    newcontent.load(href + 'index.html #content > *', e => {
      newcontent.delay(150).fadeIn(600);
      newcontent.next().fadeOut(150, () => {
        newcontent.next().remove();
        ContentInitializer.init($('#content div').first());
      });
    });
  };

  _expand() {
    $('body').toggleClass('contentInView', true);
    let scrollTimer = setTimeout(() =>{
      $('html, body').animate({scrollTop:$('#content').position().top},'50');
    }, 500);
  };

  _collapse() {
    $('body').toggleClass('contentInView', false);
    let scrollTimer = setTimeout(() =>{
      $('html, body').animate({scrollTop:0},'50');
    }, 500);
  };
}
