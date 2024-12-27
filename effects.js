// THIS CONTAINS ALL EFFECT FUNCTIONS

// TO TOGGLE EACH EFFECT ON / OFF
let filterEnabled = false;
let compressorEnabled = false;
let reverbEnabled = false;
let reverbReverseEnabled = false;
let distortionEnabled = false;

// ============================
// 1: MODIFY EFFECT PARAMETERS:
// ============================

// CHANGING FILTER PARAMETERS
function filterParameters() {
    if (filterEnabled) {
        let filterType = filterSelect.value();

        // disable filter if filter type changed
        if (filterType != prevFilterSelect) {
            prevFilterSelect = filterType;
            applyFilter();
        }

        if (filterType == "lowpass") {
            text("Using lowpass", 170, 390);
            lowpass.freq(filterFreqSlider.value());
            lowpass.res(filterResonanceSlider.value());
            lowpass.drywet(filterDryWetSlider.value());
            lowpassGain.amp(filterVolSlider.value());
        }

        else if (filterType == "highpass") {
            text("Using highpass", 170, 390);
            highpass.freq(filterFreqSlider.value());
            highpass.res(filterResonanceSlider.value());
            highpass.drywet(filterDryWetSlider.value());
            highpassGain.amp(filterVolSlider.value());
        }

        else if (filterType == "bandpass") {
            text("Using bandpass", 170, 390);
            bandpass.freq(filterFreqSlider.value());
            bandpass.res(filterResonanceSlider.value());
            bandpass.drywet(filterDryWetSlider.value());
            bandpassGain.amp(filterVolSlider.value());
        }
        
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

function applyFilter() {
    if (!filterEnabled) {
        // disable all other effects
        if (compressorEnabled) { applyCompressor(); }
        if (reverbEnabled) { applyReverb(); }
        if (distortionEnabled) { applyDistortion(); }
        
        // disconnecting original audio from output
        currSound.disconnect();
        let filterType = filterSelect.value();

        if (filterType == "lowpass") {
            // connecting audio to lowpass filter
            currSound.connect(lowpass);
            // connecting effect's gain
            lowpass.connect(lowpassGain);
            lowpassGain.connect();
            // connecting effect to fftOut
            fftOut.setInput(lowpassGain);
        }
        
        else if (filterType == "highpass") {
            // connecting audio to highpass filter
            currSound.connect(highpass);
            // connecting effect's gain
            highpass.connect(highpassGain);
            highpassGain.connect();
            // connecting effect to fftOut
            fftOut.setInput(highpassGain);
        }

        else if (filterType == "bandpass") {
            // connecting audio to bandpass filter
            currSound.connect(bandpass);
            // connecting effect's gain
            bandpass.connect(bandpassGain);
            bandpassGain.connect();
            // connecting effect to fftOut
            fftOut.setInput(bandpassGain);
        }

        filterEnabled = true;
        filterButton.html("DISABLE");
    }

    else {
        // disconnecting from lowpass filter
        currSound.disconnect();
        // reconnecting audio directly
        currSound.connect();
        // disconnecting effect from fftOut
        fftOut.setInput(null);

        filterEnabled = false;
        filterButton.html("ENABLE");
    }
}

function applyCompressor() {
    if (!compressorEnabled) {
        // disable all other effects
        if (filterEnabled) { applyFilter(); }
        if (reverbEnabled) { applyReverb(); }
        if (distortionEnabled) { applyDistortion(); }

        // disconnecting original audio from output
        currSound.disconnect();
        // connecting audio to compressor
        currSound.connect(compressor);
        // connecting effect's gain
        compressor.connect(compressorGain);
        compressorGain.connect();
        // connecting effect to fftOut
        fftOut.setInput(compressorGain);
    
        compressorEnabled = true;
        compressorButton.html("DISABLE");
    }
    
    else {
        // disconnecting from compressor
        currSound.disconnect();
        // reconnecting audio directly
        currSound.connect();
        // disconnecting effect from fftOut
        fftOut.setInput(null);
    
        compressorEnabled = false;
        compressorButton.html("ENABLE");
    }
}

function applyReverb() {
    if (!reverbEnabled) {
        // disable all other effects
        if (filterEnabled) { applyFilter(); }
        if (compressorEnabled) { applyCompressor(); }
        if (distortionEnabled) { applyDistortion(); }

        // disconnecting original audio from output
        currSound.disconnect();
        // connecting audio to reverb
        currSound.connect(reverb);
        // connecting effect's gain
        reverb.connect(reverbGain);
        reverbGain.connect();
        // connecting effect to fftOut
        fftOut.setInput(reverbGain);
    
        reverbEnabled = true;
        reverbButton.html("DISABLE");
    }
    
    else {
        // disconnecting from reverb
        currSound.disconnect();
        // reconnecting audio directly
        currSound.connect();
        // disconnecting effect from fftOut
        fftOut.setInput(null);
    
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
        if (filterEnabled) { applyFilter(); }
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
        // connecting effect to fftOut
        fftOut.setInput(distortionGain);
    
        distortionEnabled = true;
        distortionButton.html("DISABLE");
    }
    
    else {
        // disconnecting from distortion
        currSound.disconnect();
        // reconnecting audio directly
        currSound.connect();
        // disconnecting effect from fftOut
        fftOut.setInput(null);
    
        distortionEnabled = false;
        distortionButton.html("ENABLE");
    }
}

function drawSpectrum(spectrum, x, y, colour) {
    push();
        noFill();
        stroke(colour);
        strokeWeight(2);

        beginShape();
        for (let i = 0; i < spectrum.length; i++) {
            let xPos = map(i, 0, spectrum.length, x, x+180);
            let yPos = map(spectrum[i], 0, 255, y+120, y);
            vertex(xPos, yPos);
        }
        endShape();
    pop();
}