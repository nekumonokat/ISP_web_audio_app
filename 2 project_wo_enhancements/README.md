ISP web-based audio application that works with different filter effects.

NOTE: THIS IS THE CODE THAT DOES NOT HAVE ENHANCEMENT OF FILTER SELECTION. THERE IS A BUG IN FILTER SELECTION CAUSING THE FILTER TO ONLY WORK IF I CLICK "DISABLE" THEN "ENABLE AGAIN". IF I CANNOT FIX IT, THIS IS PROOF THAT THE FILTERING WORKS

The base code is from Coursera, with modifications to make sure that the application is smooth when being used.
Added "RESET" buttons so that users can reset how loud the song is, the panning, and speed of the audio.

NOTES:
1. Since there was a lot of code in main.js (originally known as index.js), I created the following:
    - setups.js: contains all creation of sliders and buttons
    - draws.js: contains all drawing related sections
    - controls.js: contains all playback controls
    - effects.js: contains all effect functions
2. Since I want only 1 effect to take place at a time, I disable original effect right when I enable new effect

ISSUES FOUND:
When considering the reversing, if I put it to reverb.set(), which is where it is meant to be at, the application crashes. However if I put it as reverb.reverse() which does not exist, the code can run, but the state of whether reverb is enabled or disabled does not work properly. Due to time constraints, I will not be able to fix this since there is no research on my end that can help me solve this.