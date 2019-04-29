{% extends 'base.swig' %}
{% block content %}
  <div id="scrollContent" class="scroll">
		<div>
      {% block body %}{% endblock %}
		</div>
  </div>
{% endblock %}
