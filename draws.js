// THIS CONTAINS ALL DRAWING OF TEXTS

// ===========================
// STAGE 1: PLAYBACK CONTROLS:
// ===========================

// DRAWING TEXTS AND SLIDER VALUES
function stage1Draws() {
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
}

// ===========================
// STAGE 2: EFFECT CONTROLS:
// ===========================

// DRAWING TEXTS AND BOXES
function stage2Draws() {
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
        text("Dur", 434, 240);
        text("Decay", 459, 240);
        text("Wet", 493, 240);
        text("Dry", 496, 329);
        text("Vol", 525, 240);
        text("Reverse", 549, 240);
        // WAVESHAPER DISTORTION
        text("Amt", 613, 240);
        text("Wet", 643, 240);
        text("Dry", 646, 329);
        text("Vol", 675, 240);
        text("Oversample", 703, 240);
        // SPECTRUM IN / OUT
    pop();
}