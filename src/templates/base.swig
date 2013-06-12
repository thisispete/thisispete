<!doctype html>
<!--[if IE 9]> <html class="oldie" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
  <head>
    <title>THISISPETE</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1,requiresActiveX=true">
    <meta charset="utf-8">
    <meta name="description" content="portfolio website for pete schirmer, interactive developer and electronic artist from san francisco california. includes photography flash video dj sets vj videos resume biography design and other projects">
    <meta name="author" content="thisispete">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="dns-prefetch" href="//s3.amazonaws.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//ajax.googleapis.com">
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
    <link rel="shortcut icon" href="img/favicon.ico">
    <link rel="apple-touch-icon" href="img/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="72x72" href="img/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="img/apple-touch-icon-114x114.png">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:800,700,400' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/2.1.0/normalize.css">
    <link rel="stylesheet" href="/css/jquery.jscrollpane.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/phone.css" media="screen and (max-width: 770px)">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/js/lib/modernizr.custom.05816.js"></script>
  </head>
  <body>
    <header>
      <div id="PETElogo" data-href="/" class="clearfix"><h1 class="visuallyhidden">PETE</h1></div>
      <div id="menuButton" class="clearfix"></div>
      <nav>
        {% if navigation -%}
        <ul>
          {% for l1 in navigation -%}
            {% set l1c = loop.index -%}
            <li id="l1_{{l1c}}" class="l1" data-parent="l0" data-sub="{{ l1.children.size }}">
              <a id="{{l1.slug}}" href="{{l1.permalink}}">{{l1.name | upper | replace("_", " ")}}</a>
            </li>
            {% if l1.children.length > 0 -%}
              {% for l2 in l1.children -%}
                {% set l2c = loop.index -%}
                <li id="l2_{{l1c}}_{{l2c}}" class="l2" data-parent="l1_{{l1c}}" data-sub="{{ l2.children.size }}">
                  <a id="{{l2.slug}}" href="{{l2.permalink}}">{{l2.name | upper | replace("_", " ")}}</a>
                </li>
                {% if l2.children.length > 0 -%}
                  {% for l3 in l2.children -%}
                    {% set l3c = loop.index -%}
                    <li id="l3_{{l1c}}_{{l2c}}_{{l3c}}" class="l3" data-parent="l2_{{l1c}}_{{l2c}}" data-sub="{{ l3.children.size }}">
                      <a id="{{l3.slug}}" href="{{l3.permalink}}">{{l3.name | upper | replace("_", " ")}}</a>
                    </li>
                    {% if l3.children.length > 0 -%}
                      {% for l4 in l3.children -%}
                        {% set l4c = loop.index -%}
                        <li id="l4_{{l1c}}_{{l2c}}_{{l3c}}_{{l4c}}" class="l4" data-parent="l3_{{l1c}}_{{l2c}}_{{l3c}}">
                          <a id="{{l4.slug}}" href="{{l4.permalink}}">{{l4.name | upper | replace("_", " ")}}</a>
                        </li>
                      {% endfor %}
                    {% endif %}
                  {% endfor %}
                {% endif %}
              {% endfor %}
            {% endif %}
          {% endfor %}
        </ul>
        {% endif %}
      </nav>
    </header>
    <div id="content" class="content-container">
        {% block content %}{% endblock %}
    </div>
    <div id="bg"></div>
    <script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
    <script src="/js/lib/audio.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.0.14/jquery.jscrollpane.min.js"></script>
    <script src="/js/script.js"></script>
    <!--[if lt IE 9 ]>
      <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
      <script>window.attachEvent("onload",function(){CFInstall.check({mode:"overlay"})})</script>
    <![endif]-->
  </body>
</html>