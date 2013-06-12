{% extends 'base.swig' %}
{% block content %}
	<div id="flickrGallery" data-flickrset="{{flickrid}}" data-size="{{size}}" class="gallery clearfix">
		<div class="fixedRatioWrapper {{size}} {% if size == 'w640' %} ratio4x3 {% else %} ratio3x2 {% endif %}">	
			<ul class="img-stack"></ul>
		</div>
		<div class="pagination"><a href="#" class="prev">prev</a><div class="count"><span id="current">1</span> / <span id="total">1</span></div><a href="#" class="next">next</a></div>
		<div class="copy">
			<h1>{{title}}</h1>
			{% block body %}
      {% endblock %}
			{% if link %}<a href="{{link}}" target="_blank">{{link}}</a>{% endif %}
		</div>
	</div>	
{% endblock %} 