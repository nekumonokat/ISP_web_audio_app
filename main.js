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
let masterVolSlider, resetMasterVolButton;
let panSlider, resetPanButton;
let rateSlider, resetRateButton;

// ===========================
// STAGE 2: EFFECT CONTROLS:
// ===========================

// // LOW-PASS FILTER
// let lowpass, lowpassGain, filterButton;
// let filterFreqSlider, filterResonanceSlider;
// let filterDryWetSlider, filterVolSlider;

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

// WAVESHAPER DISTORTION
let distortion, distortionGain, distortionButton;
let distortionAmountSlider;
let distortionOversampleSelect;
let distortionDryWetSlider, distortionVolSlider;

// SPECTRUM IN / OUT
let fftIn, fftOut;

// ===========================
// STAGE 3: ENHANCEMENTS:
// ===========================

// FILTERS (LP, HP, BP)
// creating each filter and their gains
let lowpass, lowpassGain;
let highpass, highpassGain;
let bandpass, bandpassGain;
// modifying the buttons and sliders to control filters
let filterButton, filterSelect;
let filterFreqSlider, filterResonanceSlider;
let filterDryWetSlider, filterVolSlider;
let prevFilterSelect;

function preload() {
    brightSound = loadSound("sounds/476070__jjmarsan__hello-user-bright-cheery-intro-music.wav");
    industrialSound = loadSound("sounds/476072__jjmarsan__wax-track-industrial-idm-score-music.mp3");
    synthSound = loadSound("sounds/487440__jjmarsan__tattle-vintage-synth-industrial-loop.wav");

    // USING OF EFFECTS
    lowpass = new p5.LowPass();
    highpass = new p5.HighPass();
    bandpass = new p5.BandPass();
    compressor = new p5.Compressor();
    reverb = new p5.Reverb();
    distortion = new p5.Distortion();

    // ADDING GAINS FOR EFFECTS - controls Gain
    // creating gains
    lowpassGain = new p5.Gain();
    highpassGain = new p5.Gain();
    bandpassGain = new p5.Gain();
    compressorGain = new p5.Gain();
    reverbGain = new p5.Gain();
    distortionGain = new p5.Gain();
    // connecting gains to effects (sends output to gain)
    lowpass.connect(lowpassGain);
    highpass.connect(highpassGain);
    bandpass.connect(bandpassGain);
    compressor.connect(compressorGain);
    reverb.connect(reverbGain);
    distortion.connect(distortionGain);
    // connecting gains
    lowpassGain.connect();
    highpassGain.connect();
    bandpassGain.connect();
    compressorGain.connect();
    reverbGain.connect();
    distortionGain.connect();

    // CONNECTING FFTs FOR ORIGINAL AND MODIFIED AUDIOS
    fftIn = new p5.FFT();
    fftOut = new p5.FFT();
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

    // FILTERS
    filterSetup();
    // DYNAMIC COMPRESSOR
    compressorSetup();
    // REVERB
    reverbSetup();
    // WAVESHAPER DISTORTION
    distortSetup();

    // SPECTRUM IN / OUT
    fftIn.setInput(currSound);
    fftOut.setInput(null);

}

function draw() {

    background(128, 138, 159);

    // ===========================
    // STAGE 1: PLAYBACK CONTROLS:
    // ===========================

    // MODIFICATIONS WHEN AUDIO IS CHANGED
    let soundChoice = soundSelect.value();
    
    if (soundChoice != prevSound) {
        // DISABLING EFFECTS
        if (filterEnabled) { applyFilter(); }
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
        // SETTING fftIn TO currSound
        fftIn.setInput(currSound);
    }

    // CHANGING BUTTON IF AUDIO IS DONE
    if (!currSound.isPlaying()) {
        playPauseButton.html("PLAY");
        playPauseButton.style("background", "RGB(0, 255, 0)");
    }
    
    // DRAWING TEXTS AND SLIDER VALUES
    stage1Draws();
    
    // CHANGING VOLUME OF AUDIO
    currSound.setVolume(masterVolSlider.value());
    currSound.pan(panSlider.value());
    currSound.rate(rateSlider.value());

    // ===========================
    // STAGE 2: EFFECT CONTROLS:
    // ===========================
    
    // CHANGING FILTER PARAMETERS
    filterParameters();
    // CHANGING DYNAMIC COMPRESSOR PARAMETERS
    compressorParameters();
    // CHANGING REVERB PARAMETERS
    reverbParameters();
    // CHANGING DISTORTION PARAMETERS
    distortionParameters();
    
    // SPECTRUM IN & OUT
    spectrumIn = fftIn.analyze();
    drawSpectrum(spectrumIn, 20, 250, color(0, 0, 255));
    spectrumOut = fftOut.analyze();
    drawSpectrum(spectrumOut, 220, 250, color(255, 0, 0));
    
    // DRAWING TEXTS AND BOXES
    stage2Draws();

}