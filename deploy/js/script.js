(function(a){})(this.jQuery);var PS=PS||{};PS.minPhoneWidth=750;PS.nav=function(){var e=!!(window.history&&window.history.pushState);if(e){window.addEventListener("popstate",function(k){i(location.pathname);b(1);a()})}var f=function(){PS.Svglib.getLogo("PETElogo");$("#PETElogo").on("click",function(k){window.location.href=$("#PETElogo").data("href")});PS.Svglib.getMenu("menuButton");$("#menuButton").on("click",function(k){c()}).hide();c();if(e){j()}else{a()}$(window).resize(h)};var j=function(){$("nav").on("click","li a",function(q){q.preventDefault();q.stopPropagation();var s=$(this).parent().attr("id");var n=window.location.pathname.split("/");var r=n[n.length-2];var m=n.join("/").substring(0,window.location.pathname.lastIndexOf(r));var p=$(this).attr("href");var k=$(this).parent().data("sub")>0;var o=window.location.pathname.lastIndexOf(p)>-1&&window.location.pathname!=p;if(o){p=p.substring(0,p.lastIndexOf("/"));p=p.substring(0,p.lastIndexOf("/")+1);b(s.substr(1,1));$("nav li").removeClass("selected")}else{if($(this).attr("id")==r){if(k){b(s.substr(1,1));$("nav li").removeClass("selected")}p=m}else{b(s.substr(1,1));d(s);$("nav li").removeClass("selected");$("nav #"+s).addClass("selected")}}history.pushState(null,null,p);_gaq.push(["_trackPageview",p]);i(p);if(k===false&&$(window).width()<PS.minPhoneWidth){g()}})};var a=function(){var k=window.location.pathname.split("/");var m=k[k.length-2];var n="";$.each(k,function(l,o){if(o!==""){n=$("nav #"+o).parent().attr("id");d(n)}});$("nav li").removeClass("selected");if(n!==""){$("nav #"+n).addClass("selected")}h()};var h=function(){if($(window).width()<770){$(".content-container").css("top",$("header").height()+11)}else{$(".content-container").attr("style","")}};var b=function(l){var k=4;while(k>l){$("nav .l"+k).css("height","0").fadeOut(150,h);k--}};var d=function(l){var k=200;$.each($("nav [data-parent='"+l+"']"),function(m,n){k=e?k+20:0;$(n).delay(k).css("height","16px").fadeIn(300,function(){h()})})};var i=function(k){k=k=="/"?"":k;$("#content").before("<div class='content-container'></div>");var l=$("#content").prev();l.hide();l.next().attr("id","old");l.attr("id","content");l.load(k+"index.html #content > *",function(m){l.delay(150).fadeIn(600);l.next().fadeOut(150,function(){l.next().remove();PS.initContent()})})};var g=function(){$("nav>ul").delay(400).hide(300);$("#menuButton").delay(700).fadeIn(300,function(){h()})};var c=function(){$("nav>ul").delay(200).show(300);$("#menuButton").fadeOut(200,function(){h()})};return{init:f}}();PS.initContent=function(){var a=$("#content div").first();switch(a.attr("id")){case"imageGallery":PS.ImageGallery.init(a);break;case"flickrGallery":PS.FlickrGallery.init(a);break;case"videoGallery":PS.VideoGallery.init(a);break;case"flashGallery":PS.FlashGallery.init(a);break;case"contactGrid":PS.Contact.init(a);break;case"imageWithVideo":PS.ImageWithVideo.init(a);break;case"audioPlayer":PS.AudioPlayer.init(a);break;case"scrollContent":PS.textPane.init(a);break}};PS.textPane=function(){var a,f,b,e;var d=function(g){a=g;f=a.find(".scrollpane").first();e=f.clone();e.attr("id","phonePane");f.after(e);b=-1;f.jScrollPane({verticalDragMaxHeight:200,autoReinitialise:true,autoReinitialiseDelay:1000});$(window).resize(c);c()};var c=function(){f.data("jsp").reinitialise();if($(window).width()>PS.minPhoneWidth){if(b!=1){f.show();e.hide();b=1}}else{if(b!==0){f.hide();e.show();b=0}}};return{init:d}}();PS.Paginator=function(){var b,n,a,d,g,o,j,e,c;var i=1;var m=1;var h=function(r,p,q){i=1;b=r;n=p;m=n.length;g=b.find("#current");o=b.find("#total");o.html(m);c=b.find(".pagination");if(m==1){c.hide()}else{a=c.find(".prev").first();d=c.find(".next").first();a.html("");d.html("");j=PS.Svglib.getArrowL(a[0]);e=PS.Svglib.getArrowR(d[0]);c.on("click",".prev",function(s){s.preventDefault();if(i>1){i--;l();q(i)}return false});c.on("click",".next",function(s){s.preventDefault();if(i<m){i++;l();q(i)}return false});c.on("mouseenter",".prev",function(){if(!a.hasClass("disabled")){j.animate({fill:"#FFF"},200)}});c.on("mouseleave",".prev",function(){if(!a.hasClass("disabled")){j.animate({fill:"#CCC"},200)}});c.on("mouseenter",".next",function(){if(!d.hasClass("disabled")){e.animate({fill:"#FFF"},200)}});c.on("mouseleave",".next",function(){if(!d.hasClass("disabled")){e.animate({fill:"#CCC"},200)}});l()}};var l=function(){g.html(i);if(i==1){a.addClass("disabled");j.animate({fill:"#666"},200)}else{a.removeClass("disabled");j.animate({fill:"#CCC"},200)}if(i==m){d.addClass("disabled");e.animate({fill:"#666"},200)}else{d.removeClass("disabled");e.animate({fill:"#CCC"},200)}};var f=function(){};var k=function(p){n.on("click",function(q){q.preventDefault();if(i<m){i++}else{i=1}l();p(i);return false})};return{init:h,clickInit:k,swipeInit:f}}();PS.ImageGallery=function(){var a,e,d,c;var g=function(h){a=h;e=a.find(".img-stack").first();d=e.find("li");PS.Paginator.init(a,d,b);PS.Paginator.clickInit(b);c=1;$(d[0]).delay(1).fadeIn(200,function(){});e.find("li:gt(0)").hide();$(window).resize(f);f()};var f=function(){e.css("height",$(".fixedRatioWrapper").css("padding-top")=="0px"?"auto":$(".fixedRatioWrapper").css("padding-top"))};var b=function(h){$(d[c-1]).fadeOut(200,function(){d.hide();$(d[h-1]).fadeIn(200,function(){});f()});c=h};return{init:g}}();PS.FlickrGallery=function(){var a="http://thisispete.com/php/getflickrset.php?setid=";var b,k,d,c,f,i;var h=function(m){b=m;k=b.find(".img-stack").first();c=b.attr("data-flickrset");if(b.data("size")==="w720"){i="&size=large"}else{i="&size=medium_640"}e(c,i);b.find(".pagination").addClass("invisible");$(window).resize(g)};var g=function(){k.css("height",$(".fixedRatioWrapper").css("padding-top")=="0px"?"auto":$(".fixedRatioWrapper").css("padding-top"))};var e=function(n,m){$.ajax({url:a+n+m,dataType:"json",success:l})};var l=function(n,m){_setPhotos=n;$.each(_setPhotos,function(o,p){k.append("<li><img src='"+p.src+"' alt='"+p.title+"'></li>")});PS.Paginator.init(b,k.find("li"),j);PS.Paginator.clickInit(j);b.find(".pagination").removeClass("invisible");d=k.find("li");k.find("li:gt(0)").hide();$(d[0]).fadeIn(200,function(){});f=1;g()};var j=function(m){$(d[f-1]).fadeOut(200,function(){d.hide();$(d[m-1]).fadeIn(200,function(){})});f=m};return{init:h}}();PS.FlashGallery=function(){var a,c;var d=function(e){a=e;c=a.find(".swf-stack:first-child li");PS.Paginator.init(a,c,b);b(1)};var b=function(e){var f=$(c[e-1]).find(".flash-container");if(swfobject.hasFlashPlayerVersion("9.0.0")){swfobject.embedSWF(f.data("src"),f.attr("id"),f.data("width"),f.data("height"),"9.0.0","./js/libs/expressInstall.swf",{},{wmode:"opaque"})}a.find(".swf-stack:first-child li").hide();$(c[e-1]).show()};return{init:d}}();PS.VideoGallery=function(){var a;var b=function(c){a=c;a.on("click","ol a",function(d){d.preventDefault();a.find("#videoFrame").attr("src",$(this).data("path"))})};return{init:b}}();PS.Contact=function(){var a;var b=function(c){a=c;$.each(a.find(".svg-icon"),function(f,h){var j=new Raphael(h,60,60);var g=j.path($(h).data("svg"));g.attr({fill:"#CCC","stroke-width":"0.000001"});var d=$(h).prev();d.attr("href",$(h).data("url"));d.hover(function(e){g.animate({fill:"#FFF"},200)},function(e){g.animate({fill:"#CCC"},200)})})};return{init:b}}();PS.ImageWithVideo=function(){var a,d,c;var e=function(f){a=f;d=a.find(".img-stack:first-child li");PS.Paginator.init(a,d,b);PS.Paginator.clickInit(b);c=1;a.find(".img-stack:first-child li:gt(0)").hide();if($(d[c-1]).data("disp")=="vid"){$("#videoFrame").attr("src",$(d[c-1]).data("path"))}else{$("#videoFrame").hide()}};var b=function(f){$(d[c-1]).fadeOut(200,function(){a.find(".img-stack:first-child li").hide();$(d[f-1]).fadeIn(200);if($(d[f-1]).data("disp")=="img"){$("#videoFrame").hide()}else{if($("#videoFrame").css("display")=="none"){$("#videoFrame").show()}}});if($(d[f-1]).data("disp")=="vid"){if($("#videoFrame").attr("src")!=$(d[f-1]).data("path")){$("#videoFrame").attr("src",$(d[f-1]).data("path"))}}c=f};return{init:e}}();PS.AudioPlayer=function(){var a;var b=function(c){audiojs.createAll();c.find(".play").first().attr("id","Audio-Play");c.find(".pause").first().attr("id","Audio-Pause");c.find(".loading").first().attr("id","Audio-Loading");c.find(".error").first().attr("id","Audio-Error");PS.Svglib.getPlay("Audio-Play");PS.Svglib.getPause("Audio-Pause");PS.Svglib.getLoading("Audio-Loading");PS.Svglib.getError("Audio-Error")};return{init:b}}();PS.Svglib=function(){return{getArrowL:function(a){var b=new Raphael(a,7,11);return b.path("M5.805,0.228L0,4.89L0,6.107L5.804,10.771L7,9.811L7,1.187").attr({fill:"#CCC","stroke-width":"0.000001"})},getArrowR:function(a){var b=new Raphael(a,7,11);return b.path("M1.196,10.772L7,6.109L7,4.892L1.196,0.228L0,1.189L0,9.812").attr({fill:"#CCC","stroke-width":"0.000001"})},getLogo:function(a){var b=new Raphael(a,70,16);b.path("M17.119,11.645c0.315,0.545,0.474,1.104,0.474,1.67c0,0.691-0.221,1.281-0.663,1.766c-0.443,0.488-0.986,0.732-1.633,0.732H2.357c-0.648,0-1.193-0.244-1.634-0.732c-0.441-0.484-0.662-1.074-0.662-1.766c0-0.566,0.158-1.125,0.475-1.67L6.52,1.472C7.094,0.49,7.863,0,8.826,0c0.957,0,1.727,0.49,2.309,1.472L17.119,11.645zM14.912,11.314l-4.429-7.426C9.785,2.71,9.233,2.12,8.826,2.12c-0.411,0-0.965,0.59-1.665,1.769l-4.418,7.426c-0.515,0.879-0.773,1.529-0.773,1.959c0,0.623,0.582,0.938,1.746,0.938H13.94c1.163,0,1.746-0.314,1.746-0.938C15.686,12.844,15.427,12.193,14.912,11.314z").attr({fill:"#FFF","stroke-width":"0.000001"});b.path("M22.377,15.711V0.397h5.181c0.913,0,1.607,0.056,2.091,0.146c0.669,0.13,1.237,0.369,1.699,0.722c0.458,0.356,0.827,0.845,1.101,1.479c0.282,0.639,0.422,1.335,0.422,2.103c0,1.304-0.373,2.403-1.118,3.304c-0.741,0.909-2.085,1.364-4.027,1.364h-3.52v6.195H22.377z M24.205,7.694h3.553c1.181,0,2.014-0.25,2.508-0.736c0.494-0.488,0.74-1.17,0.74-2.057c0-0.635-0.146-1.187-0.441-1.641c-0.289-0.455-0.675-0.754-1.151-0.898c-0.3-0.096-0.869-0.138-1.696-0.138h-3.513V7.694z").attr({fill:"#FFF","stroke-width":"0.000001"});b.path("M35.244,15.711V0.397h9.925v1.827h-8.101v4.653h7.569v1.827h-7.569v5.181h8.425v1.826H35.244z").attr({fill:"#FFF","stroke-width":"0.000001"});b.path("M51.514,15.711V2.224h-4.54V0.397h10.897v1.827h-4.537v13.487H51.514z").attr({fill:"#FFF","stroke-width":"0.000001"});b.path("M59.813,15.711V0.397h9.922v1.827h-8.101v4.653h7.576v1.827h-7.576v5.181h8.427v1.826H59.813z").attr({fill:"#FFF","stroke-width":"0.000001"})},getMenu:function(a){var b=new Raphael(a,40,16);return b.path("M16,5H0V2h16V5z M13.167,7H0v3h13.167V7z M16,12H0v3h16V12z").attr({fill:"#666","stroke-width":"0.000001"})},getPlay:function(a){var b=new Raphael(a,25,20);return b.path("M17,10l-9,5.5v-11L17,10z").attr({fill:"#CCC","stroke-width":"0.000001"})},getPause:function(a){var b=new Raphael(a,25,20);return b.path("M11.47,14.5H8v-9h3.47V14.5z M17,5.5h-3.471v9H17V5.5z").attr({fill:"#CCC","stroke-width":"0.000001"})},getLoading:function(a){var b=new Raphael(a,25,20);return b.path("M16.787,10c-0.005,2.367-1.92,4.282-4.287,4.286c-1.232,0-2.336-0.521-3.118-1.354l1.013-0.706l-3.871-1.814 l0.365,4.261l1.074-0.751c1.099,1.271,2.725,2.079,4.536,2.079c3.315,0,6-2.687,6-6.001H16.787z M12.5,5.714 c1.233,0,2.335,0.522,3.119,1.354l-1.013,0.707l3.87,1.813L18.111,5.33l-1.074,0.749c-1.1-1.271-2.725-2.08-4.537-2.08 C9.187,4,6.5,6.686,6.5,10h1.715C8.219,7.634,10.134,5.719,12.5,5.714z").attr({fill:"#CCC","stroke-width":"0.000001"})},getError:function(a){var b=new Raphael(a,25,20);return b.path("M17.089,4.742c-1.063-0.492-2.335-0.364-3.313,0.225L12.71,7.292l2.11,1.836l-2.209,2.982l0.809-2.778l-2.704-1.824 l0.796-2.342C10.506,4.415,9.085,4.198,7.91,4.742C6.147,5.56,5.304,7.649,6.697,10.116c0.99,1.755,2.744,3.077,5.803,5.447 c3.06-2.37,4.814-3.691,5.804-5.447C19.696,7.649,18.852,5.56,17.089,4.742z").attr({fill:"#CCC","stroke-width":"0.000001"})}}}();PS.bginit=function(){$("#bg").on("click",function(c){var a=$("#bg");var b=a.clone();a.attr("id","oldbg");b.css("background-image","url('http://thisispete.com/img/bg/random.php?rnd="+Math.random()*9999999+"')");a.before(b);setTimeout(function(){a.fadeOut(400,function(){PS.bginit();setTimeout(function(){$("#oldbg").remove()},3000)})},700)})};$(document).ready(function(){PS.bginit();PS.nav.init();PS.initContent();var a=a||[];a.push(["_setAccount","UA-28724804-1"]);a.push(["_trackPageview"])});