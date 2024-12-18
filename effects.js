// THIS CONTAINS ALL EFFECT FUNCTIONS

// TO TOGGLE EACH EFFECT ON / OFF
let lowPassEnabled = false;
let compressorEnabled = false;

function applyLowPass() {
    if (!lowPassEnabled) {
        // disconnecting original audio from output
        currSound.disconnect();
        // connecting audio to lowpass filter
        currSound.connect(lowpass);
        // connecting effect's gain
        lowpass.connect(lowpassGain);
        lowpassGain.connect();

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
    if (!compressorEnabled) {
        // disconnecting original audio from output
        currSound.disconnect();
        // connecting audio to compressor
        currSound.connect(compressor);
        // connecting effect's gain
        compressor.connect(compressorGain);
        compressorGain.connect();
    
        compressorEnabled = true;
        compressorButton.html("DISABLE");
    }
    
    else {
        // disconnecting from compressor
        currSound.disconnect();
        // reconnecting audio directly
        currSound.connect();
    
        compressorEnabled = false;
        compressorButton.html("ENABLE");
    }
}