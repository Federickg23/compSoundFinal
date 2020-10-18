var audioCtx;
var keyboardFrequencyMap;

document.addEventListener("DOMContentLoaded", function(event) {

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    
    function lowbrass(key){
        
        var f = keyboardFrequencyMap[key]/4; 
        
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

        highPassFilter.connect(mainGain).connect(audioCtx.destination)

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

    function lowWinds(key){
                
        var f = keyboardFrequencyMap[key]/4; 
        
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

    function highWinds(key){
                
        var f = keyboardFrequencyMap[key]; 
        
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

    function highbrass(key){
                
        var f = keyboardFrequencyMap[key]/2; 
        
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

        highPassFilter.connect(mainGain).connect(audioCtx.destination)

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
    
    function violinOscillator(key){

    }

    function celloOscillator(key){

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
                lowbrass(key);
                break;
            case "2":
                highbrass(key);
                break;

            case "3":
                lowWinds(key);
                break;
            case "4":
                highWinds(key);
                break;
        }



    }


});

