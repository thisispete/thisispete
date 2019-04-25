{% extends 'base.swig' %}
{% block content %}
  <div id="imageGallery" class="gallery clearfix">
    <div class="fixedRatioWrapper {% if !ratio.length %}ratio3x2{% else %}ratio{{ratio}}{% endif %}">
      <ul class="img-stack">
        {% for image in images -%}
          <li><img src="{{assetRoot}}{{image}}"/></li>
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
