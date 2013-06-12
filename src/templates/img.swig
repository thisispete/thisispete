{% extends 'base.swig' %}
{% block content %}
  <div id="imageGallery" class="gallery clearfix">      
    <div class="fixedRatioWrapper {% if ratio == '16x9' %}ratio16x9{% else if ratio == '4x3' %}ratio4x3{% else if ratio == '1x1' %}ratio1x1{% else %}ratio3x2{% endif %}">
      <ul class="img-stack">
        {% for image in images -%}
          <li><img src="{{image}}"/></li>
        {% endfor %}
      </ul>
    </div>
    <div class="pagination"><div class="prev">prev</div><div class="count"><span id="current">1</span> / <span id="total">1</span></div><div class="next">next</div></div>
    <div class="copy">
      <h1>{{title}}</h1>
      {% block body%}
      {% endblock %}
      {% if link %}<a href="{{link}}" target="_blank">{{link}}</a>{% endif %}
    </div>
  </div>
{% endblock %} 