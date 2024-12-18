// THIS CONTAINS ALL EFFECT FUNCTIONS

// TO TOGGLE EACH FILTER ON / OFF
let lowPassEnabled = false;

function applyLowPass() {
    if (!lowPassEnabled) {
        // disconnecting original audio from output
        currSound.disconnect();
        // connecting audio to lowpass filter
        currSound.connect(lowpass);
        // connecting lowpassGain
        lowpass.connect(lowpassGain);

        lowPassEnabled = true;
        lowpassButton.html("DISABLE");
    }

    else {
        // disconnecting from lowpass filter
        currSound.disconnect();
        // reconnecting audio directly
        currSound.connect();

        lowPassEnabled = false;
        lowpassButton.html("ENABLE");
    }
}

function applyCompressor() {
    pass
}