var audioCtx;
var keyboardFrequencyMap;
var tuna;
var drive;
var chorus;

document.addEventListener("DOMContentLoaded", function(event) {
    
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    tuna = new Tuna(audioCtx);
    console.log(tuna);

    chorus = new tuna.Chorus({
        rate: 1.5,
        feedback: 0.2,
        delay: 0.0045,
        bypass: 0
    })
    drive = new tuna.Overdrive({
        outputGain: 0,           //-42 to 0 in dB
        drive: 1,                //0 to 1
        curveAmount: 0.725,      //0 to 1
        algorithmIndex: 0,       //0 to 5, selects one of the drive algorithms
        bypass: 0
    });
    var compressor = new tuna.Compressor({
        threshold: -20,    //-100 to 0
        makeupGain: 1,     //0 and up (in decibels)
        attack: 1,         //0 to 1000
        release: 250,      //0 to 3000
        ratio: 4,          //1 to 20
        knee: 5,           //0 to 40
        automakeup: false, //true/false
        bypass: 0
    });
    var moog = new tuna.MoogFilter({
        cutoff: 0.065,    //0 to 1
        resonance: 3.5,   //0 to 4
        bufferSize: 4096  //256 to 16384
    });
    // console.log(chorus);

    activeOscillators = {}
    activeNodes = {}
    activeLFO = {}

    keyboardFrequencyMap = {
        '90': 261.625565300598634,  //Z - C
        '83': 277.182630976872096, //S - C#
        '88': 293.664767917407560,  //X - D
        '68': 311.126983722080910, //D - D#
        '67': 329.627556912869929,  //C - E
        '86': 349.228231433003884,  //V - F
        '71': 369.994422711634398, //G - F#
        '66': 391.995435981749294,  //B - G
        '72': 415.304697579945138, //H - G#
        '78': 440.000000000000000,  //N - A
        '74': 466.163761518089916, //J - A#
        '77': 493.883301256124111,  //M - B
        '81': 523.251130601197269,  //Q - C
        '188':523.251130601197269,  //, - C
        '50': 554.365261953744192, //2 - C#
        '87': 587.329535834815120,  //W - D
        '51': 622.253967444161821, //3 - D#
        '69': 659.255113825739859,  //E - E
        '82': 698.456462866007768,  //R - F
        '53': 739.988845423268797, //5 - F#
        '84': 783.990871963498588,  //T - G
        '54': 830.609395159890277, //6 - G# 
        '89': 880.000000000000000,  //Y - A
        '55': 932.327523036179832, //7 - A#
        '85': 987.766602512248223,  //U - B
        '73': 1046.5022612, //I - C
    }

    window.addEventListener('keydown', keyDown, false);
    window.addEventListener('keyup', keyUp, false); 

    function keyDown(event) {
        const key = (event.detail || event.which).toString();
        console.log(key);
        if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
          playNote(key);
        }
    }
    
    function brass(key, high){
        var f;
        if (high)
            f = keyboardFrequencyMap[key]/2; 
        else 
            f = keyboardFrequencyMap[key]/4; 

        var oscMain1 = audioCtx.createOscillator();
        var oscMain2 = audioCtx.createOscillator();
        var oscSecondary1 = audioCtx.createOscillator();
        var oscSecondary2 = audioCtx.createOscillator();
        var oscSecondary3 = audioCtx.createOscillator();
        oscMain1.frequency.value = f; 
        oscMain2.frequency.value = f; 
        oscSecondary1.frequency.value = f;
        oscSecondary2.frequency.value = f;
        oscSecondary3.frequency.value = f;


        var lfo = audioCtx.createOscillator(); 
        lfo.frequency.value = 12; 
        lfo.type = "triangle";
        oscMain1.type = "triangle";
        oscMain2.type = "triangle";
        oscSecondary1.type = "triangle";
        oscSecondary2.type = "triangle";
        oscSecondary3.type = "triangle";

            
        var lowpassFilter = audioCtx.createBiquadFilter();
        lowpassFilter.type = "lowpass";
        // highPassFilter.frequency.setValueAtTime(0, audioCtx.currentTime)
        // highPassFilter.frequency.value = 20; 
    
        lowpassFilter.Q.value = 20;
        // lowpassFilter.frequency.value = 1200

        oscMain1.detune.setValueAtTime(0.1, audioCtx.currentTime)
        oscMain2.detune.setValueAtTime(-0.1, audioCtx.currentTime)
        oscSecondary1.detune.setValueAtTime(10, audioCtx.currentTime)
        oscSecondary2.detune.setValueAtTime(9.9, audioCtx.currentTime)
        oscSecondary3.detune.setValueAtTime(10.1, audioCtx.currentTime)

        var mainGain = audioCtx.createGain(); 
        mainGain.gain.setValueAtTime(0, audioCtx.currentTime)
  

        mainGain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.0015)
        mainGain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.0339)

        lowpassFilter.gain.setValueAtTime(0, audioCtx.currentTime);
        lowpassFilter.gain.linearRampToValueAtTime(100, audioCtx.currentTime+0.0102);
        lowpassFilter.gain.linearRampToValueAtTime(73, audioCtx.currentTime+1.35);
        lowpassFilter.frequency.setValueAtTime(0, audioCtx.currentTime);
        lowpassFilter.frequency.linearRampToValueAtTime(1000, audioCtx.currentTime+0.0102);
        lowpassFilter.frequency.setValueAtTime(700, audioCtx.currentTime+1.35);
        lfo.connect(lowpassFilter.frequency)

        oscMain1.connect(lowpassFilter);
        oscMain2.connect(lowpassFilter);
        oscSecondary1.connect(lowpassFilter);
        oscSecondary2.connect(lowpassFilter);
        oscSecondary3.connect(lowpassFilter);

        lowpassFilter.connect(mainGain)
        mainGain.connect(moog).connect(audioCtx.destination)

        oscMain1.start()
        oscMain2.start()
        oscSecondary1.start()
        oscSecondary2.start()
        oscSecondary3.start()
        lfo.start()

        activeOscillators[key] = {
            oscMain1 : oscMain1,
            oscMain2 : oscMain2,
            oscSecondary1 : oscSecondary1, 
            oscSecondary2 : oscSecondary2, 
            oscSecondary3 : oscSecondary3, 
            mainGain : mainGain, 
            lfo : lfo,  
        }


    }

    function winds(key, high){
                
        var f;
        if (high)
            f = keyboardFrequencyMap[key]; 
        else 
            f = keyboardFrequencyMap[key]/4; 

        var oscMain1 = audioCtx.createOscillator();
        var oscMain2 = audioCtx.createOscillator();
        var oscSecondary1 = audioCtx.createOscillator();
        var oscSecondary2 = audioCtx.createOscillator();
        var oscSecondary3 = audioCtx.createOscillator();
        oscMain1.frequency.value = f; 
        oscMain2.frequency.value = f; 
        oscSecondary1.frequency.value = f;
        oscSecondary2.frequency.value = f;
        oscSecondary3.frequency.value = f;


        var lfo = audioCtx.createOscillator(); 
        lfo.frequency.value = 12; 
        lfo.type = "triangle";
        oscMain1.type = "triangle";
        oscMain2.type = "triangle";
        oscSecondary1.type = "triangle";
        oscSecondary2.type = "triangle";
        oscSecondary3.type = "triangle";

            
        var highPassFilter = audioCtx.createBiquadFilter();
        highPassFilter.type = "highpass";
        highPassFilter.frequency.setValueAtTime(0, audioCtx.currentTime)
        // highPassFilter.frequency.value = 20; 
    
        highPassFilter.Q.value = 60;


        oscMain1.detune.setValueAtTime(0.1, audioCtx.currentTime)
        oscMain2.detune.setValueAtTime(-0.1, audioCtx.currentTime)
        oscSecondary1.detune.setValueAtTime(10, audioCtx.currentTime)
        oscSecondary2.detune.setValueAtTime(9.9, audioCtx.currentTime)
        oscSecondary3.detune.setValueAtTime(10.1, audioCtx.currentTime)

        var mainGain = audioCtx.createGain(); 
        mainGain.gain.setValueAtTime(0, audioCtx.currentTime)

        var convolver = audioCtx.createConvolver(),
            noiseBuffer = audioCtx.createBuffer(2, 0.5 * audioCtx.sampleRate, audioCtx.sampleRate),
            left = noiseBuffer.getChannelData(0),
            right = noiseBuffer.getChannelData(1);
        for (var i = 0; i < noiseBuffer.length; i++) {
            left[i] = Math.random() * 2 - 1;
            right[i] = Math.random() * 2 - 1;
        }
        convolver.buffer = noiseBuffer;     

        mainGain.gain.setValueAtTime(0.5, audioCtx.currentTime + 0.0015)
        mainGain.gain.setValueAtTime(0.3, audioCtx.currentTime + 0.0339)

        highPassFilter.gain.setValueAtTime(0, audioCtx.currentTime);
        highPassFilter.gain.setValueAtTime(100, audioCtx.currentTime+0.0102);
        highPassFilter.gain.setValueAtTime(73, audioCtx.currentTime+1.35);
        lfo.connect(highPassFilter.frequency)

        oscMain1.connect(highPassFilter);
        oscMain2.connect(highPassFilter);
        oscSecondary1.connect(highPassFilter);
        oscSecondary2.connect(highPassFilter);
        oscSecondary3.connect(highPassFilter);

        highPassFilter.connect(convolver).connect(mainGain).connect(audioCtx.destination)

        oscMain1.start()
        oscMain2.start()
        oscSecondary1.start()
        oscSecondary2.start()
        oscSecondary3.start()
        lfo.start()

        activeOscillators[key] = {
            oscMain1 : oscMain1,
            oscMain2 : oscMain2,
            oscSecondary1 : oscSecondary1, 
            oscSecondary2 : oscSecondary2, 
            oscSecondary3 : oscSecondary3, 
            mainGain : mainGain, 
            lfo : lfo,  
        }

    }


    
    function strings(key, high){
        var f;
        if (high)
            f = keyboardFrequencyMap[key]; 
        else 
            f = keyboardFrequencyMap[key]/4; 

        var oscMain1 = audioCtx.createOscillator();
    }

    

    function drumsOscillator(key){

    }

    function pianoOscillator(key){

    }

    function keyUp(event) {
        const key = (event.detail || event.which).toString();
        
        // mode = document.getElementById("synth").value; 
        
        if (keyboardFrequencyMap[key] && activeOscillators[key]) {
        
            const {oscMain1, oscMain2, oscSecondary1, oscSecondary2, oscSecondary3, mainGain, lfo} =  activeOscillators[key];
            
            mainGain.gain.cancelScheduledValues(audioCtx.currentTime)
            oscMain1.stop(audioCtx.currentTime + 0.002)
            oscMain2.stop(audioCtx.currentTime + 0.002)
            oscSecondary1.stop(audioCtx.currentTime + 0.002)
            oscSecondary2.stop(audioCtx.currentTime + 0.002)
            oscSecondary3.stop(audioCtx.currentTime + 0.002)
            mainGain.gain.setValueAtTime(0, audioCtx.currentTime + 0.002)

            
            delete activeOscillators[key];
        }
        
    }

    function playNote(key){
        var synth = document.getElementById("instrument").value;
        console.log(synth)
        switch(synth){
            case "1":
                brass(key, false);
                break;
            case "2":
                brass(key,true);
                break;

            case "3":
                winds(key, false);
                break;
            case "4":
                winds(key, true);
                break;
        }
    }


});

