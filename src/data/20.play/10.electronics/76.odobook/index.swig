{% extends 'text.swig' %}

{% block body %}
<div>
  <h2 id="odobook">Odobook</h2>

  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook6.jpg"></p>

  <p>For odopod’s 2013 hack days event me and my team devised an illuminated book that changes color based on who’s in the office. The theme for this year was called Extraordinary Objects, and had the whole studio thinking about internet of things and making everyday objects smarter.</p>
  <p>Our idea was based around the idea of creating an ambient indicator, something that would be a subtle addition to the studio that would reveal some key piece of information to those in the know.</p>
  <p>What it actually shows (roughly) is which of our office teams (red blue black green pink white) has the highest percent of team members in the office at any given time.</p>

  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook5.jpg"></p>
  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook4.jpg"></p>
  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook1.jpg"></p>

  <p>The tech starts out with a device that captures the device ID’s of nearby phones looking for wifi signals. This is basically a raspberry pi computer with a wifi router and some third party software that connects to a server which hosts an API for subscribing to known phones and receiving ‘added’ and ‘dropped’ events.</p>
  <p>This API is connected to a node.js app that we wrote that allows our office mates to sign up their phone ID’s and identify some key information about themselves. (team color and name) The app is hosted on heroku and uses redis as a database. There’s a simple admin page for updating or deleting users after they subscribe, and a number of other services used by the hardware.</p>

  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook9.jpg"></p>
  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobooka.jpg"></p>

  <p>The electronics consist of an Arduino Uno, a Wifi Shield, a 12v to 5v power supply, and some Mosfet’s, and some ultra-bright RGB LED tape. The box was designed and constructed by my teammates with a few trips to TAP plastics. The LED’s need the 12v power and the arduino + wifi need the 5v, the arduino outputs are switched up to 12V for each R,G,B line on the LED tape to get different colors using the MOSFET’s.</p>
  <p>When the arduino runs it connects to a local wifi network, and then reads a url from our web app that simply tells it what color to display. It fades to that color and then waits another minute and reads again. Whenever the app receives a callback saying someone has been added or dropped from the network the app re-calculates who’s in the office and decides what color to display based on some logic that determines which team is in the lead.</p>
  <p>There’s a some tie breaking logic: in the event of a percent match, the team with more registered members win, and if there’s still a tie it then goes to random selection.</p>

  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook3.jpg"></p>
  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook2.jpg"></p>
  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook7.jpg"></p>
  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobook8.jpg"></p>

  <p>In action we’ve noticed that its not always super accurate, people’s phones go to sleep, or aren’t picked up right away by the network. We constructed a snapshot page that gives us a view into the current stats and it seems to be pretty fun to watch. Next we’re going to hook it up to some analytics and see if we spot any interesting trends over time.</p>

  <p><img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobookb.jpg"> <img alt="Odobook" src="http://aws.thisispete.com/images/play/electronics/odobook/images/odobookc.jpg"></p>

  <p>Team: Pete Schirmer, Peter Reid, Michael Evans, Eglantine Bonvallet, Jayeon Kim, Ozzy Urrutia, Sebastien Paccioni</p>

</div>
{% endblock%}