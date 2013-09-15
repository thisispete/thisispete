{% extends 'text.swig' %}

{% block body %}
<div>
  <h2 id="antique_weather_clock">Antique Weather Clock</h2>

  <p><img alt="Antique Weather Clock" src="http://aws.thisispete.com/images/play/electronics/weather_clock/weatherclock.jpg"></p>

  <p>I love the idea of hacking antiques, using electronics to update their functionality or change it completly. I came up with this concept for an antique weather clock, instead of telling the time it tells you the weather.</p>
  <p>I used a fake antique (replica) that I picked up for cheep on ebay. I took out the clock work, and replaced it with a servo and used a phidgets USB - servo controller so I could control the servo from my computer. I had to use some gears so that the needle shaft would turn 360 degrees, since the servo only turns about 180. I also re-designed the face of the clock keeping a similar look to the original time piece. Once that was all set I created a little flash application that would connect to yahoo! weather service, and update the servo. I made it so it could toggle between current condition and the local forecast, and also made it so I could enter another zip code to see what the weather is in other places. Their weather service reports something like 40 different conditions, so I had to condense some of them, I combined some things, and ended up with 14 ‘conditions’</p>

  <ul>
    <li>Cold</li>
    <li>Hot</li>
    <li>Fog / Haze</li>
    <li>Cloudy</li>
    <li>Partially Cloudy</li>
    <li>Sunny / Clear</li>
    <li>Clear at Night</li>
    <li>Rain / Showers</li>
    <li>Mixed winter precipitation (sleet / freezing rain)</li>
    <li>Snow</li>
    <li>Windy</li>
    <li>Thunderstorms</li>
    <li>Severe Weather (hurricane / tornado)</li>
    <li>Dead Clock (no internet connection / service errors)</li>
  </ul>

  <p>It updates automatically, I set the default at every 10 minutes. Its been running pretty stable for a week.</p>

  <h3 id="update_2011">UPDATE 2011:</h3>

  <p>I’ve recently re-worked the clock to be fully self contained (no USB connection needed)</p>
  <p>I got a WIFI Arduino board (YellowJacket from Async Labs) The new board connects to my home base station over wifi, fetches the weather status from the internet and updates the servo position.</p>
  <p>Ran into a few tricky things, Async labs latest examples wouldn’t compile for me in the most recent version of Arduino, and I couldn’t get version 16 of Arduino IDE to work in my latest version of snow leopard, I found that there’s a community repository available on git hub which seem to work much better.</p>
  <p>I married the simple client sketch with the built in servo library. I ran into a number of memory problems when trying to let the Arduino parse the page itself. I was trying to read in the whole xml feed and parse it internally using the WString library. Finally I decided to offload all the parsing logic to PHP on my personal web server. The php scrapes the weather data (still using the yahoo API’s) and outputs a single character.</p>
  <p>The Arduino gets all the data returned from the php script html header info and contents, and the last character that it gets back is converted into the lookup value for the array of servo positions. (ascii values converted into intigers 0-13)</p>
  <p>I had to go through and manually recalibrate the servo positions array as the fidgets chip didn’t match the same values that the Arduino servo library used.</p>
  <p>Couple little quirks as a result: It’s hardcoded to only work on my wifi with my password, so changing networks requires re-programing the Arduino board. The php contains the zip code for lookup so when I move I have to change the zip in the php. The Arduino library also required a ip address, I’m not sure how long my server holds it’s ip address, I may have to start investigating how to get DNS working with the web client library.</p>
  <p>First night I accidentally left it updating every 10 seconds, so had quite the traffic surge on my website logs, but Sure enough it was accurately telling me that it was cloudy when I woke up.</p>

  <p><img alt="Antique Weather Clock" src="http://aws.thisispete.com/images/play/electronics/weather_clock/IMG_4279.jpg"></p>
  <p><img alt="Antique Weather Clock" src="http://aws.thisispete.com/images/play/electronics/weather_clock/IMG_4281.jpg"></p>
  <p><img alt="Antique Weather Clock" src="http://aws.thisispete.com/images/play/electronics/weather_clock/IMG_4284.jpg"></p>
  <p><img alt="Antique Weather Clock" src="http://aws.thisispete.com/images/play/electronics/weather_clock/IMG_4285.jpg"></p>
  <p><img alt="Antique Weather Clock" src="http://aws.thisispete.com/images/play/electronics/weather_clock/IMG_4286.jpg"></p>

  <p>© 2006 Peter Schirmer</p>

</div>
{% endblock%}