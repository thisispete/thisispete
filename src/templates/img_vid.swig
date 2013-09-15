{% extends 'base.swig' %}
{% block content %}
	<div id="imageWithVideo" class="gallery clearfix">
		<div class="fixedRatioWrapper {% if ratio == '16x9' %}ratio16x9{% else if ratio == '4x3' %}ratio4x3{% else if ratio == '1x1' %}ratio1x1{% else %}ratio3x2{% endif %}">
			<ul class="img-stack">
				{% for image in images -%}
				  <li data-disp="img"><img src="{{assetRoot}}{{image}}"/></li>
				{% endfor %}
				{% for vid in videos -%}
				  <li data-disp="vid" data-path="http://player.vimeo.com/video/{{vid.id}}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;loop=0"></li>
				{% endfor %}
			</ul>
			<iframe id="videoFrame" class="videoFrame" src="" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
		</div>
		<div class="pagination"><a href="#" class="prev">prev</a><div class="count"><span id="current">1</span> / <span id="total">1</span></div><a href="#" class="next">next</a></div>
		<div class="copy">
			<h1>{{title}}</h1>
			{% block body%}
      {% endblock %}
		</div>
  </div>
{% endblock %}