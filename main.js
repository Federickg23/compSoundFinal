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
    var convolver = new tuna.Convolver({
        highCut: 22050,                         //20 to 22050
        lowCut: 17640,                             //20 to 22050
        dryLevel: 1,                            //0 to 1+
        wetLevel: 1,                            //0 to 1+
        level: 1,                               //0 to 1+, adjusts total output of both wet and dry
        impulse: "/impulse_rev.wav",    //the path to your impulse response
        bypass: 0
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
        var synthType = "sawtooth";
        lfo.type = synthType;
        oscMain1.type = synthType;
        oscMain2.type = synthType;
        oscSecondary1.type = synthType;
        oscSecondary2.type = synthType;
        oscSecondary3.type = synthType;
        //Set to sawtooth because that one sounds the most like a brassy sound
            

        var lowpassFilter = audioCtx.createBiquadFilter();
        lowpassFilter.type = "lowpass";
        //Some nice friendly low warm frequencies for our brass section
        lowpassFilter.Q.value = 20;
        //Gets rid of weird bumps in the waves, feel free to play w this value

        oscMain1.detune.setValueAtTime(0.1, audioCtx.currentTime)
        oscMain2.detune.setValueAtTime(-0.1, audioCtx.currentTime)
        oscSecondary1.detune.setValueAtTime(10, audioCtx.currentTime)
        oscSecondary2.detune.setValueAtTime(9.9, audioCtx.currentTime)
        oscSecondary3.detune.setValueAtTime(10.1, audioCtx.currentTime)
        //Basically trying to make the timbre of a brass sound, not sure if it works? Can 
        //def play around with these as well

        var mainGain = audioCtx.createGain(); 
        var secondGain = audioCtx.createGain(); 
        var thirdGain = audioCtx.createGain(); 
        mainGain.gain.setValueAtTime(0, audioCtx.currentTime)
  

        //sound envelope
        mainGain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.0015)
        mainGain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.0339)

        //Filter envelope
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

        //Connect to moog module (from tunajs) and convolver for funky fresh sounds 
        lowpassFilter.connect(mainGain)
        mainGain.connect(moog)
        moog.connect(secondGain)
        secondGain.connect(convolver)
        convolver.connect(audioCtx.destination)

        //TODO: Test if reversing the order in which things are connected changes the sound
        oscMain1.start()
        oscMain2.start()
        oscSecondary1.start()
        oscSecondary2.start()
        oscSecondary3.start()
        lfo.start()

        //Throw all the bois in activeOscillators so they can be stopped, might need more info in here
        //might also need to rewrite keyup for other methods
        activeOscillators[key] = {
            oscillators : [oscMain1, oscMain2, oscSecondary1, oscSecondary2, oscSecondary3, lfo],
            gains : [mainGain, secondGain], 
        }

    }

    function winds(key, high){

        //Essentially the same as brass method just without the moog module 
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

        //Convolver stolen from lab3 because I felt it gave a breathy sound to whatever was playing
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
            oscillators : [oscMain1, oscMain2, oscSecondary1, oscSecondary2, oscSecondary3, lfo],
            gains : [mainGain], 
        }

    }


    
    function strings(key, high){
        var f;
        if (high)
            f = keyboardFrequencyMap[key]; 
        else 
            f = keyboardFrequencyMap[key]/4; 

        var type = "sawtooth";

        var oscMain1 = audioCtx.createOscillator();
        var oscMain2 = audioCtx.createOscillator();
        var oscMain3 = audioCtx.createOscillator();
        var oscMain4 = audioCtx.createOscillator();
        var oscMain5 = audioCtx.createOscillator();
        var oscMain6 = audioCtx.createOscillator();
        var oscMain7 = audioCtx.createOscillator();
        
        oscMain1.type = type 
        oscMain2.type = type 
        oscMain3.type = type 
        oscMain4.type = type 
        oscMain5.type = type 
        oscMain6.type = type 
        oscMain7.type = type 
  
        oscMain1.frequency.value = f
        oscMain2.frequency.value = f
        oscMain3.frequency.value = f
        oscMain4.frequency.value = f
        oscMain5.frequency.value = f
        oscMain6.frequency.value = f
        oscMain7.frequency.value = f

        oscMain1.detune.setValueAtTime(-0.3, audioCtx.currentTime)
        oscMain2.detune.setValueAtTime(-0.2, audioCtx.currentTime)
        oscMain3.detune.setValueAtTime(-0.1, audioCtx.currentTime)
        oscMain4.detune.setValueAtTime(0, audioCtx.currentTime)
        oscMain5.detune.setValueAtTime(0.1, audioCtx.currentTime)
        oscMain6.detune.setValueAtTime(0.2, audioCtx.currentTime)

        
        var mainGain = audioCtx.createGain()
        var secondGain = audioCtx.createGain()
        var thirdGain = audioCtx.createGain()
        var fourthGain = audioCtx.createGain()

        oscMain1.connect(mainGain)
        oscMain2.connect(mainGain)
        oscMain3.connect(mainGain)
        oscMain4.connect(mainGain)
        oscMain5.connect(mainGain)
        oscMain6.connect(mainGain)
        oscMain7.connect(mainGain)

        mainGain.connect(moog)
        
        moog.connect(secondGain)
        secondGain.connect(drive)
        drive.connect(thirdGain)
        thirdGain.connect(convolver)
        convolver.connect(fourthGain)
        fourthGain.connect(compressor)
        compressor.connect(audioCtx.destination)

        mainGain.gain.setValueAtTime(0, audioCtx.currentTime)
        mainGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 1.5)
        mainGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 4)
        secondGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 1.5)
        secondGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 4)
        thirdGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 1.5)
        thirdGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 4)
        moog.automate("cutoff", 0, 0, 0)
        moog.automate("cutoff", 0.1, 1000, 0)
        moog.automate("cutoff", 0.06, 3000, audioCtx.currentTime + 1)
        

        oscMain1.start()
        oscMain2.start()
        oscMain3.start()
        oscMain4.start()
        oscMain5.start()
        oscMain6.start()
        oscMain7.start()

        activeOscillators[key] = {
            oscillators : [oscMain1, oscMain2, oscMain3, oscMain4, oscMain5, oscMain6, oscMain7],
            gains : [mainGain, secondGain, thirdGain], 
        }


    }
    

    function drumsOscillator(key){
        var AudioCtor = window.AudioContext || window.webkitAudioContext;
        desiredSampleRate = typeof desiredSampleRate === 'number' ? desiredSampleRate : 44100;
        var context = new AudioCtor();
  
        var mixGain = audioCtx.createGain();
        var filterGain = audioCtx.createGain();
        var osc3 = audioCtx.createOscillator();
        var gainOsc3 = audioCtx.createGain();
  
          filterGain.gain.setValueAtTime(1, audioCtx.currentTime);
          filterGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
  
          osc3.type = 'triangle';
          osc3.frequency.value = 100;
  
          gainOsc3.gain.value = 0;
          gainOsc3.gain.setValueAtTime(0, audioCtx.currentTime);
          //gainOsc3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
          //Connections
          osc3.connect(gainOsc3);
          gainOsc3.connect(mixGain);
  
          mixGain.gain.value = 1;
  
          osc3.start(audioCtx.currentTime);
          osc3.stop(audioCtx.currentTime + 0.2);
  
          var node = audioCtx.createBufferSource(),
              buffer = audioCtx.createBuffer(1, 4096, audioCtx.sampleRate),
              data = buffer.getChannelData(0);
  
          var filter = audioCtx.createBiquadFilter();
  
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(100, audioCtx.currentTime);
          filter.frequency.linearRampToValueAtTime(1000, audioCtx.currentTime + 0.2);
  
          for (var i = 0; i < 4096; i++) {
              data[i] = Math.random();
          }
  
          node.buffer = buffer;
          node.loop = true;
  
          //Connections
          node.connect(filter);
          filter.connect(filterGain);
          filterGain.connect(mixGain);
  
          node.start(audioCtx.currentTime);
          node.stop(audioCtx.currentTime + 0.2);
  
          mixGain.connect(audioCtx.destination);

    }

    function kick() {
        var osc = audioCtx.createOscillator();
        var osc2 = audioCtx.createOscillator();
        var gainOsc = audioCtx.createGain();
        var gainOsc2 = audioCtx.createGain();
    
        osc.type = "triangle";
        osc2.type = "sine";
    
        gainOsc.gain.setValueAtTime(1, audioCtx.currentTime);
        gainOsc.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    
        gainOsc2.gain.setValueAtTime(1, audioCtx.currentTime);
        gainOsc2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
       
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    
        osc2.frequency.setValueAtTime(50, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    
        osc.connect(gainOsc);
        osc2.connect(gainOsc2);
        gainOsc.connect(audioCtx.destination);
        gainOsc2.connect(audioCtx.destination);
    
        osc.start(audioCtx.currentTime);
        osc2.start(audioCtx.currentTime);
    
        osc.stop(audioCtx.currentTime + 0.5);
        osc2.stop(audioCtx.currentTime + 0.5);
    }

    function cymbal() {
        var fundamental = 40;
        var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];
        var gain = audioCtx.createGain();
        
        // Bandpass - Biquad Filter
        var bandpass = audioCtx.createBiquadFilter();
        bandpass.type = "bandpass";
        bandpass.frequency.value = 10000;
        
        // Highpass - Biquad Filter
        var highpass = audioCtx.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = 7000;
        
        bandpass.connect(highpass);
        highpass.connect(gain);
        gain.connect(audioCtx.destination);
    
        ratios.forEach(function(ratio) {
          var osc = audioCtx.createOscillator();
          osc.type = "square";
          osc.frequency.value = fundamental * ratio;
          osc.connect(bandpass);
          osc.start(audioCtx.currentTime);
          osc.stop(audioCtx.currentTime + 0.3);
        });
        
        // Envelope
        gain.gain.setValueAtTime(0.00001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(1, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3);       
    }
    

    function piano(key){
        
    }

    function keyUp(event) {
        const key = (event.detail || event.which).toString();
        
        // mode = document.getElementById("synth").value; 
        
        if (keyboardFrequencyMap[key] && activeOscillators[key]) {
        
            const {oscillators, gains} =  activeOscillators[key];
            
            for(var i = 0; i < oscillators.length; i++){
                oscillators[i].stop(audioCtx.currentTime + 0.02)
            }
            for(var g = 0; g < gains.length; g++){
                gains[g].gain.cancelScheduledValues(audioCtx.currentTime)
                gains[g].gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.02)
            }
        }
        delete activeOscillators[key];
    
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
            case "5":
                strings(key, true); 
                break; 
            case "6":
                strings(key, false); 
                break; 
            case "7":
                drumsOscillator();
                break;
            case "8":
                kick();
                break;
            case "9":
                cymbal();
                break;
        }
    }

});