{% extends 'base.swig' %}
{% block content %}
	<div id="audioPlayer" class="gallery clearfix">	
		<div class="fixedRatioWrapper ratio1x1">
		  {% for image in images -%}
        <img class="cover-art" src="{{image}}"/>
			{% endfor %}
		</div>
		<audio src="{{s3link}}" preload="none"></audio>
		<div class="copy">
			<h1>{{title}}</h1>
			{% block body%}
      {% endblock %}
 			<p><a class="download-link" href="{{s3link}}" target="_blank">Download</a></p>
		</div>
	</div>		
{% endblock %} 