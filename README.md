ISP web-based audio application that works with different filter effects.

The base code is from Coursera, with modifications to make sure that the application is smooth when being used.
Added "RESET" buttons so that users can reset how loud the song is, the panning, and speed of the audio.

NOTES:
Since there was a lot of code in main.js (originally known as index.js), I created the following:
- controls.js: contains all playback controls
- draws.js: contains all drawing related sections
- effects.js: contains all effect functions
- setups.js: contains all creation of sliders and buttons

ISSUES FOUND:
When considering the reversing, if I put it to reverb.set(), which is where it is meant to be at, the application crashes. However if I put it as reverb.reverse() which does not exist, the code can run, but the state of whether reverb is enabled or disabled does not work properly. Due to time constraints, I will not be able to fix this since there is no research on my end that can help me solve this.