// THIS CONTAINS ALL EFFECT FUNCTIONS

// TO TOGGLE EACH EFFECT ON / OFF
let lowPassEnabled = false;
let compressorEnabled = false;
let reverbEnabled = false;
let reverbReverseEnabled = false;
let distortionEnabled = false;

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

function applyReverb() {
    if (!reverbEnabled) {
        // disconnecting original audio from output
        currSound.disconnect();
        // connecting audio to reverb
        currSound.connect(reverb);
        // connecting effect's gain
        reverb.connect(reverbGain);
        reverbGain.connect();
    
        reverbEnabled = true;
        reverbButton.html("DISABLE");
    }
    
    else {
        // disconnecting from reverb
        currSound.disconnect();
        // reconnecting audio directly
        currSound.connect();
    
        reverbEnabled = false;
        reverbButton.html("ENABLE");
    }
}

function reverbReverse() {
    if (!reverbReverseEnabled) {
        // turn on reverse
        reverbReverseEnabled = true;
        reverbReverseButton.html("I");
        reverbReverseButton.style("background", "RGB(0, 255, 0)");
    }
    
    else {
        // turn off reverse
        reverbReverseEnabled = false;
        reverbReverseButton.html("O");
        reverbReverseButton.style("background", "RGB(234, 43, 31)");
    }
}

function applyDistortion() {
    if (!distortionEnabled) {
        // disconnecting original audio from output
        currSound.disconnect();
        // connecting audio to distortion
        currSound.connect(distortion);
        // connecting effect's gain
        distortion.connect(distortionGain);
        distortionGain.connect();
    
        distortionEnabled = true;
        distortionButton.html("DISABLE");
    }
    
    else {
        // disconnecting from distortion
        currSound.disconnect();
        // reconnecting audio directly
        currSound.connect();
    
        distortionEnabled = false;
        distortionButton.html("ENABLE");
    }
}