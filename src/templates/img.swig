{% extends 'base.swig' %}
{% block content %}
  <p>{{hello}}</p>
{% endblock %}

{#% block contentt %}
  <div id="imageGallery" class="gallery clearfix">      
    <div class="fixedRatioWrapper {% case ratio %}{% when '16x9' %}ratio16x9{% when '4x3' %}ratio4x3{% when '1x1' %}ratio1x1{% else %}ratio3x2{% endcase %}">
      <ul class="img-stack">
        {% for image in images %}<li>
            <img src="{{image.path}}" alt="{{image.name}}"/>
          </li>{% endfor %}
      </ul>
    </div>
    <div class="pagination"><div class="prev">prev</div><div class="count"><span id="current">1</span> / <span id="total">1</span></div><div class="next">next</div></div>
    <div class="copy">
      <h1>{{title}}</h1>
      {{body}}
      {% if link %}<a href="{{link}}" target="_blank">{{link}}</a>{% endif %}
    </div>
  </div>
{% endblock %#} 