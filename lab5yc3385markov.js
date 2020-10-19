var audioCtx;
var osc;
var gainNode;

// TWINKLE_TWINKLE = {
//     notes: [
//       {pitch: 60, startTime: 0.0, endTime: 0.5},
//       {pitch: 60, startTime: 0.5, endTime: 1.0},
//       {pitch: 67, startTime: 1.0, endTime: 1.5},
//       {pitch: 67, startTime: 1.5, endTime: 2.0},
//       {pitch: 69, startTime: 2.0, endTime: 2.5},
//       {pitch: 69, startTime: 2.5, endTime: 3.0},
//       {pitch: 67, startTime: 3.0, endTime: 4.0},
//       {pitch: 65, startTime: 4.0, endTime: 4.5},
//       {pitch: 65, startTime: 4.5, endTime: 5.0},
//       {pitch: 64, startTime: 5.0, endTime: 5.5},
//       {pitch: 64, startTime: 5.5, endTime: 6.0},
//       {pitch: 62, startTime: 6.0, endTime: 6.5},
//       {pitch: 62, startTime: 6.5, endTime: 7.0},
//       {pitch: 60, startTime: 7.0, endTime: 8.0}, 
//       {pitch: 60, startTime: 8.0, endTime: 8.5},
//       {pitch: 60, startTime: 8.5, endTime: 9.0}, 
//       {pitch: 62, startTime: 9.0, endTime: 9.5},
//     ],
//     totalTime: 10
//   };

  GIANT_STEPS = {
    notes: [
      {pitch: 68, startTime: 0.0, endTime: 0.5},
      {pitch: 64, startTime: 0.5, endTime: 1.0},
      {pitch: 61, startTime: 1.0, endTime: 1.5},
      {pitch: 57, startTime: 1.5, endTime: 1.875},
      {pitch: 60, startTime: 1.875, endTime: 3},
      {pitch: 61, startTime: 3, endTime: 3.375},
      {pitch: 59, startTime: 3.375, endTime: 4.0},
      {pitch: 64, startTime: 4.0, endTime: 4.5},
      {pitch: 60, startTime: 4.5, endTime: 5.0},
      {pitch: 57, startTime: 5.0, endTime: 5.5},
      {pitch: 53, startTime: 5.5, endTime: 5.875},
      {pitch: 56, startTime: 5.875, endTime: 7},
      {pitch: 57, startTime: 7.0, endTime: 7.5},
      {pitch: 55, startTime: 7.5, endTime: 7.875}, 
      {pitch: 60, startTime: 7.875, endTime: 9},
      {pitch: 61, startTime: 9.0, endTime: 9.5}, 
      {pitch: 59, startTime: 9.5, endTime: 9.875}, 
      {pitch: 64, startTime: 9.875, endTime: 11.0},
      {pitch: 65, startTime: 11.0, endTime: 11.5}, 
      {pitch: 65, startTime: 11.5, endTime: 11.875}, 
      {pitch: 68, startTime: 11.875, endTime: 13.0},
      {pitch: 69, startTime: 13.0, endTime: 13.5}, 
      {pitch: 69, startTime: 13.5, endTime: 13.875}, 
      {pitch: 72, startTime: 13.875, endTime: 15.0},
      {pitch: 68, startTime: 15.0, endTime: 15.375}, 
      {pitch: 68, startTime: 15.375, endTime: 15.5},
    ],
    totalTime: 16
  };

function genNGram(text, n) {
  var ngrams = {};
  // Look at all characters of the String
  for (var i = 0; i < text.length - n; i++) {
    // Look at an ngram
    var gram = text.substring(i, i + n);
    // Look at the next character
    var next = text.charAt(i + n);
    // If this is a new one, make an empty array
    if (!ngrams.hasOwnProperty(gram)) {
      ngrams[gram] = [];
    }
    // Add the next character as a possible outcome
    ngrams[gram].push(next);
  }
  console.log(ngrams);
  return ngrams;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function choice(somelist) {
    var i = getRandomInt(0,somelist.length);
    return somelist[i];
  }

function midiToFreq(m) {
    return Math.pow(2, (m - 69) / 12) * 440;
}

function midiToChar(m) {
  return String.fromCharCode(m);
}

function playNotes(noteList) {
    noteList = mm.sequences.unquantizeSequence(noteList)
    console.log(noteList.notes)
    noteList.notes.forEach(note => {
        playNote(note);
    });
}

function playNote(note) {
    offset = 1 
    gainNode.gain.setTargetAtTime(0.8, note.startTime+offset, 0.01)
    osc.frequency.setTargetAtTime(midiToFreq(note.pitch), note.startTime+offset, 0.001)
    gainNode.gain.setTargetAtTime(0, note.endTime+offset-0.05, 0.01)

}

function charToMidi(c) {
  return c.charCodeAt();
}

function genMarkNotes(n) {
  var noteList = GIANT_STEPS.notes;
  var outNoteList = [];
  var text = "";
  for (var i = 0; i < noteList.length; i++) {
    text += midiToChar(noteList[i].pitch);
  }

  console.log(text)

  ngrams = genNGram(text, n);

  var current = "";
  var offset = 0;

  // Start with an arbitrary ngram
  for (var i = 0; i < n; i++) {
    current += String.fromCharCode(noteList[i].pitch);
    outNoteList.push({pitch: noteList[i].pitch, startTime: offset, endTime: offset +1});
    offset++;
  }
  // The final text
  var output = current;
  // Generate a new character some number of times
  for (var i = 0; i < 20; i++) {
    // If this is a valid ngram
    console.log("current: "  + current);
    if (ngrams.hasOwnProperty(current)) {
      // What are all the possible next tokens
      var possible = ngrams[current];
      // Pick one randomly that take into account the probabilities of the markov chains generated
      var next = choice(possible);
      // Add to the output
      output += next;
      console.log("output " + output);
      outNoteList.push({pitch: charToMidi(next),startTime: offset, endTime: offset + 1});
      offset ++;
      // Get the last N entries of the output; we'll use this to look up
      // an ngram in the next iteration of the loop
      current = output.substring(output.length-n, output.length);
    } 
    else {
      break;
    }
  }
  return outNoteList;

}


const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)
    osc = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    osc.connect(gainNode).connect(audioCtx.destination);
    osc.start()
    gainNode.gain.value = 0;

    var n = 0;

    n = document.getElementById("nValue").value;

    console.log("n: " + n);

    noteList = genMarkNotes(Number(n));
    noteList.forEach(note => {
        playNote(note);
    });
}, false);