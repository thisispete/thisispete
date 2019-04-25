{% extends 'text.swig' %}

{% block body %}
<div>
  <h2 id="white_block_clock">White Block Clock</h2>

  <p><img alt="White Block Clock" src="http://aws.thisispete.com/images/play/electronics/white_block_clock/whiteblock.jpg"></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_15.jpg"></p>

  <p>I love these wooden block clocks I’ve been seeing around that have LED displays placed behind the surface of thin wood veneer. However I wanted to make one that was all white with a high-gloss finish, and I wanted to be able to design my own font for the time display.</p>

  <p>I found the LOLShield kit for arduino and thought that looked perfect for the display. Ordered it and got to work soldering on all of those LED’s. <a href="http://jimmieprodgers.com/kits/lolshield/">LOLShield</a></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_1.jpg"></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_3.jpg"></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_4.jpg"></p>

  <p>Plugged it in and it all worked, first try! I did some homework on how the display worked to show custom graphics, it uses a charlieplexing library, and it reads in lines of binary that have been bit-shifted into decimal. This way it stores a 2-d array of 1’s and 0’s for on and off as a 1-d array of integers, which saves memory I suppose. So getting started creating the custom display graphics, first I made some interactive prototypes of the grid of pixels. I whipped up a couple of flash programs that let me click pixels on and off and export the data in a format that the arduino code would use to display my custom designed numbers. After I was pretty happy with the designs I exported all the data then realized that I was working with rows in portrait layout and the example code was working with landscape. Also I was counting my pixels backwards from the example as well so everything was showing up on the display rotated 90 degrees and mirrored. Fortunately this wasn’t too hard to fix in the code, just switched my loop statements around in a way such that they counted backwards and in the right direction for displaying the numbers as I had intended. Im actually just storing the large hour digits 1-12 and the small minute digits 0-9. Then I’m combining the 10’s and 1’s places for the minutes to create the full display output. <a href="http://www.arduino.cc/playground/Code/Charlieplex">Arduino Charlieplexing</a> <a href="http://jimmieprodgers.com/kits/lolshield/programlolshield/">LOLShield Programming</a></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_5.jpg"></p>

  <p>The next bit was building a case. I did a lot of searching for boxes online, and finally found one at TAP plastics that looked like a good place to start.</p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_7.jpg"></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_8.jpg"></p>

  <p>The first one I dropped and broke the hinge, then I dremmeled a hole on the wrong side and completly over-painted, the paint had to be much thinner for the led’s to shine through… So the second one I paid to get the holes drilled in the right places which turned out much better than my best dremmel job. I then proceeded to completely botch the second paint job.. OK, third time’s a charm; new box, re-painted, and it came out great! I love how it looks with the paint on the inside like a white cube had been incased in clear plastic.</p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_9.jpg"></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_10.jpg"></p>

  <p>Ok, back to the wiring; I had to re-locate the power supply connection to the back of the box, I found a surface mount power connector and soldered directly to the back of the arduino where the on-board power supply was attached. I also had to wire on two buttons for setting the hours and minutes. Fortunately for me there were 2 available analog inputs available still with the LOLShield, and I read online about how to setup buttons for de-bouncing to get a reliable reading from the buttons, using some code and a couple of 10k resistors. <a href="http://www.arduino.cc/en/Tutorial/Debounce">Arduino Debounce Tutorial</a></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_11.jpg"></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_13.jpg"></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_14.jpg"></p>

  <p>Finishing off the programming I decided that the on-board clock was close enough to accurate for me, I read that it may be off by a few seconds a day, but I didn’t want to go through the process of installing an RTC chip for a more accurate clock, although battery backup would be a pretty nice addition… So basically it counts milliseconds, and decides when to update the minutes and hours. And if a button is pressed for longer than half a second it starts adding minutes or hours, one every second to set the current time. It takes a little time holding down the minute button, but it gets the job done, and keeps pretty good time after a few weeks it’s still showing the same time as my phone.</p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_16.jpg"></p>
  <p><img src="http://aws.thisispete.com/images/play/electronics/white_block_clock/img_18.jpg"></p>

  <p>All in all I think it came out pretty rad. I added some rubber feet that gives it just an ever so slight tilt backwards, the box itself had a slight tilt forward. The LED’s aren’t quite as bright as they need to be for placing the clock in a sunny lit room, but it’s perfect for the bed-side table.</p>

  <p>© 2010 Peter Schirmer</p>

</div>
{% endblock%}