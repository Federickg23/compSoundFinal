var osc;
var gainNode;

HIGH_STRINGS = {
    notes: [
    {pitch: 76, startTime: 0.0, endTime: 0.25},
    {pitch: 76, startTime: 0.25, endTime: 0.5},
    {pitch: 76, startTime: 1.0, endTime: 1.25},
    {pitch: 76, startTime: 1.25, endTime: 1.5},
    {pitch: 76, startTime: 2.0, endTime: 2.25},
    {pitch: 76, startTime: 2.25, endTime: 2.5},
    {pitch: 79, startTime: 3.0, endTime: 3.25},
    {pitch: 79, startTime: 3.25, endTime: 3.5},
    {pitch: 78, startTime: 3.5, endTime: 3.75},
    {pitch: 78, startTime: 3.75, endTime: 4.0},
    {pitch: 81, startTime: 4.0, endTime: 4.25},
    {pitch: 81, startTime: 4.25, endTime: 4.5},
    {pitch: 81, startTime: 5.0, endTime: 5.25},
    {pitch: 81, startTime: 5.25, endTime: 5.5},
    {pitch: 76, startTime: 6.0, endTime: 6.25},
    {pitch: 76, startTime: 6.25, endTime: 6.5},
    {pitch: 79, startTime: 7.0, endTime: 7.25},
    {pitch: 79, startTime: 7.25, endTime: 7.5},
    {pitch: 78, startTime: 7.5, endTime: 7.75},
    {pitch: 78, startTime: 7.75, endTime: 8.0},
    {pitch: 81, startTime: 8.0, endTime: 8.25},
    {pitch: 81, startTime: 8.25, endTime: 8.5},
    {pitch: 81, startTime: 9.0, endTime: 9.25},
    {pitch: 81, startTime: 9.25, endTime: 9.5},
    {pitch: 79, startTime: 10.0, endTime: 11.0},
    {pitch: 81, startTime: 11.0, endTime: 12.0},
    {pitch: 76, startTime: 12.0, endTime: 12.25},
    {pitch: 76, startTime: 12.25, endTime: 12.5},
    {pitch: 76, startTime: 13.0, endTime: 13.25},
    {pitch: 76, startTime: 13.25, endTime: 13.5},
    {pitch: 76, startTime: 14.0, endTime: 14.25},
    {pitch: 76, startTime: 14.25, endTime: 14.5},
    {pitch: 79, startTime: 15.0, endTime: 15.25},
    {pitch: 79, startTime: 15.25, endTime: 15.5},
    {pitch: 78, startTime: 15.5, endTime: 15.75},
    {pitch: 78, startTime: 15.75, endTime: 16.0},
    {pitch: 81, startTime: 16.0, endTime: 16.25},
    {pitch: 81, startTime: 16.25, endTime: 16.5},
    {pitch: 81, startTime: 17.0, endTime: 17.25},
    {pitch: 81, startTime: 17.25, endTime: 17.5},
    {pitch: 86, startTime: 18.0, endTime: 18.25},
    {pitch: 88, startTime: 18.25, endTime: 18.5},
    {pitch: 88, startTime: 19.0, endTime: 19.25}, 
    {pitch: 90, startTime: 19.25, endTime: 19.5},
    ],
    totalTime: 19.5
    };
    
HIGH_BRASS = {
    notes: [
    {pitch: 64, startTime: 0.0, endTime: 0.25},
    {pitch: 64, startTime: 0.25, endTime: 0.5},
    {pitch: 64, startTime: 1.0, endTime: 1.25},
    {pitch: 64, startTime: 1.25, endTime: 1.5},
    {pitch: 64, startTime: 2.0, endTime: 2.25},
    {pitch: 64, startTime: 2.25, endTime: 2.5},
    {pitch: 67, startTime: 3.0, endTime: 3.25},
    {pitch: 67, startTime: 3.25, endTime: 3.5},
    {pitch: 66, startTime: 3.5, endTime: 3.75},
    {pitch: 66, startTime: 3.75, endTime: 4.0},
    {pitch: 69, startTime: 4.0, endTime: 4.25},
    {pitch: 69, startTime: 4.25, endTime: 4.5},
    {pitch: 69, startTime: 5.0, endTime: 5.25},
    {pitch: 69, startTime: 5.25, endTime: 5.5},
    {pitch: 64, startTime: 6.0, endTime: 6.25},
    {pitch: 64, startTime: 6.25, endTime: 6.5},
    {pitch: 67, startTime: 7.0, endTime: 7.25},
    {pitch: 67, startTime: 7.25, endTime: 7.5},
    {pitch: 66, startTime: 7.5, endTime: 7.75},
    {pitch: 66, startTime: 7.75, endTime: 8.0},
    {pitch: 69, startTime: 8.0, endTime: 8.25},
    {pitch: 69, startTime: 8.25, endTime: 8.5},
    {pitch: 69, startTime: 9.0, endTime: 9.25},
    {pitch: 69, startTime: 9.25, endTime: 9.5},
    {pitch: 67, startTime: 10.0, endTime: 11.0},
    {pitch: 69, startTime: 11.0, endTime: 12.0},
    {pitch: 64, startTime: 12.0, endTime: 12.25},
    {pitch: 64, startTime: 12.25, endTime: 12.5},
    {pitch: 64, startTime: 13.0, endTime: 13.25},
    {pitch: 64, startTime: 13.25, endTime: 13.5},
    {pitch: 64, startTime: 14.0, endTime: 14.25},
    {pitch: 64, startTime: 14.25, endTime: 14.5},
    {pitch: 67, startTime: 15.0, endTime: 15.25},
    {pitch: 67, startTime: 15.25, endTime: 15.5},
    {pitch: 66, startTime: 15.5, endTime: 15.75},
    {pitch: 66, startTime: 15.75, endTime: 16.0},
    {pitch: 69, startTime: 16.0, endTime: 16.25},
    {pitch: 69, startTime: 16.25, endTime: 16.5},
    {pitch: 69, startTime: 17.0, endTime: 17.25},
    {pitch: 69, startTime: 17.25, endTime: 17.5},
    {pitch: 62, startTime: 18.0, endTime: 18.25},
    {pitch: 64, startTime: 18.25, endTime: 18.5},
    {pitch: 64, startTime: 19.0, endTime: 19.25}, 
    {pitch: 66, startTime: 19.25, endTime: 19.5},
    ],
    totalTime: 19.5
    };
    
HIGH_WINDS = {
    notes: [
    {pitch: 76, startTime: 0.0, endTime: 0.25},
    {pitch: 76, startTime: 0.25, endTime: 0.5},
    {pitch: 76, startTime: 1.0, endTime: 1.25},
    {pitch: 76, startTime: 1.25, endTime: 1.5},
    {pitch: 76, startTime: 2.0, endTime: 2.25},
    {pitch: 76, startTime: 2.25, endTime: 2.5},
    {pitch: 79, startTime: 3.0, endTime: 3.25},
    {pitch: 79, startTime: 3.25, endTime: 3.5},
    {pitch: 78, startTime: 3.5, endTime: 3.75},
    {pitch: 78, startTime: 3.75, endTime: 4.0},
    {pitch: 81, startTime: 4.0, endTime: 4.25},
    {pitch: 81, startTime: 4.25, endTime: 4.5},
    {pitch: 81, startTime: 5.0, endTime: 5.25},
    {pitch: 81, startTime: 5.25, endTime: 5.5},
    {pitch: 76, startTime: 6.0, endTime: 6.25},
    {pitch: 76, startTime: 6.25, endTime: 6.5},
    {pitch: 79, startTime: 7.0, endTime: 7.25},
    {pitch: 79, startTime: 7.25, endTime: 7.5},
    {pitch: 78, startTime: 7.5, endTime: 7.75},
    {pitch: 78, startTime: 7.75, endTime: 8.0},
    {pitch: 81, startTime: 8.0, endTime: 8.25},
    {pitch: 81, startTime: 8.25, endTime: 8.5},
    {pitch: 81, startTime: 9.0, endTime: 9.25},
    {pitch: 81, startTime: 9.25, endTime: 9.5},
    {pitch: 76, startTime: 12.0, endTime: 12.25},
    {pitch: 79, startTime: 12.25, endTime: 12.5},
    {pitch: 79, startTime: 12.5, endTime: 12.75},
    {pitch: 76, startTime: 12.75, endTime: 13.0},
    {pitch: 76, startTime: 13.0, endTime: 13.25},
    {pitch: 79, startTime: 13.25, endTime: 13.5},
    {pitch: 79, startTime: 13.5, endTime: 13.75},
    {pitch: 76, startTime: 13.75, endTime: 14.0},
    {pitch: 76, startTime: 14.0, endTime: 14.25},
    {pitch: 79, startTime: 14.25, endTime: 14.5},
    {pitch: 79, startTime: 14.5, endTime: 14.75},
    {pitch: 76, startTime: 14.75, endTime: 15.0},
    {pitch: 76, startTime: 15.0, endTime: 15.25},
    {pitch: 79, startTime: 15.25, endTime: 15.5},
    {pitch: 79, startTime: 15.5, endTime: 15.75},
    {pitch: 76, startTime: 15.75, endTime: 16.0},
    {pitch: 76, startTime: 16.0, endTime: 16.25},
    {pitch: 79, startTime: 16.25, endTime: 16.5},
    {pitch: 79, startTime: 16.5, endTime: 16.75},
    {pitch: 76, startTime: 16.75, endTime: 17.0},
    {pitch: 76, startTime: 17.0, endTime: 17.25},
    {pitch: 79, startTime: 17.25, endTime: 17.5},
    {pitch: 79, startTime: 17.5, endTime: 17.75},
    {pitch: 76, startTime: 17.75, endTime: 18.0},
    {pitch: 74, startTime: 18.0, endTime: 18.25},
    {pitch: 72, startTime: 18.25, endTime: 18.5},
    {pitch: 72, startTime: 19.0, endTime: 19.25}, 
    {pitch: 69, startTime: 19.25, endTime: 19.5},
    ],
    totalTime: 19.5
    };
    
LOW_STRINGS = {
    notes: [
    {pitch: 52, startTime: 0.0, endTime: 0.25},
    {pitch: 52, startTime: 0.25, endTime: 0.5},
    {pitch: 52, startTime: 0.5, endTime: 0.75},
    {pitch: 52, startTime: 0.75, endTime: 1.0},
    {pitch: 52, startTime: 1.0, endTime: 1.25},
    {pitch: 52, startTime: 1.25, endTime: 1.5},
    {pitch: 52, startTime: 1.5, endTime: 1.75},
    {pitch: 52, startTime: 1.75, endTime: 2.0},
    {pitch: 52, startTime: 2.0, endTime: 2.25},
    {pitch: 52, startTime: 2.25, endTime: 2.5},
    {pitch: 52, startTime: 2.5, endTime: 2.75},
    {pitch: 52, startTime: 2.75, endTime: 3.0},
    {pitch: 52, startTime: 3.0, endTime: 3.25},
    {pitch: 52, startTime: 3.25, endTime: 3.5},
    {pitch: 52, startTime: 3.5, endTime: 3.75},
    {pitch: 52, startTime: 3.75, endTime: 4.0},
    {pitch: 52, startTime: 4.0, endTime: 4.25},
    {pitch: 52, startTime: 4.25, endTime: 4.5},
    {pitch: 52, startTime: 4.5, endTime: 4.75},
    {pitch: 52, startTime: 4.75, endTime: 5.0},
    {pitch: 52, startTime: 5.0, endTime: 5.25},
    {pitch: 52, startTime: 5.25, endTime: 5.5},
    {pitch: 52, startTime: 5.5, endTime: 5.75},
    {pitch: 52, startTime: 5.75, endTime: 6.0},
    {pitch: 52, startTime: 6.0, endTime: 6.25},
    {pitch: 52, startTime: 6.25, endTime: 6.5},
    {pitch: 52, startTime: 6.5, endTime: 6.75},
    {pitch: 52, startTime: 6.75, endTime: 7.0},
    {pitch: 52, startTime: 7.0, endTime: 7.25},
    {pitch: 52, startTime: 7.25, endTime: 7.5},
    {pitch: 52, startTime: 7.5, endTime: 7.75},
    {pitch: 52, startTime: 7.75, endTime: 8.0},
    {pitch: 52, startTime: 8.0, endTime: 8.25},
    {pitch: 52, startTime: 8.25, endTime: 8.5},
    {pitch: 52, startTime: 8.5, endTime: 8.75},
    {pitch: 52, startTime: 8.75, endTime: 9.0},
    {pitch: 52, startTime: 9.0, endTime: 9.25},
    {pitch: 52, startTime: 9.25, endTime: 9.5},
    {pitch: 52, startTime: 9.5, endTime: 9.75},
    {pitch: 52, startTime: 9.75, endTime: 10.0},
    {pitch: 67, startTime: 10.0, endTime: 11.0},
    {pitch: 69, startTime: 11.0, endTime: 12.0},
    {pitch: 52, startTime: 12.0, endTime: 18.0},
    {pitch: 62, startTime: 18.0, endTime: 18.25},
    {pitch: 64, startTime: 18.25, endTime: 18.5},
    {pitch: 64, startTime: 19.0, endTime: 19.25}, 
    {pitch: 66, startTime: 19.25, endTime: 19.5},
    ],
    totalTime: 19.5
    };
    
LOW_WINDS = {
    notes: [
    {pitch: 59, startTime: 0.0, endTime: 3.5},
    {pitch: 54, startTime: 3.5, endTime: 4.0},
    {pitch: 55, startTime: 4.0, endTime: 6.0},
    {pitch: 52, startTime: 6.0, endTime: 8.0},
    {pitch: 55, startTime: 8.0, endTime: 10.0},
    {pitch: 43, startTime: 10.0, endTime: 11.0},
    {pitch: 45, startTime: 11.0, endTime: 12.0},
    {pitch: 64, startTime: 12.0, endTime: 12.25},
    {pitch: 67, startTime: 12.25, endTime: 12.5},
    {pitch: 67, startTime: 12.5, endTime: 12.75},
    {pitch: 64, startTime: 12.75, endTime: 13.0},
    {pitch: 64, startTime: 13.0, endTime: 13.25},
    {pitch: 67, startTime: 13.25, endTime: 13.5},
    {pitch: 67, startTime: 13.5, endTime: 13.75},
    {pitch: 64, startTime: 13.75, endTime: 14.0},
    {pitch: 64, startTime: 14.0, endTime: 14.25},
    {pitch: 67, startTime: 14.25, endTime: 14.5},
    {pitch: 67, startTime: 14.5, endTime: 14.75},
    {pitch: 64, startTime: 14.75, endTime: 15.0},
    {pitch: 64, startTime: 15.0, endTime: 15.25},
    {pitch: 67, startTime: 15.25, endTime: 15.5},
    {pitch: 67, startTime: 15.5, endTime: 15.75},
    {pitch: 64, startTime: 15.75, endTime: 16.0},
    {pitch: 64, startTime: 16.0, endTime: 16.25},
    {pitch: 67, startTime: 16.25, endTime: 16.5},
    {pitch: 67, startTime: 16.5, endTime: 16.75},
    {pitch: 64, startTime: 16.75, endTime: 17.0},
    {pitch: 64, startTime: 17.0, endTime: 17.25},
    {pitch: 67, startTime: 17.25, endTime: 17.5},
    {pitch: 67, startTime: 17.5, endTime: 17.75},
    {pitch: 64, startTime: 17.75, endTime: 18.0},
    {pitch: 50, startTime: 18.0, endTime: 18.25},
    {pitch: 52, startTime: 18.25, endTime: 18.5},
    {pitch: 52, startTime: 19.0, endTime: 19.25}, 
    {pitch: 54, startTime: 19.25, endTime: 19.5},
        ],
    totalTime: 19.5
    };
    
LOW_BRASS = {
    notes: [
    {pitch: 59, startTime: 0.0, endTime: 3.5},
    {pitch: 54, startTime: 3.5, endTime: 4.0},
    {pitch: 55, startTime: 4.0, endTime: 6.0},
    {pitch: 52, startTime: 6.0, endTime: 8.0},
    {pitch: 55, startTime: 8.0, endTime: 10.0},
    {pitch: 43, startTime: 10.0, endTime: 11.0},
    {pitch: 45, startTime: 11.0, endTime: 12.0},
    {pitch: 40, startTime: 12.0, endTime: 18.0},
    {pitch: 50, startTime: 18.0, endTime: 18.25},
    {pitch: 52, startTime: 18.25, endTime: 18.5},
    {pitch: 52, startTime: 19.0, endTime: 19.25}, 
    {pitch: 54, startTime: 19.25, endTime: 19.5},
    ],
    totalTime: 19.5
    };


    class Player {
        constructor(name) {
            this.name = name;
        }
    
    }

    class Brass extends Player {
        oscMain1 = audioCtx.createOscillator();
        oscMain2 = audioCtx.createOscillator();
        oscSecondary1 = audioCtx.createOscillator();
        oscSecondary2 = audioCtx.createOscillator();
        oscSecondary3 = audioCtx.createOscillator();
        lfo = audioCtx.createOscillator(); 
        synthType = "sawtooth";
        lowpassFilter = audioCtx.createBiquadFilter();
        mainGain = audioCtx.createGain(); 
        secondGain = audioCtx.createGain(); 
        thirdGain = audioCtx.createGain();  
        constructor(name, high){
            super(name);
            this.high = high;
            this.brassPrep();
        }

        brassPrep(){

            this.lfo.frequency.value = 12; 
            this.lfo.type = this.synthType;
            this.oscMain1.type = this.synthType;
            this.oscMain2.type = this.synthType;
            this.oscSecondary1.type = this.synthType;
            this.oscSecondary2.type = this.synthType;
            this.oscSecondary3.type = this.synthType;
            //Set to sawtooth because that one sounds the most like a brassy sound
                
    
            this.lowpassFilter.type = "lowpass";
            //Some nice friendly low warm frequencies for our brass section
            this.lowpassFilter.Q.value = 20;
            //Gets rid of weird bumps in the waves, feel free to play w this value
    
    
            this.lfo.connect(this.lowpassFilter.frequency)
    
    
            this.oscMain1.connect(this.lowpassFilter);
            this.oscMain2.connect(this.lowpassFilter);
            this.oscSecondary1.connect(this.lowpassFilter);
            this.oscSecondary2.connect(this.lowpassFilter);
            this.oscSecondary3.connect(this.lowpassFilter);
    
            //Connect to moog module (from tunajs) and convolver for funky fresh sounds 
            this.lowpassFilter.connect(this.mainGain);
            // mainGain.connect(moog)
            // moog.connect(secondGain)
            // secondGain.connect(convolver)
            this.secondGain.connect(this.mainGain);
            this.thirdGain.connect(this.mainGain)
            this.mainGain.connect(audioCtx.destination);
    
            //TODO: Test if reversing the order in which things are connected changes the sound
            this.oscMain1.start()
            this.oscMain2.start()
            this.oscSecondary1.start()
            this.oscSecondary2.start()
            this.oscSecondary3.start()
            this.lfo.start()

            this.mainGain.gain.setValueAtTime(0,0); 
    
            //Throw all the bois in activeOscillators so they can be stopped, might need more info in here
            //might also need to rewrite keyup for other methods
            // activeOscillators[key] = {
            //     oscillators : [oscMain1, oscMain2, oscSecondary1, oscSecondary2, oscSecondary3, lfo],
            //     gains : [mainGain, secondGain], 
            // }
    
        }

        brassPlay(note , offset){
            var f = midiToFreq(note.pitch);


            this.oscMain1.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
            this.oscMain2.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
            this.oscSecondary1.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
            this.oscSecondary2.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
            this.oscSecondary3.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
    
    
            this.oscMain1.detune.setValueAtTime(0.1, note.startTime+offset)
            this.oscMain2.detune.setValueAtTime(-0.1, note.startTime+offset)
            this.oscSecondary1.detune.setValueAtTime(10, note.startTime+offset)
            this.oscSecondary2.detune.setValueAtTime(9.9, note.startTime+offset)
            this.oscSecondary3.detune.setValueAtTime(10.1, note.startTime+offset)
            //Basically trying to make the timbre of a brass sound, not sure if it works? Can 
            //def play around with these as well
    
            this.mainGain.gain.setValueAtTime(0, note.startTime+offset)
    
            //sound envelope
            this.mainGain.gain.linearRampToValueAtTime(0.1, note.startTime+offset + 0.0015)
            this.mainGain.gain.linearRampToValueAtTime(0.05, note.startTime+offset + 0.0339)
    
            //Filter envelope
            this.lowpassFilter.gain.setValueAtTime(0, note.startTime+offset);
            this.lowpassFilter.gain.linearRampToValueAtTime(100, note.startTime+offset+0.0102);
            this.lowpassFilter.gain.linearRampToValueAtTime(73, note.startTime+offset+1.35);
            this.lowpassFilter.frequency.setValueAtTime(0, note.startTime+offset);
            this.lowpassFilter.frequency.linearRampToValueAtTime(1000, note.startTime+offset+0.0102);
            this.lowpassFilter.frequency.setValueAtTime(700, note.startTime+offset+1.35);
    
            this.mainGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01)
            this.secondGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01)
            this.thirdGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01)
    
        }
    }


    class Wind extends Player {
        oscMain1 = audioCtx.createOscillator();
        oscMain2 = audioCtx.createOscillator();
        oscSecondary1 = audioCtx.createOscillator();
        oscSecondary2 = audioCtx.createOscillator();
        oscSecondary3 = audioCtx.createOscillator();
        lfo = audioCtx.createOscillator(); 
        synthType = "triangle";
        highpassFilter = audioCtx.createBiquadFilter();
        mainGain = audioCtx.createGain(); 
        secondGain = audioCtx.createGain(); 
        thirdGain = audioCtx.createGain();  
        constructor(name, high){
            super(name);
            this.high = high;
            this.windPrep();
        }

        windPrep(){

            this.lfo.frequency.value = 12; 
            this.lfo.type = this.synthType;
            this.oscMain1.type = this.synthType;
            this.oscMain2.type = this.synthType;
            this.oscSecondary1.type = this.synthType;
            this.oscSecondary2.type = this.synthType;
            this.oscSecondary3.type = this.synthType;
            //Set to triangle because that one sounds the most like a pure wind sound
                
    
            this.highpassFilter.type = "highpass";
            this.highpassFilter.Q.value = 60;
    
            this.lfo.connect(this.highpassFilter.frequency)
    
    
            this.oscMain1.connect(this.highpassFilter);
            this.oscMain2.connect(this.highpassFilter);
            this.oscSecondary1.connect(this.highpassFilter);
            this.oscSecondary2.connect(this.highpassFilter);
            this.oscSecondary3.connect(this.highpassFilter);
    
            this.highpassFilter.connect(this.mainGain);

            this.secondGain.connect(this.mainGain);
            this.thirdGain.connect(this.mainGain)
            this.mainGain.connect(audioCtx.destination);
    
            this.oscMain1.start()
            this.oscMain2.start()
            this.oscSecondary1.start()
            this.oscSecondary2.start()
            this.oscSecondary3.start()
            this.lfo.start()
            this.mainGain.gain.setValueAtTime(0,0);
            this.secondGain.gain.setValueAtTime(0,0);
            this.thirdGain.gain.setValueAtTime(0,0);

        }

        windPlay(note , offset){
            var f = midiToFreq(note.pitch);

            // console.log("frequency: " + f);
            // console.log("high: " + this.high);


            this.oscMain1.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
            this.oscMain2.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
            this.oscSecondary1.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
            this.oscSecondary2.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
            this.oscSecondary3.frequency.setTargetAtTime(f, note.startTime+offset, 0.001)
    
    
            this.oscMain1.detune.setValueAtTime(0.1, note.startTime+offset)
            this.oscMain2.detune.setValueAtTime(-0.1, note.startTime+offset)
            this.oscSecondary1.detune.setValueAtTime(10, note.startTime+offset)
            this.oscSecondary2.detune.setValueAtTime(9.9, note.startTime+offset)
            this.oscSecondary3.detune.setValueAtTime(10.1, note.startTime+offset)

    
            this.mainGain.gain.setValueAtTime(0, note.startTime+offset)
    
            //sound envelope
            this.mainGain.gain.linearRampToValueAtTime(0.1, note.startTime+offset + 0.0015)
            this.mainGain.gain.linearRampToValueAtTime(0.05, note.startTime+offset + 0.0339)
    
            //Filter envelope
            this.highpassFilter.gain.setValueAtTime(0, note.startTime+offset);
            this.highpassFilter.gain.linearRampToValueAtTime(100, note.startTime+offset+0.0102);
            this.highpassFilter.gain.linearRampToValueAtTime(73, note.startTime+offset+1.35);
            this.highpassFilter.frequency.setValueAtTime(0, note.startTime+offset)        
            // this.lowpassFilter.frequency.setValueAtTime(0, note.startTime+offset);
            // this.lowpassFilter.frequency.linearRampToValueAtTime(1000, note.startTime+offset+0.0102);
            // this.lowpassFilter.frequency.setValueAtTime(700, note.startTime+offset+1.35);
    
            this.mainGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01)
            this.secondGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01)
            this.thirdGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01)
    
        }
    }


    class Strings extends Player {
        oscMain1 = audioCtx.createOscillator();
        oscMain2 = audioCtx.createOscillator();
        oscMain3 = audioCtx.createOscillator();
        oscMain4 = audioCtx.createOscillator();
        oscMain5 = audioCtx.createOscillator();
        oscMain6 = audioCtx.createOscillator();
        oscMain7 = audioCtx.createOscillator();

        synthType = "sawtooth";

        mainGain = audioCtx.createGain()
        secondGain = audioCtx.createGain()
        thirdGain = audioCtx.createGain()
        fourthGain = audioCtx.createGain()

        constructor(name, high){
            super(name);
            this.high = high;
            this.stringPrep();
        }

        stringPrep(){

            
            this.oscMain1.type = this.synthType;
            this.oscMain2.type = this.synthType;
            this.oscMain3.type = this.synthType;
            this.oscMain4.type = this.synthType;
            this.oscMain5.type = this.synthType;
            this.oscMain6.type = this.synthType;
            this.oscMain7.type = this.synthType;

            this.oscMain1.connect(this.mainGain);
            this.oscMain2.connect(this.mainGain);
            this.oscMain3.connect(this.mainGain);
            this.oscMain4.connect(this.mainGain);
            this.oscMain5.connect(this.mainGain);
            this.oscMain6.connect(this.mainGain);
            this.oscMain7.connect(this.mainGain);


            this.secondGain.connect(this.mainGain);
            this.thirdGain.connect(this.mainGain)
            this.fourthGain.connect(this.mainGain);

            this.mainGain.connect(audioCtx.destination);
    
            this.oscMain1.start();
            this.oscMain2.start();
            this.oscMain3.start();
            this.oscMain4.start();
            this.oscMain5.start();
            this.oscMain6.start();
            this.oscMain7.start();

            this.mainGain.gain.setValueAtTime(0,0);
            this.secondGain.gain.setValueAtTime(0,0);
            this.thirdGain.gain.setValueAtTime(0,0);
            this.fourthGain.gain.setValueAtTime(0,0)
    
        }

        stringPlay(note , offset){
            var f = midiToFreq(note.pitch);

            // console.log("frequency: " + f);
            // console.log("high: " + this.high);


            this.oscMain1.frequency.setTargetAtTime(f, note.startTime+offset, 0.001);
            this.oscMain2.frequency.setTargetAtTime(f, note.startTime+offset, 0.001);
            this.oscMain3.frequency.setTargetAtTime(f, note.startTime+offset, 0.001);
            this.oscMain4.frequency.setTargetAtTime(f, note.startTime+offset, 0.001);
            this.oscMain5.frequency.setTargetAtTime(f, note.startTime+offset, 0.001);
            this.oscMain6.frequency.setTargetAtTime(f, note.startTime+offset, 0.001);
            this.oscMain7.frequency.setTargetAtTime(f, note.startTime+offset, 0.001);

            this.oscMain1.detune.setValueAtTime(-0.1, note.startTime+offset);
            this.oscMain2.detune.setValueAtTime(-0.05, note.startTime+offset);
            this.oscMain3.detune.setValueAtTime(-0.025, note.startTime+offset);
            this.oscMain4.detune.setValueAtTime(0, note.startTime+offset);
            this.oscMain5.detune.setValueAtTime(0.025, note.startTime+offset);
            this.oscMain6.detune.setValueAtTime(0.05, note.startTime+offset);
            this.oscMain7.detune.setValueAtTime(0.01, note.startTime+offset);

            this.mainGain.gain.setValueAtTime(0, note.startTime+offset)
    

            this.mainGain.gain.linearRampToValueAtTime(0.1, note.startTime + offset + 0.15);
            this.mainGain.gain.linearRampToValueAtTime(0.05, note.startTime + offset + 0.5);
            this.secondGain.gain.linearRampToValueAtTime(0.1, note.startTime + offset + 0.15);
            this.secondGain.gain.linearRampToValueAtTime(0.05, note.startTime + offset + 0.5);
            this.thirdGain.gain.linearRampToValueAtTime(0.1, note.startTime + offset + 0.15);
            this.thirdGain.gain.linearRampToValueAtTime(0.05, note.startTime + offset + 0.5);
            this.fourthGain.gain.linearRampToValueAtTime(0.1, note.startTime + offset + 0.15);
            this.fourthGain.gain.linearRampToValueAtTime(0.05, note.startTime + offset + 0.5);


            console.log(note.endTime+offset-0.05);
            this.mainGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01);
            this.secondGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01);
            this.thirdGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01);
            this.fourthGain.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01);

        }
    }




var instruments = [HIGH_BRASS, LOW_BRASS, HIGH_WINDS, LOW_WINDS, HIGH_STRINGS, LOW_STRINGS];