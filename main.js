var Tone = require("tone");

var vid = document.getElementById("video-right");
vid.playbackRate = 0.99;

var left = new Tone.Panner(-1).toMaster();
var right = new Tone.Panner(1).toMaster();

var leftPlayer = new Tone.Player("./ring.mp3").connect(left);
leftPlayer.loop = true;

var rightPlayer = new Tone.Player().connect(right);
rightPlayer.loop = true;
rightPlayer.playbackRate = 0.99;

Tone.Buffer.on("load", function(){
  rightPlayer.buffer = leftPlayer.buffer;
  leftPlayer.start();
  rightPlayer.start();
})