{% extends '../templates/base.swig' %}
{% block content %}
  <div id="scrollContent" class="gallery">
  	<div class="scrollpane">
  		<div>
        {% block body %}{% endblock %}
  		</div>
  	</div>	
  </div>
{% endblock %}