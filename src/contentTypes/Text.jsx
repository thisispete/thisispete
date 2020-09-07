import Base from "./Base";
import styles from './text.module.scss';

export default function Text(props) {

  return (
    <Base>
      <h1>Text</h1>
    </Base>
  )
}


/*
	<div id="audioPlayer" class="gallery clearfix">
    <div class="gallery-content">
      <h1>{{title}}</h1>
  		<div class="fixedRatioWrapper ratio1x1">
  		  {% for image in images -%}
          <img class="cover-art" src="{{assetRoot}}{{image}}"/>
  			{% endfor %}
  		</div>
  		<audio src="{{s3link}}" preload="none"></audio>
  		<div class="copy">
  			{% block body%}
        {% endblock %}
   			<p><a class="download-link" href="{{s3link}}" target="_blank">Download</a></p>
  		</div>
    </div>
	</div>
*/