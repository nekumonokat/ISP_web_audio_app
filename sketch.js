// initialising sounds
let soundSelect, currSound, prevSound;
let brightSound, industrialSound, synthSound;

// initialising recording elements
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
let volumeSlider;
let resetVolButton;
let panSlider;
let resetPanButton;
let rateSlider;
let resetRateButton;

function preload() {
    brightSound = loadSound("sounds/476070__jjmarsan__hello-user-bright-cheery-intro-music.wav");
    industrialSound = loadSound("sounds/476072__jjmarsan__wax-track-industrial-idm-score-music.mp3");
    synthSound = loadSound("sounds/487440__jjmarsan__tattle-vintage-synth-industrial-loop.wav");
}

function setup() {
    createCanvas(400, 400);
    background(128, 138, 159);

    // MIC SETUP - may not work in certain browsers
    mic = new p5.AudioIn();
    mic.start();
    // setting input for recorder to be the mic
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    // creates empty sound container
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
    soundSelect.disable("Recorded Audio")
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
    volumeSlider = createSlider(0, 1, 1, 0.01);
    volumeSlider.position(105, 85);
    volumeSlider.addClass("slider");
    
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
    resetVolButton = createButton("RESET");
    resetPanButton = createButton("RESET");
    resetRateButton = createButton("RESET");
    // setting positions
    resetVolButton.position(285, 85);
    resetPanButton.position(285, 115);
    resetRateButton.position(285, 145);
    // setting action
    resetVolButton.mousePressed(resetVol);
    resetPanButton.mousePressed(resetPan);
    resetRateButton.mousePressed(resetRate);
    // setting style
    resetVolButton.addClass("resetButton")
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
}

function playPauseSound() {
    // PAUSING AUDIO
    if (currSound.isPlaying()) {
        currSound.pause();
        playPauseButton.html("PLAY");
        playPauseButton.style("background", "RGB(0, 255, 0)");
    }

    // PLAYING AUDIO
    else {
        currSound.play()
        playPauseButton.html("PAUSE");
        playPauseButton.style("background", "RGB(255, 165, 0)");
    }
}

function stopSound() {
    // STOPPING AUDIO EVEN WHEN PAUSED
    currSound.stop();
    playPauseButton.html("PLAY");
    playPauseButton.style("background", "RGB(0, 255, 0)");
}

function loopToggle() {
    if (loopOn) {
        loopOn = false;
        loopButton.html("LOOP OFF");
    }
    
    else {
        loopOn = true;
        loopButton.html("LOOP ON");
    }
    
    // SETTING currSound's LOOP
    currSound.setLoop(loopOn);
}

function resetVol() {
    volumeSlider.value(1);
}

function resetPan() {
    panSlider.value(0);
}

function resetRate() {
    rateSlider.value(1);
}

function skipToStart() {
    let dur = currSound.duration();
    currSound.jump(0);
}

function skipToEnd() {
    let dur = currSound.duration();
    currSound.jump(dur-5);
}

function recordAudio() {
    // ensures audioContext is running
    if (getAudioContext().state !== "running") {
        getAudioContext().resume();
    }

    // CHANGING FUNCTIONALITY BASED ON STATE
    // 0: idle - goes to recording state
    if (state === 0 && mic.enabled) {
        recorder.record(soundFile);
        state++;
        recordButton.html("STOP")
    }
    // 1: recording - goes to stopping state
    else if (state === 1) {
        recorder.stop();
        state++;
        recordButton.html("USE AUDIO")
    }
    // 2: playback ready - goes to playing & storing state
    else if (state === 2) {
        soundFile.play();
        state = 0;
        recordButton.html("RECORD");
        soundSelect.selected("Recorded Audio");
        currSound = soundFile;
    }
}

function draw() {
    let soundChoice = soundSelect.value();

    if (soundChoice != prevSound) {
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
    text(Math.round(volumeSlider.value()*100), 250, 100);
    text("Audio Pan:", 20, 130);
    text(panSlider.value(), 250, 130);
    text("Audio Speed:", 20, 160);
    text(rateSlider.value(), 250, 160);
    // text for recording state
    text("Recording State:", 20, 230);
    states = ["Idle / Playing & Storing Audio", "Recording", "Ready for Use"]
    text(states[state], 120, 230);

    // CHANGING VOLUME OF AUDIO
    currSound.setVolume(volumeSlider.value());
    currSound.pan(panSlider.value());
    currSound.rate(rateSlider.value());
}