{% extends 'base.swig' %}
{% block content %}
	<div id="contactGrid" class="gallery clearfix">
		<ul class="contact-grid clearfix">
			{% for link in links -%}
        <li><a href="#" target="_blank"><h3>{{link.hover}}</h3></a><div class="svg-icon" data-url="{{link.url}}" data-svg="{{link.path}}"></div></li>
  		{% endfor %}
		</ul>
	</div>		
{% endblock %} 