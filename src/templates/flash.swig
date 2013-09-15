{% extends 'base.swig' %}
{% block content %}
	<div id="flashGallery" class="gallery clearfix">
		<div class="fixedRatioWrapper ratio{{ratio}}">
			<ul class="swf-stack">
				{% for file in embed -%}
				  <li>
  					<div id="FlashEmbed_{{loop.index}}" class="flash-container" data-src="swf/{{file.path}}" data-width="{{file.width}}" data-height="{{file.height}}">
  						<a href="#"><img src="{{assetRoot}}/flash.png" class="flash-warn"></a>
  						<img src="img/{{file.alt}}" alt="Flash Player Required To View Animation">
  					</div>
	  			</li>
	  		{% endfor %}
			</ul>
		</div>
		<div class="pagination clearfix"><a href="#" class="prev">prev</a><div class="count"><span id="current">1</span> / <span id="total">1</span></div><a href="#" class="next">next</a></div>
		<div class="copy clearfix">
			<h1>{{title}}</h1>
			{% block body%}
      {% endblock %}
			{% if link %}<a href="{{link}}" target="_blank">{{link}}</a>{% endif %}
		</div>
	</div>
{% endblock %}