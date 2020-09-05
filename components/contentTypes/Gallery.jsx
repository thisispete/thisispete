import ContentBase from "./ContentBase";
import styles from './gallery.module.scss';

export default function Gallery(props) {

  return (
    <ContentBase>
      <h1>Gallery</h1>
    </ContentBase>
  )
}


/*
      	<div id="comboGallery" class="gallery clearfix">
          <div class="gallery-content">
            <script src="https://player.vimeo.com/api/player.js"></script>
      			<h1>{{title}}</h1>
        		<div class="fixedRatioWrapper {% if not ratio.length %}ratio3x2{% else %}ratio{{ratio}}{% endif %}">
        			<ul class="img-stack">
        				{% for image in images -%}
        				  <li data-disp="img"><img src="{{assetRoot}}{{image}}"/></li>
        				{% endfor %}
        				{% for vid in videos -%}
        				  <li data-disp="vid">
                    <iframe id="videoFrame_{{vid.id}}" class="videoFrame" src="http://player.vimeo.com/video/{{vid.id}}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;loop=0" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                  </li>
        				{% endfor %}
        			</ul>
        		</div>
            <div class="copy">
              {% block body %}{% endblock %}
              {% if link -%}
                <a href="{{link}}" target="_blank">{{link}}</a>
              {%- endif %}
            </div>
          </div>
          <div class="gallery-footer">
            <div class="pagination clearfix"><div class="prev">prev</div><div class="count"><span id="current">1</span> / <span id="total">1</span></div><div class="next">next</div></div>
          </div>
        </div>
*/
