var audioCtx;
var osc;
var gainNode;

LOW_STRINGS = {
notes: [
{pitch: 67, startTime: 0.0, endTime: 0.25},
{pitch: 67, startTime: 0.25, endTime: 0.5},
{pitch: 67, startTime: 0.5, endTime: 0.75},
{pitch: 67, startTime: 0.75, endTime: 1.0},
{pitch: 67, startTime: 1.0, endTime: 1.25},
{pitch: 67, startTime: 1.25, endTime: 1.5},
{pitch: 67, startTime: 1.5, endTime: 1.75},
{pitch: 67, startTime: 1.75, endTime: 2.0},
{pitch: 67, startTime: 2.0, endTime: 2.25},
{pitch: 67, startTime: 2.25, endTime: 2.5},
{pitch: 67, startTime: 2.5, endTime: 2.75},
{pitch: 67, startTime: 2.75, endTime: 3.0},
{pitch: 67, startTime: 3.0, endTime: 3.25},
{pitch: 67, startTime: 3.25, endTime: 3.5},
{pitch: 67, startTime: 3.5, endTime: 3.75},
{pitch: 67, startTime: 3.75, endTime: 4.0},
{pitch: 67, startTime: 4.0, endTime: 4.25},
{pitch: 67, startTime: 4.25, endTime: 4.5},
{pitch: 67, startTime: 4.5, endTime: 4.75},
{pitch: 67, startTime: 4.75, endTime: 5.0},
{pitch: 67, startTime: 5.0, endTime: 5.25},
{pitch: 67, startTime: 5.25, endTime: 5.5},
{pitch: 67, startTime: 5.5, endTime: 5.75},
{pitch: 67, startTime: 5.75, endTime: 6.0},
{pitch: 67, startTime: 6.0, endTime: 6.25},
{pitch: 67, startTime: 6.25, endTime: 6.5},
{pitch: 67, startTime: 6.5, endTime: 6.75},
{pitch: 67, startTime: 6.75, endTime: 7.0},
{pitch: 67, startTime: 7.0, endTime: 7.25},
{pitch: 67, startTime: 7.25, endTime: 7.5},
{pitch: 67, startTime: 7.5, endTime: 7.75},
{pitch: 67, startTime: 7.75, endTime: 8.0},
{pitch: 67, startTime: 8.0, endTime: 8.25},
{pitch: 67, startTime: 8.25, endTime: 8.5},
{pitch: 67, startTime: 8.5, endTime: 8.75},
{pitch: 67, startTime: 8.75, endTime: 9.0},
{pitch: 67, startTime: 9.0, endTime: 9.25},
{pitch: 67, startTime: 9.25, endTime: 9.5},
{pitch: 67, startTime: 9.5, endTime: 9.75},
{pitch: 67, startTime: 9.75, endTime: 10.0},
{pitch: 84, startTime: 10.0, endTime: 11.0},
{pitch: 89, startTime: 11.0, endTime: 12.0},
{pitch: 67, startTime: 12.0, endTime: 18.0},
{pitch: 87, startTime: 18.0, endTime: 18.25},
{pitch: 69, startTime: 18.25, endTime: 18.5},
{pitch: 69, startTime: 19.0, endTime: 19.25}, 
{pitch: 53, startTime: 19.25, endTime: 19.5},
],
totalTime: 20
};

TROMBONE = {
notes: [
{pitch: 85, startTime: 0.0, endTime: 3.5},
{pitch: 53, startTime: 3.5, endTime: 4.0},
{pitch: 84, startTime: 4.0, endTime: 6.0},
{pitch: 69, startTime: 6.0, endTime: 8.0},
{pitch: 84, startTime: 8.0, endTime: 10.0},
{pitch: 66, startTime: 10.0, endTime: 11.0},
{pitch: 78, startTime: 11.0, endTime: 12.0},
{pitch: 67, startTime: 12.0, endTime: 18.0},
{pitch: 87, startTime: 18.0, endTime: 18.25},
{pitch: 69, startTime: 18.25, endTime: 18.5},
{pitch: 69, startTime: 19.0, endTime: 19.25}, 
{pitch: 53, startTime: 19.25, endTime: 19.5},
],
totalTime: 20
};

PERCUSSION = {
notes: [
{pitch: 90, startTime: 0.0, endTime: 1.0},
{pitch: 90, startTime: 1.0, endTime: 2.0},
{pitch: 90, startTime: 2.0, endTime: 3.0},
{pitch: 90, startTime: 4.0, endTime: 5.0},
{pitch: 90, startTime: 5.0, endTime: 6.0},
{pitch: 90, startTime: 6.0, endTime: 7.0},
{pitch: 90, startTime: 8.0, endTime: 9.0},
{pitch: 90, startTime: 9.0, endTime: 10.0},
{pitch: 90, startTime: 10.0, endTime: 11.0},
{pitch: 90, startTime: 11.0, endTime: 12.0},
{pitch: 90, startTime: 12.0, endTime: 13.0},
{pitch: 90, startTime: 13.0, endTime: 14.0},
{pitch: 90, startTime: 14.0, endTime: 15.0},
{pitch: 90, startTime: 16.0, endTime: 17.0}, 
{pitch: 90, startTime: 17.0, endTime: 18.0},
{pitch: 90, startTime: 18.0, endTime: 18.5}, 
{pitch: 90, startTime: 19.0, endTime: 19.5}, 
],
totalTime: 20
};

