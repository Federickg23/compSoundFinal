var osc;
var gainNode;

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

function midiToChar(m){
  return String.fromCharCode(80)
}

function charToMidi(c) {
  return c.charCodeAt();
}


function genMarkNotes(n, list) {
  var noteList = list; 
  console.log(list)
  var outNoteList = [];
  var text = "";
  var offset = 0;
  for (var i = 0; i < noteList.length; i++) {
    console.log(noteList[i].pitch)
    text += midiToChar(noteList[i].pitch);
    outNoteList.push({pitch: noteList[i].pitch, startTime: noteList[i].startTime, endTime:noteList[i].endTime })
    offset = noteList[i].endTime
  }
  console.log(text)
  console.log(n)
  ngrams = genNGram(text, n);

  var current = "";

  // Start with an arbitrary ngram
  for (var i = 0; i < noteList.length; i++) {
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



