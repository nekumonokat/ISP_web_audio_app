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
let masterGain;
let masterVolSlider, resetMasterVolButton;
let panSlider, resetPanButton;
let rateSlider, resetRateButton;

// ===========================
// STAGE 2: EFFECT CONTROLS:
// ===========================

// LOW-PASS FILTER
let lowpass, lowpassGain, lowpassButton;
let lowpassFreqSlider, lowpassResonanceSlider;
let lowpassDryWetSlider, lowpassVolSlider;

// WAVESHAPER DISTORTION
let distortion, distortionGain, distortionButton;
let distortionAmountSlider;
let distortionOversampleSelect;
let distortionDryWetSlider, distortionVolSlider;

// DYNAMIC COMPRESSOR
let compressor, compressorGain, compressorButton;
let compressorAttackSlider, compressorKneeSlider, compressorReleaseSlider;
let compressorRatioSlider, compressorThresholdSlider;
let compressorDryWetSlider, compressorVolSlider;

// REVERB
let reverb, reverbGain, reverbButton;
let reverbDurationSlider, reverbDecayRateSlider;
let reverbDryWetSlider, reverbVolSlider;
let reverbReverseButton;

// SPECTRUM IN / OUT
let fft;

function preload() {
    brightSound = loadSound("sounds/476070__jjmarsan__hello-user-bright-cheery-intro-music.wav");
    industrialSound = loadSound("sounds/476072__jjmarsan__wax-track-industrial-idm-score-music.mp3");
    synthSound = loadSound("sounds/487440__jjmarsan__tattle-vintage-synth-industrial-loop.wav");

    // INITIALISING OF EFFECTS
    lowpass = new p5.LowPass();
    distortion = new p5.Distortion();
    compressor = new p5.Compressor();
    reverb = new p5.Reverb();

    // ADDING GAINS FOR EFFECTS - controls Gain
    lowpassGain = new p5.Gain();
    distortionGain = new p5.Gain();
    compressorGain = new p5.Gain();
    reverbGain = new p5.Gain();
    masterGain = new p5.Gain();

    // CONNECTING GAINS AND EFFECTS THRU CHAIN (sends output to gain)
    lowpass.connect(lowpassGain);       // Lowpass > LP Gain
    lowpassGain.connect(distortion);    // LP Gain > Distortion
    distortion.connect(distortionGain); // Distortion > Distortion Gain
    distortionGain.connect(compressor); // Distortion Gain > Compressor
    compressor.connect(compressorGain); // Compressor > Compressor Gain
    compressorGain.connect(reverb);     // Compressor Gain > Reverb
    reverb.connect(reverbGain);         // Reverb > Reverb Gain
    reverbGain.connect(masterGain);     // Reverb Gain > Master Gain
    masterGain.connect();               // Final Output

    // SETTING UP FFT FOR SPECTRUM DISPLAY
    fft = new p5.FFT();
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
    soundSelection();
    // PLAY-PAUSE, STOP AND LOOP BUTTONS
    playStopLoopButtons();
    
    // MASTER VOLUME, PANNING, AND SPEED
    // sliders for master controls
    masterVolPanSpeedSliders();
    // reset button for master controls
    masterResetButtons();

    // SKIPPING TO START AND END OF AUDIO
    skipButtons();
    // RECORD BUTTON
    recordAudioButton();

    // ===========================
    // STAGE 2: EFFECT CONTROLS:
    // ===========================

    // LOW-PASS FILTER
    lpFilterSetup();
    // WAVESHAPER DISTORTION
    distortSetup();
    // DYNAMIC COMPRESSOR
    compressorSetup();
    // REVERB
    reverbSetup();
    // SPECTRUM IN / OUT

}

function draw() {

    // ===========================
    // STAGE 1: PLAYBACK CONTROLS:
    // ===========================

    // MODIFICATIONS WHEN AUDIO IS CHANGED
    let soundChoice = soundSelect.value();
    
    if (soundChoice != prevSound) {
        // DISABLING EFFECTS
        if (lowPassEnabled) { applyLowPass(); }
        if (compressorEnabled) { applyCompressor(); }
        if (reverbEnabled) { applyReverb(); }
        if (distortionEnabled) { applyDistortion(); }

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
    stage1Draws();
    
    // CHANGING VOLUME OF AUDIO
    masterGain.amp(masterVolSlider.value());
    currSound.pan(panSlider.value());
    currSound.rate(rateSlider.value());

    // ===========================
    // STAGE 2: EFFECT CONTROLS:
    // ===========================

    // DRAWING TEXTS AND BOXES
    stage2Draws();

    // CHANGING LOW-PASS FILTER PARAMETERS
    lowPassParameters();
    // CHANGING DISTORTION PARAMETERS
    distortionParameters();
    // CHANGING DYNAMIC COMPRESSOR PARAMETERS
    compressorParameters();
    // CHANGING REVERB PARAMETERS
    reverbParameters();

}