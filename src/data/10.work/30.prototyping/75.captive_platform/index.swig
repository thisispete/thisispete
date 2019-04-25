{% extends 'text.swig' %}

{% block body %}
<div>
  <h2 id="captive_platform">Captive Portal Prototyping Platform</h2>

  <p><img alt="captive platform" src="http://aws.thisispete.com/images/work/prototyping/captive_platform/cpp1.jpg"></p>

  <p>While at Matter we had several prototyping projects that needed various hardware components to be controlled or monitored remotely for testing. The first one that came up had an additional requirement that it needed to work without a network connection, and be fully battery operated.</p>

  <p>The solution I developed was to have a Raspberry Pi that was powered by a usb battery pack and configured to create it's own captive web portal, which hosted a node.js web app that could control the Raspberry Pi's pins.</p>

  <p><img alt="captive platform" src="http://aws.thisispete.com/images/work/prototyping/captive_platform/cpp5.jpg"></p>

  <p>A user would use their phone, tablet, or laptop to connect to the wifi network being created by the Pi, they would be automatically taken to the web app that controlled whatever hardware options were needed for the presentation.</p>

  <p><img alt="captive platform" src="http://aws.thisispete.com/images/work/prototyping/captive_platform/cpp2.jpg"></p>


  <p>I used Ansible to automate the provisioning and setup of each Pi so that they could reliably be configured exactly as needed, this made swapping hardware and spinning up new projects very quick and reliable.</p>

  <p>These projects also gave me plenty of opportunity to create some custom circuit boards, usually for controlling different lighting options.</p>

  <p><img alt="captive platform" src="http://aws.thisispete.com/images/work/prototyping/captive_platform/cpp3.jpg"></p>
  <p><img alt="captive platform" src="http://aws.thisispete.com/images/work/prototyping/captive_platform/cpp4.jpg"></p>

</div>
{% endblock%}
