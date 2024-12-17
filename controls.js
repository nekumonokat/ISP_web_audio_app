// THIS CONTAINS ALL PLAYBACK CONTROL FUNCTIONS

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