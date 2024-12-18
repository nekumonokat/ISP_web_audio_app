// initialising sounds
let soundSelect, currSound, prevSound;
let brightSound, industrialSound, synthSound;

// ===========================
// STAGE 1: PLAYBACK CONTROLS:
// ===========================

// recording elements
let mic, recorder;
let soundFile;
// 0: idle, 1: recording, 2: playback ready
let state = 0;

// buttons
let playPauseButton, stopButton;
let skipToStartButton, skipToEndButton;
let loopButton, loopOn;
let recordButton;

// sliders
let masterVolSlider;
let resetMasterVolButton;
let panSlider;
let resetPanButton;
let rateSlider;
let resetRateButton;

// ===========================
// STAGE 2: EFFECT CONTROLS:
// ===========================

// LOW-PASS FILTER
let lowpass, lowpassGain, lowpassButton;
let lowpassFreqSlider, lowpassResonanceSlider;
let lowpassDryWetSlider, lowpassVolSlider;

// DYNAMIC COMPRESSOR
let compressor, compressorGain, compressorButton;
let compressorAttackSlider, compressorKneeSlider, compressorReleaseSlider;
let compressorRatioSlider, compressorThresholdSlider;
let compressorDryWetSlider, compressorVolSlider;

// REVERB
let reverb, reverbGain, reverbButton;

// WAVESHAPER DISTORTION
let distortion, distortionGain, distortionButton;

// SPECTRUM IN / OUT

function preload() {
    brightSound = loadSound("sounds/476070__jjmarsan__hello-user-bright-cheery-intro-music.wav");
    industrialSound = loadSound("sounds/476072__jjmarsan__wax-track-industrial-idm-score-music.mp3");
    synthSound = loadSound("sounds/487440__jjmarsan__tattle-vintage-synth-industrial-loop.wav");

    // USING OF EFFECTS
    lowpass = new p5.LowPass();
    compressor = new p5.Compressor();
    reverb = new p5.Reverb();
    distortion = new p5.Distortion();

    // ADDING GAINS FOR EFFECTS - used to control volume of each component
    // creating gains
    lowpassGain = new p5.Gain();
    compressorGain = new p5.Gain();
    reverbGain = new p5.Gain();
    distortionGain = new p5.Gain();
    // connecting gains to effects (sends output to gain)
    lowpass.connect(lowpassGain);
    compressor.connect(compressorGain);
    reverb.connect(reverbGain);
    distortion.connect(distortionGain);
    // connecting gains
    lowpassGain.connect();
    compressorGain.connect();
    reverbGain.connect();
    distortionGain.connect();
}

function setup() {

    createCanvas(800, 400);
    background(128, 138, 159);

    // ===========================
    // STAGE 1: PLAYBACK CONTROLS:
    // ===========================

    // MIC SETUP - may not work in certain browsers
    mic = new p5.AudioIn();
    mic.start();
    // setting input for recorder to be the mic
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    // creates empty audio container
    soundFile = new p5.SoundFile();

    // AUDIO SELECTION DROPDOWN MENU
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

    // PLAY-PAUSE BUTTON
    playPauseButton = createButton("PLAY");
    playPauseButton.position(20, 50);
    playPauseButton.mousePressed(playPauseSound);
    playPauseButton.style("width", "80px");
    playPauseButton.style("background", "RGB(0, 255, 0)");
    playPauseButton.addClass("button");

    // STOP BUTTON
    stopButton = createButton("STOP");
    stopButton.position(105, 50);
    stopButton.mousePressed(stopSound);
    stopButton.style("width", "60px");
    stopButton.style("background", "RGB(234, 43, 31)");
    stopButton.addClass("button");
    
    // LOOP BUTTON (DEFAULT OFF)
    loopButton = createButton("LOOP OFF");
    loopButton.position(170, 50);
    loopButton.mousePressed(loopToggle);
    loopButton.style("width", "90px");
    loopButton.style("background", "RGB(53, 167, 255)");
    loopButton.addClass("button");
    loopOn = false;
    
    // VOLUME SLIDER
    masterVolSlider = createSlider(0, 1, 1, 0.01);
    masterVolSlider.position(105, 85);
    masterVolSlider.addClass("slider");
    
    // AUDIO PANNING SLIDER
    panSlider = createSlider(-1, 1, 0, 0.01);
    panSlider.position(105, 115);
    panSlider.addClass("slider");
    
    // AUDIO SPEED SLIDER
    rateSlider = createSlider(-1, 2, 1, 0.01);
    rateSlider.position(105, 145);
    rateSlider.addClass("slider");
    
    // RESETTING AUDIO SETTINGS
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

    // SKIPPING TO START AND END OF AUDIO
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

    // RECORD BUTTON
    recordButton = createButton("RECORD");
    recordButton.position(260, 180);
    recordButton.mousePressed(recordAudio);
    recordButton.addClass("recordButton");

    // ===========================
    // STAGE 2: EFFECT CONTROLS:
    // ===========================

    // LOW-PASS FILTER
    let diff1 = 30, origin1 = 405;
    lowpassButton = createButton("ENABLE");
    lowpassButton.position(430, 160);
    lowpassButton.mousePressed(applyLowPass);
    lowpassButton.addClass("applyButton");
    lowpassButton.style("width", "115px");
    
    lowpassFreqSlider = createSlider(100, 22050, 500, 10);
    lowpassFreqSlider.position(origin1, 90);
    lowpassFreqSlider.addClass("effectSlider");
    
    lowpassResonanceSlider = createSlider(0, 10, 5, 1);
    lowpassResonanceSlider.position(origin1+diff1*1, 90);
    lowpassResonanceSlider.addClass("effectSlider");
    
    lowpassDryWetSlider = createSlider(0, 1, 0.8, 0.1);
    lowpassDryWetSlider.position(origin1+diff1*2, 90);
    lowpassDryWetSlider.addClass("effectSlider");
    
    lowpassVolSlider = createSlider(0, 1, 0.5, 0.01);
    lowpassVolSlider.position(origin1+diff1*3, 90);
    lowpassVolSlider.addClass("effectSlider");
    
    // DYNAMIC COMPRESSOR
    let diff2 = 28, origin2 = 546;
    compressorButton = createButton("ENABLE");
    compressorButton.position(575, 160);
    compressorButton.mousePressed(applyCompressor);
    compressorButton.addClass("applyButton");
    compressorButton.style("width", "180px");

    compressorAttackSlider = createSlider(0, 1, 0.003, 0.001);
    compressorAttackSlider.position(origin2, 90);
    compressorAttackSlider.addClass("effectSlider");

    compressorKneeSlider = createSlider(0, 40, 30);
    compressorKneeSlider.position(origin2+diff2, 90);
    compressorKneeSlider.addClass("effectSlider");

    compressorReleaseSlider = createSlider(0, 1, 0.25, 0.01);
    compressorReleaseSlider.position(origin2+diff2*2, 90);
    compressorReleaseSlider.addClass("effectSlider");

    compressorRatioSlider = createSlider(1, 20, 12);
    compressorRatioSlider.position(origin2+diff2*3, 90);
    compressorRatioSlider.addClass("effectSlider");

    compressorThresholdSlider = createSlider(-100, 0, -24);
    compressorThresholdSlider.position(origin2+diff2*4, 90);
    compressorThresholdSlider.addClass("effectSlider");

    compressorDryWetSlider = createSlider(0, 1, 0.8, 0.1);
    compressorDryWetSlider.position(origin2+diff2*5, 90);
    compressorDryWetSlider.addClass("effectSlider");

    compressorVolSlider = createSlider(0, 1, 0.5, 0.01);
    compressorVolSlider.position(origin2+diff2*6, 90);
    compressorVolSlider.addClass("effectSlider");

    // REVERB
    // WAVESHAPER DISTORTION
    // SPECTRUM IN / OUT

}

function draw() {

    // ===========================
    // STAGE 1: PLAYBACK CONTROLS:
    // ===========================
    let soundChoice = soundSelect.value();
    
    if (soundChoice != prevSound) {
        // DISABLING EFFECTS
        applyLowPass();
        applyCompressor();

        // STOPPING AUDIO IF DIFFERENT SELECTION
        if (currSound.isPlaying()) {
            currSound.stop();
        }
        playPauseButton.html("PLAY");
        playPauseButton.style("background", "RGB(0, 255, 0)");
        
        // CHANGING AUDIO USED
        if (soundChoice == "Bright Cheery Intro Music") {
            currSound = brightSound;
        }
        else if (soundChoice == "Industrial IDM Score Music") {
            currSound = industrialSound;
        }
        else if (soundChoice == "Vintage Synth Music") {
            currSound = synthSound;
        }
        prevSound = soundChoice;
        
        // SETTING currSound's LOOP
        currSound.setLoop(loopOn);
    }

    // CHANGING BUTTON IF AUDIO IS DONE
    if (!currSound.isPlaying()) {
        playPauseButton.html("PLAY");
        playPauseButton.style("background", "RGB(0, 255, 0)");
    }
    
    // DRAWING TEXTS AND SLIDER VALUES
    // all texts have to be done here
    background(128, 138, 159);
    text("Audio Select:", 20, 35);
    text("Audio Volume:", 20, 100);
    // fixed some values that glitch to decimals
    text(Math.round(masterVolSlider.value()*100), 250, 100);
    text("Audio Pan:", 20, 130);
    text(panSlider.value(), 250, 130);
    text("Audio Speed:", 20, 160);
    text(rateSlider.value(), 250, 160);
    // text for recording state
    text("Recording State:", 20, 230);
    states = ["Idle / Playing & Storing Audio", "Recording", "Ready for Use"]
    text(states[state], 120, 230);
    
    // CHANGING VOLUME OF AUDIO
    currSound.setVolume(masterVolSlider.value());
    currSound.pan(panSlider.value());
    currSound.rate(rateSlider.value());

    // ===========================
    // STAGE 2: EFFECT CONTROLS:
    // ===========================

    // DRAWING TEXTS, BOXES AND SLIDER VALUES
    push();
        noFill();
        // for filters
        rect(420, 20, 135, 170);
        rect(565, 20, 205, 170);
        rect(420, 200, 170, 170);
        rect(600, 200, 170, 170);
        // for spectrum drawing
        rect(20, 250, 180, 120);
        rect(220, 250, 180, 120);
    pop();

    // for filters
    text("LOW-PASS FILTER", 430, 40);
    text("DYNAMIC COMPRESSOR", 575, 40);
    text("REVERB", 430, 220);
    text("DISTORTION", 610, 220);
    // for spectrum drawing
    text("SPECTRUM IN", 30, 270);
    text("SPECTRUM OUT", 230, 270);

    push();
        textSize(9);
        // LOW-PASS FILTER
        text("Freq", 432, 60);
        text("Res", 464, 60);
        text("Wet", 493, 60);
        text("Dry", 496, 149);
        text("Vol", 525, 60);
        // DYNAMIC COMPRESSOR
        text("Attack", 571, 60);
        text("Knee", 600, 60);
        text("Rel", 631, 60);
        text("Ratio", 656, 60);
        text("Thres", 682, 60);
        text("Wet", 714, 60);
        text("Dry", 717, 149);
        text("Vol", 743, 60);
        // REVERB
        // WAVESHAPER DISTORTION
        // SPECTRUM IN / OUT
    pop();

    // CHANGING LOW-PASS FILTER PARAMETERS
    lowpass.freq(lowpassFreqSlider.value());
    lowpass.res(lowpassResonanceSlider.value());
    lowpass.drywet(lowpassDryWetSlider.value());
    lowpassGain.amp(lowpassVolSlider.value());

    // CHANGING DYNAMIC COMPRESSOR PARAMETERS
    compressor.attack(compressorAttackSlider.value());
    compressor.knee(compressorKneeSlider.value());
    compressor.release(compressorReleaseSlider.value());
    compressor.ratio(compressorRatioSlider.value());
    compressor.threshold(compressorThresholdSlider.value());
    compressor.drywet(compressorDryWetSlider.value());
    compressorGain.amp(compressorVolSlider.value());
    
}