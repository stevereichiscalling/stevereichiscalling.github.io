var Tone = require("tone");

var rightVid = document.getElementById("video-right");
rightVid.playbackRate = 0.99;

var leftVid = document.getElementById("video-left");

var left = new Tone.Panner(-1).toMaster();
var right = new Tone.Panner(1).toMaster();

var leftPlayer = new Tone.Player("./media/ring.mp3").connect(left);
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
var answerButton = document.getElementById("phone-icon");
var noButton = document.getElementById("no-icon");
var infoBox = document.getElementById("info-box");
var message = document.getElementById("message-url");

var closeButton = document.getElementById("close-icon");

closeButton.addEventListener("touchend", function(){
  infoBox.style.opacity = "0";
  // messages.style.display = "none";
  infoBox.style.zIndex = "0";
  leftVid.className = "";
});


var canvas = document.getElementById("touch-detector");
canvas.width = noButton.width;
canvas.height = noButton.height;

var ctx = canvas.getContext("2d");
ctx.drawImage(answerButton, 0, 0, canvas.width, canvas.height);

button.addEventListener("click", function(){
  leftPlayer.start();
  rightPlayer.start();
  rightVid.play();
  leftVid.play();
  leftVid.className = "";
  button.style.display = "none";
  
  noButton.style.opacity = "1";
  canvas.style.opacity = "1";
  answerButton.style.zIndex = "100"
});

var isTouched;

var xOffset = 0;
var xInit = 0;
var dist = 0;

answerButton.addEventListener("touchstart", function(e) {
  var x = e.touches[0].clientX;
  var y = e.touches[0].clientY;

  if(ctx.getImageData(x, y, 1, 1).data[0] > 0){
    isTouched = true;
    xInit = x;
    xOffset = x;
  }

});

answerButton.addEventListener("touchmove", function(e){
  if(isTouched){
    xOffset = e.touches[0].clientX;
    dist = xOffset - xInit;
  }
});

answerButton.addEventListener("touchend", function(e){
  isTouched = false;
  // xOffset = 0;
  // xInit = 0;
});

function draw(){
  if(dist > 10 && !isTouched){
    dist -= 10;
  } else if(dist <= 10 && !isTouched){
    xOffset = 0;
    xInit = 0;
    dist = 0;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(leftVid.className == ""){
    ctx.drawImage(answerButton, dist, 0, canvas.width, canvas.height);
  }
  if(dist/canvas.width > 0.512){
    // window.location = "http://www.sethkranzler.com";
    dist = 0.512 * canvas.width;
    infoBox.style.opacity = "1";
    message.style.display = "block";
    noButton.style.opacity = "0";
    closeButton.style.zIndex = "101";
    leftVid.className = "unfocus";
  }
}

setInterval(function() {
  draw();
}, 1000/60);
