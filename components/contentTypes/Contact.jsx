import ContentBase from "./ContentBase";
import styles from './contact.module.scss';

export default function Contact(props) {

  return (
    <ContentBase>
      <h1>Contact</h1>
    </ContentBase>
  )
}


/*
        <div id="contactGrid" class="gallery clearfix">
          <div class="gallery-content">
        		<ul class="contact-grid clearfix">
        			{% for link in links -%}
                <li><a href="#" target="_blank"><h3>{{link.hover}}</h3><div class="svg-icon" data-url="{{link.url}}" data-svg="{{link.path}}"></div></a></li>
          		{% endfor %}
        		</ul>
          </div>
      	</div>
*/
