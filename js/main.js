var Tone = require("tone");

// function onEnded(that){
//   that.play();
//   that.className = "shake shake-constant";
//   setTimeout(function(){
//     that.className = "";
//   }.bind(that), 300);
// }

var rightVid = document.getElementById("video-right");
rightVid.playbackRate = 0.99;
// rightVid.addEventListener('ended', function(){
//   onEnded(this);
// });

var leftVid = document.getElementById("video-left");
// leftVid.addEventListener('ended', function(){
//   onEnded(this);
// });

var left = new Tone.Panner(-1).toMaster();
var right = new Tone.Panner(1).toMaster();

var leftPlayer = new Tone.Player("./ring.mp3").connect(left);
leftPlayer.loop = true;

var rightPlayer = new Tone.Player().connect(right);
rightPlayer.loop = true;
rightPlayer.playbackRate = 0.99;

Tone.Buffer.on("load", function(){
  rightPlayer.buffer = leftPlayer.buffer;
  if(window.innerWidth > 769){
    leftPlayer.start();
    rightPlayer.start();
    leftVid.play();
    rightVid.play();
  }
});

var button = document.getElementById("start-button");

button.addEventListener("click", function(){
  leftPlayer.start();
  rightPlayer.start();
  rightVid.play();
  leftVid.play();
  leftVid.className = "";
  button.style.display = "none";
})