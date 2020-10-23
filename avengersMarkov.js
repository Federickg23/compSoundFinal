// // var audioCtx;
var osc;
var gainNode;

// HIGH_STRINGS = {
// notes: [
// {pitch: 69, startTime: 0.0, endTime: 0.25},
// {pitch: 69, startTime: 0.25, endTime: 0.5},
// {pitch: 69, startTime: 1.0, endTime: 1.25},
// {pitch: 69, startTime: 1.25, endTime: 1.5},
// {pitch: 69, startTime: 2.0, endTime: 2.25},
// {pitch: 69, startTime: 2.25, endTime: 2.5},
// {pitch: 84, startTime: 3.0, endTime: 3.25},
// {pitch: 84, startTime: 3.25, endTime: 3.5},
// {pitch: 53, startTime: 3.5, endTime: 3.75},
// {pitch: 53, startTime: 3.75, endTime: 4.0},
// {pitch: 89, startTime: 4.0, endTime: 4.25},
// {pitch: 89, startTime: 4.25, endTime: 4.5},
// {pitch: 89, startTime: 5.0, endTime: 5.25},
// {pitch: 89, startTime: 5.25, endTime: 5.5},
// {pitch: 69, startTime: 6.0, endTime: 6.25},
// {pitch: 69, startTime: 6.25, endTime: 6.5},
// {pitch: 84, startTime: 7.0, endTime: 7.25},
// {pitch: 84, startTime: 7.25, endTime: 7.5},
// {pitch: 53, startTime: 7.5, endTime: 7.75},
// {pitch: 53, startTime: 7.75, endTime: 8.0},
// {pitch: 89, startTime: 8.0, endTime: 8.25},
// {pitch: 89, startTime: 8.25, endTime: 8.5},
// {pitch: 89, startTime: 9.0, endTime: 9.25},
// {pitch: 89, startTime: 9.25, endTime: 9.5},
// {pitch: 66, startTime: 10.0, endTime: 11.0},
// {pitch: 78, startTime: 11.0, endTime: 12.0},
// {pitch: 69, startTime: 12.0, endTime: 12.25},
// {pitch: 69, startTime: 12.25, endTime: 12.5},
// {pitch: 69, startTime: 13.0, endTime: 13.25},
// {pitch: 69, startTime: 13.25, endTime: 13.5},
// {pitch: 69, startTime: 14.0, endTime: 14.25},
// {pitch: 69, startTime: 14.25, endTime: 14.5},
// {pitch: 84, startTime: 15.0, endTime: 15.25},
// {pitch: 84, startTime: 15.25, endTime: 15.5},
// {pitch: 53, startTime: 15.5, endTime: 15.75},
// {pitch: 53, startTime: 15.75, endTime: 16.0},
// {pitch: 89, startTime: 16.0, endTime: 16.25},
// {pitch: 89, startTime: 16.25, endTime: 16.5},
// {pitch: 89, startTime: 17.0, endTime: 17.25},
// {pitch: 89, startTime: 17.25, endTime: 17.5},
// {pitch: 87, startTime: 18.0, endTime: 18.25},
// {pitch: 69, startTime: 18.25, endTime: 18.5},
// {pitch: 69, startTime: 19.0, endTime: 19.25}, 
// {pitch: 53, startTime: 19.25, endTime: 19.5},
// ],
// totalTime: 19.5
// };

// HIGH_BRASS = {
// notes: [
// {pitch: 69, startTime: 0.0, endTime: 0.25},
// {pitch: 69, startTime: 0.25, endTime: 0.5},
// {pitch: 69, startTime: 1.0, endTime: 1.25},
// {pitch: 69, startTime: 1.25, endTime: 1.5},
// {pitch: 69, startTime: 2.0, endTime: 2.25},
// {pitch: 69, startTime: 2.25, endTime: 2.5},
// {pitch: 84, startTime: 3.0, endTime: 3.25},
// {pitch: 84, startTime: 3.25, endTime: 3.5},
// {pitch: 53, startTime: 3.5, endTime: 3.75},
// {pitch: 53, startTime: 3.75, endTime: 4.0},
// {pitch: 89, startTime: 4.0, endTime: 4.25},
// {pitch: 89, startTime: 4.25, endTime: 4.5},
// {pitch: 89, startTime: 5.0, endTime: 5.25},
// {pitch: 89, startTime: 5.25, endTime: 5.5},
// {pitch: 69, startTime: 6.0, endTime: 6.25},
// {pitch: 69, startTime: 6.25, endTime: 6.5},
// {pitch: 84, startTime: 7.0, endTime: 7.25},
// {pitch: 84, startTime: 7.25, endTime: 7.5},
// {pitch: 53, startTime: 7.5, endTime: 7.75},
// {pitch: 53, startTime: 7.75, endTime: 8.0},
// {pitch: 89, startTime: 8.0, endTime: 8.25},
// {pitch: 89, startTime: 8.25, endTime: 8.5},
// {pitch: 89, startTime: 9.0, endTime: 9.25},
// {pitch: 89, startTime: 9.25, endTime: 9.5},
// {pitch: 66, startTime: 10.0, endTime: 11.0},
// {pitch: 78, startTime: 11.0, endTime: 12.0},
// {pitch: 69, startTime: 12.0, endTime: 12.25},
// {pitch: 69, startTime: 12.25, endTime: 12.5},
// {pitch: 69, startTime: 13.0, endTime: 13.25},
// {pitch: 69, startTime: 13.25, endTime: 13.5},
// {pitch: 69, startTime: 14.0, endTime: 14.25},
// {pitch: 69, startTime: 14.25, endTime: 14.5},
// {pitch: 84, startTime: 15.0, endTime: 15.25},
// {pitch: 84, startTime: 15.25, endTime: 15.5},
// {pitch: 53, startTime: 15.5, endTime: 15.75},
// {pitch: 53, startTime: 15.75, endTime: 16.0},
// {pitch: 89, startTime: 16.0, endTime: 16.25},
// {pitch: 89, startTime: 16.25, endTime: 16.5},
// {pitch: 89, startTime: 17.0, endTime: 17.25},
// {pitch: 89, startTime: 17.25, endTime: 17.5},
// {pitch: 87, startTime: 18.0, endTime: 18.25},
// {pitch: 69, startTime: 18.25, endTime: 18.5},
// {pitch: 69, startTime: 19.0, endTime: 19.25}, 
// {pitch: 53, startTime: 19.25, endTime: 19.5},
// ],
// totalTime: 19.5
// };

// HIGH_WINDS = {
// notes: [
// {pitch: 69, startTime: 0.0, endTime: 0.25},
// {pitch: 69, startTime: 0.25, endTime: 0.5},
// {pitch: 69, startTime: 1.0, endTime: 1.25},
// {pitch: 69, startTime: 1.25, endTime: 1.5},
// {pitch: 69, startTime: 2.0, endTime: 2.25},
// {pitch: 69, startTime: 2.25, endTime: 2.5},
// {pitch: 84, startTime: 3.0, endTime: 3.25},
// {pitch: 84, startTime: 3.25, endTime: 3.5},
// {pitch: 53, startTime: 3.5, endTime: 3.75},
// {pitch: 53, startTime: 3.75, endTime: 4.0},
// {pitch: 89, startTime: 4.0, endTime: 4.25},
// {pitch: 89, startTime: 4.25, endTime: 4.5},
// {pitch: 89, startTime: 5.0, endTime: 5.25},
// {pitch: 89, startTime: 5.25, endTime: 5.5},
// {pitch: 69, startTime: 6.0, endTime: 6.25},
// {pitch: 69, startTime: 6.25, endTime: 6.5},
// {pitch: 84, startTime: 7.0, endTime: 7.25},
// {pitch: 84, startTime: 7.25, endTime: 7.5},
// {pitch: 53, startTime: 7.5, endTime: 7.75},
// {pitch: 53, startTime: 7.75, endTime: 8.0},
// {pitch: 89, startTime: 8.0, endTime: 8.25},
// {pitch: 89, startTime: 8.25, endTime: 8.5},
// {pitch: 89, startTime: 9.0, endTime: 9.25},
// {pitch: 89, startTime: 9.25, endTime: 9.5},
// {pitch: 69, startTime: 12.0, endTime: 12.25},
// {pitch: 84, startTime: 12.25, endTime: 12.5},
// {pitch: 84, startTime: 12.5, endTime: 12.75},
// {pitch: 69, startTime: 12.75, endTime: 13.0},
// {pitch: 69, startTime: 13.0, endTime: 13.25},
// {pitch: 84, startTime: 13.25, endTime: 13.5},
// {pitch: 84, startTime: 13.5, endTime: 13.75},
// {pitch: 69, startTime: 13.75, endTime: 14.0},
// {pitch: 69, startTime: 14.0, endTime: 14.25},
// {pitch: 84, startTime: 14.25, endTime: 14.5},
// {pitch: 84, startTime: 14.5, endTime: 14.75},
// {pitch: 69, startTime: 14.75, endTime: 15.0},
// {pitch: 69, startTime: 15.0, endTime: 15.25},
// {pitch: 84, startTime: 15.25, endTime: 15.5},
// {pitch: 84, startTime: 15.5, endTime: 15.75},
// {pitch: 69, startTime: 15.75, endTime: 16.0},
// {pitch: 69, startTime: 16.0, endTime: 16.25},
// {pitch: 84, startTime: 16.25, endTime: 16.5},
// {pitch: 84, startTime: 16.5, endTime: 16.75},
// {pitch: 69, startTime: 16.75, endTime: 17.0},
// {pitch: 69, startTime: 17.0, endTime: 17.25},
// {pitch: 84, startTime: 17.25, endTime: 17.5},
// {pitch: 84, startTime: 17.5, endTime: 17.75},
// {pitch: 69, startTime: 17.75, endTime: 18.0},
// {pitch: 87, startTime: 18.0, endTime: 18.25},
// {pitch: 81, startTime: 18.25, endTime: 18.5},
// {pitch: 81, startTime: 19.0, endTime: 19.25}, 
// {pitch: 78, startTime: 19.25, endTime: 19.5},
// ],
// totalTime: 19.5
// };

// LOW_STRINGS = {
// notes: [
// {pitch: 67, startTime: 0.0, endTime: 0.25},
// {pitch: 67, startTime: 0.25, endTime: 0.5},
// {pitch: 67, startTime: 0.5, endTime: 0.75},
// {pitch: 67, startTime: 0.75, endTime: 1.0},
// {pitch: 67, startTime: 1.0, endTime: 1.25},
// {pitch: 67, startTime: 1.25, endTime: 1.5},
// {pitch: 67, startTime: 1.5, endTime: 1.75},
// {pitch: 67, startTime: 1.75, endTime: 2.0},
// {pitch: 67, startTime: 2.0, endTime: 2.25},
// {pitch: 67, startTime: 2.25, endTime: 2.5},
// {pitch: 67, startTime: 2.5, endTime: 2.75},
// {pitch: 67, startTime: 2.75, endTime: 3.0},
// {pitch: 67, startTime: 3.0, endTime: 3.25},
// {pitch: 67, startTime: 3.25, endTime: 3.5},
// {pitch: 67, startTime: 3.5, endTime: 3.75},
// {pitch: 67, startTime: 3.75, endTime: 4.0},
// {pitch: 67, startTime: 4.0, endTime: 4.25},
// {pitch: 67, startTime: 4.25, endTime: 4.5},
// {pitch: 67, startTime: 4.5, endTime: 4.75},
// {pitch: 67, startTime: 4.75, endTime: 5.0},
// {pitch: 67, startTime: 5.0, endTime: 5.25},
// {pitch: 67, startTime: 5.25, endTime: 5.5},
// {pitch: 67, startTime: 5.5, endTime: 5.75},
// {pitch: 67, startTime: 5.75, endTime: 6.0},
// {pitch: 67, startTime: 6.0, endTime: 6.25},
// {pitch: 67, startTime: 6.25, endTime: 6.5},
// {pitch: 67, startTime: 6.5, endTime: 6.75},
// {pitch: 67, startTime: 6.75, endTime: 7.0},
// {pitch: 67, startTime: 7.0, endTime: 7.25},
// {pitch: 67, startTime: 7.25, endTime: 7.5},
// {pitch: 67, startTime: 7.5, endTime: 7.75},
// {pitch: 67, startTime: 7.75, endTime: 8.0},
// {pitch: 67, startTime: 8.0, endTime: 8.25},
// {pitch: 67, startTime: 8.25, endTime: 8.5},
// {pitch: 67, startTime: 8.5, endTime: 8.75},
// {pitch: 67, startTime: 8.75, endTime: 9.0},
// {pitch: 67, startTime: 9.0, endTime: 9.25},
// {pitch: 67, startTime: 9.25, endTime: 9.5},
// {pitch: 67, startTime: 9.5, endTime: 9.75},
// {pitch: 67, startTime: 9.75, endTime: 10.0},
// {pitch: 84, startTime: 10.0, endTime: 11.0},
// {pitch: 89, startTime: 11.0, endTime: 12.0},
// {pitch: 67, startTime: 12.0, endTime: 18.0},
// {pitch: 87, startTime: 18.0, endTime: 18.25},
// {pitch: 69, startTime: 18.25, endTime: 18.5},
// {pitch: 69, startTime: 19.0, endTime: 19.25}, 
// {pitch: 53, startTime: 19.25, endTime: 19.5},
// ],
// totalTime: 19.5
// };

// LOW_WINDS = {
// notes: [
// {pitch: 85, startTime: 0.0, endTime: 3.5},
// {pitch: 53, startTime: 3.5, endTime: 4.0},
// {pitch: 84, startTime: 4.0, endTime: 6.0},
// {pitch: 69, startTime: 6.0, endTime: 8.0},
// {pitch: 84, startTime: 8.0, endTime: 10.0},
// {pitch: 66, startTime: 10.0, endTime: 11.0},
// {pitch: 78, startTime: 11.0, endTime: 12.0},
// {pitch: 69, startTime: 12.0, endTime: 12.25},
// {pitch: 84, startTime: 12.25, endTime: 12.5},
// {pitch: 84, startTime: 12.5, endTime: 12.75},
// {pitch: 69, startTime: 12.75, endTime: 13.0},
// {pitch: 69, startTime: 13.0, endTime: 13.25},
// {pitch: 84, startTime: 13.25, endTime: 13.5},
// {pitch: 84, startTime: 13.5, endTime: 13.75},
// {pitch: 69, startTime: 13.75, endTime: 14.0},
// {pitch: 69, startTime: 14.0, endTime: 14.25},
// {pitch: 84, startTime: 14.25, endTime: 14.5},
// {pitch: 84, startTime: 14.5, endTime: 14.75},
// {pitch: 69, startTime: 14.75, endTime: 15.0},
// {pitch: 69, startTime: 15.0, endTime: 15.25},
// {pitch: 84, startTime: 15.25, endTime: 15.5},
// {pitch: 84, startTime: 15.5, endTime: 15.75},
// {pitch: 69, startTime: 15.75, endTime: 16.0},
// {pitch: 69, startTime: 16.0, endTime: 16.25},
// {pitch: 84, startTime: 16.25, endTime: 16.5},
// {pitch: 84, startTime: 16.5, endTime: 16.75},
// {pitch: 69, startTime: 16.75, endTime: 17.0},
// {pitch: 69, startTime: 17.0, endTime: 17.25},
// {pitch: 84, startTime: 17.25, endTime: 17.5},
// {pitch: 84, startTime: 17.5, endTime: 17.75},
// {pitch: 69, startTime: 17.75, endTime: 18.0},
// {pitch: 87, startTime: 18.0, endTime: 18.25},
// {pitch: 81, startTime: 18.25, endTime: 18.5},
// {pitch: 81, startTime: 19.0, endTime: 19.25}, 
// {pitch: 78, startTime: 19.25, endTime: 19.5},
// ],
// totalTime: 19.5
// };

// LOW_BRASS = {
// notes: [
// {pitch: 85, startTime: 0.0, endTime: 3.5},
// {pitch: 53, startTime: 3.5, endTime: 4.0},
// {pitch: 84, startTime: 4.0, endTime: 6.0},
// {pitch: 69, startTime: 6.0, endTime: 8.0},
// {pitch: 84, startTime: 8.0, endTime: 10.0},
// {pitch: 66, startTime: 10.0, endTime: 11.0},
// {pitch: 78, startTime: 11.0, endTime: 12.0},
// {pitch: 67, startTime: 12.0, endTime: 18.0},
// {pitch: 87, startTime: 18.0, endTime: 18.25},
// {pitch: 69, startTime: 18.25, endTime: 18.5},
// {pitch: 69, startTime: 19.0, endTime: 19.25}, 
// {pitch: 53, startTime: 19.25, endTime: 19.5},
// ],
// totalTime: 19.5
// };

// PERCUSSION = {
// notes: [
// {pitch: 90, startTime: 0.0, endTime: 1.0},
// {pitch: 90, startTime: 1.0, endTime: 2.0},
// {pitch: 90, startTime: 2.0, endTime: 3.0},
// {pitch: 90, startTime: 4.0, endTime: 5.0},
// {pitch: 90, startTime: 5.0, endTime: 6.0},
// {pitch: 90, startTime: 6.0, endTime: 7.0},
// {pitch: 90, startTime: 8.0, endTime: 9.0},
// {pitch: 90, startTime: 9.0, endTime: 10.0},
// {pitch: 90, startTime: 10.0, endTime: 11.0},
// {pitch: 90, startTime: 11.0, endTime: 12.0},
// {pitch: 90, startTime: 12.0, endTime: 13.0},
// {pitch: 90, startTime: 13.0, endTime: 14.0},
// {pitch: 90, startTime: 14.0, endTime: 15.0},
// {pitch: 90, startTime: 16.0, endTime: 17.0}, 
// {pitch: 90, startTime: 17.0, endTime: 18.0},
// {pitch: 90, startTime: 18.0, endTime: 18.5}, 
// {pitch: 90, startTime: 19.0, endTime: 19.5}, 
// ],
// totalTime: 19.5
// };

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
  // var offset = 0;

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



