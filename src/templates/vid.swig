{% extends 'base.swig' %}
{% block content %}
	<div id="singleVideo" class="gallery clearfix">
		<div class="fixedRatioWrapper ratio3x2">
			<iframe id="videoFrame" class="videoFrame" src="http://player.vimeo.com/video/{{videoid}}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;loop=0" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
		</div>
		<div class="copy">
			<h1>{{title}}</h1>
			{% block body%}
      {% endblock %}
			{% if link %}<a href="{{link}}" target="_blank">{{link}}</a>{% endif %}
		</div>
	</div>		
{% endblock %} 