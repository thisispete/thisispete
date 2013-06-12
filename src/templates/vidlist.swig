{% extends 'base.swig' %}
{% block content %}
	<div id="videoGallery" class="gallery clearfix">
		<div class="fixedRatioWrapper ratio3x2">
			<iframe id="videoFrame" class="videoFrame" src="http://player.vimeo.com/video/{{videos[0].id}}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;loop=0" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
		</div>
		<div class="copy">
			<h1>{{title}}</h1>
			{% block body%}
      {% endblock %}
      <br><br>
			<h3>Track List <span>(click to play)</span></h3>
			<ol>
				{% for vid in videos -%}
				  <li><a href="#" data-path="http://player.vimeo.com/video/{{vid.id}}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;loop=0">{{vid.name}}</a></li>
				{% endfor %}
			</ol>
			{% if link %}<a href="{{link}}" target="_blank">{{link}}</a>{% endif %}
		</div>
	</div>		
{% endblock %} 