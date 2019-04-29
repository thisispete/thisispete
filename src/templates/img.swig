{% extends 'base.swig' %}
{% block content %}
  <div id="imageGallery" class="gallery clearfix">
    <div class="gallery-content">
      <h1>{{title}}</h1>
      <div class="fixedRatioWrapper {% if !ratio.length %}ratio3x2{% else %}ratio{{ratio}}{% endif %}">
        <ul class="img-stack">
          {% for image in images -%}
            <li><img src="{{assetRoot}}{{image}}"/></li>
          {% endfor %}
        </ul>
      </div>
      <div class="copy">
        {% block body%}
        {% endblock %}
        {% if link %}
          <a href="{{link}}" target="_blank">{{link}}</a>
        {% endif %}
      </div>
    </div>
    <div class="gallery-footer">
      <div class="pagination clearfix"><div class="prev">prev</div><div class="count"><span id="current">1</span> / <span id="total">1</span></div><div class="next">next</div></div>
    </div>
  </div>
{% endblock %}
