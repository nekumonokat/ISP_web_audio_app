// THIS CONTAINS ALL CREATION OF SLIDERS AND BUTTONS

// ===========================
// STAGE 1: PLAYBACK CONTROLS:
// ===========================

// AUDIO SELECTION DROPDOWN MENU
function soundSelection() {
    soundSelect = createSelect();
    soundSelect.position(105, 20);
    // adding audio selections
    soundSelect.option("Bright Cheery Intro Music");
    soundSelect.option("Industrial IDM Score Music");
    soundSelect.option("Vintage Synth Music");
    // adding recorded audio selection as disabled
    soundSelect.option("Recorded Audio");
    soundSelect.disable("Recorded Audio");
    // adding default selection
    soundSelect.selected("Bright Cheery Intro Music");
    currSound = brightSound;
    prevSound = "Bright Cheery Intro Music";
}

// PLAY-PAUSE, STOP AND LOOP BUTTONS
function playStopLoopButtons() {
    // play-pause button
    playPauseButton = createButton("PLAY");
    playPauseButton.position(20, 50);
    playPauseButton.mousePressed(playPauseSound);
    playPauseButton.style("width", "80px");
    playPauseButton.style("background", "RGB(0, 255, 0)");
    playPauseButton.addClass("button");
    // stop button
    stopButton = createButton("STOP");
    stopButton.position(105, 50);
    stopButton.mousePressed(stopSound);
    stopButton.style("width", "60px");
    stopButton.style("background", "RGB(234, 43, 31)");
    stopButton.addClass("button");
    // loop button (default OFF)
    loopButton = createButton("LOOP OFF");
    loopButton.position(170, 50);
    loopButton.mousePressed(loopToggle);
    loopButton.style("width", "90px");
    loopButton.style("background", "RGB(53, 167, 255)");
    loopButton.addClass("button");
    loopOn = false;
}

// MASTER AUDIO SETTINGS
function masterVolPanSpeedSliders() {
    // master volume slider
    masterVolSlider = createSlider(0, 1, 1, 0.01);
    masterVolSlider.position(105, 85);
    masterVolSlider.addClass("slider");
    // audio panning slider
    panSlider = createSlider(-1, 1, 0, 0.01);
    panSlider.position(105, 115);
    panSlider.addClass("slider");
    // audio speed slider
    rateSlider = createSlider(-1, 2, 1, 0.01);
    rateSlider.position(105, 145);
    rateSlider.addClass("slider");
}

// RESETTING AUDIO SETTINGS
function masterResetButtons() {
    // creating buttons
    resetMasterVolButton = createButton("RESET");
    resetPanButton = createButton("RESET");
    resetRateButton = createButton("RESET");
    // setting positions
    resetMasterVolButton.position(285, 85);
    resetPanButton.position(285, 115);
    resetRateButton.position(285, 145);
    // setting action
    resetMasterVolButton.mousePressed(resetMasterVol);
    resetPanButton.mousePressed(resetPan);
    resetRateButton.mousePressed(resetRate);
    // setting style
    resetMasterVolButton.addClass("resetButton")
    resetPanButton.addClass("resetButton")
    resetRateButton.addClass("resetButton")
}

// SKIPPING TO START AND END OF AUDIO
function skipButtons() {
    // moving to beginnning of audio
    skipToStartButton = createButton("SKIP TO START");
    skipToStartButton.position(20, 180);
    skipToStartButton.mousePressed(skipToStart);
    skipToStartButton.addClass("skipButton");
    // moving to end of audio
    skipToEndButton = createButton("SKIP TO END");
    skipToEndButton.position(140, 180);
    skipToEndButton.mousePressed(skipToEnd);
    skipToEndButton.addClass("skipButton");
}

// RECORD BUTTON
function recordAudioButton() {
    recordButton = createButton("RECORD");
    recordButton.position(260, 180);
    recordButton.mousePressed(recordAudio);
    recordButton.addClass("recordButton");
}

// ===========================
// STAGE 2: EFFECT CONTROLS:
// ===========================

// LOW-PASS FILTER
function lpFilterSetup() {
    let diff1 = 30, origin1 = 405;
    // enable button
    lowpassButton = createButton("ENABLE");
    lowpassButton.position(430, 160);
    lowpassButton.mousePressed(applyLowPass);
    lowpassButton.addClass("applyButton");
    lowpassButton.style("width", "115px");
    // low-pass frequency
    lowpassFreqSlider = createSlider(100, 22050, 500, 10);
    lowpassFreqSlider.position(origin1, 90);
    lowpassFreqSlider.addClass("effectSlider");
    // low-pass resonance
    lowpassResonanceSlider = createSlider(0, 10, 5, 1);
    lowpassResonanceSlider.position(origin1+diff1*1, 90);
    lowpassResonanceSlider.addClass("effectSlider");
    // low-pass dry-wet
    lowpassDryWetSlider = createSlider(0, 1, 0.8, 0.1);
    lowpassDryWetSlider.position(origin1+diff1*2, 90);
    lowpassDryWetSlider.addClass("effectSlider");
    // low-pass volume
    lowpassVolSlider = createSlider(0, 1, 0.5, 0.01);
    lowpassVolSlider.position(origin1+diff1*3, 90);
    lowpassVolSlider.addClass("effectSlider");
}

// DYNAMIC COMPRESSOR
function compressorSetup() {
    let diff2 = 28, origin2 = 546;
    // enable button
    compressorButton = createButton("ENABLE");
    compressorButton.position(575, 160);
    compressorButton.mousePressed(applyCompressor);
    compressorButton.addClass("applyButton");
    compressorButton.style("width", "180px");
    // compressor attack
    compressorAttackSlider = createSlider(0, 1, 0.003, 0.001);
    compressorAttackSlider.position(origin2, 90);
    compressorAttackSlider.addClass("effectSlider");
    // compressor knee
    compressorKneeSlider = createSlider(0, 40, 30);
    compressorKneeSlider.position(origin2+diff2, 90);
    compressorKneeSlider.addClass("effectSlider");
    // compressor release
    compressorReleaseSlider = createSlider(0, 1, 0.25, 0.01);
    compressorReleaseSlider.position(origin2+diff2*2, 90);
    compressorReleaseSlider.addClass("effectSlider");
    // compressor ratio
    compressorRatioSlider = createSlider(1, 20, 12);
    compressorRatioSlider.position(origin2+diff2*3, 90);
    compressorRatioSlider.addClass("effectSlider");
    // compressor threshold
    compressorThresholdSlider = createSlider(-100, 0, -24);
    compressorThresholdSlider.position(origin2+diff2*4, 90);
    compressorThresholdSlider.addClass("effectSlider");
    // compressor dry-wet
    compressorDryWetSlider = createSlider(0, 1, 0.8, 0.1);
    compressorDryWetSlider.position(origin2+diff2*5, 90);
    compressorDryWetSlider.addClass("effectSlider");
    // compressor volume
    compressorVolSlider = createSlider(0, 1, 0.5, 0.01);
    compressorVolSlider.position(origin2+diff2*6, 90);
    compressorVolSlider.addClass("effectSlider");
}

function reverbSetup() {
    let diff3 = 30, origin3 = 405;
    // enable button
    reverbButton = createButton("ENABLE");
    reverbButton.position(430, 340);
    reverbButton.mousePressed(applyReverb);
    reverbButton.addClass("applyButton");
    reverbButton.style("width", "150px");
    // reverb duration
    reverbDurationSlider = createSlider(1, 10, 3);
    reverbDurationSlider.position(origin3, 270);
    reverbDurationSlider.addClass("effectSlider");
    // reverb decay rate
    reverbDecayRateSlider = createSlider(1, 10, 2);
    reverbDecayRateSlider.position(origin3+diff3*1, 270);
    reverbDecayRateSlider.addClass("effectSlider");
    // reverb dry-wet
    reverbDryWetSlider = createSlider(0, 1, 0.8, 0.1);
    reverbDryWetSlider.position(origin3+diff3*2, 270);
    reverbDryWetSlider.addClass("effectSlider");
    // reverb volume
    reverbVolSlider = createSlider(0, 1, 0.5, 0.01);
    reverbVolSlider.position(origin3+diff3*3, 270);
    reverbVolSlider.addClass("effectSlider");
    // reverb reverse button
    reverbReverseButton = createButton("O");
    reverbReverseButton.position(554, 250);
    reverbReverseButton.mousePressed(reverbReverse);
    reverbReverseButton.addClass("revButton");
    reverbReverseButton.style("background", "RGB(234, 43, 31)");
}

function distortSetup() {
    let diff4 = 30, origin4 = 505;
    // enable button
    distortionButton = createButton("ENABLE");
    distortionButton.position(610, 340);
    distortionButton.mousePressed(applyDistortion);
    distortionButton.addClass("applyButton");
    distortionButton.style("width", "150px");
}

// function spectrumSetup() {
//     pass
// }