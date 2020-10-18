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
    
    function tromboneOscillator(key){
        // {w:"square",v:0.2,a:0.02,d:1,s:0.5,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,} 
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
    
        highPassFilter.Q.value = 80;


        oscMain1.detune.setValueAtTime(0.1, audioCtx.currentTime)
        oscMain2.detune.setValueAtTime(0.1, audioCtx.currentTime)
        oscSecondary1.detune.setValueAtTime(10, audioCtx.currentTime)
        oscSecondary2.detune.setValueAtTime(9.9, audioCtx.currentTime)
        oscSecondary3.detune.setValueAtTime(10.1, audioCtx.currentTime)

        var mainGain = audioCtx.createGain(); 
        mainGain.gain.setValueAtTime(0, audioCtx.currentTime)

        

        mainGain.gain.setValueAtTime(0.5, audioCtx.currentTime + 0.0015)
        mainGain.gain.setValueAtTime(0.5, audioCtx.currentTime + 0.0339)

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


    }

    function trumpetOscillator(key){

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
        
    }

    function playNote(key){
        tromboneOscillator(key)

    }


});

