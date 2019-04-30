(function($) {})(this.jQuery);

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// -------------------- THISISPETE DOT COM!!! --------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------

var PS = PS || {};
// log("ThisIsPete dot com v3.0");
PS.minPhoneWidth = 900;
PS.initialLoad = true;

PS.nav = function() {
  var historySupport = !!(window.history && window.history.pushState);
  if (historySupport) {
    window.addEventListener("popstate", function(e) {
      _update(location.pathname);
      _hide(1);
      _updateNav();
      window.scroll(0);
    });
  }
  var _init = function() {
    PS.Svglib.getLogo('PETElogo');

    if (historySupport) {
      _initHistoryNav();
      _updateNav();
    } else {
      _updateNav();
    }
  };

  var _initHistoryNav = function() {
    $('nav').on('click', 'li a', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var id = $(this).parent().attr('id');
      // l2_1_2
      var l = window.location.pathname.split('/');
      // [work, design]
      var loc = l[l.length - 2];
      //"work/"
      var up = l.join('/').substring(0, window.location.pathname.lastIndexOf(loc));
      //"/work/"
      var link = $(this).attr('href');
      // "design/work/"
      var haschildren = $(this).parent().data("sub") > 0;
      var ancestor = window.location.pathname.lastIndexOf(link) > -1 && window.location.pathname !== link;

      if (ancestor) {// if opened deeper than current click in the same path, close down to this one
        link = link.substring(0, link.lastIndexOf("/"));
        link = link.substring(0, link.lastIndexOf("/") + 1);

        _hide(id.substr(1, 1));
        //hide the expanded section

        $('nav li').removeClass('selected');

      } else if ($(this).attr("id") === loc) {// clicking a link for the current location
        if (haschildren) {// do nothing if its an end of the line link
          _hide(id.substr(1, 1));
          //hide the expanded section
          $("nav li").removeClass("selected");
        }
        link = up;
      } else {// hide any sections at the same level as the new one,  and expand the new one
        _hide(id.substr(1, 1));
        _show(id);

        $("nav li").removeClass("selected");
        $("nav #" + id).addClass("selected");
      }
      history.pushState(null, null, link);
      _gaq.push(['_trackPageview', link]);

      _update(link);
      if($(window).width() < PS.minPhoneWidth){
        if(haschildren || $(this).attr("id") === loc ){
          _collapse();
        }else{
          _expand();
        }
      }
    });
  };
  var _updateNav = function() {
    //dive into current address location.
    var l = window.location.pathname.split("/");
    // [work, design]
    var loc = l[l.length - 2];
    var id = "";
    $.each(l, function(i, e) {
      if (e !== "") {
        id = $("nav #" + e).parent().attr("id");
        _show(id);
      }
    });
    $("nav li").removeClass("selected");
    if (id !== "") {
      $("nav #" + id).addClass("selected");
    }
    var haschildren = $('#' + id).data("sub") > 0;
    if(PS.initialLoad && !haschildren && $(window).width() < PS.minPhoneWidth){
      _expand();
    }
    console.log(haschildren);
  };
  var _hide = function(level) {
    var i = 4;
    while (i > level) {
      $("nav .l" + i).css("height", "0").fadeOut(150);
      i--;
    }
  };
  var _show = function(id) {
    var n = 200;
    $.each($("nav [data-parent='" + id + "']"), function(i, e) {
      n = historySupport ? n + 20 : 0;
      var newHeight = $(e).find('a:first-child').css('line-height');
      $(e).delay(n).css("height", newHeight).fadeIn(300);
    });
  };

  var _update = function(href) {
    href = href === "/" ? "" : href;
    $("#content").before("<div class='content-container'></div>");
    var newcontent = $("#content").prev();
    newcontent.hide();
    newcontent.next().attr('id', "old");
    newcontent.attr('id', "content");
    newcontent.load(href + "index.html #content > *", function(e) {
      newcontent.delay(150).fadeIn(600);
      newcontent.next().fadeOut(150, function() {
        newcontent.next().remove();
        PS.initContent();
      });
    });
  };

  var _expand = function() {
    $('body').toggleClass('contentInView', true);
    var scrollTimer = setTimeout(function(){
      $('html, body').animate({scrollTop:$('#content').position().top},'50');
    }, 500);
  };

  var _collapse = function() {
    $('body').toggleClass('contentInView', false);
    var scrollTimer = setTimeout(function(){
      $('html, body').animate({scrollTop:0},'50');
    }, 500);
  };

  return {
    init : _init
  };
}();

PS.initContent = function() {
  var target = $('#content div').first();
  switch(target.attr('id')) {
    case 'imageGallery':
      PS.ImageGallery.init(target);
      break;
    case 'videoGallery':
      PS.VideoGallery.init(target);
      break;
    case 'flashGallery':
      PS.FlashGallery.init(target);
      break;
    case 'contactGrid':
      PS.Contact.init(target);
      break;
    case 'imageWithVideo':
      PS.ImageWithVideo.init(target);
      break;
    case 'audioPlayer':
      PS.AudioPlayer.init(target);
      break;
  }
};


PS.Paginator = function() {
  var _target, _stack, _prev, _next, _currentDisp, _totalDisp, _lpath, _rpath, _pagination;
  var _count = 1;
  var _total = 1;

  var _init = function(target, stack, updateCall) {
    _count = 1;
    _target = target;
    _stack = stack;
    _total = _stack.length;
    _pagination = _target.find('.pagination');
    _currentDisp = _pagination.find('#current');
    _totalDisp = _pagination.find('#total');
    _totalDisp.html(_total);

    if (_total === 1) {
      _pagination.hide();
    } else {
      _prev = _pagination.find('.prev').first();
      _next = _pagination.find('.next').first();

      _prev.html("");
      _next.html("");
      _lpath = PS.Svglib.getArrowL(_prev[0]);
      _rpath = PS.Svglib.getArrowR(_next[0]);

      // click
      _pagination.on('click', '.prev', function(e) {
        e.preventDefault();
        if (_count > 1) {
          _count--;
          _update();
          updateCall(_count);
        }
        return false;
      });
      _pagination.on('click', '.next', function(e) {
        e.preventDefault();
        if (_count < _total) {
          _count++;
          _update();
          updateCall(_count);
        }
        return false;
      });

      //hover
      _pagination.on('mouseenter', '.prev', function() {
        if (!_prev.hasClass('disabled')) {
          _lpath.animate({
            "fill" : "#FFF"
          }, 200);
        }
      });
      _pagination.on('mouseleave', '.prev', function() {
        if (!_prev.hasClass('disabled')) {
          _lpath.animate({
            "fill" : "#CCC"
          }, 200);
        }
      });
      _pagination.on('mouseenter', '.next', function() {
        if (!_next.hasClass('disabled')) {
          _rpath.animate({
            "fill" : "#FFF"
          }, 200);
        }
      });
      _pagination.on('mouseleave', '.next', function() {
        if (!_next.hasClass('disabled')) {
          _rpath.animate({
            "fill" : "#CCC"
          }, 200);
        }
      });
      _update();
    }
  };
  var _update = function() {
    _currentDisp.html(_count);
    if (_count === 1) {
      _prev.addClass('disabled');
      _lpath.animate({
        "fill" : "#666"
      }, 200);
    } else {
      _prev.removeClass('disabled');
      _lpath.animate({
        "fill" : "#CCC"
      }, 200);
    }
    if (_count === _total) {
      _next.addClass('disabled');
      _rpath.animate({
        "fill" : "#666"
      }, 200);
    } else {
      _next.removeClass('disabled');
      _rpath.animate({
        "fill" : "#CCC"
      }, 200);
    }
  };
  var _swipeInit = function() {

  };
  var _clickInit = function(updateCall) {
    _stack.on('click', function(e) {
      e.preventDefault();
      if (_count < _total) {
        _count++;
      } else {
        _count = 1;
      }
      _update();
      updateCall(_count);
      return false;
    });
  };
  return {
    init : _init,
    clickInit : _clickInit,
    swipeInit : _swipeInit
  };

}();

PS.ImageGallery = function() {
  var _target, _stack, _list, _last;

  var _init = function(target) {
    _target = target;
    _stack = _target.find('.img-stack').first();
    _list = _stack.find('li');
    PS.Paginator.init(_target, _list, _update);
    PS.Paginator.clickInit(_update);
    _last = 1;
    $(_list[0]).delay(1).fadeIn(200, function() {
      // _stack.css('height', $(this).height());
    });
    _stack.find('li:gt(0)').hide();
    $(window).resize(_resize);
    _resize();
  };
  var _resize = function() {
    _stack.css('height', $('.fixedRatioWrapper').css('padding-top') === '0px' ? 'auto' : $('.fixedRatioWrapper').css('padding-top'));
  };
  var _update = function(count) {
    $(_list[_last - 1]).fadeOut(200, function() {
      _list.hide();
      $(_list[count - 1]).fadeIn(200, function() {
        // _stack.css('height', $(this).height());
      });
      _resize();
    });
    _last = count;
  };

  return {
    init : _init
  };
}();

PS.FlashGallery = function() {
  var _target, _stack;

  var _init = function(target) {
    _target = target;
    _stack = _target.find('.swf-stack:first-child li');
    PS.Paginator.init(_target, _stack, _update);
    _update(1);
  };
  var _update = function(count) {
    var embed = $(_stack[count - 1]).find(".flash-container");
    if (swfobject.hasFlashPlayerVersion("9.0.0")) {
      swfobject.embedSWF(embed.data('src'), embed.attr('id'), embed.data('width'), embed.data('height'), "9.0.0", "./js/libs/expressInstall.swf", {}, {
        wmode : 'opaque'
      });
    }
    _target.find('.swf-stack:first-child li').hide();
    $(_stack[count - 1]).show();
  };

  return {
    init : _init
  };
}();

PS.VideoGallery = function() {
  var _target;

  var _init = function(target) {
    _target = target;
    _target.on('click', 'ol a', function(e) {
      e.preventDefault();
      _target.find('#videoFrame').attr('src', $(this).data('path'));
    });
  };

  return {
    init : _init
  };
}();

PS.Contact = function() {
  var _target;

  var _init = function(target) {
    _target = target;
    $.each(_target.find('.svg-icon'), function(i, e) {
      var paper = new Raphael(e, 60, 60);
      var path = paper.path($(e).data('svg'));
      path.attr({
        "fill" : "#CCC",
        "stroke-width" : "0.000001"
      });
      var clicktarget = $(e).parent();
      clicktarget.attr('href', $(e).data('url'));
      clicktarget.hover(function(h) {
        path.animate({
          "fill" : "#FFF"
        }, 200);
      }, function(h) {
        path.animate({
          "fill" : "#CCC"
        }, 200);
      });
    });
  };
  return {
    init : _init
  };
}();

PS.ImageWithVideo = function() {
  var _target, _stack, _last;

  var _init = function(target) {
    _target = target;
    _stack = _target.find('.img-stack:first-child li');
    PS.Paginator.init(_target, _stack, _update);
    PS.Paginator.clickInit(_update);
    _last = 1;
    _target.find('.img-stack:first-child li:gt(0)').hide();
    if ($(_stack[_last - 1]).data("disp") === 'vid') {
      $('#videoFrame').attr("src", $(_stack[_last - 1]).data("path"));
    } else {
      $('#videoFrame').hide();
    }
  };
  var _update = function(count) {
    $(_stack[_last - 1]).fadeOut(200, function() {
      _target.find('.img-stack:first-child li').hide();
      $(_stack[count - 1]).fadeIn(200);
      if ($(_stack[count - 1]).data("disp") === 'img') {
        $('#videoFrame').hide();
      } else {
        if ($('#videoFrame').css('display') === 'none') {
          $('#videoFrame').show();
        }
      }
    });
    if ($(_stack[count - 1]).data("disp") === 'vid') {
      if ($('#videoFrame').attr("src") !== $(_stack[count - 1]).data("path")) {
        $('#videoFrame').attr("src", $(_stack[count - 1]).data("path"));
      }
    }

    _last = count;
  };

  return {
    init : _init
  };
}();

PS.AudioPlayer = function() {
  var _target;
  var _init = function(target) {
    audiojs.createAll();
    target.find('.play').first().attr("id", "Audio-Play");
    target.find('.pause').first().attr("id", "Audio-Pause");
    target.find('.loading').first().attr("id", "Audio-Loading");
    target.find('.error').first().attr("id", "Audio-Error");

    PS.Svglib.getPlay("Audio-Play");
    PS.Svglib.getPause("Audio-Pause");
    PS.Svglib.getLoading("Audio-Loading");
    PS.Svglib.getError("Audio-Error");
  };

  return {
    init : _init
  };
}();

//SVG LIBRARY

PS.Svglib = function() {
  return {
    getArrowL : function(targetID) {
      var paper = new Raphael(targetID, 7, 11);
      return paper.path("M5.805,0.228L0,4.89L0,6.107L5.804,10.771L7,9.811L7,1.187").attr({
        "fill" : "#CCC",
        "stroke-width" : "0.000001"
      });
    },
    getArrowR : function(targetID) {
      var paper = new Raphael(targetID, 7, 11);
      return paper.path("M1.196,10.772L7,6.109L7,4.892L1.196,0.228L0,1.189L0,9.812").attr({
        "fill" : "#CCC",
        "stroke-width" : "0.000001"
      });
    },
    getLogo : function(targetID) {
      var paper = new Raphael(targetID, 60, 78);
      paper.path("M50.836,38.745l-15.166,-25.43c-2.393,-4.034 -4.283,-6.055 -5.669,-6.055c-1.41,0 -3.31,2.021 -5.707,6.055l-15.125,25.43c-1.765,3.002 -2.648,5.232 -2.648,6.694c0,2.136 1.993,3.22 5.978,3.22l35.009,0c3.984,0 5.979,-1.084 5.979,-3.22c0,-1.462 -0.885,-3.692 -2.651,-6.694m7.558,1.123c1.079,1.866 1.621,3.779 1.621,5.716c0,2.371 -0.751,4.395 -2.267,6.053c-1.514,1.671 -3.375,2.505 -5.593,2.505l-44.306,0c-2.215,0 -4.085,-0.834 -5.597,-2.505c-1.509,-1.658 -2.267,-3.682 -2.267,-6.053c0,-1.937 0.544,-3.85 1.626,-5.716l20.491,-34.828c1.965,-3.36 4.595,-5.04 7.899,-5.04c3.276,0 5.911,1.68 7.902,5.04l20.491,34.828Z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
      paper.path("M8.574,69.958l3.57,0c1.183,0 2.017,-0.25 2.516,-0.738c0.492,-0.488 0.74,-1.175 0.74,-2.067c0,-0.635 -0.147,-1.19 -0.442,-1.645c-0.288,-0.456 -0.676,-0.756 -1.154,-0.901c-0.302,-0.095 -0.872,-0.138 -1.706,-0.138l-3.524,0l0,5.489Zm-1.833,8.042l0,-15.362l5.2,0c0.915,0 1.615,0.056 2.099,0.146c0.671,0.128 1.242,0.37 1.699,0.724c0.462,0.358 0.834,0.846 1.108,1.486c0.283,0.637 0.426,1.332 0.426,2.109c0,1.307 -0.374,2.406 -1.121,3.315c-0.743,0.914 -2.097,1.371 -4.045,1.371l-3.533,0l0,6.211l-1.833,0Z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
      paper.path("M19.653,77.999l0,-15.36l9.96,0l0,1.829l-8.131,0l0,4.669l7.599,0l0,1.833l-7.599,0l0,5.2l8.457,0l0,1.829l-10.286,0Z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
      paper.path("M35.976,77.999l0,-13.531l-4.552,0l0,-1.829l10.935,0l0,1.829l-4.554,0l0,13.531l-1.829,0Z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
      paper.path("M44.306,77.999l0,-15.36l9.955,0l0,1.829l-8.126,0l0,4.669l7.601,0l0,1.833l-7.601,0l0,5.2l8.454,0l0,1.829l-10.283,0Z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
    },
    getMenu : function(targetID) {
      var paper = new Raphael(targetID, 40, 16);
      return paper.path("M16,5H0V2h16V5z M13.167,7H0v3h13.167V7z M16,12H0v3h16V12z").attr({
        "fill" : "#666",
        "stroke-width" : "0.000001"
      });
    },
    getPlay : function(targetID) {
      var paper = new Raphael(targetID, 25, 20);
      return paper.path("M17,10l-9,5.5v-11L17,10z").attr({
        "fill" : "#CCC",
        "stroke-width" : "0.000001"
      });
    },
    getPause : function(targetID) {
      var paper = new Raphael(targetID, 25, 20);
      return paper.path("M11.47,14.5H8v-9h3.47V14.5z M17,5.5h-3.471v9H17V5.5z").attr({
        "fill" : "#CCC",
        "stroke-width" : "0.000001"
      });
    },
    getLoading : function(targetID) {
      var paper = new Raphael(targetID, 25, 20);
      return paper.path("M16.787,10c-0.005,2.367-1.92,4.282-4.287,4.286c-1.232,0-2.336-0.521-3.118-1.354l1.013-0.706l-3.871-1.814 l0.365,4.261l1.074-0.751c1.099,1.271,2.725,2.079,4.536,2.079c3.315,0,6-2.687,6-6.001H16.787z M12.5,5.714 c1.233,0,2.335,0.522,3.119,1.354l-1.013,0.707l3.87,1.813L18.111,5.33l-1.074,0.749c-1.1-1.271-2.725-2.08-4.537-2.08 C9.187,4,6.5,6.686,6.5,10h1.715C8.219,7.634,10.134,5.719,12.5,5.714z").attr({
        "fill" : "#CCC",
        "stroke-width" : "0.000001"
      });
    },
    getError : function(targetID) {
      var paper = new Raphael(targetID, 25, 20);
      return paper.path("M17.089,4.742c-1.063-0.492-2.335-0.364-3.313,0.225L12.71,7.292l2.11,1.836l-2.209,2.982l0.809-2.778l-2.704-1.824 l0.796-2.342C10.506,4.415,9.085,4.198,7.91,4.742C6.147,5.56,5.304,7.649,6.697,10.116c0.99,1.755,2.744,3.077,5.803,5.447 c3.06-2.37,4.814-3.691,5.804-5.447C19.696,7.649,18.852,5.56,17.089,4.742z").attr({
        "fill" : "#CCC",
        "stroke-width" : "0.000001"
      });
    }
  };
}();

PS.bginit = function() {
  $('#bg').on('click', function(e) {
    var bg = $('#bg');
    bg.off('click');
    var newbg = bg.clone();
    bg.attr('id', '').addClass('oldbg');
    newbg.css("background-image", "url('/bg/" + Math.floor(Math.random() * 9999999) + "')");
    bg.before(newbg);
    setTimeout(function() {
      bg.fadeOut(400, function() {
        setTimeout(function() {
          $('.oldbg').remove();
          bg = null;
          newbg = null;
          PS.bginit();
        }, 1000);
      });
    }, 700);
  });
};

PS.vhinit = function() {
  // fix vh => --vh on mobile
  PS.updatevh();
  window.addEventListener('resize', function(){
    PS.updatevh();
  });
};
PS.updatevh = function(){
  var visviewh;
  if(window.visualViewport){
    visviewh = window.visualViewport.height;
  }else{
    visviewh = window.innerHeight;
  }
  var winviewh = window.innerHeight;
  var vh = Math.min(visviewh, winviewh) * 0.01;
  console.log(vh * 100);
  document.documentElement.style.setProperty('--vh', vh + 'px');
};




//DOCUMENT READY:
$(document).ready(function() {
  PS.bginit();
  $('#bg').trigger('click');
  PS.nav.init();
  PS.initContent();
  PS.vhinit();
  PS.initialLoad = false;
});
