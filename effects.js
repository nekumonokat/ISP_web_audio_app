// THIS CONTAINS ALL EFFECT FUNCTIONS

// TO TOGGLE EACH EFFECT ON / OFF
let lowPassEnabled = false;
let compressorEnabled = false;
let reverbEnabled = false;
let reverbReverseEnabled = false;
let distortionEnabled = false;

// ============================
// 1: MODIFY EFFECT PARAMETERS:
// ============================

// CHANGING LOW-PASS FILTER PARAMETERS
function lowPassParameters() {
    if (lowPassEnabled) {
        text("Using lowpass", 170, 390);
        lowpass.freq(lowpassFreqSlider.value());
        lowpass.res(lowpassResonanceSlider.value());
        lowpass.drywet(lowpassDryWetSlider.value());
        lowpassGain.amp(lowpassVolSlider.value());
    }
}

// CHANGING DYNAMIC COMPRESSOR PARAMETERS
function compressorParameters() {
    if (compressorEnabled) {
        text("Using compressor", 170, 390);
        compressor.set(
            compressorAttackSlider.value(),
            compressorKneeSlider.value(),
            compressorRatioSlider.value(),
            compressorThresholdSlider.value(),
            compressorReleaseSlider.value()
        );
        compressor.drywet(compressorDryWetSlider.value());
        compressorGain.amp(compressorVolSlider.value());
    }
}

// CHANGING REVERB PARAMETERS
function reverbParameters() {
    if (reverbEnabled) {
        text("Using reverb", 170, 390);

        // REVERB REVERSE CAUSES ISSUES, WILL NOT USE
        // reverb.set(
        //     reverbDurationSlider.value(),
        //     reverbDecayRateSlider.value(),
        //     reverbReverseEnabled
        // );
        // reverb.drywet(reverbDryWetSlider.value());
        // reverbGain.amp(reverbVolSlider.value());

        reverb.set(
            reverbDurationSlider.value(),
            reverbDecayRateSlider.value()
        );
        reverb.drywet(reverbDryWetSlider.value());
        reverbGain.amp(reverbVolSlider.value());
    }
}

function distortionParameters() {
    if (distortionEnabled) {
        text("Using distortion", 170, 390);

        distortion.set(
            distortionAmountSlider.value(),
            distortionOversampleSelect.value()
        )
        distortion.drywet(distortionDryWetSlider.value());
        distortionGain.amp(distortionVolSlider.value());
    }
}

// ============================
// 2: APPLY EFFECTS:
// ============================

function applyLowPass() {
    if (!lowPassEnabled) {
        // disable all other effects
        if (compressorEnabled) { applyCompressor(); }
        if (reverbEnabled) { applyReverb(); }
        if (distortionEnabled) { applyDistortion(); }
        
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
        // disable all other effects
        if (lowPassEnabled) { applyLowPass(); }
        if (reverbEnabled) { applyReverb(); }
        if (distortionEnabled) { applyDistortion(); }

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
        // disable all other effects
        if (lowPassEnabled) { applyLowPass(); }
        if (compressorEnabled) { applyCompressor(); }
        if (distortionEnabled) { applyDistortion(); }

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
    // disable all other effects
        if (lowPassEnabled) { applyLowPass(); }
        if (compressorEnabled) { applyCompressor(); }
        if (reverbEnabled) { applyReverb(); }

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