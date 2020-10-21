var audioCtx;
var osc;
var gainNode;

BASS_DRUM = {
notes: [
{pitch: 90, startTime: 0.0, endTime: 1.0},
{pitch: 90, startTime: 1.0, endTime: 2.0},
{pitch: 90, startTime: 2.0, endTime: 3.0},
{pitch: 90, startTime: 4.0, endTime: 5.0},
{pitch: 60, startTime: 5.0, endTime: 6.0},
{pitch: 61, startTime: 6.0, endTime: 7.0},
{pitch: 59, startTime: 8.0, endTime: 9.0},
{pitch: 64, startTime: 9.0, endTime: 10.0},
{pitch: 60, startTime: 10.0, endTime: 11.0},
{pitch: 57, startTime: 11.0, endTime: 12.0},
{pitch: 53, startTime: 12.0, endTime: 13.0},
{pitch: 56, startTime: 13.0, endTime: 14.0},
{pitch: 57, startTime: 14.0, endTime: 15.0},
{pitch: 55, startTime: 16.0, endTime: 17.0}, 
{pitch: 60, startTime: 17.0, endTime: 18.0},
{pitch: 61, startTime: 18.0, endTime: 18.5}, 
{pitch: 59, startTime: 19.0, endTime: 19.5}, 
],
totalTime: 20
};
