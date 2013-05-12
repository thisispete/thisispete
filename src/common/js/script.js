(function($) {})(this.jQuery);

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// -------------------- THISISPETE DOT COM!!! --------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------

var PS = PS || {};
// log("ThisIsPete dot com v3.0");
PS.minPhoneWidth = 750;

PS.nav = function() {
  var historySupport = !!(window.history && window.history.pushState);
  // var historySupport = false;
  if (historySupport) {
    window.addEventListener("popstate", function(e) {
      _update(location.pathname);
      _hide(1);
      _updateNav();
    });
  }
  var _init = function() {
    PS.Svglib.getLogo('PETElogo');
    $('#PETElogo').on('click', function(e) {
      window.location.href = $('#PETElogo').data('href');
    });

    PS.Svglib.getMenu('menuButton');
    $('#menuButton').on('click', function(e) {
      _expand();
    }).hide();
    _expand();
    // _collapse();

    if (historySupport) {
      _initHistoryNav();
    } else {
      _updateNav();
    }

    $(window).resize(_contenttop);
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
      var ancestor = window.location.pathname.lastIndexOf(link) > -1 && window.location.pathname != link;

      if (ancestor) {// if opened deeper than current click in the same path, close down to this one
        link = link.substring(0, link.lastIndexOf("/"));
        link = link.substring(0, link.lastIndexOf("/") + 1);

        _hide(id.substr(1, 1));
        //hide the expanded section

        $('nav li').removeClass('selected');

      } else if ($(this).attr("id") == loc) {// clicking a link for the current location
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
      if (haschildren === false && $(window).width() < PS.minPhoneWidth) {
        _collapse();
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
    _contenttop();
  };
  var _contenttop = function() {
    if ($(window).width() < 770) {
      $('.content-container').css('top', $('header').height() + 11);
    } else {
      $('.content-container').attr('style', "");
    }
  };
  var _hide = function(level) {
    var i = 4;
    while (i > level) {
      $("nav .l" + i).css("height", "0").fadeOut(150, _contenttop);
      i--;
    }
  };
  var _show = function(id) {
    var n = 200;
    $.each($("nav [data-parent='" + id + "']"), function(i, e) {
      n = historySupport ? n + 20 : 0;
      $(e).delay(n).css("height", "16px").fadeIn(300, function() {
        _contenttop();
      });
    });
  };

  var _update = function(href) {
    href = href == "/" ? "" : href;
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

  var _collapse = function() {
    $('nav>ul').delay(400).hide(300);
    $('#menuButton').delay(700).fadeIn(300, function() {
      _contenttop();
    });
  };

  var _expand = function() {
    $('nav>ul').delay(200).show(300);
    $('#menuButton').fadeOut(200, function() {
      _contenttop();
    });
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
    case 'flickrGallery':
      PS.FlickrGallery.init(target);
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
    case 'scrollContent':
      PS.textPane.init(target);
      break;
  }
};

PS.textPane = function() {
  var _target, _pane, _state, _phone;

  var _init = function(target) {

    _target = target;
    _pane = _target.find('.scrollpane').first();
    _phone = _pane.clone();
    _phone.attr('id', "phonePane");
    _pane.after(_phone);
    _state = -1;
    _pane.jScrollPane({
      verticalDragMaxHeight : 200,
      autoReinitialise : true,
      autoReinitialiseDelay : 1000
    });
    $(window).resize(_resize);
    _resize();
  };
  var _resize = function() {
    _pane.data('jsp').reinitialise();
    if ($(window).width() > PS.minPhoneWidth) {
      if (_state != 1) {
        _pane.show();
        _phone.hide();
        _state = 1;
      }
    } else {
      if (_state !== 0) {
        _pane.hide();
        _phone.show();
        _state = 0;
      }
    }
  };

  return {
    init : _init
  };

}();

PS.Paginator = function() {
  var _target, _stack, _prev, _next, _currentDisp, _totalDisp, _lpath, _rpath, _pagination;
  var _count = 1;
  var _total = 1;

  var _init = function(target, stack, updateCall) {
    _count = 1;
    _target = target;
    _stack = stack;
    _total = _stack.length;
    _currentDisp = _target.find('#current');
    _totalDisp = _target.find('#total');
    _totalDisp.html(_total);
    _pagination = _target.find('.pagination');

    if (_total == 1) {
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
    if (_count == 1) {
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
    if (_count == _total) {
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
    _stack.css('height', $('.fixedRatioWrapper').css('padding-top') == '0px' ? 'auto' : $('.fixedRatioWrapper').css('padding-top'));
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

PS.FlickrGallery = function() {
  var urlbase = "http://thisispete.com/php/getflickrset.php?setid=";
  var _target, _stack, _list, _setid, _last, _size;

  var _init = function(target) {
    _target = target;
    _stack = _target.find('.img-stack').first();
    _setid = _target.attr('data-flickrset');
    if (_target.data('size') === 'w720') {
      _size = '&size=large';
    } else {
      _size = '&size=medium_640';
    }
    _load(_setid, _size);
    _target.find('.pagination').addClass('invisible');
    $(window).resize(_resize);
  };
  var _resize = function() {
    _stack.css('height', $('.fixedRatioWrapper').css('padding-top') == '0px' ? 'auto' : $('.fixedRatioWrapper').css('padding-top'));
  };
  var _load = function(set, size) {
    $.ajax({
      url : urlbase + set + size,
      dataType : 'json',
      success : _callback
    });
  };
  var _callback = function(data, status) {
    _setPhotos = data;
    $.each(_setPhotos, function(i, e) {
      _stack.append("<li><img src='" + e.src + "' alt='" + e.title + "'></li>");
    });
    PS.Paginator.init(_target, _stack.find('li'), _update);
    PS.Paginator.clickInit(_update);
    _target.find('.pagination').removeClass('invisible');
    _list = _stack.find('li');
    _stack.find('li:gt(0)').hide();
    $(_list[0]).fadeIn(200, function() {
      // _stack.css('height', $(this).height());
    });
    _last = 1;
    _resize();
  };

  var _update = function(count) {
    $(_list[_last - 1]).fadeOut(200, function() {
      _list.hide();
      $(_list[count - 1]).fadeIn(200, function() {
        // _stack.css('height', $(this).height());
      });
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
      var clicktarget = $(e).prev();
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
    if ($(_stack[_last - 1]).data("disp") == 'vid') {
      $('#videoFrame').attr("src", $(_stack[_last - 1]).data("path"));
    } else {
      $('#videoFrame').hide();
    }
  };
  var _update = function(count) {
    $(_stack[_last - 1]).fadeOut(200, function() {
      _target.find('.img-stack:first-child li').hide();
      $(_stack[count - 1]).fadeIn(200);
      if ($(_stack[count - 1]).data("disp") == 'img') {
        $('#videoFrame').hide();
      } else {
        if ($('#videoFrame').css('display') == 'none') {
          $('#videoFrame').show();
        }
      }
    });
    if ($(_stack[count - 1]).data("disp") == 'vid') {
      if ($('#videoFrame').attr("src") != $(_stack[count - 1]).data("path")) {
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
      var paper = new Raphael(targetID, 70, 16);
      paper.path("M17.119,11.645c0.315,0.545,0.474,1.104,0.474,1.67c0,0.691-0.221,1.281-0.663,1.766c-0.443,0.488-0.986,0.732-1.633,0.732H2.357c-0.648,0-1.193-0.244-1.634-0.732c-0.441-0.484-0.662-1.074-0.662-1.766c0-0.566,0.158-1.125,0.475-1.67L6.52,1.472C7.094,0.49,7.863,0,8.826,0c0.957,0,1.727,0.49,2.309,1.472L17.119,11.645zM14.912,11.314l-4.429-7.426C9.785,2.71,9.233,2.12,8.826,2.12c-0.411,0-0.965,0.59-1.665,1.769l-4.418,7.426c-0.515,0.879-0.773,1.529-0.773,1.959c0,0.623,0.582,0.938,1.746,0.938H13.94c1.163,0,1.746-0.314,1.746-0.938C15.686,12.844,15.427,12.193,14.912,11.314z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
      paper.path("M22.377,15.711V0.397h5.181c0.913,0,1.607,0.056,2.091,0.146c0.669,0.13,1.237,0.369,1.699,0.722c0.458,0.356,0.827,0.845,1.101,1.479c0.282,0.639,0.422,1.335,0.422,2.103c0,1.304-0.373,2.403-1.118,3.304c-0.741,0.909-2.085,1.364-4.027,1.364h-3.52v6.195H22.377z M24.205,7.694h3.553c1.181,0,2.014-0.25,2.508-0.736c0.494-0.488,0.74-1.17,0.74-2.057c0-0.635-0.146-1.187-0.441-1.641c-0.289-0.455-0.675-0.754-1.151-0.898c-0.3-0.096-0.869-0.138-1.696-0.138h-3.513V7.694z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
      paper.path("M35.244,15.711V0.397h9.925v1.827h-8.101v4.653h7.569v1.827h-7.569v5.181h8.425v1.826H35.244z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
      paper.path("M51.514,15.711V2.224h-4.54V0.397h10.897v1.827h-4.537v13.487H51.514z").attr({
        "fill" : "#FFF",
        "stroke-width" : "0.000001"
      });
      paper.path("M59.813,15.711V0.397h9.922v1.827h-8.101v4.653h7.576v1.827h-7.576v5.181h8.427v1.826H59.813z").attr({
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
    var newbg = bg.clone();
    bg.attr('id', 'oldbg');
    newbg.css("background-image", "url('http://thisispete.com/img/bg/random.php?rnd=" + Math.random() * 9999999 + "')");
    bg.before(newbg);
    setTimeout(function() {
      bg.fadeOut(400, function() {
        PS.bginit();
        setTimeout(function() {
          $('#oldbg').remove();
        }, 3000);
      });
    }, 700);
  });
};

//DOCUMENT READY:
$(document).ready(function() {
  PS.bginit();
  PS.nav.init();
  PS.initContent();

  // Google Analytics
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-28724804-1']);
  _gaq.push(['_trackPageview']);
});
